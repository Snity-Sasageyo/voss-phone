let cv = document.getElementById("c");
let cx = cv.getContext("2d");
let w,
  h,
  dots = [];

function sz() {
  w = cv.width = window.innerWidth;
  h = cv.height = window.innerHeight;
}

function mk() {
  dots = [];
  for (let i = 0; i < 60; i++) {
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 0.5,
    });
  }
}

function lp() {
  cx.fillStyle = "rgba(5, 5, 8, 0.15)";
  cx.fillRect(0, 0, w, h);
  cx.fillStyle = "#ff0055";
  cx.shadowBlur = 20;
  cx.shadowColor = "#ff0055";
  for (let d of dots) {
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > w) d.vx *= -1;
    if (d.y < 0 || d.y > h) d.vy *= -1;
    cx.beginPath();
    cx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    cx.fill();
  }
  cx.shadowBlur = 0;
  cx.strokeStyle = "rgba(0, 255, 204, 0.05)";
  cx.lineWidth = 1;
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      let dx = dots[i].x - dots[j].x;
      let dy = dots[i].y - dots[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        cx.beginPath();
        cx.moveTo(dots[i].x, dots[i].y);
        cx.lineTo(dots[j].x, dots[j].y);
        cx.stroke();
      }
    }
  }
  requestAnimationFrame(lp);
}

window.addEventListener("resize", () => {
  sz();
  mk();
});
sz();
mk();
lp();

let pin = "0317";
let char = "Mara Voss";

let msg = [
  {
    n: "Mom",
    l: [
      { f: "thm", t: "Are you home yet sweetie?", d: "8:42 PM" },
      { f: "me", t: "Yeah. I'm fine.", d: "8:47 PM" },
      { f: "me", t: "Door's locked. Windows too.", d: "8:47 PM" },
      { f: "thm", t: "Call me tomorrow. Love you.", d: "8:48 PM" },
    ],
  },
  {
    n: "Ben",
    l: [
      {
        f: "thm",
        t: "u good? u barely said anything at dinner",
        d: "10:15 PM",
      },
      { f: "me", t: "yeah sorry. tired i think", d: "10:41 PM" },
      {
        f: "me",
        t: "been hearing things in the apartment again",
        d: "10:42 PM",
      },
      {
        f: "thm",
        t: "like the pipes? landlord still hasn't fixed them?",
        d: "10:43 PM",
      },
      { f: "me", t: "not the pipes", d: "10:45 PM" },
      {
        f: "me",
        t: "sounds like something walking. but only when the lights are off",
        d: "10:45 PM",
      },
    ],
  },
  {
    n: "(317)",
    x: 1,
    l: [
      {
        f: "thm",
        t: "You left the hallway light on.",
        d: "Mon 10:12 PM",
        b: 1,
      },
      { f: "me", t: "Who is this?", d: "Mon 10:14 PM" },
      {
        f: "thm",
        t: "You always forget to check the closet.",
        d: "Mon 10:15 PM",
        b: 1,
      },
      {
        f: "thm",
        t: "The third floorboard creaks when you walk to the bathroom at night.",
        d: "Mon 10:17 PM",
        b: 1,
      },
      { f: "thm", t: "I've always known.", d: "Wed 6:32 PM", b: 1 },
      { f: "thm", t: "Don't turn around.", d: "Today 3:17 AM", b: 1 },
    ],
  },
];

let nts = [
  {
    h: "groceries",
    b: "milk\neggs\nbread\ncoffee\nlightbulbs (kitchen)\nlocks?",
  },
  {
    h: "reminders",
    b: "call landlord\nstop leaving window open\nstop hearing things",
  },
  {
    h: "things i know",
    b: "it only moves when the lights are off\nit does not like the closet\nit knows my name\nit has always been here",
  },
  {
    h: "if someone finds this",
    b: "my name is mara voss.\ni live at 1148 harwick, apt 3.\nsomething has been inside my apartment for weeks.\n\ndon't look under the bed.\ndon't open the closet.\ndon't turn off the lights.\n\ni think it's reading this over my shoulder now.",
  },
];

let phs = [
  { c: "birthday dinner w/ ben", d: "Mar 10" },
  { c: "cat on the windowsill", d: "Mar 12" },
  { c: "hallway at night", d: "Mar 14 • 2:14 AM", b: 1 },
  {
    c: "???",
    d: "Mar 17 • 3:17 AM",
    b: 1,
    t: "photo of me sleeping. i didn't take this.",
  },
];

let cal = [
  { d: "14", e: "heard it again. 2:14 AM.", r: 1 },
  { d: "15", e: "buy new locks" },
  { d: "17", e: "it comes at 3:17", r: 1 },
  { d: "17", e: "check the locks", r: 1 },
];

let cur = "msg";
let box = document.getElementById("v");
let bts = document.querySelectorAll(".tb");

function sw(tab) {
  cur = tab;
  bts.forEach((b) => {
    b.classList.toggle("on", b.dataset.k === tab);
  });
  drw();
}

function drw() {
  box.innerHTML = "";
  if (cur === "msg") {
    msg.forEach((th) => {
      let d = document.createElement("div");
      d.className = "th";
      let h = document.createElement("div");
      h.className = "nm" + (th.x ? " bd" : "");
      h.textContent = th.n;
      d.appendChild(h);
      th.l.forEach((ln) => {
        let l = document.createElement("div");
        l.className = "ln " + ln.f + (ln.b ? " bd" : "");
        l.innerHTML = '<span class="dt">' + ln.d + "</span>" + ln.t;
        d.appendChild(l);
      });
      box.appendChild(d);
    });
  }
  if (cur === "nts") {
    nts.forEach((n) => {
      let d = document.createElement("div");
      d.className = "nt";
      d.innerHTML = "<h3>" + n.h + "</h3>" + n.b;
      box.appendChild(d);
    });
  }
  if (cur === "phs") {
    phs.forEach((p) => {
      let d = document.createElement("div");
      d.className = "pc";
      let b = document.createElement("div");
      b.className = "bx";
      b.textContent = "[img]";
      d.appendChild(b);
      let c = document.createElement("div");
      c.innerHTML = "<b>" + p.c + '</b><br><span class="dt">' + p.d + "</span>";
      d.appendChild(c);
      if (p.t) {
        let t = document.createElement("div");
        t.style.color = "#ff0055";
        t.style.marginTop = "10px";
        t.style.fontSize = "11px";
        t.textContent = "note: " + p.t;
        d.appendChild(t);
      }
      box.appendChild(d);
    });
  }
  if (cur === "cal") {
    cal.forEach((c) => {
      let d = document.createElement("div");
      d.className = "cl" + (c.r ? " rd" : "");
      d.innerHTML = "<span>Mar " + c.d + "</span><span>" + c.e + "</span>";
      box.appendChild(d);
    });
  }
}

bts.forEach((b) => {
  b.onclick = () => sw(b.dataset.k);
});

drw();
