const cartCount = document.querySelector('#cart-count');
const wishCount = document.querySelector('#wish-count');
const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
const addToWishButtons = document.querySelectorAll('[data-wishlist]');
const newsletterForm = document.querySelector('#newsletter-form');

const storage = {
  cart: JSON.parse(localStorage.getItem('mqCart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('mqWishlist') || '[]'),
};

function updateCounters() {
  if (cartCount) cartCount.textContent = storage.cart.length;
  if (wishCount) wishCount.textContent = storage.wishlist.length;
}

function saveState() {
  localStorage.setItem('mqCart', JSON.stringify(storage.cart));
  localStorage.setItem('mqWishlist', JSON.stringify(storage.wishlist));
}

function renderWishlist() {
  const wishlistContainer = document.querySelector('#wishlist-items');
  if (!wishlistContainer) return;
  wishlistContainer.innerHTML = '';
  if (!storage.wishlist.length) {
    wishlistContainer.innerHTML = '<div class="card" style="padding: 2rem; color: var(--muted);">Your MQ wishlist is empty. Browse the collection and save pieces to revisit them later.</div>';
    return;
  }
  storage.wishlist.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.padding = '1.75rem';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
        <div>
          <strong>${item.name}</strong>
          <p style="margin:0.5rem 0 0; color: var(--muted);">${item.price}</p>
        </div>
        <a class="btn-secondary" href="product.html">View Product</a>
      </div>
    `;
    wishlistContainer.appendChild(card);
  });
}

function addItemToCart(item) {
  storage.cart.push(item);
  saveState();
  updateCounters();
  alert(`${item.name} has been added to your cart.`);
}

function toggleWishlist(item) {
  const index = storage.wishlist.findIndex(product => product.id === item.id);
  if (index === -1) {
    storage.wishlist.push(item);
    alert(`${item.name} has been added to your wishlist.`);
  } else {
    storage.wishlist.splice(index, 1);
    alert(`${item.name} has been removed from your wishlist.`);
  }
  saveState();
  updateCounters();
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = {
      id: button.dataset.productId || 'mq-heritage-01',
      name: button.dataset.productName || 'MQ Heritage Edition',
      price: button.dataset.productPrice || '$16,800',
      quantity: Number(button.dataset.quantity || 1),
      variant: button.dataset.variant || 'Classic Black',
    };
    addItemToCart(item);
  });
});

addToWishButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = {
      id: button.dataset.productId || 'mq-heritage-01',
      name: button.dataset.productName || 'MQ Heritage Edition',
      price: button.dataset.productPrice || '$16,800',
    };
    toggleWishlist(item);
  });
});

if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[name="email"]').value.trim();
    if (!email || !email.includes('@')) {
      alert('Enter a valid email address to join the MQ Circle.');
      return;
    }
    alert(`Thank you, ${email}! You are now part of the MQ Circle.`);
    newsletterForm.reset();
  });
}

updateCounters();
renderWishlist();

const accordionButtons = document.querySelectorAll('[data-accordion]');
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.accordion);
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    panel.style.maxHeight = !expanded ? `${panel.scrollHeight}px` : '0';
  });
});
