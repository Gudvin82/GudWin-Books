(() => {
  const splash = document.getElementById('splash');
  if (!splash) return;
  setTimeout(() => splash.classList.add('hidden'), 2500);
})();
