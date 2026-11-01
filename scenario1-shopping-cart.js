// Scenario 1: Shopping Cart Checkout

const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 3 },
  { id: 2, name: "Mouse", price: 25, stock: 10 },
  { id: 3, name: "Headset", price: 100, stock: 5 }
];

let cart = [];

// Add a product to the cart
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return "Product not found";
  if (quantity <= 0) return "Quantity must be greater than 0";

  const cartItem = cart.find((item) => item.productId === productId);
  const newQuantity = (cartItem ? cartItem.quantity : 0) + quantity;

  // Prevent quantity greater than stock
  if (newQuantity > product.stock) {
    return `Not enough stock. Only ${product.stock} available`;
  }

  if (cartItem) {
    // Product already in cart -> increase quantity
    cartItem.quantity = newQuantity;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  }
  return cart;
}

// Remove a product from the cart
function removeFromCart(productId) {
  const exists = cart.some((item) => item.productId === productId);
  if (!exists) return "Product is not in the cart";
  cart = cart.filter((item) => item.productId !== productId);
  return cart;
}

// Calculate subtotal
function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// 10% discount if subtotal is above 1000
function calculateDiscount(subtotal) {
  return subtotal > 1000 ? subtotal * 0.1 : 0;
}

// 11% tax after discount
function calculateTax(amountAfterDiscount) {
  return amountAfterDiscount * 0.11;
}

// Checkout summary
function getCheckoutSummary() {
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount(subtotal);
  const afterDiscount = subtotal - discount;
  const tax = calculateTax(afterDiscount);
  const total = afterDiscount + tax;

  return {
    items: cart,
    subtotal,
    discount,
    tax,
    total
  };
}

// ---------- Tests ----------
/*console.log(addToCart(1, 1));
console.log(addToCart(2, 2));
console.log(addToCart(1, 1)); */  // increases Laptop quantity to 2
console.log(addToCart(1, 5));   // too much -> error
console.log(addToCart(99));     // not found
console.log(removeFromCart(2));
console.log(getCheckoutSummary());
