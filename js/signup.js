$(document).ready(function() {
    $('#signup-form').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form data
      var name = $('#name').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var mobile = $('#phone_no').val();
      var address = $('#address').val();
  
       // Check if any field is empty
    //    if (!name || !email || !password || !mobile || !address) {
    //     $('#message').text('Please fill in all fields.').show();
    //     return; // Stop further execution
    // }

      // Check if email is for admin or customer
      var isAdmin = email.endsWith('@psiog.com');
  
      // Create JSON object for Firestore
      var userData = {
        fields: {
          "name": {stringValue: name},
          "email": {stringValue: email},
          "password": {stringValue: password},
          "mobile": {stringValue: mobile},
          "address":{stringValue: address},
        //   "Creditlimit": {integerValue: isAdmin ? 0 : null} // Set default Creditlimit only for customers
        }
      };
  
      // Determine Firestore collection URL
      var collectionUrl = isAdmin ? "https://firestore.googleapis.com/v1/projects/onlinestore-229ef/databases/(default)/documents/Admin" : "https://firestore.googleapis.com/v1/projects/onlinestore-229ef/databases/(default)/documents/Customer";
  
      // Send data to Firestore
      $.ajax({
        url: collectionUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(response) {
          $('#message').text('Sign up successful!');
          $('#signup-form')[0].reset(); // Clear form fields
          window.location.href = "indexorg.html"
        },
        error: function(xhr, status, error) {
          var errorMessage = JSON.parse(xhr.responseText).error.message;
          $('#message').text('Error: ' + errorMessage).show();
        }
      });
    });
  });
 