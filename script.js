// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ------------------------------
// Helper functions
// ------------------------------

// Load cart from sessionStorage
function loadCart() {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ------------------------------
// Rendering Products
// ------------------------------

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// ------------------------------
// Rendering Cart
// ------------------------------

function renderCart() {
  const cart = loadCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ------------------------------
// Add item to cart
// ------------------------------

function addToCart(productId) {
  const cart = loadCart();
  const product = products.find((p) => p.id === productId);

  cart.push(product);
  saveCart(cart);
  renderCart();
}

// ------------------------------
// Clear cart
// ------------------------------

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Button event
clearCartBtn.addEventListener("click", clearCart);

// ------------------------------
// INITIAL RENDER
// ------------------------------

renderProducts();
renderCart();