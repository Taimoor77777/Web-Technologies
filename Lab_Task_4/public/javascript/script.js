
var now = new Date();
var countDownDate = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);

var x = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the elements with id="days", "hours", "minutes", "seconds"
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-timer").innerHTML = "EXPIRED";
  }
}, 1000);

// let slideIndex = 1;
//     showSlides(slideIndex);

//     function plusSlides(n) {
//         showSlides(slideIndex += n);
//     }

//     function showSlides(n) {
//         let i;
//         let slides = document.getElementsByClassName("mySlides");
//         if (n > slides.length) { slideIndex = 1 }
//         if (n < 1) { slideIndex = slides.length }
//         for (i = 0; i < slides.length; i++) {
//             slides[i].style.display = "none";
//         }
//         slides[slideIndex - 1].style.display = "block";
//     }

//     function currentSlide(n) {
//       showSlides(slideIndex = n);
//   }
