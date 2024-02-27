// first observer for elements animation
const observer = new IntersectionObserver(entries =>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// second observer for other elements animation
const observer2 = new IntersectionObserver(entries =>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show2');
        }else{
            entry.target.classList.remove('show2');
        }
    });
});

const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el) => observer2.observe(el));
// third observer for elements animation key frame
const observer3 = new IntersectionObserver(entries =>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show3');
        }else{
            entry.target.classList.remove('show3');
        }
    });
});

const hiddenElements3 = document.querySelectorAll('.hidden3');
hiddenElements3.forEach((el) => observer3.observe(el));
// third observer for the left sliding elements  check the css for it
const observer4 = new IntersectionObserver(entries =>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting){
            entry.target.classList.add('show4');
        }else{
            entry.target.classList.remove('show4');
        }
    });
});

const hiddenElements4 = document.querySelectorAll('.hidden4');
hiddenElements4.forEach((el) => observer4.observe(el));



document.addEventListener("DOMContentLoaded", function() {
    // Hide the loader and show the content
    document.getElementById("loadingScreen").style.display = "none";
});

var countDownDate = new Date("may 31, 2024 00:00:00").getTime();
var x = setInterval(()=>{
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
},1000)
