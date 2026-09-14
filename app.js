let lk = document.getElementById("lk");
let hm = document.getElementById("hm");
let ap = document.getElementById("ap");
let ttl = document.getElementById("ttl");
let back = document.getElementById("back");
let dots = document.querySelectorAll(".d");
let clk = document.getElementById("clk");
let tm = document.getElementById("tm");
let dt = document.getElementById("dt");
let p = document.getElementById("p");
let bat = document.getElementById("bat");

let val = "";
let unlocked = false;

function draw() {
  for (let i = 0; i < dots.length; i++) {
    if (i < val.length) {
      dots[i].classList.add("on");
    } else {
      dots[i].classList.remove("on");
    }
  }
}

function trycode() {
  if (val == "0317") {
    unlocked = true;
    lk.classList.add("off");
    hm.classList.remove("off");
  } else {
    lk.classList.add("shake");
    setTimeout(function () {
      lk.classList.remove("shake");
    }, 350);
    val = "";
    draw();
  }
}

document.querySelectorAll(".key").forEach(function (k) {
  k.onclick = function () {
    if (unlocked) return;

    let x = k.dataset.k;
    if (!x) return;

    if (x == "del") {
      val = val.slice(0, -1);
    } else if (val.length < 4) {
      val += x;
    }

    draw();

    if (val.length == 4) {
      setTimeout(trycode, 180);
    }
  };
});

function openapp(a, n) {
  ap.classList.remove("off");
  hm.classList.add("off");
  ttl.textContent = n;

  let pans = document.querySelectorAll(".pane");
  for (let i = 0; i < pans.length; i++) {
    pans[i].classList.add("off");
  }

  let target = document.getElementById("p" + a);
  if (target) {
    target.classList.remove("off");
  }
}

document.querySelectorAll(".ic").forEach(function (b) {
  b.onclick = function () {
    openapp(b.dataset.a, b.dataset.n);
  };
});

back.onclick = function () {
  ap.classList.add("off");
  hm.classList.remove("off");
};

function tick() {
  let d = new Date();
  let h = d.getHours().toString().padStart(2, "0");
  let m = d.getMinutes().toString().padStart(2, "0");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let mons = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  clk.textContent = h + ":" + m;
  tm.textContent = h + ":" + m;
  dt.textContent =
    days[d.getDay()] + " " + mons[d.getMonth()] + " " + d.getDate();
}

tick();
setInterval(tick, 10000);

setInterval(function () {
  if (Math.random() < 0.16) {
    p.classList.add("flick");
    setTimeout(function () {
      p.classList.remove("flick");
    }, 160);
  }
}, 4500);

setTimeout(function () {
  bat.classList.add("low");
}, 14000);
