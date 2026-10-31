/* Karjera: darbo pasiūlymų filtras pagal šalį (WordPress'e: Post Grid su taksonomijos filtru arba kategorijų nuorodos) */
(function () {
  const filter = document.querySelector('[data-job-filter]'), list = document.querySelector('[data-job-list]'), empty = document.querySelector('[data-job-empty]');
  if (!filter || !list) return;
  filter.addEventListener('change', () => {
    const v = (filter.querySelector('input:checked') || {}).value || 'visi'; let n = 0;
    list.querySelectorAll('.job').forEach(j => { const show = v === 'visi' || j.dataset.salis === v; j.hidden = !show; if (show) n++; });
    if (empty) empty.hidden = n > 0;
  });
})();
