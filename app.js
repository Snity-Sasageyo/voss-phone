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
let bar2 = document.getElementById("bar2");
let toast = document.getElementById("toast");
let end = document.getElementById("end");
let help = document.getElementById("help");
let go = document.getElementById("go");
let hb = document.getElementById("hb");

let mlist = document.getElementById("mlist");
let mth = document.getElementById("mth");
let mback = document.getElementById("mback");
let mname = document.getElementById("mname");
let mbubs = document.getElementById("mbubs");

let gal = document.getElementById("gal");
let vw = document.getElementById("vw");
let vback = document.getElementById("vback");
let vimg = document.getElementById("vimg");
let vcap = document.getElementById("vcap");
let vtime = document.getElementById("vtime");
let vnote = document.getElementById("vnote");

let hf = document.getElementById("hf");
let hfback = document.getElementById("hfback");
let hflock = document.getElementById("hflock");
let hfrev = document.getElementById("hfrev");
let hfhint = document.getElementById("hfhint");
let hfdots = document.querySelectorAll("#hfdots .d");

let nlist = document.getElementById("nlist");
let nview = document.getElementById("nview");
let nback = document.getElementById("nback");
let ntitle = document.getElementById("ntitle");
let nbody = document.getElementById("nbody");

let strows = document.getElementById("strows");

let scr = {
  lk: lk,
  hm: hm,
  ap: ap,
};

let val = "";
let unlocked = false;
let current = "lk";
let curapp = null;

let hfval = "";
let hfunlocked = false;

let earlydone = false;
let finstarted = false;
let ended = false;
let tmo = null;

let msgs = [
  {
    n: "Mom",
    ini: "M",
    t: "9:01 PM",
    prev: "Love you too",
    un: 0,
    l: [
      { f: "in", t: "Are you home yet sweetie?", d: "8:42 PM" },
      { f: "out", t: "Yeah. I'm fine.", d: "8:47 PM" },
      { f: "out", t: "Door's locked. Windows too.", d: "8:47 PM" },
      { f: "in", t: "Call me tomorrow. Love you.", d: "8:48 PM" },
      { f: "out", t: "Love you too", d: "9:01 PM" },
    ],
  },
  {
    n: "Ben",
    ini: "B",
    t: "11:20 PM",
    prev: "this one breathes when it thinks I am asleep",
    un: 0,
    l: [
      { f: "in", t: "u good? u barely said anything at dinner", d: "10:15 PM" },
      { f: "out", t: "yeah sorry. tired i think", d: "10:41 PM" },
      {
        f: "out",
        t: "been hearing things in the apartment again",
        d: "10:42 PM",
      },
      {
        f: "in",
        t: "like the pipes? landlord still hasn't fixed them?",
        d: "10:43 PM",
      },
      { f: "out", t: "not the pipes", d: "10:45 PM" },
      {
        f: "out",
        t: "sounds like something walking. but only when the lights are off",
        d: "10:45 PM",
      },
      { f: "in", t: "dude. old buildings make noise.", d: "10:46 PM" },
      {
        f: "out",
        t: "this one breathes when it thinks I am asleep",
        d: "11:20 PM",
      },
    ],
  },
  {
    n: "Landlord",
    ini: "L",
    t: "4:10 PM",
    prev: "i know what i hear",
    un: 0,
    l: [
      {
        f: "out",
        t: "hi, I need someone to check my unit again. the noises.",
        d: "2:03 PM",
      },
      {
        f: "out",
        t: "it's not the pipes. something in the walls.",
        d: "2:04 PM",
      },
      {
        f: "in",
        t: "ms. voss we've been out twice. nothing is wrong.",
        d: "3:30 PM",
      },
      {
        f: "in",
        t: "have you considered that you might need to speak to someone",
        d: "3:31 PM",
      },
      { f: "out", t: "i am not crazy", d: "4:10 PM" },
      { f: "out", t: "i know what i hear", d: "4:10 PM" },
    ],
  },
  {
    n: "(317)",
    ini: "?",
    t: "3:17 AM",
    prev: "Don't turn around.",
    un: 1,
    bad: 1,
    l: [
      {
        f: "in",
        t: "You left the hallway light on.",
        d: "Mon 10:12 PM",
        bad: 1,
      },
      { f: "out", t: "Who is this?", d: "Mon 10:14 PM" },
      {
        f: "in",
        t: "You always forget to check the closet.",
        d: "Mon 10:15 PM",
        bad: 1,
      },
      { f: "out", t: "I'm calling the police", d: "Mon 10:16 PM" },
      {
        f: "in",
        t: "The third floorboard creaks when you walk to the bathroom at night.",
        d: "Mon 10:17 PM",
        bad: 1,
      },
      {
        f: "in",
        t: "You counted them once. Do you remember.",
        d: "Mon 10:17 PM",
        bad: 1,
      },
      { f: "out", t: "please stop", d: "Tue 2:04 AM" },
      { f: "in", t: "You bought new locks today.", d: "Wed 6:30 PM", bad: 1 },
      { f: "in", t: "They won't help.", d: "Wed 6:30 PM", bad: 1 },
      { f: "out", t: "HOW DID YOU KNOW THAT", d: "Wed 6:31 PM" },
      { f: "in", t: "I've always known.", d: "Wed 6:32 PM", bad: 1 },
      { f: "in", t: "You're reading this now.", d: "Today 3:15 AM", bad: 1 },
      { f: "in", t: "Don't turn around.", d: "Today 3:17 AM", bad: 1 },
    ],
  },
];

let pics = [
  { k: "a", c: "birthday dinner w/ ben", d: "Mar 10" },
  { k: "b", c: "cat on the windowsill", d: "Mar 12" },
  { k: "c", c: "hallway at night", d: "Mar 14 • 2:14 AM", bad: 1 },
  {
    k: "d",
    c: "???",
    d: "Mar 17 • 3:17 AM",
    bad: 1,
    note: "i didn't take this. someone stood over me while i slept.",
  },
  {
    k: "e",
    c: "no caption",
    d: "Mar 17 • 3:33 AM",
    bad: 1,
    note: "black frame. audio captured 14 seconds of breathing that was not mine.",
  },
  {
    k: "f",
    c: "kitchen table",
    d: "Mar 17 • 7:02 AM",
    note: "this is where the phone was found.",
  },
];

let nts = [
  {
    t: "groceries",
    p: "milk, eggs, locks?",
    b: `milk
eggs
bread
coffee
lightbulbs (kitchen)
locks?`,
  },
  {
    t: "reminders",
    p: "call landlord, stop hearing things",
    b: `call landlord
stop leaving window open
stop hearing things
call mom back`,
  },
  {
    t: "passcode",
    p: "if i forget",
    b: `0317
the day everything stopped.
hidden album too.`,
  },
  {
    t: "things i know",
    p: "it only moves when the lights are off",
    b: `it only moves when the lights are off
it does not like the closet
it knows my name
it has always been here`,
  },
  {
    t: "if someone finds this",
    p: "don't look under the bed",
    bad: 1,
    b: `my name is mara voss.
i live at 1148 harwick, apt 3.
something has been inside my apartment for weeks.

i tried the police. the landlord. my mom.
none of them heard what i heard.

the messages are from inside the apartment.
i traced them. they came from inside the apartment.

don't look under the bed.
don't open the closet.
don't turn off the lights.

i think it's reading this over my shoulder now.`,
  },
];

let stg = [
  { l: "Airplane Mode", v: "OFF" },
  { l: "Wi-Fi", v: "harwick-3 (weak)" },
  { l: "Passcode Hint", v: "0317" },
  { l: "Hidden Album", v: "0317" },
  { l: "Bluetooth", v: "Connected: Unknown Device", bad: 1 },
  { l: "Battery", v: "4% - draining", bad: 1 },
  { l: "Storage", v: "63.9 / 64 GB", bad: 1 },
  { l: "Location", v: "Kitchen Table" },
  { l: "Active Users", v: "2", bad: 1 },
];

function showhelp() {
  if (ended) return;
  help.classList.add("on");
}

function hidehelp() {
  help.classList.remove("on");
}

go.onclick = hidehelp;
hb.onclick = showhelp;

function show(id) {
  if (ended) return;
  if (!scr[id]) return;

  for (let k in scr) {
    scr[k].classList.remove("on");
  }

  scr[id].classList.add("on");
  current = id;
}

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
  if (ended) return;

  if (val == "0317") {
    unlocked = true;
    val = "";
    draw();
    show("hm");
    setTimeout(earlyevent, 12000);
  } else {
    lk.classList.add("shake");
    setTimeout(function () {
      lk.classList.remove("shake");
    }, 350);
    val = "";
    draw();
  }
}

function addkey(x) {
  if (ended) return;

  if (!unlocked && current == "lk") {
    if (x == "del") {
      val = val.slice(0, -1);
    } else if (val.length < 4) {
      val += x;
    }

    draw();

    if (val.length == 4) {
      setTimeout(trycode, 180);
    }
  }
}

document.querySelectorAll(".key").forEach(function (k) {
  k.onclick = function () {
    addkey(k.dataset.k);
  };
});

function showtoast(msg) {
  if (ended) return;

  toast.textContent = msg;
  toast.classList.add("show");

  clearTimeout(tmo);
  tmo = setTimeout(function () {
    toast.classList.remove("show");
  }, 2600);
}

function addunk(msg) {
  let u = msgs[3];
  u.l.push({ f: "in", t: msg, d: "Now", bad: 1 });
  u.prev = msg;
  u.un = 1;
  drawmsgs();
}

function hardflick() {
  if (ended) return;

  p.classList.add("flick");
  setTimeout(function () {
    p.classList.remove("flick");
  }, 140);

  setTimeout(function () {
    p.classList.add("flick");
    setTimeout(function () {
      p.classList.remove("flick");
    }, 120);
  }, 240);
}

function earlyevent() {
  if (finstarted || earlydone || ended) return;

  earlydone = true;
  addunk("Why are you looking through her things?");
  showtoast("(317) Why are you looking through her things?");
  hardflick();
  bat.classList.add("low");
}

function forcecam() {
  if (ended) return;

  curapp = "cam";
  ttl.textContent = "camera";

  let pans = document.querySelectorAll(".pane");
  for (let i = 0; i < pans.length; i++) {
    pans[i].classList.remove("on");
  }

  let target = document.getElementById("pcam");
  if (target) {
    target.classList.add("on");
    target.classList.add("live");
  }

  show("ap");
}

function finale() {
  if (finstarted || ended) return;

  finstarted = true;

  addunk("You found it.");
  showtoast("(317) You found it.");
  hardflick();

  setTimeout(function () {
    bat.classList.remove("low");
    bat.classList.add("dead");
    hardflick();
  }, 1400);

  setTimeout(function () {
    addunk("Now it knows you are here.");
    showtoast("(317) Now it knows you are here.");
  }, 2400);

  setTimeout(function () {
    forcecam();
    hardflick();
  }, 4200);

  setTimeout(showend, 6800);
}

function showend() {
  if (ended) return;

  ended = true;
  toast.classList.remove("show");
  end.classList.add("on");
}

end.onclick = function () {
  location.reload();
};

function drawhf() {
  for (let i = 0; i < hfdots.length; i++) {
    if (i < hfval.length) {
      hfdots[i].classList.add("on");
    } else {
      hfdots[i].classList.remove("on");
    }
  }
}

function hftry() {
  if (ended) return;

  if (hfval == "0317") {
    hfunlocked = true;
    hflock.classList.add("hid");
    hfrev.classList.remove("hid");

    let locktile = document.querySelector(".ph.lock");
    if (locktile) {
      locktile.classList.add("open");
      let tx = locktile.querySelector(".lktx");
      if (tx) tx.textContent = "open";
    }

    hardflick();
    setTimeout(finale, 2400);
  } else {
    hflock.classList.add("shake");
    hfhint.textContent = "enter 0317";
    setTimeout(function () {
      hflock.classList.remove("shake");
    }, 350);
    hfval = "";
    drawhf();
  }
}

function hfpress(x) {
  if (ended || hfunlocked) return;

  if (x == "del") {
    hfval = hfval.slice(0, -1);
  } else if (hfval.length < 4) {
    hfval += x;
  }

  drawhf();

  if (hfval.length == 4) {
    setTimeout(hftry, 180);
  }
}

document.querySelectorAll(".hkey").forEach(function (k) {
  k.onclick = function () {
    hfpress(k.dataset.h);
  };
});

function openhf() {
  if (ended) return;

  gal.classList.add("hid");
  vw.classList.add("hid");
  hf.classList.remove("hid");

  if (hfunlocked) {
    hflock.classList.add("hid");
    hfrev.classList.remove("hid");
  } else {
    hflock.classList.remove("hid");
    hfrev.classList.add("hid");
    hfval = "";
    drawhf();
  }
}

function closehf() {
  if (ended) return;

  hf.classList.add("hid");
  gal.classList.remove("hid");
}

hfback.onclick = closehf;

document.addEventListener("keydown", function (e) {
  if (ended) return;

  if (help.classList.contains("on")) {
    if (e.key == "Escape") {
      hidehelp();
    }
    return;
  }

  if (!unlocked && current == "lk") {
    if (e.key.length == 1 && e.key >= "0" && e.key <= "9") {
      addkey(e.key);
    }

    if (e.key == "Backspace") {
      addkey("del");
    }
  }

  if (unlocked && current == "ap") {
    if (
      curapp == "pic" &&
      !hf.classList.contains("hid") &&
      !hflock.classList.contains("hid")
    ) {
      if (e.key.length == 1 && e.key >= "0" && e.key <= "9") {
        hfpress(e.key);
      }

      if (e.key == "Backspace") {
        hfpress("del");
      }
    }

    if (e.key == "Escape") {
      if (!hf.classList.contains("hid")) {
        closehf();
      } else {
        home();
      }
    }
  }
});

function drawmsgs() {
  mlist.innerHTML = "";

  for (let i = 0; i < msgs.length; i++) {
    let m = msgs[i];

    let d = document.createElement("div");
    d.className = "mi" + (m.bad ? " bad" : "");

    let av = document.createElement("span");
    av.className = "mav" + (m.bad ? " bad" : "");
    av.textContent = m.ini;

    let tx = document.createElement("span");
    tx.className = "mtxt";

    let nm = document.createElement("span");
    nm.className = "mn";
    nm.textContent = m.n;

    let pv = document.createElement("span");
    pv.className = "mp";
    pv.textContent = m.prev;

    tx.appendChild(nm);
    tx.appendChild(pv);

    let mr = document.createElement("span");
    mr.className = "mr";

    if (m.un) {
      let u = document.createElement("b");
      u.className = "ud";
      u.textContent = m.un;
      mr.appendChild(u);
    }

    let t = document.createElement("span");
    t.className = "mt";
    t.textContent = m.t;
    mr.appendChild(t);

    d.appendChild(av);
    d.appendChild(tx);
    d.appendChild(mr);

    d.onclick = function () {
      openmsg(i);
    };

    mlist.appendChild(d);
  }
}

function openmsg(i) {
  if (ended) return;

  let m = msgs[i];

  if (m.un) {
    m.un = 0;
    drawmsgs();
  }

  mname.textContent = m.n;
  mbubs.innerHTML = "";

  for (let j = 0; j < m.l.length; j++) {
    let b = m.l[j];

    let d = document.createElement("div");
    d.className = "bub " + b.f + (b.bad ? " bad" : "");
    d.textContent = b.t;

    let t = document.createElement("span");
    t.className = "tm";
    t.textContent = b.d;

    d.appendChild(t);
    mbubs.appendChild(d);
  }

  mlist.classList.add("hid");
  mth.classList.remove("hid");
}

mback.onclick = function () {
  if (ended) return;
  mth.classList.add("hid");
  mlist.classList.remove("hid");
};

function drawpics() {
  gal.innerHTML = "";

  for (let i = 0; i < pics.length; i++) {
    let ph = pics[i];

    let d = document.createElement("div");
    d.className = "ph " + ph.k + (ph.bad ? " bad" : "");

    d.onclick = function () {
      openpic(i);
    };

    gal.appendChild(d);
  }

  let locktile = document.createElement("div");
  locktile.className = "ph lock" + (hfunlocked ? " open" : "");
  locktile.innerHTML =
    '<span class="lkic">✕</span><span class="lktx">' +
    (hfunlocked ? "open" : "hidden") +
    "</span>";
  locktile.onclick = openhf;
  gal.appendChild(locktile);
}

function openpic(i) {
  if (ended) return;

  let ph = pics[i];

  vimg.className = ph.k + (ph.bad ? " bad" : "");
  vcap.textContent = ph.c;
  vtime.textContent = ph.d;
  vnote.textContent = ph.note || "";

  gal.classList.add("hid");
  hf.classList.add("hid");
  vw.classList.remove("hid");
}

vback.onclick = function () {
  if (ended) return;
  vw.classList.add("hid");
  gal.classList.remove("hid");
};

function drawnotes() {
  nlist.innerHTML = "";

  for (let i = 0; i < nts.length; i++) {
    let n = nts[i];

    let d = document.createElement("div");
    d.className = "ni" + (n.bad ? " bad" : "");

    let t = document.createElement("span");
    t.className = "nt";
    t.textContent = n.t;

    let s = document.createElement("span");
    s.className = "ns";
    s.textContent = n.p;

    d.appendChild(t);
    d.appendChild(s);

    d.onclick = function () {
      opennote(i);
    };

    nlist.appendChild(d);
  }
}

function opennote(i) {
  if (ended) return;

  let n = nts[i];

  ntitle.textContent = n.t;
  nbody.textContent = n.b;

  if (n.bad) {
    nview.classList.add("bad");
  } else {
    nview.classList.remove("bad");
  }

  nlist.classList.add("hid");
  nview.classList.remove("hid");
}

nback.onclick = function () {
  if (ended) return;
  nview.classList.add("hid");
  nlist.classList.remove("hid");
};

function drawset() {
  strows.innerHTML = "";

  for (let i = 0; i < stg.length; i++) {
    let s = stg[i];

    let d = document.createElement("div");
    d.className = "st" + (s.bad ? " bad" : "");

    let l = document.createElement("span");
    l.className = "sl";
    l.textContent = s.l;

    let v = document.createElement("span");
    v.className = "sv";
    v.textContent = s.v;

    d.appendChild(l);
    d.appendChild(v);

    strows.appendChild(d);
  }
}

function openapp(a, n) {
  if (!unlocked || ended || finstarted) return;

  curapp = a;
  ttl.textContent = n;

  let pans = document.querySelectorAll(".pane");
  for (let i = 0; i < pans.length; i++) {
    pans[i].classList.remove("on");
  }

  let target = document.getElementById("p" + a);
  if (target) {
    target.classList.add("on");
  }

  if (a == "msg") {
    mth.classList.add("hid");
    mlist.classList.remove("hid");
  }

  if (a == "pic") {
    vw.classList.add("hid");
    hf.classList.add("hid");
    gal.classList.remove("hid");
  }

  if (a == "not") {
    nview.classList.add("hid");
    nlist.classList.remove("hid");
  }

  show("ap");
}

function home() {
  if (!unlocked || ended || finstarted) return;

  curapp = null;
  show("hm");
}

document.querySelectorAll(".ic").forEach(function (b) {
  b.onclick = function () {
    openapp(b.dataset.a, b.dataset.n);
  };
});

back.onclick = home;

bar2.onclick = function () {
  if (current == "ap") {
    home();
  }
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

drawmsgs();
drawpics();
drawnotes();
drawset();

tick();
setInterval(tick, 10000);

setInterval(function () {
  if (!ended && Math.random() < 0.16) {
    p.classList.add("flick");
    setTimeout(function () {
      p.classList.remove("flick");
    }, 160);
  }
}, 4500);

setTimeout(function () {
  if (!finstarted && !ended && !earlydone) {
    bat.classList.add("low");
  }
}, 16000);

