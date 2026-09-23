#!/usr/bin/env node
/* Rebuild the Tenant Register's TENANTS array from Emma's export.

   Run:  node .claude/import-tenants.mjs <Tenant_Register_*.xlsx>

   The export carries who the tenants ARE: name, account, property, unit,
   lease dates, email, phone, status and a Flag column. It carries none of
   the operational fields the register draws and the Orion filters read -
   no balance, no site classification, no colour band, no pet, no deposit.
   Those are generated here, deterministically from the account number, so
   a rerun of this script produces byte-identical output and the demo beats
   keep having something to match. Every generated field is listed in
   PROTOTYPE.md as made-up demo content; the export's own columns are never
   overwritten.                                                              */

import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const xlsx = process.argv[2];
if (!xlsx) { console.error('usage: node .claude/import-tenants.mjs <file.xlsx>'); process.exit(2); }

/* --- read the Tenants sheet (no dependency on a spreadsheet library) --- */
const rows = JSON.parse(execFileSync('python3', ['-c', `
import zipfile, re, json, sys
from xml.etree import ElementTree as ET
z = zipfile.ZipFile(sys.argv[1])
NS = {'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
M = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
ss = [''.join(t.text or '' for t in si.iter(M+'t'))
      for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si', NS)]
wb = ET.fromstring(z.read('xl/workbook.xml'))
rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
rid = None
for sh in wb.iter():
    if sh.tag.endswith('}sheet') and sh.get('name') == 'Tenants':
        rid = sh.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
target = None
for r in rels:
    if r.get('Id') == rid: target = 'xl/' + r.get('Target').lstrip('/')
out = []
for row in ET.fromstring(z.read(target)).iter(M+'row'):
    cells = {}
    for c in row.findall('m:c', NS):
        col = re.match(r'[A-Z]+', c.get('r')).group(0)
        t = c.get('t'); v = c.find('m:v', NS); isel = c.find('m:is', NS)
        if isel is not None: val = ''.join(x.text or '' for x in isel.iter(M+'t'))
        elif v is None: val = ''
        elif t == 's': val = ss[int(v.text)]
        else: val = v.text
        cells[col] = val
    out.append(cells)
print(json.dumps(out))
`, xlsx]).toString());

const header = rows[0];
const want = { A:'Name', B:'Account #', C:'Property', D:'Unit', E:'Lease Start',
               F:'Lease End', G:'Email', H:'Phone', I:'Status', J:'Flag' };
for (const [col, label] of Object.entries(want)) {
  if (header[col] !== label) {
    console.error(`column ${col} is "${header[col]}", expected "${label}" — the export's shape changed, stopping`);
    process.exit(1);
  }
}
const data = rows.slice(1).filter(r => (r.A || '').trim());

/* --- helpers --- */
/* Excel's day 0 is 1899-12-30, and the register prints MM/DD/YY. */
const mdy = serial => {
  if (!serial) return '';
  const d = new Date(Date.UTC(1899, 11, 30) + Number(serial) * 86400000);
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getUTCMonth() + 1)}/${p(d.getUTCDate())}/${String(d.getUTCFullYear()).slice(2)}`;
};
/* One deterministic stream per tenant, seeded by account number, so every
   generated field is stable across runs and reviewable in a diff. */
const rng = seed => { let x = (Number(seed) || 1) * 2654435761 % 2147483647;
  return () => (x = x * 16807 % 2147483647) / 2147483647; };

const COLORS = ['Blue', 'Green', 'Orange', 'Yellow'];
const out = [];
let dogsAtRiverview = 0;

for (const r of data) {
  const status = r.I || 'Current';
  const property = r.C || '';
  const rand = rng(r.B);
  const rec = {
    name: r.A.trim(),
    account: Number(r.B),
    property,
    unit: String(r.D || ''),
    leaseStart: mdy(r.E),
    leaseEnd: mdy(r.F),
    status,
    email: (r.G || '').trim(),
    phone: (r.H || '').trim()
  };

  /* Site classification follows the status: someone current occupies the
     unit, a past tenant has left it behind, a future one is moving into a
     unit that has been turned. */
  rec.siteClass = status === 'Current' ? 'Occupied'
                : status === 'Future' ? 'Vacant Ready'
                : (rand() < 0.4 ? 'Vacant Ready' : 'Vacant');

  /* Balance. Past and future tenants are usually square; current ones carry
     the spread the delinquency beats need, from one month's rent to the
     long-overdue. */
  const owes = status === 'Current' ? rand() < 0.42 : status === 'Past' ? rand() < 0.12 : false;
  if (!owes) rec.balance = 0;
  else {
    const big = rand() < 0.25;
    const v = big ? 4000 + rand() * 11000 : 120 + rand() * 2600;
    rec.balance = Math.round(v * 100) / 100;
  }

  if (rand() < 0.8) rec.color = COLORS[Math.floor(rand() * COLORS.length)];
  const occupants = rand();
  if (occupants < 0.28) rec.extra = '+' + (1 + Math.floor(rand() * 3));

  /* Pets. Riverview is where the scripted demo looks, so it is seeded a
     little denser there; everywhere else a pet is uncommon. */
  const petRoll = rand();
  if (property === 'Riverview Apartments' && status === 'Current' && petRoll < 0.34) {
    rec.pet = 'Dog'; dogsAtRiverview++;
  } else if (petRoll < 0.07) {
    rec.pet = rand() < 0.6 ? 'Dog' : 'Cat';
  }

  /* The export's own Flag column, not invented: Notice is a notice to
     vacate, Court and Evicted are an eviction in progress. */
  if (r.J === 'Notice') rec.notice = true;
  if (r.J === 'Evicted' || r.J === 'Court') rec.eviction = true;

  /* Beat 4 excludes tenants who are already being dealt with, so a few need
     to be. Kept rare and only among people who actually owe something. */
  if (rec.balance > 0) {
    if (rand() < 0.10) rec.collections = true;
    if (rand() < 0.12) rec.paymentPlan = true;
  }
  /* A moved-out tenant with a deposit still held is the other exclusion
     beat: "moved out more than 30 days ago and we still hold a deposit". */
  if (status === 'Past' && rand() < 0.35) {
    rec.moveOut = rec.leaseEnd;
    rec.deposit = Math.round((400 + rand() * 1400) / 5) * 5;
  }
  out.push(rec);
}

/* --- emit --- */
const order = ['name', 'extra', 'notice', 'eviction', 'collections', 'paymentPlan', 'siteClass',
               'balance', 'account', 'property', 'unit', 'leaseStart', 'leaseEnd', 'moveOut',
               'deposit', 'pet', 'status', 'email', 'phone', 'color'];
const lit = v => typeof v === 'string' ? JSON.stringify(v)
             : typeof v === 'boolean' ? String(v)
             : Number.isInteger(v) ? String(v) : v.toFixed(2);
const lines = out.map(rec => '  { ' + order.filter(k => rec[k] !== undefined)
  .map(k => `${k}: ${lit(rec[k])}`).join(', ') + ' }').join(',\n');

const props = [...new Set(out.map(r => r.property))].sort();
writeFileSync('.claude/tenants.generated.js', 'const TENANTS = [\n' + lines + '\n];\n');
writeFileSync('.claude/tenants.props.json', JSON.stringify(props, null, 2));

const n = p => out.filter(p).length;
console.log(`  ${out.length} tenants from ${xlsx.split('/').pop()}`);
console.log(`    ${props.length} properties`);
console.log(`    status        ${n(r=>r.status==='Current')} current, ${n(r=>r.status==='Past')} past, ${n(r=>r.status==='Future')} future`);
console.log(`    balance > 0   ${n(r=>r.balance>0)}  (of which over $5,000: ${n(r=>r.balance>5000)})`);
console.log(`    pets          ${n(r=>r.pet)}  (dogs at Riverview: ${dogsAtRiverview})`);
console.log(`    flags         ${n(r=>r.notice)} notice, ${n(r=>r.eviction)} eviction  (from the export)`);
console.log(`    exclusions    ${n(r=>r.collections)} collections, ${n(r=>r.paymentPlan)} payment plan, ${n(r=>r.deposit)} deposit held`);
