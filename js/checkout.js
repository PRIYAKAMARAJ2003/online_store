document.addEventListener("DOMContentLoaded", function() {
    // Function to retrieve cart items from local storage
    const getCartItems = () => {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    };

    // Function to populate product list with cart items
    const populateProductList = () => {
        const productList = document.querySelector('.product-list');
        const cartItems = getCartItems();

        productList.innerHTML = ''; // Clear existing items

        cartItems.forEach(item => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            
            const image = document.createElement('img');
            image.src = item.image;
            image.alt = 'Product Image';
            productItem.appendChild(image);

            const productDetails = document.createElement('div');
            productDetails.classList.add('product-details');

            const productName = document.createElement('h3');
            productName.textContent = item.name;
            productDetails.appendChild(productName);

            const price = document.createElement('p');
            price.textContent = 'Price: $XX.XX'; // Replace with actual price
            productDetails.appendChild(price);

            const quantity = document.createElement('p');
            quantity.textContent = 'Quantity: 1'; // Replace with actual quantity
            productDetails.appendChild(quantity);

            productItem.appendChild(productDetails);

            productList.appendChild(productItem);
        });
    };

    // Function to calculate and display total order amount
    const calculateOrderTotal = () => {
        const orderTotal = document.querySelector('.order-total');
        const cartItems = getCartItems();
        let total = 0;

        cartItems.forEach(item => {
            // Calculate total price based on quantity and item price
            // Example: total += item.quantity * item.price;
        });

        orderTotal.innerHTML = ''; // Clear existing content

        const totalParagraph = document.createElement('p');
        totalParagraph.textContent = `Total: $${total.toFixed(2)}`;
        orderTotal.appendChild(totalParagraph);
    };

    // Event listener for checkout button
    const checkoutButton = document.querySelector('.checkout-button');
    checkoutButton.addEventListener('click', () => {
        // Handle checkout logic here
        // Redirect to payment page or show payment modal, etc.
    });

    // Initial population of product list and order total
    populateProductList();
    calculateOrderTotal();
});
