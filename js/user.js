$(document).ready(function() {
    // Fetch user data from the API
    fetch("https://firestore.googleapis.com/v1/projects/onlinestore-229ef/databases/(default)/documents/Customer")
        .then(response => response.json())
        .then(data => {
            if (data.documents && data.documents.length > 0) {
                // Assuming the first document contains the user details
                const userDetails = data.documents[0].fields;
                displayUserDetails(userDetails); // Call function to display user details
            } else {
                displayErrorMessage('No user details found.'); // Show error message if no user details found
            }
        })
        .catch(error => {
            displayErrorMessage('Error fetching user details: ' + error); // Show error message if fetching fails
        });
});

// Function to display user details
function displayUserDetails(userDetails) {
    // Construct HTML to display user details
    const userDetailsHTML = `
        <h2>User Details</h2>
        <p><strong>Name:</strong> ${userDetails.name ? userDetails.name.stringValue : 'N/A'}</p>
        <p><strong>Email:</strong> ${userDetails.email ? userDetails.email.stringValue : 'N/A'}</p>
        <p><strong>PhoneNo:</strong> ${userDetails.phoneNo ? userDetails.phoneNo.integerValue : 'N/A'}</p>
        <p><strong>Address:</strong> ${userDetails.address ? userDetails.address.stringValue : 'N/A'}</p>
    `;
    // Append user details to the container
    $('#user-details-container').html(userDetailsHTML);
}

// Function to display error message
function displayErrorMessage(message) {
    $('#user-details-container').html(`<p>${message}</p>`);
}
