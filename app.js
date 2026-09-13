let lk = document.getElementById("lk");
let hm = document.getElementById("hm");
let ap = document.getElementById("ap");
let grid = document.getElementById("grid");
let body = document.getElementById("body");
let ttl = document.getElementById("ttl");
let back = document.getElementById("back");
let pad = document.getElementById("pad");
let dots = document.querySelectorAll(".d");
let clk = document.getElementById("clk");
let tm = document.getElementById("tm");
let dt = document.getElementById("dt");

let code = "";
let unlocked = false;

let apps = [
  { k: "msg", n: "messages" },
  { k: "pic", n: "photos" },
  { k: "not", n: "notes" },
  { k: "mem", n: "voice memos" },
  { k: "cal", n: "calendar" },
  { k: "set", n: "settings" },
  { k: "cam", n: "camera" },
];

let pans = {};

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

function drawdots() {
  for (let i = 0; i < dots.length; i++) {
    if (i < code.length) dots[i].classList.add("on");
    else dots[i].classList.remove("on");
  }
}

function unlock() {
  if (code == "0317") {
    unlocked = true;
    lk.classList.add("off");
    hm.classList.remove("off");
  } else {
    lk.classList.add("shake");
    setTimeout(function () {
      lk.classList.remove("shake");
    }, 350);
    code = "";
    drawdots();
  }
}

function press(x) {
  if (unlocked) return;

  if (x == "del") {
    code = code.slice(0, -1);
  } else if (code.length < 4) {
    code += x;
  }

  drawdots();

  if (code.length == 4) {
    setTimeout(unlock, 200);
  }
}

function makepad() {
  let keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let b = document.createElement("div");
    b.className = "key";

    if (k == "") {
      b.style.visibility = "hidden";
    } else {
      b.textContent = k == "del" ? "⌫" : k;
      b.onclick = function () {
        press(k);
      };
    }

    pad.appendChild(b);
  }
}

function makeapps() {
  for (let i = 0; i < apps.length; i++) {
    let a = apps[i];

    let b = document.createElement("button");
    b.className = "ic";
    b.innerHTML = '<span class="g"></span><span class="lb">' + a.n + "</span>";
    b.onclick = function () {
      open(a.k, a.n);
    };
    grid.appendChild(b);

    let d = document.createElement("div");
    d.className = "pane off";
    d.id = "p" + a.k;
    d.innerHTML = '<div class="ph">' + a.n + " shell</div>";
    body.appendChild(d);

    pans[a.k] = d;
  }
}

function open(k, n) {
  ap.classList.remove("off");
  hm.classList.add("off");
  ttl.textContent = n;

  for (let x in pans) {
    pans[x].classList.add("off");
  }

  pans[k].classList.remove("off");
}

back.onclick = function () {
  ap.classList.add("off");
  hm.classList.remove("off");
};

makepad();
makeapps();
drawdots();
tick();
setInterval(tick, 10000);
