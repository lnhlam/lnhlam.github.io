const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
  const path = link.getAttribute('href');
  if (window.location.pathname === path) {
    link.classList.add('active');
  }
});