/**
 * KIMI PANDA — CONTROLADOR DE UI, MICROINTERACCIONES Y EFECTOS
 */

export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(scr => {
    scr.classList.remove('active');
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
}

export function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 1300);
}

export function burstConfetti(fromElement) {
  const rect = fromElement ? fromElement.getBoundingClientRect() : { left: window.innerWidth / 2, top: 100, width: 0 };
  const cx = rect.left + rect.width / 2;
  const cy = Math.max(20, rect.top);
  const colors = ['#FFC53D', '#37A05C', '#FF8A2A', '#3D9BE9', '#9B6BF3', '#F0685F'];

  for (let i = 0; i < 26; i++) {
    const p = document.createElement('div');
    p.className = 'confetti';
    const size = 8 + Math.random() * 12;
    p.style.cssText = `
      left: ${cx + (Math.random() - 0.5) * 240}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[i % colors.length]};
      animation-duration: ${1.3 + Math.random()}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
      border: 2px solid #241C15;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2600);
  }
}

export function renderHearts(container, currentHearts = 3, maxHearts = 3) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < maxHearts; i++) {
    const isFull = i < currentHearts;
    html += `
      <svg class="${isFull ? '' : 'lost'}" viewBox="0 0 24 24" fill="${isFull ? '#F0685F' : '#D8D2C9'}" stroke="#241C15" stroke-width="1.8" aria-hidden="true">
        <path d="M12 20.5S3 14.7 3 8.9A4.9 4.9 0 0 1 12 6a4.9 4.9 0 0 1 9 2.9c0 5.8-9 11.6-9 11.6z"/>
      </svg>
    `;
  }
  container.innerHTML = html;
}

export function initSkyFloaties() {
  const sky = document.getElementById('sky');
  if (!sky) return;
  const shapes = [
    '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="#FFC53D" opacity=".55"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>',
    '<svg width="100%" height="100%" viewBox="0 0 24 24" fill="#fff" opacity=".9"><ellipse cx="8" cy="14" rx="7" ry="4.5"/><ellipse cx="15" cy="11" rx="6" ry="4"/><ellipse cx="17.5" cy="15" rx="5" ry="3.6"/></svg>',
  ];
  const spots = [
    [4, 12, 34, 0, -6],
    [88, 8, 26, 1, 5],
    [92, 64, 40, 1, -4],
    [2, 72, 28, 0, 7],
    [76, 30, 18, 0, 4],
    [14, 44, 20, 1, -7]
  ];
  spots.forEach(([x, y, s, t, rot], i) => {
    const d = document.createElement('div');
    d.className = 'floaty';
    d.style.cssText = `left:${x}%;top:${y}%;width:${s}px;height:${s}px;--rot:${rot}deg;animation-delay:${i * 0.7}s;animation-duration:${8 + i}s`;
    d.innerHTML = shapes[t];
    sky.appendChild(d);
  });
}
