(function () {
  'use strict';

  var API = 'https://www.cistenivodikem.cz/api/chat';

  if (document.getElementById('bzk-w')) return; // guard against double-load

  var C = {
    red: '#b30404',
    dark: '#231f20',
    body: '#1c2126',
    green: '#04b35c',
    bg: '#fbf8f8',
    border: '#e9e9e9',
  };

  var WELCOME = 'Dobrý den! Jsem asistent BezKarbonu.cz. Mohu vám poradit s vodíkovou dekarbonizací, cenami, pobočkami nebo objednávkou. Jak vám mohu pomoci?';
  var SUGGESTIONS = ['Jaká je cena?', 'Kde jsou pobočky?', 'Jak to funguje?', 'Chci se objednat'];

  var SESSION_ID = Math.random().toString(36).slice(2, 10);
  var MAX_INPUT = 500;
  var MAX_USER_MSGS = 10;
  var LIMIT_MSG = 'Dosáhli jste limitu konverzace. Pro další dotazy nás prosím kontaktujte na info@bezkarbonu.cz nebo zavolejte na +420 792 767 337.';

  var msgs = [{ role: 'assistant', content: WELCOME }];
  var isOpen = false;
  var isLoading = false;
  var userMsgCount = 0;

  // ── Styles ────────────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent =
    '@keyframes bzk-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}' +
    '#bzk-w,#bzk-w *{box-sizing:border-box;font-family:"DM Sans",sans-serif;line-height:normal}' +
    '#bzk-msgs::-webkit-scrollbar{width:4px}' +
    '#bzk-msgs::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px}' +
    '#bzk-w .bzk-msg a{color:' + C.red + ';text-decoration:underline}';
  document.head.appendChild(styleEl);

  function renderMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^#{1,3} (.+)$/gm, '<strong>$1</strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '• $1');
  }

  // ── DOM helpers ───────────────────────────────────────────────────────────
  function el(tag, css) {
    var e = document.createElement(tag);
    if (css) e.style.cssText = css;
    return e;
  }

  // ── Build skeleton ────────────────────────────────────────────────────────
  var wrap = el('div', 'position:fixed;bottom:24px;right:24px;z-index:2147483647;');
  wrap.id = 'bzk-w';

  // Chat window
  var win = el('div',
    'width:360px;height:520px;background:#fff;border-radius:12px;' +
    'box-shadow:0 12px 48px rgba(0,0,0,.18);display:none;flex-direction:column;' +
    'overflow:hidden;margin-bottom:12px;'
  );

  // Header
  var hdr = el('div', 'background:' + C.dark + ';padding:14px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;');
  var hdrLeft = el('div', 'display:flex;align-items:center;gap:10px;');
  var hdrAvatar = el('div', 'width:36px;height:36px;background:' + C.red + ';border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:.8rem;flex-shrink:0;');
  hdrAvatar.textContent = 'BK';
  var hdrInfo = el('div', '');
  var hdrTitle = el('div', 'color:#fff;font-weight:700;font-size:.9rem;');
  hdrTitle.textContent = 'BezKarbonu Asistent';
  var hdrStatus = el('div', 'color:' + C.green + ';font-size:.72rem;display:flex;align-items:center;gap:4px;');
  var hdrDot = el('span', 'width:6px;height:6px;background:' + C.green + ';border-radius:50%;display:inline-block;');
  hdrStatus.appendChild(hdrDot);
  hdrStatus.appendChild(document.createTextNode('Online'));
  hdrInfo.appendChild(hdrTitle);
  hdrInfo.appendChild(hdrStatus);
  hdrLeft.appendChild(hdrAvatar);
  hdrLeft.appendChild(hdrInfo);
  var hdrClose = el('button', 'background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;font-size:1.1rem;padding:4px;line-height:1;');
  hdrClose.textContent = '✕';
  hdrClose.onclick = function () { toggle(false); };
  hdr.appendChild(hdrLeft);
  hdr.appendChild(hdrClose);
  win.appendChild(hdr);

  // Messages area
  var msgsDiv = el('div',
    'flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;background:' + C.bg + ';'
  );
  msgsDiv.id = 'bzk-msgs';
  win.appendChild(msgsDiv);

  // Quick suggestions
  var suggestDiv = el('div', 'padding:6px 12px;background:' + C.bg + ';display:none;gap:6px;flex-wrap:wrap;border-top:1px solid ' + C.border + ';');
  SUGGESTIONS.forEach(function (q) {
    var btn = el('button',
      'background:#fff;border:1px solid ' + C.red + ';color:' + C.red + ';border-radius:20px;' +
      'padding:4px 10px;font-size:.75rem;cursor:pointer;font-weight:600;font-family:"DM Sans",sans-serif;'
    );
    btn.textContent = q;
    btn.onclick = function () {
      inp.value = q;
      inp.focus();
      doSend();
    };
    suggestDiv.appendChild(btn);
  });
  win.appendChild(suggestDiv);

  // Input row
  var inputArea = el('div', 'padding:10px 12px 6px;background:#fff;border-top:1px solid ' + C.border + ';display:flex;flex-direction:column;gap:4px;flex-shrink:0;');
  var inputRow = el('div', 'display:flex;gap:8px;');
  var inp = el('input',
    'flex:1;border:1.5px solid ' + C.border + ';border-radius:8px;padding:8px 12px;' +
    'font-size:.855rem;outline:none;background:#fff;transition:border-color .15s;font-family:"DM Sans",sans-serif;'
  );
  inp.placeholder = 'Napište dotaz...';
  inp.setAttribute('type', 'text');
  inp.setAttribute('maxlength', String(MAX_INPUT));
  inp.onfocus = function () { inp.style.borderColor = C.red; };
  inp.onblur = function () { inp.style.borderColor = C.border; };
  inp.onkeydown = function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); } };
  inp.oninput = updateSendBtn;

  var sendBtn = el('button',
    'background:#e0e0e0;border:none;border-radius:8px;width:38px;height:38px;' +
    'color:#fff;cursor:not-allowed;font-size:1.1rem;display:flex;align-items:center;' +
    'justify-content:center;transition:background .15s;flex-shrink:0;'
  );
  sendBtn.textContent = '➤';
  sendBtn.onclick = doSend;
  inputRow.appendChild(inp);
  inputRow.appendChild(sendBtn);

  var charCounter = el('div', 'text-align:right;font-size:.7rem;color:#aaa;padding-right:2px;min-height:14px;');
  inputArea.appendChild(inputRow);
  inputArea.appendChild(charCounter);
  win.appendChild(inputArea);

  // Toggle button
  var toggleBtn = el('button',
    'width:56px;height:56px;border-radius:50%;background:' + C.red + ';' +
    'border:none;cursor:pointer;box-shadow:0 4px 20px rgba(179,4,4,.4);' +
    'display:flex;align-items:center;justify-content:center;' +
    'font-size:1.5rem;transition:background .2s,transform .2s;color:#fff;margin-left:auto;'
  );
  toggleBtn.textContent = '💬';
  toggleBtn.title = 'Otevřít asistenta BezKarbonu';
  toggleBtn.onmouseenter = function () { toggleBtn.style.transform = 'scale(1.07)'; };
  toggleBtn.onmouseleave = function () { toggleBtn.style.transform = 'scale(1)'; };
  toggleBtn.onclick = function () { toggle(!isOpen); };

  wrap.appendChild(win);
  wrap.appendChild(toggleBtn);
  document.body.appendChild(wrap);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function avatar(size) {
    var a = el('div',
      'width:' + size + 'px;height:' + size + 'px;background:' + C.red + ';border-radius:50%;' +
      'display:flex;align-items:center;justify-content:center;' +
      'font-size:' + (size * 0.6 / 10) + 'rem;font-weight:900;color:#fff;flex-shrink:0;'
    );
    a.textContent = 'BK';
    return a;
  }

  function renderMsgs() {
    msgsDiv.innerHTML = '';
    msgs.forEach(function (m) {
      var row = el('div', 'display:flex;justify-content:' + (m.role === 'user' ? 'flex-end' : 'flex-start') + ';');
      if (m.role === 'assistant') {
        var av = avatar(28);
        av.style.marginRight = '6px';
        av.style.alignSelf = 'flex-end';
        row.appendChild(av);
      }
      var bubble = el('div',
        'max-width:75%;padding:9px 13px;' +
        'border-radius:' + (m.role === 'user' ? '14px 14px 3px 14px' : '14px 14px 14px 3px') + ';' +
        'background:' + (m.role === 'user' ? C.red : '#fff') + ';' +
        'color:' + (m.role === 'user' ? '#fff' : C.body) + ';' +
        'font-size:.855rem;line-height:1.55;' +
        'box-shadow:0 1px 3px rgba(0,0,0,.08);' +
        'white-space:pre-wrap;word-break:break-word;'
      );
      bubble.className = 'bzk-msg';
      if (m.role === 'assistant') {
        bubble.innerHTML = renderMarkdown(m.content);
      } else {
        bubble.textContent = m.content;
      }
      row.appendChild(bubble);
      msgsDiv.appendChild(row);
    });

    if (isLoading) {
      var row = el('div', 'display:flex;align-items:flex-end;gap:6px;');
      var av = avatar(28);
      var dots = el('div',
        'background:#fff;padding:10px 14px;border-radius:14px 14px 14px 3px;' +
        'box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;gap:5px;align-items:center;'
      );
      [0, 0.2, 0.4].forEach(function (d) {
        var dot = el('span',
          'width:7px;height:7px;background:#ccc;border-radius:50%;display:inline-block;' +
          'animation:bzk-bounce 1.1s infinite ' + d + 's;'
        );
        dots.appendChild(dot);
      });
      row.appendChild(av);
      row.appendChild(dots);
      msgsDiv.appendChild(row);
    }

    suggestDiv.style.display = msgs.length === 1 ? 'flex' : 'none';
    msgsDiv.scrollTop = msgsDiv.scrollHeight;
    updateSendBtn();
  }

  function updateSendBtn() {
    var limited = userMsgCount >= MAX_USER_MSGS;
    var len = inp.value.length;
    var active = inp.value.trim() && !isLoading && !limited;
    sendBtn.style.background = active ? C.red : '#e0e0e0';
    sendBtn.style.cursor = active ? 'pointer' : 'not-allowed';
    inp.disabled = isLoading || limited;
    inp.style.background = (isLoading || limited) ? '#f9f9f9' : '#fff';
    // char counter: show only when nearing the limit
    if (limited) {
      charCounter.textContent = '';
    } else if (len > 400) {
      charCounter.textContent = len + '/' + MAX_INPUT;
      charCounter.style.color = len >= MAX_INPUT ? '#b30404' : '#aaa';
    } else {
      charCounter.textContent = '';
    }
  }

  function toggle(state) {
    isOpen = state;
    win.style.display = isOpen ? 'flex' : 'none';
    toggleBtn.style.background = isOpen ? '#555' : C.red;
    toggleBtn.style.boxShadow = isOpen
      ? '0 4px 20px rgba(0,0,0,.2)'
      : '0 4px 20px rgba(179,4,4,.4)';
    toggleBtn.textContent = isOpen ? '✕' : '💬';
    toggleBtn.title = isOpen ? 'Zavřít chat' : 'Otevřít asistenta BezKarbonu';
    if (isOpen) setTimeout(function () { inp.focus(); }, 100);
  }

  function doSend() {
    var text = inp.value.trim();
    if (!text || isLoading || userMsgCount >= MAX_USER_MSGS) return;
    if (text.length > MAX_INPUT) text = text.slice(0, MAX_INPUT);
    msgs.push({ role: 'user', content: text });
    inp.value = '';
    userMsgCount++;
    isLoading = true;
    renderMsgs();

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: msgs.slice(-10), sessionId: SESSION_ID }),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        msgs.push({ role: 'assistant', content: d.message });
        if (userMsgCount >= MAX_USER_MSGS) {
          msgs.push({ role: 'assistant', content: LIMIT_MSG });
        }
      })
      .catch(function () {
        msgs.push({ role: 'assistant', content: 'Omlouvám se, nastala chyba. Kontaktujte nás na info@bezkarbonu.cz nebo +420 792 767 337.' });
      })
      .then(function () {
        isLoading = false;
        renderMsgs();
        if (userMsgCount < MAX_USER_MSGS) setTimeout(function () { inp.focus(); }, 50);
      });
  }

  renderMsgs();
})();
