/* ============================================================
   History / Notes — an overlay, not a page
   ------------------------------------------------------------
   Built from two frames in RMX-Pages and nothing else:
     * History Notes Overlay   4628:44305
     * Note Details Dialog     3779:60444

   Emma's call, 2026-09-10: "the history notes is an overlay on
   the workspace not a page." So this is one self-contained,
   self-injecting overlay -- sprite, markup, records, behaviour
   -- that any screen picks up with two lines:

     <link rel="stylesheet" href="assets/history-notes.css">
     <script src="assets/history-notes.js"></script>

   and opens with RMXHistory.open('<record key>'). Same
   arrangement as assets/megamenu.{css,js}; see PROTOTYPE.md.

   Every class and glyph id in here is hn-prefixed, because the
   markup lands in a host screen that has its own .btn, .toast,
   .chkbox and a `call` icon of its own.
   ============================================================ */
(function () {
  'use strict';

  var SPRITE = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display:none\"><symbol id=\"hn-check\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M7.90168 15.1494L3.01996 10.2676L4.24039 9.04721L7.90168 12.7085L15.7595 4.85065L16.98 6.07108L7.90168 15.1494Z\"/></symbol><symbol id=\"hn-check_circle\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M10 1.66666C5.40002 1.66666 1.66669 5.39999 1.66669 9.99999C1.66669 14.6 5.40002 18.3333 10 18.3333C14.6 18.3333 18.3334 14.6 18.3334 9.99999C18.3334 5.39999 14.6 1.66666 10 1.66666ZM10 16.6667C6.32502 16.6667 3.33335 13.675 3.33335 9.99999C3.33335 6.32499 6.32502 3.33332 10 3.33332C13.675 3.33332 16.6667 6.32499 16.6667 9.99999C16.6667 13.675 13.675 16.6667 10 16.6667ZM13.825 6.31666L8.33335 11.8083L6.17502 9.65832L5.00002 10.8333L8.33335 14.1667L15 7.49999L13.825 6.31666Z\"/></symbol><symbol id=\"hn-attach_file\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M13.3334 5.00001V14.5833C13.3334 16.425 11.8417 17.9167 10 17.9167C8.15835 17.9167 6.66669 16.425 6.66669 14.5833V4.16668C6.66669 3.01668 7.60002 2.08334 8.75002 2.08334C9.90002 2.08334 10.8334 3.01668 10.8334 4.16668V12.9167C10.8334 13.375 10.4584 13.75 10 13.75C9.54169 13.75 9.16669 13.375 9.16669 12.9167V5.00001H7.91669V12.9167C7.91669 14.0667 8.85002 15 10 15C11.15 15 12.0834 14.0667 12.0834 12.9167V4.16668C12.0834 2.32501 10.5917 0.833344 8.75002 0.833344C6.90835 0.833344 5.41669 2.32501 5.41669 4.16668V14.5833C5.41669 17.1167 7.46669 19.1667 10 19.1667C12.5334 19.1667 14.5834 17.1167 14.5834 14.5833V5.00001H13.3334Z\"/></symbol><symbol id=\"hn-schedule\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M12.75 13.9167L13.9167 12.75L10.8334 9.66666V5.83333H9.16669V10.3333L12.75 13.9167ZM10 18.3333C8.84724 18.3333 7.76391 18.1146 6.75002 17.6771C5.73613 17.2396 4.85419 16.6458 4.10419 15.8958C3.35419 15.1458 2.76044 14.2639 2.32294 13.25C1.88544 12.2361 1.66669 11.1528 1.66669 10C1.66669 8.84722 1.88544 7.76389 2.32294 6.75C2.76044 5.73611 3.35419 4.85416 4.10419 4.10416C4.85419 3.35416 5.73613 2.76041 6.75002 2.32291C7.76391 1.88541 8.84724 1.66666 10 1.66666C11.1528 1.66666 12.2361 1.88541 13.25 2.32291C14.2639 2.76041 15.1459 3.35416 15.8959 4.10416C16.6459 4.85416 17.2396 5.73611 17.6771 6.75C18.1146 7.76389 18.3334 8.84722 18.3334 10C18.3334 11.1528 18.1146 12.2361 17.6771 13.25C17.2396 14.2639 16.6459 15.1458 15.8959 15.8958C15.1459 16.6458 14.2639 17.2396 13.25 17.6771C12.2361 18.1146 11.1528 18.3333 10 18.3333ZM10 16.6667C11.8472 16.6667 13.4202 16.0174 14.7188 14.7187C16.0174 13.4201 16.6667 11.8472 16.6667 10C16.6667 8.15278 16.0174 6.57986 14.7188 5.28125C13.4202 3.98264 11.8472 3.33333 10 3.33333C8.1528 3.33333 6.57988 3.98264 5.28127 5.28125C3.98266 6.57986 3.33335 8.15278 3.33335 10C3.33335 11.8472 3.98266 13.4201 5.28127 14.7187C6.57988 16.0174 8.1528 16.6667 10 16.6667Z\"/></symbol><symbol id=\"hn-calendar_today\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M16.6667 2.5H15.8333V0.833336H14.1667V2.5H5.83332V0.833336H4.16666V2.5H3.33332C2.41666 2.5 1.66666 3.25 1.66666 4.16667V17.5C1.66666 18.4167 2.41666 19.1667 3.33332 19.1667H16.6667C17.5833 19.1667 18.3333 18.4167 18.3333 17.5V4.16667C18.3333 3.25 17.5833 2.5 16.6667 2.5ZM16.6667 17.5H3.33332V8.33334H16.6667V17.5ZM16.6667 6.66667H3.33332V4.16667H16.6667V6.66667Z\"/></symbol><symbol id=\"hn-close\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M15.8334 5.34166L14.6584 4.16666L10 8.82499L5.34169 4.16666L4.16669 5.34166L8.82502 9.99999L4.16669 14.6583L5.34169 15.8333L10 11.175L14.6584 15.8333L15.8334 14.6583L11.175 9.99999L15.8334 5.34166Z\"/></symbol><symbol id=\"hn-help\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M9.16669 15H10.8334V13.3334H9.16669V15ZM10 1.66669C5.40002 1.66669 1.66669 5.40002 1.66669 10C1.66669 14.6 5.40002 18.3334 10 18.3334C14.6 18.3334 18.3334 14.6 18.3334 10C18.3334 5.40002 14.6 1.66669 10 1.66669ZM10 16.6667C6.32502 16.6667 3.33335 13.675 3.33335 10C3.33335 6.32502 6.32502 3.33335 10 3.33335C13.675 3.33335 16.6667 6.32502 16.6667 10C16.6667 13.675 13.675 16.6667 10 16.6667ZM10 5.00002C8.15835 5.00002 6.66669 6.49169 6.66669 8.33335H8.33335C8.33335 7.41669 9.08335 6.66669 10 6.66669C10.9167 6.66669 11.6667 7.41669 11.6667 8.33335C11.6667 10 9.16669 9.79169 9.16669 12.5H10.8334C10.8334 10.625 13.3334 10.4167 13.3334 8.33335C13.3334 6.49169 11.8417 5.00002 10 5.00002Z\"/></symbol><symbol id=\"hn-search\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M12.9167 11.6667H12.2583L12.025 11.4417C13.025 10.275 13.5417 8.68334 13.2583 6.99167C12.8667 4.675 10.9333 2.825 8.59999 2.54167C5.07499 2.10834 2.10832 5.075 2.54165 8.6C2.82499 10.9333 4.67499 12.8667 6.99165 13.2583C8.68332 13.5417 10.275 13.025 11.4417 12.025L11.6667 12.2583V12.9167L15.2083 16.4583C15.55 16.8 16.1083 16.8 16.45 16.4583C16.7917 16.1167 16.7917 15.5583 16.45 15.2167L12.9167 11.6667ZM7.91665 11.6667C5.84165 11.6667 4.16665 9.99167 4.16665 7.91667C4.16665 5.84167 5.84165 4.16667 7.91665 4.16667C9.99165 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99165 11.6667 7.91665 11.6667Z\"/></symbol><symbol id=\"hn-print\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M16.3 6.44444H3.7C2.206 6.44444 1 7.63556 1 9.11111V14.4444H4.6V18H15.4V14.4444H19V9.11111C19 7.63556 17.794 6.44444 16.3 6.44444ZM13.6 16.2222H6.4V11.7778H13.6V16.2222ZM16.3 10C15.805 10 15.4 9.6 15.4 9.11111C15.4 8.62222 15.805 8.22222 16.3 8.22222C16.795 8.22222 17.2 8.62222 17.2 9.11111C17.2 9.6 16.795 10 16.3 10ZM15.4 2H4.6V5.55556H15.4V2Z\"/></symbol><symbol id=\"hn-more_vert\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M9.99998 6.66668C10.9166 6.66668 11.6666 5.91668 11.6666 5.00001C11.6666 4.08334 10.9166 3.33334 9.99998 3.33334C9.08331 3.33334 8.33331 4.08334 8.33331 5.00001C8.33331 5.91668 9.08331 6.66668 9.99998 6.66668ZM9.99998 8.33334C9.08331 8.33334 8.33331 9.08334 8.33331 10C8.33331 10.9167 9.08331 11.6667 9.99998 11.6667C10.9166 11.6667 11.6666 10.9167 11.6666 10C11.6666 9.08334 10.9166 8.33334 9.99998 8.33334ZM9.99998 13.3333C9.08331 13.3333 8.33331 14.0833 8.33331 15C8.33331 15.9167 9.08331 16.6667 9.99998 16.6667C10.9166 16.6667 11.6666 15.9167 11.6666 15C11.6666 14.0833 10.9166 13.3333 9.99998 13.3333Z\"/></symbol><symbol id=\"hn-add_circle\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M10.9 5.5H9.1V9.1H5.5V10.9H9.1V14.5H10.9V10.9H14.5V9.1H10.9V5.5ZM10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1ZM10 17.2C6.031 17.2 2.8 13.969 2.8 10C2.8 6.031 6.031 2.8 10 2.8C13.969 2.8 17.2 6.031 17.2 10C17.2 13.969 13.969 17.2 10 17.2Z\"/></symbol><symbol id=\"hn-arrow_drop_down\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M5.83334 7.91669L10 12.0834L14.1667 7.91669H5.83334Z\"/></symbol><symbol id=\"hn-keyboard_arrow_down\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M6.175 7.15833L10 10.975L13.825 7.15833L15 8.33333L10 13.3333L5 8.33333L6.175 7.15833Z\"/></symbol><symbol id=\"hn-content_copy\" viewBox=\"0 0 20 20\" fill=\"currentColor\"><path d=\"M12.9411 18.33H3.99158C3.17121 18.33 2.5 17.648 2.5 16.8145V6.20635H3.99158V16.8145H12.9411V18.33ZM15.1784 15.2991H6.97474C6.15437 15.2991 5.48316 14.6171 5.48316 13.7836V3.17544C5.48316 2.34194 6.15437 1.65999 6.97474 1.65999H15.1784C15.9988 1.65999 16.67 2.34194 16.67 3.17544V13.7836C16.67 14.6171 15.9988 15.2991 15.1784 15.2991ZM15.1784 3.17544H6.97474V13.7836H15.1784V3.17544Z\"/></symbol><symbol id=\"hn-reorder\" viewBox=\"0 0 20 20\"><g id=\"reorder\"><path id=\"Shape\" d=\"M3.33333 12.5H16.6667V10.8333H3.33333V12.5ZM3.33333 15.8333H16.6667V14.1667H3.33333V15.8333ZM3.33333 9.16667H16.6667V7.5H3.33333V9.16667ZM3.33333 4.16667V5.83333H16.6667V4.16667H3.33333Z\" fill=\"currentColor\"/></g></symbol><symbol id=\"hn-cloud_upload\" viewBox=\"0 0 16 16\"><g id=\"cloud upload\"><g id=\"Shape\"><path d=\"M12.4807 7.18316C12.0727 5.00421 10.2547 3.36842 8.07068 3.36842C6.33668 3.36842 4.83068 4.40421 4.08068 5.92C2.27468 6.12211 0.870679 7.73263 0.870679 9.68421C0.870679 11.7747 2.48468 13.4737 4.47068 13.4737H12.2707C13.9267 13.4737 15.2707 12.0589 15.2707 10.3158C15.2707 8.64842 14.0407 7.29684 12.4807 7.18316ZM9.27068 9.05263V11.5789H6.87068V9.05263H5.07068L8.07068 5.89474L11.0707 9.05263H9.27068Z\" fill=\"currentColor\"/></g></g></symbol><symbol id=\"hn-content_paste\" viewBox=\"0 0 16 16\"><g id=\"rmx-paste\"><g id=\"Vector\"><path d=\"M13.536 6.902V4.15C13.536 3.822 13.416 3.534 13.184 3.302C12.952 3.07 12.664 2.95 12.336 2.95H9.488C9.4 2.606 9.216 2.318 8.928 2.094C8.648 1.87 8.312 1.75 7.936 1.75C7.56 1.75 7.224 1.862 6.944 2.094C6.664 2.318 6.472 2.606 6.384 2.95H3.536C3.208 2.95 2.92 3.07 2.688 3.302C2.456 3.534 2.336 3.822 2.336 4.15V12.95C2.336 13.278 2.456 13.566 2.688 13.798C2.92 14.03 3.208 14.15 3.536 14.15H6.392V12.95H3.536V4.15H4.736V6.15H11.136V4.15H12.336V6.902H13.536ZM8.36 3.982C8.24 4.094 8.104 4.15 7.928 4.15C7.752 4.15 7.616 4.094 7.504 3.974C7.392 3.854 7.336 3.718 7.336 3.542C7.336 3.366 7.392 3.23 7.512 3.118C7.632 3.006 7.768 2.95 7.944 2.95C8.12 2.95 8.256 3.006 8.368 3.126C8.48 3.246 8.536 3.382 8.536 3.558C8.536 3.734 8.48 3.87 8.36 3.982Z\" fill=\"currentColor\"/><path d=\"M10.568 11.254H9.152V11.854H10.568V11.254Z\" fill=\"currentColor\"/><path d=\"M11.984 10.054H9.152V10.654H11.984V10.054Z\" fill=\"currentColor\"/><path d=\"M13.4 8.214C13.224 8.046 13.008 7.95 12.768 7.95H8.368C8.128 7.95 7.904 8.038 7.728 8.214C7.552 8.39 7.464 8.606 7.464 8.846V13.246C7.464 13.486 7.552 13.71 7.728 13.878C7.904 14.054 8.12 14.142 8.368 14.142H11.496L13.672 11.966V8.838C13.672 8.598 13.584 8.374 13.408 8.198V8.214H13.4ZM11.216 11.638V13.07H8.536V9.078H12.56V11.638H11.216Z\" fill=\"currentColor\"/></g></g></symbol><symbol id=\"hn-properties\" viewBox=\"0 0 20 20\"><g id=\"properties\"><path id=\"Vector\" d=\"M19.8376 10.8469L9.99318 1L0.148804 10.8469H1.76693L3.0763 9.5375V18.0306H7.56068V10.4712H12.4201V18.0306H16.9044V9.5375L18.2169 10.8469H19.8376Z\" fill=\"currentColor\"/></g></symbol><symbol id=\"hn-units\" viewBox=\"0 0 20 20\"><g id=\"units\" clip-path=\"url(#clip0_0_1084)\"><path id=\"Vector\" d=\"M7.05 0V10.1219H11.9219V20H20V0H7.05ZM12.4781 9C12.4781 9.5175 12.0581 9.9375 11.5406 9.9375H10.16C9.64937 9.92813 9.23812 9.5125 9.23812 9V7.60938C9.23812 7.09688 9.64875 6.68125 10.1587 6.67188H11.5631C12.0806 6.67188 12.5006 7.09188 12.5006 7.60938L12.4781 9ZM12.4781 4.35313C12.4781 4.87063 12.0581 5.29063 11.5406 5.29063H10.16C9.64937 5.28125 9.23812 4.86563 9.23812 4.35313V2.95875C9.23812 2.44625 9.64875 2.03063 10.1587 2.02125H11.5631C12.0806 2.02125 12.5006 2.44125 12.5006 2.95875L12.4781 4.35313ZM17.7219 13.6469C17.7219 14.1644 17.3019 14.5844 16.7844 14.5844H15.4037C14.8862 14.5844 14.4662 14.1644 14.4662 13.6469V12.2563C14.4662 11.7388 14.8862 11.3188 15.4037 11.3188H16.7969C17.3144 11.3188 17.7344 11.7388 17.7344 12.2563L17.7219 13.6469ZM17.7219 9C17.7219 9.5175 17.3019 9.9375 16.7844 9.9375H15.4037C14.8862 9.9375 14.4662 9.5175 14.4662 9V7.60938C14.4662 7.09188 14.8862 6.67188 15.4037 6.67188H16.7969C17.3144 6.67188 17.7344 7.09188 17.7344 7.60938L17.7219 9ZM17.7219 4.35313C17.7219 4.87063 17.3019 5.29063 16.7844 5.29063H15.4037C14.8862 5.29063 14.4662 4.87063 14.4662 4.35313V2.95875C14.4662 2.44125 14.8862 2.02125 15.4037 2.02125H16.7969C17.3144 2.02125 17.7344 2.44125 17.7344 2.95875L17.7219 4.35313ZM0 9.18437V20H12.8625V9.18437H0ZM5.41812 16.9681C5.41812 17.4462 5.03062 17.8337 4.5525 17.8337H3.24937C2.7725 17.8337 2.38687 17.4481 2.38687 16.9712V15.6619C2.38687 15.185 2.7725 14.7975 3.24937 14.7962H4.55625C5.03438 14.7981 5.42188 15.1863 5.42188 15.6656L5.41812 16.9681ZM5.41812 12.6406C5.41625 13.1175 5.03 13.5031 4.5525 13.5031H3.24937C2.7725 13.5031 2.38687 13.1175 2.38687 12.6406V11.3344C2.38687 10.8575 2.7725 10.47 3.24937 10.4688H4.55625C5.03438 10.4706 5.42188 10.8588 5.42188 11.3381L5.41812 12.6406ZM10.3125 16.9681C10.3125 17.4462 9.925 17.8337 9.44687 17.8337H8.1525C7.6775 17.8319 7.29312 17.4462 7.29312 16.9712V15.6619C7.29312 15.1862 7.6775 14.8 8.1525 14.7962H9.45938C9.9325 14.8056 10.3125 15.1906 10.3125 15.6644V16.9681ZM10.3125 12.6406C10.3106 13.1175 9.92437 13.5031 9.44687 13.5031H8.1525C7.6775 13.5012 7.29312 13.1156 7.29312 12.6406V11.3344C7.29312 10.8588 7.6775 10.4725 8.1525 10.4688H9.45938C9.9325 10.4781 10.3125 10.8631 10.3125 11.3369V12.6406Z\" fill=\"currentColor\"/></g><defs><clipPath id=\"clip0_0_1084\"><rect width=\"20\" height=\"20\" fill=\"white\"/></clipPath></defs></symbol><symbol id=\"hn-mail-outline\" viewBox=\"0 0 20 20\"><g id=\"Mail outline\"><path id=\"Shape\" d=\"M16.6667 3.33333H3.33333C2.41667 3.33333 1.675 4.08333 1.675 5L1.66667 15C1.66667 15.9167 2.41667 16.6667 3.33333 16.6667H16.6667C17.5833 16.6667 18.3333 15.9167 18.3333 15V5C18.3333 4.08333 17.5833 3.33333 16.6667 3.33333ZM16.6667 15H3.33333V6.66667L10 10.8333L16.6667 6.66667V15ZM10 9.16667L3.33333 5H16.6667L10 9.16667Z\" fill=\"currentColor\"/></g></symbol><symbol id=\"hn-call\" viewBox=\"0 0 20 20\"><g id=\"call\"><path id=\"Shape\" d=\"M5.21778 8.92445C6.49778 11.44 8.56001 13.4933 11.0756 14.7822L13.0311 12.8267C13.2711 12.5867 13.6267 12.5067 13.9378 12.6133C14.9334 12.9422 16.0089 13.12 17.1111 13.12C17.6 13.12 18 13.52 18 14.0089V17.1111C18 17.6 17.6 18 17.1111 18C8.76445 18 2 11.2356 2 2.88889C2 2.4 2.4 2 2.88889 2H6.00001C6.4889 2 6.8889 2.4 6.8889 2.88889C6.8889 4 7.06667 5.06667 7.39556 6.06223C7.49334 6.37334 7.42223 6.72001 7.17334 6.9689L5.21778 8.92445Z\" fill=\"currentColor\"/></g></symbol><symbol id=\"hn-sms-outlined\" viewBox=\"0 0 20 20\"><g id=\"sms / outlined\"><path id=\"Shape\" d=\"M16.6667 3.33332H3.33335C2.41669 3.33332 1.66669 4.08332 1.66669 4.99999V20L5.00002 16.6667H16.6667C17.5834 16.6667 18.3334 15.9167 18.3334 15V4.99999C18.3334 4.08332 17.5834 3.33332 16.6667 3.33332ZM16.6667 15H4.30835L3.33335 15.975V4.99999H16.6667V15ZM5.83335 9.16665H7.50002V10.8333H5.83335V9.16665ZM12.5 9.16665H14.1667V10.8333H12.5V9.16665ZM9.16669 9.16665H10.8334V10.8333H9.16669V9.16665Z\" fill=\"currentColor\"/></g></symbol></svg>";
  var MARKUP = "<div class=\"hn-overlay\" id=\"hnOverlay\" hidden onclick=\"if(event.target===this) closeOverlay()\">\n  <section class=\"hn\" data-rmx-component=\"Dialog Overlay\">\n    <div class=\"hn__header\">\n      <span class=\"hn__title\">History / Notes</span>\n      <span class=\"hn__header-icons\">\n        <svg class=\"hn-ico\" title=\"Help\" data-rmx-todo=\"Help is not built in this prototype\"><use href=\"#hn-help\"></use></svg>\n        <svg class=\"hn-ico\" title=\"Close\" onclick=\"closeOverlay()\"><use href=\"#hn-close\"></use></svg>\n      </span>\n    </div>\n\n    <div class=\"hn__body\">\n\n      <!-- Scoreboard for the record this history belongs to -->\n      <div class=\"hn-score\" data-rmx-component=\"Scoreboard\">\n        <div class=\"hn-score__bar\"></div>\n        <div class=\"hn-score__content\">\n          <div class=\"hn-score__lead\">\n            <span class=\"hn-score__name\" id=\"scName\"></span>\n            <span class=\"hn-score__items\" id=\"scItems\"></span>\n          </div>\n          <div class=\"hn-score__trail\" id=\"scTrail\"></div>\n        </div>\n      </div>\n\n      <!-- Filters -->\n      <div class=\"hn-filters\">\n        <div class=\"hn-field\">\n          <label for=\"hnSearch\">Search</label>\n          <div class=\"hn-input hn-search\">\n            <svg class=\"hn-ico\"><use href=\"#hn-search\"></use></svg>\n            <input id=\"hnSearch\" type=\"text\" placeholder=\"Find a history/note\" oninput=\"renderNotes()\">\n          </div>\n        </div>\n        <div class=\"hn-field\">\n          <label>Filter By Date</label>\n          <div class=\"hn-daterange\">\n            <input id=\"hnFrom\" type=\"text\" placeholder=\"From\" oninput=\"renderNotes()\" aria-label=\"From date\">\n            <span class=\"cell\"><svg class=\"hn-ico\"><use href=\"#hn-calendar_today\"></use></svg></span>\n            <input id=\"hnTo\" type=\"text\" placeholder=\"To\" oninput=\"renderNotes()\" aria-label=\"To date\">\n            <span class=\"cell\"><svg class=\"hn-ico\"><use href=\"#hn-calendar_today\"></use></svg></span>\n            <span class=\"cell hn-btn\" title=\"Date presets\" data-rmx-todo=\"Date presets are not built in this prototype\"><svg class=\"hn-ico\"><use href=\"#hn-reorder\"></use></svg></span>\n          </div>\n        </div>\n        <div class=\"hn-field\">\n          <label>Users</label>\n          <div class=\"hn-select hn-select--users\" onclick=\"event.stopPropagation();openFilterMenu(this,'user')\">\n            <span id=\"lblUser\">All Selected</span><svg class=\"hn-ico\"><use href=\"#hn-keyboard_arrow_down\"></use></svg>\n          </div>\n        </div>\n        <div class=\"hn-field\">\n          <label>History Category</label>\n          <div class=\"hn-select hn-select--cat\" onclick=\"event.stopPropagation();openFilterMenu(this,'category')\">\n            <span id=\"lblCategory\">All Selected</span><svg class=\"hn-ico\"><use href=\"#hn-keyboard_arrow_down\"></use></svg>\n          </div>\n        </div>\n        <div class=\"hn-field\">\n          <label>Type</label>\n          <div class=\"hn-select hn-select--type\" onclick=\"event.stopPropagation();openFilterMenu(this,'type')\">\n            <span id=\"lblType\">All Selected</span><svg class=\"hn-ico\"><use href=\"#hn-keyboard_arrow_down\"></use></svg>\n          </div>\n        </div>\n        <span class=\"hn-check\" onclick=\"toggleAttachOnly(this)\">\n          <span class=\"hn-chkbox\" id=\"chkAttach\"><svg class=\"hn-ico\"><use href=\"#hn-check\"></use></svg></span>\n          Only Notes with Attachments\n        </span>\n      </div>\n\n      <div class=\"hn-row2\">\n        <span class=\"hn-check\" data-rmx-todo=\"Unit Notes scoping is not built in this prototype\">\n          <span class=\"hn-chkbox\"><svg class=\"hn-ico\"><use href=\"#hn-check\"></use></svg></span>\n          <span style=\"color:var(--text-link)\">Unit Notes</span>\n        </span>\n        <span class=\"hn-row2__right\">\n          <span class=\"hn-btn-split\">\n            <button class=\"hn-btn hn-btn-primary\" onclick=\"openNote(null)\"><svg class=\"hn-ico\"><use href=\"#hn-add_circle\"></use></svg>Add</button>\n            <span class=\"caret\" title=\"More add options\" data-rmx-todo=\"The Add menu is not built in this prototype\"><svg class=\"hn-ico\"><use href=\"#hn-arrow_drop_down\"></use></svg></span>\n          </span>\n          <button class=\"hn-btn hn-btn-primary\" data-rmx-todo=\"Printing is not built in this prototype\"><svg class=\"hn-ico\"><use href=\"#hn-print\"></use></svg>Print</button>\n        </span>\n      </div>\n\n      <!-- Notes register -->\n      <div class=\"hn-register-wrap\">\n        <table class=\"hn-register\">\n          <thead>\n            <tr>\n              <th class=\"c-type\">Type</th>\n              <th class=\"c-date\">Date</th>\n              <th class=\"c-note\">Note</th>\n              <th class=\"c-cat\">Category</th>\n              <th class=\"c-user\">User</th>\n              <th class=\"c-kebab\"></th>\n            </tr>\n          </thead>\n          <tbody id=\"hnBody\"></tbody>\n        </table>\n      </div>\n\n      <div class=\"hn-count\" id=\"hnCount\"></div>\n    </div>\n  </section>\n</div>\n<!-- Note Details Dialog \u2014 3779:60444 -->\n<div class=\"hn-scrim\" id=\"hnNoteScrim\" hidden onclick=\"if(event.target===this) closeNote()\">\n  <div class=\"hn-dialog\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"ndTitle\">\n    <div class=\"hn-dialog__header\">\n      <span class=\"hn-dialog__title\" id=\"ndTitle\">Note Details</span>\n      <svg class=\"hn-ico\" title=\"Close\" onclick=\"closeNote()\"><use href=\"#hn-close\"></use></svg>\n    </div>\n    <div class=\"hn-dialog__body\">\n\n      <div class=\"nd-field\">\n        <label>History Category</label>\n        <div class=\"nd-input nd-input--select\" onclick=\"event.stopPropagation();openNdCategory(this)\">\n          <span id=\"ndCategory\"></span><svg class=\"hn-ico\"><use href=\"#hn-keyboard_arrow_down\"></use></svg>\n        </div>\n      </div>\n\n      <div class=\"nd-field\">\n        <label>Start Date and Time</label>\n        <div class=\"nd-datetime\">\n          <span class=\"f\" id=\"ndDate\"></span>\n          <span class=\"c\"><svg class=\"hn-ico\"><use href=\"#hn-calendar_today\"></use></svg></span>\n          <span class=\"f\" id=\"ndTime\"></span>\n          <span class=\"c\"><svg class=\"hn-ico\"><use href=\"#hn-schedule\"></use></svg></span>\n        </div>\n      </div>\n\n      <div class=\"nd-field nd-note\">\n        <label for=\"ndNote\">Note</label>\n        <div id=\"ndNote\" class=\"nd-note__box\" contenteditable=\"true\" role=\"textbox\"\n             aria-multiline=\"true\" aria-label=\"Note\"\n             oninput=\"onNoteInput()\" onkeydown=\"onNoteKeydown(event)\"\n             onblur=\"setTimeout(closeAtMenu,150)\"></div>\n      </div>\n\n      <div class=\"nd-field\">\n        <label>File Attachments</label>\n        <div class=\"nd-attach\">\n          <div id=\"ndFiles\"></div>\n          <div class=\"nd-drop\">\n            <a onclick=\"addFakeAttachment()\"><svg class=\"hn-ico\"><use href=\"#hn-cloud_upload\"></use></svg>Upload</a>\n            <span class=\"sep\"></span>\n            <a onclick=\"addFakeAttachment()\"><svg class=\"hn-ico\"><use href=\"#hn-content_paste\"></use></svg>Paste</a>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"nd-field\">\n        <div class=\"nd-followup off\" id=\"ndFollowup\">\n          <div>\n            <label style=\"display:block;margin-bottom:8px;color:var(--text-primary)\">Follow-up Date</label>\n            <div class=\"nd-followup__row\">\n              <span class=\"hn-chkbox\" id=\"ndFuCheck\" onclick=\"toggleFollowup()\"><svg class=\"hn-ico\"><use href=\"#hn-check\"></use></svg></span>\n              <span class=\"nd-datetime\">\n                <span class=\"f\" id=\"ndFuDate\">mm/dd/yyyy</span>\n                <span class=\"c\"><svg class=\"hn-ico\"><use href=\"#hn-calendar_today\"></use></svg></span>\n                <span class=\"f\" id=\"ndFuTime\">--:-- --</span>\n                <span class=\"c\"><svg class=\"hn-ico\"><use href=\"#hn-schedule\"></use></svg></span>\n              </span>\n            </div>\n          </div>\n          <button class=\"nd-fu-btn\" id=\"ndFuBtn\" onclick=\"completeFollowup()\">Follow-up Completed</button>\n        </div>\n      </div>\n\n      <div class=\"nd-checks\">\n        <span class=\"hn-check\" onclick=\"toggleCheck(this)\"><span class=\"hn-chkbox\"><svg class=\"hn-ico\"><use href=\"#hn-check\"></use></svg></span>Lock Information</span>\n        <span class=\"hn-check\" onclick=\"toggleCheck(this)\"><span class=\"hn-chkbox\"><svg class=\"hn-ico\"><use href=\"#hn-check\"></use></svg></span>Pin</span>\n        <span class=\"hn-check\" onclick=\"toggleCheck(this)\"><span class=\"hn-chkbox\"><svg class=\"hn-ico\"><use href=\"#hn-check\"></use></svg></span>Show on payments tab</span>\n      </div>\n\n    </div>\n    <div class=\"hn-dialog__footer\">\n      <button class=\"hn-btn hn-btn-primary\" id=\"ndSave\" onclick=\"saveNote()\" disabled>Save</button>\n      <button class=\"hn-btn hn-btn-secondary\" onclick=\"closeNote()\">Cancel</button>\n    </div>\n  </div>\n</div>\n\n<!-- floating menus -->\n<div class=\"hn-menu\" id=\"hnFilterMenu\" hidden style=\"position:fixed;\" onclick=\"event.stopPropagation()\"></div>\n<div class=\"hn-menu\" id=\"hnRowMenu\" hidden style=\"position:fixed;min-width:140px;\" onclick=\"event.stopPropagation()\"></div>\n<div class=\"hn-at-menu\" id=\"hnAtMenu\" hidden onclick=\"event.stopPropagation()\"></div>\n\n<div class=\"hn-toast\" id=\"hnToastEl\"><svg class=\"hn-ico\"><use href=\"#hn-check_circle\"></use></svg><span id=\"hnToastMsg\"></span></div>";

/* ============================================================
   DATA
   The four records My Workspace's mentions are about, each with
   its own history. Content is realistic Express data and the
   same records the rest of the prototype uses -- Riverview #204
   is the unit on "Approve carpet vendor quote", Marcia Clark is
   the tenant on "Return Marcia Clark's call", and so on, so a
   record reads the same wherever you meet it.
   ============================================================ */
var ME = 'Tony Little';
/* The same seven people the Tasks screen's Assigned To dropdown lists, so
   the two screens agree about who exists. See PROTOTYPE.md on the two
   conflicting user lists in the Tasks data. */
var USERS = [
  {initials:'AA', name:'Alan Anderson',   uname:'aanderson'},
  {initials:'AB', name:'Adam Bryan',      uname:'abryan'},
  {initials:'BC', name:'Becky Carle',     uname:'bcarle'},
  {initials:'CA', name:'Charlie Apegian', uname:'capegian'},
  {initials:'DG', name:'Danielle Gardin', uname:'dgardin'},
  {initials:'EL', name:'Emma Langhammer', uname:'elanghammer'},
  {initials:'TL', name:'Tony Little',     uname:'tlittle'}
];

var ENTITIES = {
  'issue-riverview-204': {
    kind: 'Issue',
    name: 'Issue #4821 — Carpet replacement',
    items: [
      {icon:'properties', text:'Riverview Apartments'},
      {icon:'units',      text:'Riverview #204'}
    ],
    notes: [
      {type:'Vendor Coordination', date:'09/10/25 08:42 AM', category:'Maintenance', user:'Diego Alvarez',
       note:'Carpet vendor quote received — $1,840 for unit and hallway. @Tony can you confirm the carpet vendor before I close this issue?', files:['quote_riverview_204.pdf']},
      {type:'Tenant Contact', date:'09/08/25 04:15 PM', category:'Maintenance', user:'Becky Carle',
       note:'Left voicemail for the tenant about access on Thursday morning.', files:[]},
      {type:'Inspection', date:'09/05/25 11:20 AM', category:'<Unassigned>', user:'Alan Anderson',
       note:'Walked the unit. Carpet in the living room is past wear-and-tear; padding is dry, no sign of a leak.', files:['img_4321.jpg']},
      {type:'Issue Created', date:'09/04/25 09:03 AM', category:'<Unassigned>', user:'Danielle Gardin',
       note:'Tenant reported the carpet lifting near the patio door.', files:[]}
    ]
  },
  'tenant-marcia-clark': {
    kind: 'Tenant',
    name: 'Marcia Clark',
    items: [
      {icon:'properties',   text:'Riverview Apartments'},
      {icon:'units',        text:'Riverview #118'},
      {icon:'mail-outline', text:'mclark@example.com'},
      {icon:'call',         text:'513-555-0184'},
      {icon:'sms-outlined', text:''}
    ],
    status: {label:'Current'},
    balance: '0.00',
    notes: [
      {type:'Tenant Contact', date:'09/10/25 03:40 PM', category:'Leasing', user:'Karen Hsu',
       note:'She is planning to add a roommate in the next six months and wants the process in writing before she commits. @Tony she’s adding a roommate within six months and wants the steps in writing.', files:[]},
      {type:'Tenant Contact', date:'09/10/25 02:15 PM', category:'Leasing', user:'Karen Hsu',
       note:'Called about adding her sister to the lease sometime after the new year. Walked her through it at a high level — application and screening for the new occupant, then a lease amendment, and the deposit recalculated at two occupants. She asked for it in writing.', files:[]},
      {type:'Billing', date:'09/10/25 09:12 AM', category:'Receivables', user:'Karen Hsu',
       note:'Credit issued for the duplicate charge on the August statement.', files:[]},
      {type:'Statement Dispute', date:'09/09/25 02:48 PM', category:'Receivables', user:'Karen Hsu',
       note:'Tenant called about a duplicate charge on her statement. Verified — the same $45 pet fee posted twice on 08/31.', files:['statement_aug.pdf']},
      {type:'Lease', date:'06/01/25 10:00 AM', category:'Leasing', user:'Emma Langhammer',
       note:'Renewal signed through 05/31/26 at $1,265.', files:[]},
      {type:'Web Account Update', date:'03/24/25 03:24 PM', category:'<Unassigned>', user:'Adam Bryan',
       note:'Tenant portal login reset at her request.', files:[]}
    ]
  },
  'vendor-anderson-pest': {
    kind: 'Vendor',
    name: 'Anderson Pest Control',
    items: [
      {icon:'mail-outline', text:'billing@andersonpest.example'},
      {icon:'call',         text:'513-555-2210'}
    ],
    balance: '640.00',
    notes: [
      {type:'Payment Setup', date:'09/10/25 06:30 AM', category:'Payables', user:'Anthony Park',
       note:'flagging @Tony — they want autopay set up before next visit.', files:[]},
      {type:'Service Visit', date:'08/28/25 01:15 PM', category:'Maintenance', user:'Alan Anderson',
       note:'Quarterly treatment completed at Flagstone. Invoice 8841 received.', files:['inv_8841.pdf']},
      {type:'Contract', date:'01/15/25 08:00 AM', category:'<Unassigned>', user:'Charlie Apegian',
       note:'Annual contract renewed — quarterly treatment across three properties.', files:[]}
    ]
  },
  'prospect-sally-klydon': {
    kind: 'Prospect',
    name: 'Sally Klydon',
    items: [
      {icon:'properties',   text:'Riverview Apartments'},
      {icon:'units',        text:'Riverview #212'},
      {icon:'mail-outline', text:'sklydon@example.com'},
      {icon:'call',         text:'513-555-7741'}
    ],
    notes: [
      {type:'Quote', date:'09/10/25 11:05 AM', category:'Leasing', user:'Danielle Gardin',
       note:'She wants to see the unit priced with the covered space in the rent, not as a separate line. @Tony Sally wants the quote repriced with the covered parking space included. Can you add it?', files:[]},
      {type:'Showing', date:'09/09/25 04:30 PM', category:'Leasing', user:'Danielle Gardin',
       note:'Toured #212. Liked the unit, asked twice about covered parking — she leaves for a job site before six and does not want to scrape in the winter. One garage space is open at $45.', files:[]},
      {type:'Quote', date:'09/09/25 02:10 PM', category:'Leasing', user:'Danielle Gardin',
       note:'Quoted $1,310 for #212, 12-month term, move-in 10/01. Parking not included.', files:['quote_riverview_212.pdf']},
      {type:'Inquiry', date:'09/06/25 08:45 AM', category:'Leasing', user:'Brittany Fischer',
       note:'Web inquiry — two bedroom, October move-in, no pets.', files:[]}
    ]
  },
  /* The prospect this property cannot suit: the note that matters is the one
     handing the lead somewhere that can. */
  'prospect-renee-vogel': {
    kind: 'Prospect',
    name: 'Renee Vogel',
    items: [
      {icon:'properties',   text:'Flagstone Townhomes'},
      {icon:'mail-outline', text:'rvogel@example.com'},
      {icon:'call',         text:'513-555-9063'}
    ],
    notes: [
      {type:'Lead Transfer', date:'09/10/25 09:20 AM', category:'Leasing', user:'Ali Ferryman',
       note:'Flagstone has no dog run and the nearest park is a fifteen minute drive. Brookside has the fenced run off the south lot. @Tony she really wants a dog park — nothing at Flagstone fits. Can you move the lead to Brookside?', files:[]},
      {type:'Prospect Contact', date:'09/09/25 05:40 PM', category:'Leasing', user:'Ali Ferryman',
       note:'Followed up after the tour. She was straight about it — the dog run is the deciding factor, two large dogs, and she will keep looking without one.', files:[]},
      {type:'Showing', date:'09/09/25 10:00 AM', category:'Leasing', user:'Ali Ferryman',
       note:'Toured Flagstone Lot 12. Liked the townhome and the price; her first question at the door was where the dogs go.', files:[]},
      {type:'Inquiry', date:'09/07/25 07:15 PM', category:'Leasing', user:'Brittany Fischer',
       note:'Web inquiry — three bedroom, November move-in, two dogs (60lb and 45lb).', files:[]}
    ]
  },
  'tenant-daniel-smith': {
    kind: 'Tenant',
    name: 'Daniel Smith',
    items: [
      {icon:'properties',   text:'Flagstone Townhomes'},
      {icon:'units',        text:'Flagstone 107B'},
      {icon:'mail-outline', text:'dsmith@example.com'},
      {icon:'call',         text:'513-555-0427'},
      {icon:'sms-outlined', text:''}
    ],
    status: {label:'Current'},
    balance: '0.00',
    notes: [
      {type:'Pet Request', date:'09/11/25 08:50 AM', category:'Leasing', user:'Becky Carle',
       note:'Vet records and the renter’s policy are attached. @Tony he wants to get a dog — 40lb lab mix. Pet addendum or do we need the deposit first?', files:['vaccination_record.pdf','renters_policy.pdf']},
      {type:'Tenant Contact', date:'09/10/25 04:20 PM', category:'Leasing', user:'Becky Carle',
       note:'Came into the office about adding a dog — a two year old lab mix, about 40lb, from the shelter on Vine. Told him the breed is fine and the weight is under the limit, and that we would need vet records and proof of renter’s insurance listing the dog.', files:[]},
      {type:'Lease', date:'07/01/25 10:00 AM', category:'Leasing', user:'Emma Langhammer',
       note:'Signed through 06/30/26 at $1,180. No pets on the original lease.', files:[]},
      {type:'Move In', date:'07/01/25 09:00 AM', category:'<Unassigned>', user:'Alan Anderson',
       note:'Move-in inspection completed with the tenant. No exceptions noted.', files:['moveIn_107B.pdf']}
    ]
  },
  'owner-gerald-hupp': {
    kind: 'Owner',
    name: 'Gerald Hupp',
    items: [
      {icon:'properties',   text:'Hupp Holdings — 2 properties'},
      {icon:'mail-outline', text:'ghupp@example.com'},
      {icon:'call',         text:'513-555-3318'}
    ],
    balance: '0.00',
    notes: [
      {type:'Management Agreement', date:'09/10/25 01:30 PM', category:'<Unassigned>', user:'Dave Hegemann',
       note:'He wants it ready to sign the week he closes, so rents can be collected in October. @Tony he closes on the Westbrook fourplex on the 30th and wants the management agreement started.', files:[]},
      {type:'Owner Contact', date:'09/10/25 11:45 AM', category:'<Unassigned>', user:'Dave Hegemann',
       note:'Called to say the Westbrook Ave fourplex is under contract, closing 09/30. Four units, three occupied, currently self-managed. He wants us on it from day one — same terms as his other two.', files:[]},
      {type:'Statement', date:'09/01/25 06:00 AM', category:'<Unassigned>', user:'Karen Hsu',
       note:'August owner statement sent. Distribution $4,206.18.', files:['owner_stmt_aug.pdf']},
      {type:'Management Agreement', date:'02/14/24 09:00 AM', category:'<Unassigned>', user:'Emma Langhammer',
       note:'Agreement signed for both existing properties at 8% of collected rent.', files:[]}
    ]
  }
};

/* History Category options — the list the Note Details dropdown offers.
   <Unassigned> is Express's own convention for "no category", and it is what
   the frame shows in that column. */
var CATEGORIES = ['<Unassigned>', 'Leasing', 'Maintenance', 'Payables', 'Receivables', 'General'];

var state = { entityKey:null, entity:null, notes:[], editIndex:null, onChange:null,
              filters:{user:null, category:null, type:null, attachOnly:false},
              files:[], followup:false };

/* ============================================================
   RENDER
   ============================================================ */
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
/* An @tag renders as an outlined pill carrying the person's name, with no
   "@" left showing -- orange when it is you, blue when it is anyone else.
   Emma's call, 2026-09-10, off a screenshot of the real product. */
function isMe(name){ return name === ME || name === 'Tony'; }
function chipHTML(name){
  return '<span class="hn-at ' + (isMe(name) ? 'hn-at--me' : 'hn-at--other') +
         '" contenteditable="false" data-name="' + esc(name) + '">' + esc(name) + '</span>';
}
/* Who can be tagged: the user list, plus anyone who has written a note on
   this record. Emma's call, 2026-09-10 -- "include any users who have added
   notes as users available to @ tag in a note." Karen Hsu, Diego Alvarez,
   Anthony Park and Sally Klydon all show up as note authors without being in
   the user list, and it reads oddly to get a note from someone you cannot
   reply to. Derived entries carry no username: the record gives us a name,
   not a login. */
function initialsFor(name){
  return String(name).split(/\s+/).filter(Boolean).slice(0, 2)
    .map(function(part){ return part.charAt(0).toUpperCase(); }).join('');
}
function taggableUsers(){
  /* A host screen that keeps its own list of people passes it in on the
     record (`users`), and it wins -- otherwise this file's list and the
     host's drift apart, which is the bug the Tasks page had between its two
     user lists. Note authors are added either way. */
  var base = (state.entity && state.entity.users) || USERS;
  var list = base.slice();
  (state.notes || []).forEach(function(n){
    if (!n.user) return;
    var known = list.some(function(u){ return u.name === n.user; });
    if (!known) list.push({ initials: initialsFor(n.user), name: n.user, uname: '' });
  });
  return list.sort(function(a, b){ return a.name.localeCompare(b.name); });
}
/* A note is stored as plain text with "@Name" in it, so it reads the same in
   the register, in the field and in the data. Only names we know become
   chips; a stray "@" stays text rather than posing as a person. "Tony" stays
   as a short alias for the signed-in user, since the seeded mentions use it.
   Longest first, so "@Tony Little" is not eaten by "@Tony". */
function knownNames(){
  return taggableUsers().map(function(u){ return u.name; })
    .concat(['Tony'])
    .sort(function(a,b){ return b.length - a.length; });
}
function withMentions(text){
  var out = esc(text);
  knownNames().forEach(function(n){ out = out.split('@' + esc(n)).join(chipHTML(n)); });
  return out;
}
/* The Note field is contenteditable so the chips can live inside it, the way
   the real product does it. These two turn the field into the stored text and
   back again. */
function noteFieldValue(){
  function walk(node){
    var out = '';
    [].forEach.call(node.childNodes, function(n){
      if (n.nodeType === 3) out += n.nodeValue;
      else if (n.nodeType === 1) {
        if (n.classList && n.classList.contains('hn-at')) out += '@' + n.getAttribute('data-name');
        else if (n.tagName === 'BR') out += '\n';
        else out += walk(n);
      }
    });
    return out;
  }
  return walk(document.getElementById('ndNote'));
}
function setNoteField(text){
  document.getElementById('ndNote').innerHTML = text ? withMentions(text) : '';
}

function renderScoreboard(){
  var e = state.entity;
  document.getElementById('scName').textContent = e.name;
  document.getElementById('scItems').innerHTML = e.items.map(function(it){
    return '<span class="hn-score__item"><svg><use href="#' + it.icon + '"></use></svg>' +
           (it.text ? esc(it.text) : '') + '</span>';
  }).join('');
  var trail = '';
  if (e.status) {
    trail += '<span class="hn-lozenge hn-lozenge--success" data-rmx-component="Lozenge">' +
             '<span class="hn-lozenge__dot"></span>' + esc(e.status.label) + '</span>';
  }
  if (e.balance) {
    trail += '<span class="hn-score__balance">Balance: <b>' + esc(e.balance) + '</b></span>';
  }
  document.getElementById('scTrail').innerHTML = trail;
}

/* A date is stored as it reads in the register (MM/DD/YY HH:MM AM) so the
   column needs no formatting; this parses it only for the date filter. */
function noteTime(n){
  var m = /^(\d{2})\/(\d{2})\/(\d{2})/.exec(n.date);
  if (!m) return 0;
  return new Date(2000 + (+m[3]), (+m[1]) - 1, +m[2]).getTime();
}
function parseFilterDate(v){
  var m = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec((v || '').trim());
  if (!m) return null;
  var y = +m[3]; if (y < 100) y += 2000;
  return new Date(y, (+m[1]) - 1, +m[2]).getTime();
}

function visibleNotes(){
  var q = (document.getElementById('hnSearch').value || '').toLowerCase().trim();
  var from = parseFilterDate(document.getElementById('hnFrom').value);
  var to   = parseFilterDate(document.getElementById('hnTo').value);
  var f = state.filters;
  return state.notes.map(function(n,i){ return {n:n, i:i}; }).filter(function(r){
    var n = r.n;
    if (q && (n.note + ' ' + n.type + ' ' + n.category + ' ' + n.user).toLowerCase().indexOf(q) === -1) return false;
    if (f.user && n.user !== f.user) return false;
    if (f.category && n.category !== f.category) return false;
    if (f.type && n.type !== f.type) return false;
    if (f.attachOnly && !(n.files && n.files.length)) return false;
    var t = noteTime(n);
    if (from && t < from) return false;
    if (to && t > to) return false;
    return true;
  });
}

function renderNotes(){
  var rows = visibleNotes();
  var body = document.getElementById('hnBody');
  if (!rows.length) {
    body.innerHTML = '<tr><td colspan="6" class="hn-empty">No History Notes found.</td></tr>';
  } else {
    body.innerHTML = rows.map(function(r){
      var n = r.n;
      var clip = (n.files && n.files.length)
        ? '<svg class="hn-ico hn-attach"><title>' + esc(n.files.join(', ')) + '</title><use href="#hn-attach_file"></use></svg>' : '';
      return '<tr onclick="openNote(' + r.i + ')">' +
        '<td class="c-type" title="' + esc(n.type) + '">' + esc(n.type) + '</td>' +
        '<td class="c-date">' + esc(n.date) + '</td>' +
        '<td class="c-note" title="' + esc(n.note) + '">' + clip + withMentions(n.note) + '</td>' +
        '<td class="c-cat">' + esc(n.category) + '</td>' +
        '<td class="c-user" title="' + esc(n.user) + '">' + esc(n.user) + '</td>' +
        '<td class="c-kebab"><span class="kebab" onclick="event.stopPropagation();openRowMenu(event,' + r.i + ')"><svg class="hn-ico"><use href="#hn-more_vert"></use></svg></span></td>' +
      '</tr>';
    }).join('');
  }
  document.getElementById('hnCount').textContent = rows.length + ' of ' + state.notes.length + ' items';
}

/* ---- filter dropdowns ---- */
function optionsFor(field){
  var seen = [];
  state.notes.forEach(function(n){ if (seen.indexOf(n[field]) === -1) seen.push(n[field]); });
  return seen.sort();
}
function openFilterMenu(trigger, field){
  var menu = document.getElementById('hnFilterMenu');
  var cur = state.filters[field];
  var opts = ['All Selected'].concat(optionsFor(field));
  menu.innerHTML = opts.map(function(o){
    var isOn = (o === 'All Selected') ? !cur : (cur === o);
    return '<div class="' + (isOn ? 'on' : '') + '" data-v="' + esc(o) + '">' + esc(o) + '</div>';
  }).join('');
  [].forEach.call(menu.children, function(el){
    el.addEventListener('click', function(){
      var v = el.getAttribute('data-v');
      state.filters[field] = (v === 'All Selected') ? null : v;
      document.getElementById('lbl' + field.charAt(0).toUpperCase() + field.slice(1)).textContent = v;
      menu.hidden = true;
      renderNotes();
    });
  });
  var r = trigger.getBoundingClientRect();
  menu.hidden = false;
  menu.style.minWidth = r.width + 'px';
  menu.style.left = r.left + 'px';
  menu.style.top = (r.bottom + 4) + 'px';
}
function toggleAttachOnly(el){
  var box = el.querySelector('.chkbox');
  box.classList.toggle('checked');
  state.filters.attachOnly = box.classList.contains('checked');
  renderNotes();
}
function toggleCheck(el){ el.querySelector('.chkbox').classList.toggle('checked'); }

/* ---- row kebab ---- */
function openRowMenu(e, idx){
  var menu = document.getElementById('hnRowMenu');
  menu.innerHTML = '<div data-a="edit">Edit</div><div data-a="delete">Delete</div>';
  [].forEach.call(menu.children, function(el){
    el.addEventListener('click', function(){
      menu.hidden = true;
      if (el.getAttribute('data-a') === 'edit') { openNote(idx); }
      else {
        state.notes.splice(idx, 1); renderNotes(); toast('Note deleted');
        if (state.onChange) state.onChange(state.notes);
      }
    });
  });
  var r = e.currentTarget.getBoundingClientRect();
  menu.hidden = false;
  menu.style.left = Math.max(12, r.right - 140) + 'px';
  menu.style.top = (r.bottom + 4) + 'px';
}

/* ============================================================
   NOTE DETAILS DIALOG
   openNote(null) adds; openNote(i) opens note i. Both use the
   same dialog -- there is no separate "new note" form.
   ============================================================ */
function twoDigit(n){ return (n < 10 ? '0' : '') + n; }
function nowStamp(){
  var d = new Date();
  var h = d.getHours(), ap = h < 12 ? 'AM' : 'PM';
  h = h % 12; if (!h) h = 12;
  return {
    date: twoDigit(d.getMonth() + 1) + '/' + twoDigit(d.getDate()) + '/' + String(d.getFullYear()).slice(2),
    time: twoDigit(h) + ':' + twoDigit(d.getMinutes()) + ' ' + ap
  };
}

function openNote(idx){
  state.editIndex = idx;
  var isNew = (idx === null);
  var n = isNew ? null : state.notes[idx];
  var stamp = nowStamp();
  document.getElementById('ndTitle').textContent = isNew ? 'New Note' : 'Note Details';
  document.getElementById('ndCategory').textContent = n ? n.category : '<Unassigned>';
  document.getElementById('ndDate').textContent = n ? n.date.split(' ')[0] : stamp.date;
  document.getElementById('ndTime').textContent = n ? n.date.split(' ').slice(1).join(' ') : stamp.time;
  setNoteField(n ? n.note : '');
  updateSaveState();
  state.files = n ? (n.files || []).slice() : [];
  renderFiles();
  state.followup = false;
  document.getElementById('ndFollowup').classList.add('off');
  document.getElementById('ndFuCheck').classList.remove('checked');
  document.getElementById('ndFuDate').textContent = 'mm/dd/yyyy';
  document.getElementById('ndFuTime').textContent = '--:-- --';
  [].forEach.call(document.querySelectorAll('.nd-checks .chkbox'), function(b){ b.classList.remove('checked'); });
  document.getElementById('hnNoteScrim').hidden = false;
  document.getElementById('ndNote').focus();
}
function closeNote(){
  closeAtMenu();
  document.getElementById('hnNoteScrim').hidden = true;
}
function renderFiles(){
  document.getElementById('ndFiles').innerHTML = state.files.map(function(f, i){
    return '<div class="nd-file"><a>' + esc(f) + '</a><span class="icons">' +
      '<svg class="hn-ico" title="Copy" data-rmx-todo="Copying an attachment is not built in this prototype"><use href="#hn-content_copy"></use></svg>' +
      '<svg class="hn-ico" title="Remove" onclick="removeFile(' + i + ')"><use href="#hn-close"></use></svg>' +
      '</span></div>';
  }).join('');
}
function removeFile(i){ state.files.splice(i, 1); renderFiles(); }
/* There is no real file picker in a prototype, so Upload and Paste both add
   the frame's own example attachment rather than doing nothing. */
function addFakeAttachment(){
  state.files.push('img_4321.jpg');
  renderFiles();
}
function openNdCategory(trigger){
  var menu = document.getElementById('hnFilterMenu');
  menu.innerHTML = CATEGORIES.map(function(c){ return '<div data-v="' + esc(c) + '">' + esc(c) + '</div>'; }).join('');
  [].forEach.call(menu.children, function(el){
    el.addEventListener('click', function(){
      document.getElementById('ndCategory').textContent = el.getAttribute('data-v');
      menu.hidden = true;
    });
  });
  var r = trigger.getBoundingClientRect();
  menu.hidden = false;
  menu.style.minWidth = r.width + 'px';
  menu.style.left = r.left + 'px';
  menu.style.top = (r.bottom + 4) + 'px';
}
function toggleFollowup(){
  state.followup = !state.followup;
  var box = document.getElementById('ndFuCheck');
  var card = document.getElementById('ndFollowup');
  box.classList.toggle('checked', state.followup);
  card.classList.toggle('off', !state.followup);
  if (state.followup) {
    var s = nowStamp();
    document.getElementById('ndFuDate').textContent = s.date;
    document.getElementById('ndFuTime').textContent = s.time;
  } else {
    document.getElementById('ndFuDate').textContent = 'mm/dd/yyyy';
    document.getElementById('ndFuTime').textContent = '--:-- --';
  }
}
function completeFollowup(){
  if (!state.followup) return;   // disabled until a follow-up is set, as drawn
  toast('Follow-up completed');
}
function saveNote(){
  var text = noteFieldValue().trim();
  if (!text) return;   // Save is disabled until there is something to save
  var data = {
    type: state.editIndex === null ? 'Note' : state.notes[state.editIndex].type,
    date: document.getElementById('ndDate').textContent + ' ' + document.getElementById('ndTime').textContent,
    category: document.getElementById('ndCategory').textContent,
    user: state.editIndex === null ? ME : state.notes[state.editIndex].user,
    note: text,
    files: state.files.slice()
  };
  if (state.editIndex === null) { state.notes.unshift(data); toast('Note added'); }
  else { state.notes[state.editIndex] = data; toast('Note saved'); }
  if (state.onChange) state.onChange(state.notes);
  closeNote();
  renderNotes();
}

/* ============================================================
   @ TAGGING inside the Note field — 3779:60444
   Typing "@" opens the user list; typing filters it; Enter or a
   click inserts the name. Arrow keys move through it, Escape
   closes it. The inserted "@Name" is what renders as a chip in
   the register, so tagging here and the mentions on My Workspace
   are the same thing.
   ============================================================ */
var atState = { open:false, token:null, sel:0, matches:[] };
function closeAtMenu(){
  atState.open = false;
  document.getElementById('hnAtMenu').hidden = true;
}
/* The token the caret sits in, as {node, at, query} -- or null. Only an "@"
   that starts a word counts, so an email address is not a tag. */
function atToken(){
  var sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  var node = sel.focusNode;
  if (!node || node.nodeType !== 3) return null;
  if (!document.getElementById('ndNote').contains(node)) return null;
  var upto = node.nodeValue.slice(0, sel.focusOffset);
  var at = upto.lastIndexOf('@');
  if (at === -1) return null;
  if (at > 0 && !/\s/.test(upto.charAt(at - 1))) return null;
  var q = upto.slice(at + 1);
  if (/[\s]/.test(q)) return null;
  return { node: node, at: at, query: q, end: sel.focusOffset };
}
function onNoteInput(){
  updateSaveState();
  var tok = atToken();
  if (!tok) { closeAtMenu(); return; }
  var q = tok.query.toLowerCase();
  if (q.length > 24) { closeAtMenu(); return; }
  atState.matches = taggableUsers().filter(function(u){
    return !q || u.name.toLowerCase().indexOf(q) === 0 || u.uname.indexOf(q) === 0
              || u.name.toLowerCase().split(' ').some(function(p){ return p.indexOf(q) === 0; });
  });
  if (!atState.matches.length) { closeAtMenu(); return; }
  atState.open = true; atState.token = tok; atState.sel = 0;
  renderAtMenu();
}
function updateSaveState(){
  var btn = document.getElementById('ndSave');
  if (btn) btn.disabled = noteFieldValue().trim().length === 0;
}
function renderAtMenu(){
  var menu = document.getElementById('hnAtMenu');
  menu.innerHTML = atState.matches.map(function(u, i){
    return '<div class="' + (i === atState.sel ? 'sel' : '') + '" data-i="' + i + '">' +
      '<span class="av">' + esc(u.initials) + '</span><span>' + esc(u.name) + '</span>' +
      '<span class="un">' + esc(u.uname) + '</span></div>';
  }).join('');
  [].forEach.call(menu.children, function(el){
    el.addEventListener('mousedown', function(ev){ ev.preventDefault(); pickAt(+el.getAttribute('data-i')); });
  });
  var ta = document.getElementById('ndNote');
  var r = ta.getBoundingClientRect();
  menu.hidden = false;
  menu.style.position = 'fixed';
  menu.style.left = r.left + 'px';
  menu.style.top = Math.min(r.bottom + 4, window.innerHeight - menu.offsetHeight - 12) + 'px';
}
function pickAt(i){
  var u = atState.matches[i];
  var tok = atState.token;
  if (!u || !tok) return;
  /* Replace the typed "@quer" with a chip plus a trailing space, then put the
     caret after it so typing carries straight on. */
  var node = tok.node;
  var rest = node.nodeValue.slice(tok.end);
  node.nodeValue = node.nodeValue.slice(0, tok.at);
  var chip = document.createElement('span');
  chip.className = 'hn-at ' + (isMe(u.name) ? 'hn-at--me' : 'hn-at--other');
  chip.setAttribute('contenteditable', 'false');
  chip.setAttribute('data-name', u.name);
  chip.textContent = u.name;
  var tail = document.createTextNode('\u00a0' + rest);
  node.parentNode.insertBefore(chip, node.nextSibling);
  chip.parentNode.insertBefore(tail, chip.nextSibling);
  var sel = window.getSelection();
  var r = document.createRange();
  r.setStart(tail, 1); r.collapse(true);
  sel.removeAllRanges(); sel.addRange(r);
  closeAtMenu();
  document.getElementById('ndNote').focus();
  updateSaveState();
}
function onNoteKeydown(e){
  if (!atState.open) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); atState.sel = (atState.sel + 1) % atState.matches.length; renderAtMenu(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); atState.sel = (atState.sel - 1 + atState.matches.length) % atState.matches.length; renderAtMenu(); }
  else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); pickAt(atState.sel); }
  else if (e.key === 'Escape') { e.preventDefault(); closeAtMenu(); }
}

function toast(msg){
  var t = document.getElementById('hnToastEl');
  document.getElementById('hnToastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

  /* ---- injection, open, close ---- */
  var injected = false;
  function inject() {
    if (injected) return;
    var wrap = document.createElement('div');
    wrap.innerHTML = SPRITE + MARKUP;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
    injected = true;

    document.addEventListener('click', function (e) {
      ['hnFilterMenu', 'hnRowMenu'].forEach(function (id) {
        var m = document.getElementById(id);
        if (m && !m.hidden && !m.contains(e.target)) m.hidden = true;
      });
      var at = document.getElementById('hnAtMenu');
      if (at && !at.hidden && !at.contains(e.target) && e.target.id !== 'ndNote') closeAtMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var note = document.getElementById('hnNoteScrim');
      if (note && !note.hidden) { closeNote(); return; }
      if (!document.getElementById('hnOverlay').hidden) closeOverlay();
    });
  }

  /* `key` may be one of this file's own records, or a record object handed in
     by the host screen -- a task, say, which the Tasks page opens history for.
     `opts.onChange(notes)` reports every add/edit/delete back, so a host that
     owns the record can persist it; `opts.addNote` opens the Note dialog
     straight away, for an "Add Note" affordance that should land there, and
     `opts.noteOnly` opens *just* that dialog -- no register behind it -- for
     an Add Note that means "write one", not "go and look at them all".
     Emma's call, 2026-09-11. */
  function open(key, opts) {
    inject();
    opts = opts || {};
    var record = (key && typeof key === 'object') ? key : (ENTITIES[key] || ENTITIES['tenant-marcia-clark']);
    state.onChange = opts.onChange || null;
    state.entityKey = (key && typeof key === 'object') ? (key.key || 'record') : key;
    state.entity = record;
    /* A fresh copy every time it opens: the prototype has no server to
       persist an edit to, so a half-finished one should not survive. */
    state.notes = JSON.parse(JSON.stringify(state.entity.notes));
    state.filters = { user: null, category: null, type: null, attachOnly: false };
    ['lblUser', 'lblCategory', 'lblType'].forEach(function (id) {
      document.getElementById(id).textContent = 'All Selected';
    });
    ['hnSearch', 'hnFrom', 'hnTo'].forEach(function (id) { document.getElementById(id).value = ''; });
    document.getElementById('chkAttach').classList.remove('checked');
    renderScoreboard();
    renderNotes();
    if (!opts.noteOnly) document.getElementById('hnOverlay').hidden = false;
    if (opts.addNote || opts.noteOnly) openNote(null);
  }
  function closeOverlay() {
    var el = document.getElementById('hnOverlay');
    if (el) el.hidden = true;
    var note = document.getElementById('hnNoteScrim');
    if (note) note.hidden = true;
  }

  window.RMXHistory = { open: open, close: closeOverlay };
  /* The injected markup carries inline handlers, so the handlers it names
     have to be reachable from the page. */
  window.closeOverlay = closeOverlay;
  window.openNote = openNote;           window.closeNote = closeNote;
  window.saveNote = saveNote;           window.renderNotes = renderNotes;
  window.openFilterMenu = openFilterMenu; window.toggleAttachOnly = toggleAttachOnly;
  window.toggleCheck = toggleCheck;     window.openRowMenu = openRowMenu;
  window.removeFile = removeFile;       window.addFakeAttachment = addFakeAttachment;
  window.openNdCategory = openNdCategory; window.toggleFollowup = toggleFollowup;
  window.completeFollowup = completeFollowup;
  window.onNoteInput = onNoteInput;     window.onNoteKeydown = onNoteKeydown;
  window.closeAtMenu = closeAtMenu;     window.pickAt = pickAt;
})();
