'use strict';

const nappula = document.querySelector('#eka');
const nappula2 = document.querySelector('#toinen');

nappula.addEventListener('click', function(evt) {
    console.log(evt);
    alert('Hei moi hei' + evt.target);
});

function niceAlert(evt) {
    console.log(evt.type);
    alert('Tässä on toinen tapa kirjoittaa kuuntelija ' + evt.type);
}

nappula2.addEventListener('click', niceAlert);

//Teststaan propagointia
let para = document.querySelector("p");
let button = document.querySelector("#kolmas");
para.addEventListener("mousedown", () => {
    console.log("Handler for paragraph.");
});
button.addEventListener("mousedown", event => {
    console.log("Handler for button.");
    if (event.button == 2) event.stopPropagation();

});

document.body.addEventListener("click", event => {
    if (event.target.nodeName == "BUTTON") {
        console.log("Clicked", event.target.textContent);
    }
});


//Testataan linkin estäminen

let link = document.querySelector('a');

link.addEventListener('click', event => {
    console.log("MDN page is not allowed.");
    event.preventDefault();
});

window.addEventListener("keydown", event => {
    if (event.key == "f") {
        document.body.style.background = "lightgreen";
    }
    //console.log(event);
});
window.addEventListener("keyup", event => {
    if (event.key == "f") {
        document.body.style.background = "";
    }
    console.log(event);
});

//Testataan hiiren eventtejä (hiiren painallus alas, siirto..)

let lastX; // Seuraa edellistä x:n paikkaa
let bar = document.querySelector("div");
bar.addEventListener("mousedown", event => {
    if (event.button == 0) {
        lastX = event.clientX;
        window.addEventListener("mousemove", moved);
        event.preventDefault();
    }
});

function moved(event) {
    if (event.buttons == 0) {
        window.removeEventListener("mousemove", moved);
    } else {
        let dist = event.clientX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + "px";
        lastX = event.clientX;
    }
    console.log(event);
}

// Testataan scrollaus eventtiä

window.addEventListener("scroll", (event) => {
    let max = document.body.scrollHeight - innerHeight;
    bar.style.width = `${(pageYOffset / max) * 100}%`;
    //console.log(event);
});

// Testataan focus eventtejä

let help = document.querySelector("#help");
let fields = document.querySelectorAll("input");
for (let field of Array.from(fields)) {
    field.addEventListener("focus", event => {
        let text = event.target.getAttribute("data-help");
        help.textContent = text;
    });
    console.log(event);
    field.addEventListener("blur", event => {
        help.textContent = "";
    });
    //console.log(event);
}

//Testataan mouse motion

window.addEventListener("click", event => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
    console.log(event);
});

// Touch eventtien testaus

function update(event) {
    for (let dot; dot = document.querySelector("dot");) {
        dot.remove();
    }
    for (let i = 0; i < event.touches.length; i++) {
        let {pageX, pageY} = event.touches[i];
        let dot = document.createElement("dot");
        dot.style.left = (pageX - 50) + "px";
        dot.style.top = (pageY - 50) + "px";
        document.body.appendChild(dot);
    }
    //console.log(event);
}
window.addEventListener("touchstart", update);
window.addEventListener("touchmove", update);
window.addEventListener("touchend", update);

//Testataan ajastinta

let bombTimer = setTimeout(() => {
    console.log("BOOM!");
}, 500);

if (Math.random() < 0.5) { // 50% chance
    console.log("Defused.");
    clearTimeout(bombTimer);
}

//Tetataan debouncingia

let textarea = document.querySelector("textarea");
let timeout;
textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => console.log("Typed!"), 500);
});

//Pallotehtävä

let p = document.querySelector("#pallo");
let size;

function asetaKoko(newSize) {
    size = newSize;
    p.style.fontSize = size + "px";
}
asetaKoko(20);

function nuolenKaytto(event) {
    if (event.key == "ArrowUp") {
        if (size > 70) {
            p.textContent = "💥";
            document.body.removeEventListener("keydown", nuolenKaytto);
        } else {
            asetaKoko(size * 1.1);
            event.preventDefault();
        }
    } else if (event.key == "ArrowDown") {
        asetaKoko(size * 0.9);
        event.preventDefault();
    }

}

function reset() {
    const palloTakaisin = document.getElementById("pallo");
    palloTakaisin.textContent = "🎈"
    palloTakaisin.style.fontSize = "20px";
    document.body.addEventListener("keydown", nuolenKaytto);
}

document.body.addEventListener("keydown", nuolenKaytto);


