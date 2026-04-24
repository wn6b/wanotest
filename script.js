/* ════════════════════════════════════════════
   Projects Bots — script.js
   by وائل | Wano (@wn6b)
   ════════════════════════════════════════════ */

'use strict';

// ══════════════════════════════════
// CONFIG — OWNER CREDENTIALS
// ══════════════════════════════════
const OWNER = {
  email: 'waylalyzydy51@gmail.com',
  password: 'f!2HgJv#)"E"y^i',
  name: 'وائل | Wano',
  username: 'wn6b',
  role: 'owner'
};

const ANTHROPIC_MODEL = 'claude-sonnet-4-20250514';

// ══════════════════════════════════
// STORAGE HELPERS
// ══════════════════════════════════
const DB = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem(k)
};

// Ensure owner account always exists in users db
function initOwner() {
  let users = DB.get('pb_users') || [];
  const exists = users.find(u => u.email === OWNER.email);
  if (!exists) {
    users.push({
      email: OWNER.email,
      password: OWNER.password,
      name: OWNER.name,
      username: OWNER.username,
      role: 'owner',
      createdAt: new Date().toISOString()
    });
    DB.set('pb_users', users);
  }
}

// ══════════════════════════════════
// LOADER
// ══════════════════════════════════
const LOADER_STEPS = [
  'Initializing AI Core...',
  'Loading Neural Networks...',
  'Connecting to Cloud...',
  'Authenticating Services...',
  'Scanning Security Layers...',
  'Syncing Project Database...',
  'Calibrating AI Scanner...',
  'Ready ✓'
];

function startLoader() {
  initOwner();
  const bar = document.getElementById('loaderBar');
  const status = document.getElementById('loaderStatus');

  // particles
  const pc = document.getElementById('loaderParticles');
  for (let i = 0; i < 18; i++) {
    const d = document.createElement('div');
    d.className = 'lp-dot';
    const size = Math.random() * 4 + 2;
    d.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*6+5}s;
      animation-delay:${Math.random()*4}s;
      opacity:0.6;
    `;
    pc.appendChild(d);
  }

  let step = 0;
  const total = LOADER_STEPS.length;
  const interval = setInterval(() => {
    if (step >= total) {
      clearInterval(interval);
      setTimeout(exitLoader, 400);
      return;
    }
    const pct = Math.round(((step + 1) / total) * 100);
    bar.style.width = pct + '%';
    status.textContent = LOADER_STEPS[step];
    step++;
  }, 320);
}

function exitLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('exit');
  setTimeout(() => {
    loader.classList.add('hidden');
    checkAutoLogin();
  }, 600);
}

// ══════════════════════════════════
// AUTO-LOGIN CHECK
// ══════════════════════════════════
function checkAutoLogin() {
  const saved = DB.get('pb_session');
  if (saved && saved.email) {
    const users = DB.get('pb_users') || [];
    const user = users.find(u => u.email === saved.email);
    if (user) {
      loginUser(user, false);
      return;
    }
  }
  showAuthScreen();
}

function showAuthScreen() {
  document.getElementById('authScreen').classList.remove('hidden');
  initAuthCanvas();
  switchTab('login');
}

// ══════════════════════════════════
// AUTH CANVAS BACKGROUND
// ══════════════════════════════════
function initAuthCanvas() {
  const canvas = document.getElementById('authCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const nodes = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,212,255,0.5)';
      ctx.fill();
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0,132,255,${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ══════════════════════════════════
// TAB SWITCHING
// ══════════════════════════════════
function switchTab(tab) {
  const loginTab = document.getElementById('tabLogin');
  const regTab = document.getElementById('tabRegister');
  const slider = document.getElementById('tabSlider');
  const formLogin = document.getElementById('formLogin');
  const formReg = document.getElementById('formRegister');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    formLogin.classList.add('active');
    formReg.classList.remove('active');
    // Slider position: RTL layout — "تسجيل الدخول" is left side (right side in RTL)
    slider.style.right = '4px';
    slider.style.left = '50%';
    slider.style.width = 'calc(50% - 4px)';
  } else {
    regTab.classList.add('active');
    loginTab.classList.remove('active');
    formReg.classList.add('active');
    formLogin.classList.remove('active');
    slider.style.right = '50%';
    slider.style.left = '4px';
    slider.style.width = 'calc(50% - 4px)';
  }
}

// Init slider on load
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('tabSlider');
  if (slider) {
    slider.style.right = '4px';
    slider.style.left = '50%';
    slider.style.width = 'calc(50% - 4px)';
  }
});
