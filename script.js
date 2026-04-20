// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Navbar scroll state =====
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// ===== Active section highlight =====
const sectionIds = ['home','about','skills','experience','projects','education','contact'];
const linkMap = {};
document.querySelectorAll('.nav-links a').forEach(a => {
  linkMap[a.dataset.link] = a;
});
const setActive = () => {
  const y = window.scrollY + 120;
  let current = sectionIds[0];
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  }
  Object.entries(linkMap).forEach(([id, a]) => a.classList.toggle('active', id === current));
};
setActive();
window.addEventListener('scroll', setActive, { passive: true });

// ===== Scroll reveal =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
