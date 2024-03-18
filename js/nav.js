//navbar

const navbar = document.querySelector('.navbar')

window.addEventListener('scroll',() => {
    if(scrollY >= 180){
        navbar.classList.add('bg');
    }else{
        navbar.classList.remove('bg');
    }
    console.log(scrollY);
})

// const createNavbar = () => {
//     let navbar = document.querySelector('.navbar');

//     navbar.innerHTML += `
//     <ul class="links-container">
//             <li class="link-item"><a href="#" class="link active" >Home</a></li>
//             <li class="link-item"><a href="product.html" class="link">Product</a></li>
//             <li class="link-item">
//                 <div class="dropdown">
//                     <button class="dropbtn">Categories</button>
//                     <div class="dropdown-content">
//                         <a href="search.html">Furniture</a>
//                         <a href="electronics.html">Electronics</a>
//                         <a href="cosmetics.html">Cosmetics</a>
//                         <!-- Add more categories as needed -->
//                     </div>
//                 </div>
//             </li>
//             <li class="link-item"><a href="#" class="link"></a></li>
//         </ul>

//         <div class="user-interaction">
//             <div class="cart">
//                 <img src="image/cart.png" class="cart-icon" alt="">
//                 <span class="cart-item-count">00</span>
//             </div>
//             <div class="user">
//                 <img src="image/user.png" class="user-icon" alt="">
//                 <div class="user-icon-popup">
//                     <p>login to your account</p>
//                     <a>login</a>
//                 </div>
//             </div>
//         </div>
//     `
// }

// createNavbar();


//user icon popup

let userIcon = document.querySelector('.user-icon');
let userPopupIcon = document.querySelector('.user-icon-popup');

userIcon.addEventListener('click',()=> userPopupIcon.classList.toggle('active'))

// Select the elements
let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');

// Fetch user details from the API
fetch("https://firestore.googleapis.com/v1/projects/onlinestore-229ef/databases/(default)/documents/Customer")
    .then(response => response.json())
    .then(data => {
        // Check if user details exist
        if (data.documents && data.documents.length > 0) {
            // Assuming the first document contains the user details
            const userDetails = data.documents[0].fields;

            // Extract the username from the user details
            let username = userDetails.name ? userDetails.name.stringValue : "Unknown";

            // Update the text and action button
            text.innerHTML = `Log in as, ${userDetails.name.stringValue}`;
            actionBtn.innerHTML = 'Logout';
            actionBtn.addEventListener('click', () => logout());
        } else {
            // User details not found, show default text and action
            text.innerHTML = 'Login to your account';
            actionBtn.innerHTML = 'Login';
            actionBtn.addEventListener('click', () => location.href='/index.html');
        }
    })
    .catch(error => console.error("Error fetching user details:", error));

    const logout = () => {
        // Prepare the request data
        const requestData = {
            fields: {
                "loggedIn": { booleanValue: false } // Assuming there's a field named "loggedIn" in the database
            }
        };
    
        // Send request to update user data
        fetch("https://firestore.googleapis.com/v1/projects/onlinestore-229ef/databases/(default)/documents/Customer", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (response.ok) {
                // Data updated successfully
                console.log('User logged out successfully');
            } else {
                throw new Error('Failed to logout');
            }
        })
        .catch(error => console.error('Error logging out:', error))
        .finally(() => {
            // Clear any user data stored in sessionStorage
            sessionStorage.clear();
            // Reload the page or redirect to the homepage
            location.reload(); // or location.href = '/index.html';
        });
    };
    
