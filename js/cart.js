document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded");
    
    // Function to update the cart count
    const updateCartCount = () => {
        console.log("Updating Cart Count");
        // Get the existing cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Get the cart item count element
        let cartItemCount = document.querySelector('.cart-item-count');

        // Update the cart item count with the number of items in the cart
        cartItemCount.textContent = cartItems.length;
    };

    // Function to add product to cart
    const addToCart = (productName, productImage) => {
        console.log("Adding to Cart:", productName);
        // Get the existing cart items from local storage or initialize as an empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new product to the cart items array
        cartItems.push({ name: productName, image: productImage });

        // Store the updated cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart count
        updateCartCount();
    };

    // Add event listeners for Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    console.log("Add to Cart Buttons:", addToCartButtons);
    addToCartButtons.forEach(button => {
        console.log("Adding Event Listener to Button:", button);
        button.addEventListener('click', () => {
            console.log("Button Clicked");
            // Get the product name and image associated with the button's parent product card
            let productCard = button.closest('.product-card');
            let productName = productCard.querySelector('.product-price').textContent;
            let productImage = productCard.querySelector('.product-img').src;

            // Add the product to cart
            addToCart(productName, productImage);
        });
    });

    // Update the cart count initially when the page loads
    updateCartCount();
});
