/* main.js - shared behavior */
(function setActiveNav(){
  const navLinks = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split("/").pop() || 'index.html';
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    if(href === current || (href === 'index.html' && current === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();
document.addEventListener('submit', function(e){
  const form = e.target;
  if(form && form.classList && form.classList.contains('search-form')){
    e.preventDefault();
    const q = form.querySelector('input[name="q"]').value.trim();
    if(q) alert('Búsqueda local: "'+q+'"\n(Implementar búsqueda real según contenido)');
  }
});
