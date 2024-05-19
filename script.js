// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}


// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
}


// script to send email using form
// Define the sendEmail function
// function sendEmail() {
//   var name = document.querySelector('.user-name').value;
//   var email = document.querySelector('.userEmail').value;
//   var subject = document.querySelector('.subject').value;
//   var message = document.querySelector('.message').value;

//   var mailtoLink = 'mailto:' + encodeURIComponent(email) +
//                   '?subject=' + encodeURIComponent(subject) +
//                   '&body=' + encodeURIComponent('Name: ' + name + '\n\nMessage: ' + message);

//   window.location.href = mailtoLink;
// }

// // Listen for the form submission event
// document.querySelector('form').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevent the default form submission
//   sendEmail(); // Call the sendEmail function
// });
