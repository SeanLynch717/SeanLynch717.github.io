/**
 * @Author Sean Lynch
 * main.js - handles animated elements within my portfolio page.
 */
window.onload = start;
window.onresize = resize;
window.addEventListener("scroll", scroll);

let elem;
let str1;
let str2;
let str3;
let portrait;;
let sticky;
let navbar;
let lastScroll = 0;
let scrollDownBool;
let navInitialCutOffHeight = 150;

const scrollUpClass = "scroll-up";
const scrollDownClass = "scroll-down";

function start(){
    navbar = document.querySelector("#navbar");
    sticky = navbar.offsetTop;
    startAnimation();
}

function startAnimation(){
    navbar.style.display = "none";
    elem = document.querySelector("#startAnimation");
    str1 = elem.querySelector("h2");
    str2 = elem.querySelector("h1");
    str3 = elem.querySelector("h3");
    str1.style.left = window.innerWidth +"px";
    str2.style.left = window.innerWidth +"px";
    str3.style.left = -950 +"px";
    portrait = elem.querySelector("#self-portrait");
    resize();
    window.scrollTo(0,0);
    setTimeout(moveWords, 0);
}

function resize(){
    elem.style.height = "calc(100vw * 1069 / 1920)";//

    elem.style.backgroundSize = "100vw, calc(100vw * 1069 / 1920)";
}

function scroll(){
  let currentScroll = window.pageYOffset;

  // Scrolling withing the top chunk of the page.
  if(document.documentElement.scrollTop < navInitialCutOffHeight && (currentScroll <= 0 || currentScroll > lastScroll)){
    // Scrolling up to the very top of the screen.
    if(currentScroll < lastScroll){
        fadeOutNavColor();
    }
    else if(currentScroll <= lastScroll){
        navbar.style.backgroundColor = "rgba(5, 50, 37, 0)";
    }
  }

  else if (currentScroll <= 0) {
    return;
  }

  // down
  else if (currentScroll > lastScroll && !scrollDownBool) {
    scrollDownBool = true;
    bringNavBarUp();
  } 
  // up
  else if (currentScroll < lastScroll && scrollDownBool) {
    scrollDownBool = false;
    dropNavBarDown();
  }

  lastScroll = currentScroll;
}

function dropNavBarDown(){
    if(document.documentElement.scrollTop > 0){
        navbar.style.backgroundColor = "rgba(5, 50, 37, 1)";
    }
    navbar.style.display = "flex";
    navbar.style.opacity = ".45";
    let pos = -100;
    let op = .45;
    let timer = setInterval(function(){
        pos+= 5;
        op += .0275;
        navbar.style.top = pos +'px';
        navbar.style.opacity = '' + op;
        if(pos == 0){
             clearInterval(timer);
        }
    });
}
function bringNavBarUp(){
    navbar.style.opacity = ".95";
    let pos = 0;
    let op = .95;
    let timer = setInterval(function(){
        pos-= 5;
        op -= .025;
        navbar.style.top = pos +'px';
        navbar.style.opacity = '' + op;
        if(pos == -100){
            navbar.style.display = "none";
            clearInterval(timer);
        }
    });
}

function moveWords(){
    let moveRightPosition = window.innerWidth;
    let moveLeftPosition = -950;
    let leftDone = false;
    let rightDone = false;
    let timer = setInterval(function(){
        window.scrollTo(0,0);
        moveLeftPosition += 10;
        moveRightPosition -= 20;
        if(moveLeftPosition >= 50){
            moveLeftPosition = 50;
            str3.style.left = 50 + 'px';
            leftDone = true;
        }
        if(moveRightPosition <= 50){
            moveRightPosition = 50
            str1.style.left = 50 + 'px';
            str2.style.left = 50 + 'px';
            rightDone = true;
        }
        if(!rightDone)
            str1.style.left = moveRightPosition + 'px';
            str2.style.left = moveRightPosition + 'px';
        if(!leftDone)
            str3.style.left = moveLeftPosition + 'px';
        if(leftDone && rightDone){
             clearInterval(timer);
             dropNavBarDown();
        }
    });
}

function fadeOutNavColor(){
    let opacity = 1;
    let timer = setInterval(function(){
        opacity -= .02;
        navbar.style.backgroundColor = "rgba(5, 50, 37, " +opacity +")";
        if(opacity <= 0){
             clearInterval(timer);
        }
    });
}