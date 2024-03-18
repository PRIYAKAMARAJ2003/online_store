$(document).ready(function() {
    $('#signin-form').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get form data
      var email = $('#email').val();
      var password = $('#password').val();

      
  
      // Check if email is for admin or customer
      var isAdmin = email.endsWith('@psiog.com');
  
      // Determine Firestore collection URL
      var collectionUrl = isAdmin ? "Admin" : "Customer";
  
      var userData = {
        fields: {
          "email": {stringValue: email},
          "password": {stringValue: password}
        }
      };
      // Send request to Firestore to check credentials
      $.ajax({
        url: "https://firestore.googleapis.com/v1/projects/onlinestore-229ef/databases/(default)/documents/" + collectionUrl + "?pageSize=100",
        type: "GET",
        success: function(response) {
          if(response.documents && response.documents.length >0 ){
          var documents = response.documents;
          var authenticated = false;
  
          // Iterate through the documents to check credentials
          for (var i = 0; i < documents.length; i++) {
            var doc = documents[i];
            var docFields = doc.fields;
  
            // Check email and password
            if (docFields.email.stringValue === email && docFields.password.stringValue === password) {
              authenticated = true;
              break;
            }
          }
  
          if (authenticated) {
            $('#message').text('Sign in successful!');
            // Redirect to dashboard or another HTML page
            if(isAdmin){
              window.location.href = "admin.html";
            }else{
              window.location.href = "indexorg.html";
            }
            // Replace "dashboard.html" with the desired page
          } else {
            $('#message').text('Invalid email or password.').show();
          }
        }else{
          $('#message').text('No documents found or unexpected response structure.').show();
          window.location.href = "signup.html";
        }
      },
        error: function(xhr, status, error) {
          $('#message').text('Error: ' + error);
        }
      });
    });
  });
  
  