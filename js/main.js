/**
 * @Author Sean Lynch
 * main.js - handles animated elements within my portfolio page.
 */
window.onload = start;
window.onresize = resize;
window.addEventListener("scroll", scroll);

let introContainer;
let str1;
let str2;
let str3;
let portrait;
let sticky;
let navbar;
let lastScroll = 0;
let scrollDownBool;
let navInitialCutOffHeight = 150;

const scrollUpClass = "scroll-up";
const scrollDownClass = "scroll-down";

function start() {
    navbar = document.querySelector("#navbar");
    sticky = navbar.offsetTop;
    startAnimation();
}

function startAnimation() {
    navbar.style.display = "none";
    introContainer = document.querySelector("#startAnimation");
    let textContainer = document.querySelector(".intro-text")
    str1 = textContainer.querySelector("h2");
    str2 = textContainer.querySelector("h1");
    str3 = textContainer.querySelector("h3");
    // str1.style.left = window.innerWidth + "px";
    // str2.style.left = window.innerWidth + "px";
    // str3.style.left = -10000 + "px";
    portrait = introContainer.querySelector("#self-portrait");
    resize();
    window.scrollTo(0, 0);
    setTimeout(moveWords, 0);
}

function resize() {
    introContainer.style.backgroundSize = "100vw, calc(100vw * 1069 / 1920)";
}

function scroll() {
    let currentScroll = window.pageYOffset;

    // Scrolling withing the top chunk of the page.
    if (document.documentElement.scrollTop < navInitialCutOffHeight && (currentScroll <= 0 || currentScroll > lastScroll)) {
        // Scrolling up to the very top of the screen.
        if (currentScroll < lastScroll) {
            fadeOutNavColor();
        }
        else if (currentScroll <= lastScroll) {
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

function dropNavBarDown() {
    if (document.documentElement.scrollTop > 0) {
        navbar.style.backgroundColor = "rgba(5, 50, 37, 1)";
    }
    navbar.style.display = "flex";
    navbar.style.opacity = ".45";
    let pos = -100;
    let op = .45;
    let timer = setInterval(function () {
        pos += 5;
        op += .0275;
        navbar.style.top = pos + 'px';
        navbar.style.opacity = '' + op;
        if (pos == 0) {
            clearInterval(timer);
        }
    });
}
function bringNavBarUp() {
    navbar.style.opacity = ".95";
    let pos = 0;
    let op = .95;
    let timer = setInterval(function () {
        pos -= 5;
        op -= .025;
        navbar.style.top = pos + 'px';
        navbar.style.opacity = '' + op;
        if (pos == -100) {
            navbar.style.display = "none";
            clearInterval(timer);
        }
    });
}

function moveWords() {
    let moveRightPosition = window.innerWidth;
    let moveLeftPosition = -window.innerWidth;
    let topPosition = -600;
    let topDone = false;
    let leftDone = false;
    let rightDone = false;
    let threshold = 0;
    let multiplier = (window.innerWidth / window.innerHeight) / (1920 / 1080);
    let timer = setInterval(function () {
        window.scrollTo(0, 0);
        moveLeftPosition += 15 * multiplier;
        moveRightPosition -= 15 * multiplier;
        topPosition += 5;
        if (moveLeftPosition >= threshold) {
            moveLeftPosition = threshold;
            str3.style.left = threshold + 'px';
            leftDone = true;
        }
        if (moveRightPosition <= threshold) {
            moveRightPosition = threshold
            str1.style.left = threshold + 'px';
            str2.style.left = threshold + 'px';
            rightDone = true;
        }
        if (topPosition >= threshold) {
            topPosition = threshold;
            portrait.style.top = threshold + 'px';
            topDone = true;
        }
        if (!rightDone)
            str1.style.left = moveRightPosition + 'px';
        str2.style.left = moveRightPosition + 'px';
        if (!leftDone)
            str3.style.left = moveLeftPosition + 'px';
        if (!topDone) {
            portrait.style.top = topPosition + 'px';
        }
        if (leftDone && rightDone && topDone) {
            clearInterval(timer);
            dropNavBarDown();
        }
    });
}

function fadeOutNavColor() {
    let opacity = 1;
    let timer = setInterval(function () {
        opacity -= .02;
        navbar.style.backgroundColor = "rgba(5, 50, 37, " + opacity + ")";
        if (opacity <= 0) {
            clearInterval(timer);
        }
    });
}