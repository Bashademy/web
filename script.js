const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
  link.addEventListener('mouseover', function() {
    navLinks.forEach(otherLink => otherLink.classList.remove('active'));
    this.classList.add('active');
  });
});

navLinks.forEach(link => {
    link.addEventListener("mouseout", function() {
        this.style.backgroundColor = ""; // Remove color when pointer leaves
    })
})
