// Shop functionality
let cart = JSON.parse(localStorage.getItem('ecobean-cart')) || [];

// Product data
const products = [
    {
        id: 1,
        name: "Organic Dark Roast",
        price: 269.99,
        image: "images/image slide 1.jpg",
        description: "Rich, bold flavor with notes of chocolate and caramel.",
        roast: "dark",
        category: "signature"
    },
    {
        id: 2,
        name: "Medium Roast Single Origin",
        price: 305.99,
        image: "images/medium origin coffee.jpg",
        description: "Smooth, balanced flavor with hints of fruit and nuts.",
        roast: "medium",
        category: "single-origin"
    },
    {
        id: 3,
        name: "Light Roast Specialty",
        price: 341.99,
        image: "images/Light Roast Specialty.jpg",
        description: "Bright, vibrant flavor with floral and citrus notes.",
        roast: "light",
        category: "specialty"
    },
    {
        id: 4,
        name: "Ethiopian Yirgacheffe",
        price: 323.99,
        image: "images/single origin.jpg",
        description: "Delicate, tea-like body with floral and citrus notes.",
        roast: "light",
        category: "single-origin"
    },
    {
        id: 5,
        name: "Colombian Supremo",
        price: 287.99,
        image: "images/signature blends.jpg",
        description: "Sweet caramel notes with a hint of walnut and bright acidity.",
        roast: "medium",
        category: "signature"
    },
    {
        id: 6,
        name: "Costa Rican Tarrazu",
        price: 305.99,
        image: "images/Light Roast Specialty.jpg",
        description: "Bright acidity with notes of honey, citrus, and chocolate.",
        roast: "medium",
        category: "single-origin"
    },
    {
        id: 7,
        name: "Panama Geisha",
        price: 449.99,
        image: "images/signature blend 2.jpg",
        description: "Exceptional floral aroma with jasmine, bergamot, and peach notes.",
        roast: "light",
        category: "specialty"
    },
    {
        id: 8,
        name: "Jamaica Blue Mountain",
        price: 539.99,
        image: "images/prefume coffee.jpg",
        description: "Smooth, clean taste with no bitterness and mild, sweet flavor.",
        roast: "medium",
        category: "specialty"
    },
    {
        id: 9,
        name: "Hawaiian Kona",
        price: 485.99,
        image: "images/medium origin coffee.jpg",
        description: "Rich aroma with notes of honey, fruit, and a hint of nut.",
        roast: "medium",
        category: "specialty"
    }
];

// Initialize shop
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartUI();
});

// Display products
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'shop-product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="shop-product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">R${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts() {
    const roastFilter = document.getElementById('roast-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filteredProducts = products.filter(product => {
        // Roast filter
        if (roastFilter !== 'all' && product.roast !== roastFilter) {
            return false;
        }

        // Price filter
        if (priceFilter !== 'all') {
            const price = product.price;
            if (priceFilter === '0-300' && price > 300) return false;
            if (priceFilter === '300-400' && (price <= 300 || price > 400)) return false;
            if (priceFilter === '400+' && price <= 400) return false;
        }

        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm)) {
            return false;
        }

        return true;
    });

    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showAddedToCartMessage(product.name);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('ecobean-cart', JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">R${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
}

// Show added to cart message
function showAddedToCartMessage(productName) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c5530;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `${productName} added to cart!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Thank you for your order!\n\nItems: ${itemCount}\nTotal: R${total.toFixed(2)}\n\nYou will be redirected to payment processing.`);
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);