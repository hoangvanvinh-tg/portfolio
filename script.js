const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('portfolio-theme');
const slider = document.getElementById('heroSlider');
const slides = Array.from(document.querySelectorAll('.slide'));
let activeIndex = 0;
let sliderTimer = null;

function setTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light';
  } else {
    root.removeAttribute('data-theme');
    themeToggle.textContent = 'Dark';
  }
  localStorage.setItem('portfolio-theme', theme);
}

function toggleTheme() {
  const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
  activeIndex = index;
}

function nextSlide() {
  const nextIndex = (activeIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function startAutoSlide() {
  sliderTimer = setInterval(nextSlide, 5500);
}

function stopAutoSlide() {
  clearInterval(sliderTimer);
}

if (storedTheme) {
  setTheme(storedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);

slider.addEventListener('mouseover', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

slider.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'next') nextSlide();
    if (action === 'prev') prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });
});

startAutoSlide();
