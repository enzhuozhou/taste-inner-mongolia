document.documentElement.classList.add('js');
// Mobile navigation and accessible category filtering.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? 'Close ×' : 'Menu ☰';
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a') && window.matchMedia('(max-width: 800px)').matches) {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu ☰';
    }
  });
}
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const foodCards = [...document.querySelectorAll('[data-category]')];
const filterStatus = document.querySelector('#food-count');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  foodCards.forEach(card => {
    const show = category === 'all' || card.dataset.category === category;
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (filterStatus) filterStatus.textContent = `Showing ${visible} ${visible === 1 ? 'item' : 'items'}.`;
}));

// Escape closes the mobile menu and returns focus to its button.
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation?.classList.contains("open")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu ☰";
    menuButton.focus();
  }
});
