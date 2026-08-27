(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var chipWrap = document.getElementById('translator-chips');
  if (chipWrap) {
    var examples = [
      {
        label: 'Abdominal pain',
        patient: '"Ninaumwa sehemu ya juu katikati ya tumbo, siku tatu sasa."',
        rows: [
          ['Chief complaint', 'Abdominal pain'],
          ['Location', 'Epigastric'],
          ['Onset', '3 days'],
          ['Character', 'Burning'],
          ['Severity', '6/10']
        ]
      },
      {
        label: 'Loose stool',
        patient: '"Nimekuwa nikitoa choo nyepesi mara tatu kwa siku, siku mbili sasa."',
        rows: [
          ['Diarrhoea', '3 episodes/day'],
          ['Consistency', 'Watery'],
          ['Duration', '2 days'],
          ['Blood in stool', 'Denied']
        ]
      },
      {
        label: 'Headache',
        patient: '"Kichwa kinauma mbele, tangu jana."',
        rows: [
          ['Headache', 'Frontal'],
          ['Duration', '2 days'],
          ['Severity', '5/10'],
          ['Associated symptoms', 'None reported']
        ]
      },
      {
        label: 'Fever',
        patient: '"Nimekuwa na homa na baridi kwa siku mbili, sijala vizuri."',
        rows: [
          ['Chief complaint', 'Fever'],
          ['Duration', '2 days'],
          ['Associated symptoms', 'Chills, reduced appetite'],
          ['Red flag screen', 'Negative']
        ]
      }
    ];

    var panelPatient = document.getElementById('panel-patient');
    var panelClinical = document.getElementById('panel-clinical');
    var status = document.getElementById('translator-status');
    var chips = [];

    function renderClinical(rows) {
      panelClinical.innerHTML = '';
      rows.forEach(function (pair, i) {
        var row = document.createElement('div');
        row.className = 'row';
        row.style.animationDelay = (i * 0.12) + 's';
        row.innerHTML = '<span class="k">' + pair[0] + '</span><span class="v">' + pair[1] + '</span>';
        panelClinical.appendChild(row);
      });
    }

    function selectExample(index, chipEl) {
      var ex = examples[index];
      panelPatient.textContent = ex.patient;
      renderClinical(ex.rows);
      status.textContent = 'Structured in real time';
      chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      if (chipEl) chipEl.setAttribute('aria-pressed', 'true');
    }

    examples.forEach(function (ex, i) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = ex.label;
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', function () { selectExample(i, chip); });
      chipWrap.appendChild(chip);
      chips.push(chip);
    });

    selectExample(0, chips[0]);
  }

  var bodySvg = document.querySelector('.body-svg');
  if (bodySvg) {
    var bodyAsk = document.getElementById('body-ask');
    var bodyFollow = document.getElementById('body-followups');
    var regions = {
      head: {
        sw: 'Kunauma kichwa?', en: 'Does your head hurt?',
        follow: [
          ['Imeanza lini?', 'When did it start?'],
          ['Ni kali au ya wastani?', 'Severe or mild?'],
          ['Kuna dalili nyingine?', 'Any other symptoms?']
        ]
      },
      chest: {
        sw: 'Kunauma kifuanii?', en: 'Do you have chest pain?',
        follow: [
          ['Ni mahali gani hasa?', 'Exactly where?'],
          ['Unakwama kupumua?', 'Trouble breathing?'],
          ['Ni ya endelea au ya mara kwa mara?', 'Constant or comes and goes?']
        ]
      },
      abdomen: {
        sw: 'Unauma sehemu gani ya tumbo?', en: 'Where in your belly does it hurt?',
        follow: [
          ['Ni ya endelea au ya mara kwa mara?', 'Constant or intermittent?'],
          ['Kuna cho chairembo au kupunguza?', 'Anything that makes it worse or better?'],
          ['Umepata na kichefuchefu?', 'Any nausea?']
        ]
      },
      pelvis: {
        sw: 'Unauma sehemu ya chini ya tumbo?', en: 'Pain low in the belly / pelvis?',
        follow: [
          ['Kuna uwezo wa kutoa au kuhara?', 'Any bladder or bowel changes?'],
          ['Kwa wanawake — hedhi iko sawa?', 'For women — period normal?']
        ]
      },
      armL: {
        sw: 'Mkono huu unauma?', en: 'Does this arm hurt?',
        follow: [
          ['Ni mahali gani hasa?', 'Exactly where?'],
          ['Uwezo wa kuinua umepungua?', 'Hard to lift it?'],
          ['Kuna uvimbe?', 'Any swelling?']
        ]
      },
      armR: {
        sw: 'Mkono huu unauma?', en: 'Does this arm hurt?',
        follow: [
          ['Ni mahali gani hasa?', 'Exactly where?'],
          ['Uwezo wa kuinua umepungua?', 'Hard to lift it?'],
          ['Kuna uvimbe?', 'Any swelling?']
        ]
      },
      legL: {
        sw: 'Mguu huu unauma?', en: 'Does this leg hurt?',
        follow: [
          ['Ni mahali gani hasa?', 'Exactly where?'],
          ['Unashindwa kusimama?', 'Hard to stand on it?'],
          ['Kuna rangi tofauti ya ngozi?', 'Skin colour change?']
        ]
      },
      legR: {
        sw: 'Mguu huu unauma?', en: 'Does this leg hurt?',
        follow: [
          ['Ni mahali gani hasa?', 'Exactly where?'],
          ['Unashindwa kusimama?', 'Hard to stand on it?'],
          ['Kuna rangi tofauti ya ngozi?', 'Skin colour change?']
        ]
      }
    };

    function selectRegion(key, el) {
      var data = regions[key];
      if (!data) return;
      bodySvg.querySelectorAll('.body-marker').forEach(function (r) { r.classList.remove('is-active'); });
      if (el) el.classList.add('is-active');
      bodyAsk.innerHTML = data.sw + '<span class="en">' + data.en + '</span>';
      bodyFollow.innerHTML = '';
      data.follow.forEach(function (pair) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="sw">' + pair[0] + '</span>' + pair[1];
        bodyFollow.appendChild(li);
      });
    }

    bodySvg.querySelectorAll('.body-marker').forEach(function (region) {
      var key = region.getAttribute('data-region');
      region.addEventListener('click', function () { selectRegion(key, region); });
      region.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectRegion(key, region); }
      });
    });
  }

  var form = document.getElementById('contact-form');
  if (form) {
    var statusEl = document.getElementById('form-status');
    var nameEl = document.getElementById('name');

    var FORM_ENDPOINT = 'https://formspree.io/f/xrpgzwpg';
    var formConfigured = FORM_ENDPOINT.indexOf('YOUR_FORM_ID') === -1;

    function syncSelect(root) {
      var native = root.querySelector('select');
      var valueEl = root.querySelector('[data-select-value]');
      if (!native || !valueEl) return;
      root.querySelectorAll('[role="option"]').forEach(function (o) {
        var match = o.getAttribute('data-value') === native.value;
        o.setAttribute('aria-selected', match ? 'true' : 'false');
        if (match) valueEl.textContent = o.textContent;
      });
    }
    function syncAllSelects() {
      document.querySelectorAll('[data-select]').forEach(syncSelect);
    }
    form.addEventListener('reset', function () { setTimeout(syncAllSelects, 0); });

    function done(name, msg) {
      statusEl.style.color = '#24392C';
      statusEl.textContent = 'Thanks' + (name ? ', ' + name : '') + msg;
      form.reset();
      syncAllSelects();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        statusEl.textContent = 'Please fill in the required fields before sending.';
        statusEl.style.color = '#9C5B2E';
        return;
      }
      var name = nameEl.value.trim();
      var payload = {
        name: name,
        email: document.getElementById('email').value.trim(),
        org: document.getElementById('org').value.trim(),
        reason: document.getElementById('reason').value,
        message: document.getElementById('message').value.trim()
      };

      if (!formConfigured) {
        done(name, ' — your message is ready. Add a free backend (Formspree/Web3Forms) to start receiving it.');
        return;
      }

      statusEl.style.color = '#24392C';
      statusEl.textContent = 'Sending…';
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (res) {
          if (res && (res.ok || res.success)) {
            done(name, ', your message is on its way — we\'ll be in touch soon.');
          } else {
            throw new Error('rejected');
          }
        })
        .catch(function () {
          done(name, ' — your message is ready, but we couldn\'t send it just now. Please email us directly.');
        });
    });
  }

  document.querySelectorAll('[data-select]').forEach(function (root) {
    var trigger = root.querySelector('.select-trigger');
    var menu = root.querySelector('.select-menu');
    var valueEl = root.querySelector('[data-select-value]');
    var native = root.querySelector('select');
    var options = Array.prototype.slice.call(menu.querySelectorAll('[role="option"]'));
    if (!trigger || !menu || !options.length) return;

    function open() {
      root.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      var sel = menu.querySelector('[aria-selected="true"]') || options[0];
      sel.scrollIntoView({ block: 'nearest' });
    }
    function close() {
      root.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
    function select(opt) {
      options.forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
      opt.setAttribute('aria-selected', 'true');
      valueEl.textContent = opt.textContent;
      if (native) native.value = opt.getAttribute('data-value');
      close();
    }
    function setActive(i) {
      options.forEach(function (o, j) { o.classList.toggle('is-active', j === i); });
    }
    function selectedIndex() {
      for (var i = 0; i < options.length; i++) {
        if (options[i].getAttribute('aria-selected') === 'true') return i;
      }
      return 0;
    }

    trigger.addEventListener('click', function () {
      root.classList.contains('is-open') ? close() : open();
    });
    options.forEach(function (opt) {
      opt.addEventListener('click', function () { select(opt); });
      opt.addEventListener('mouseenter', function () { setActive(options.indexOf(opt)); });
    });
    trigger.addEventListener('keydown', function (e) {
      var idx = selectedIndex();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!root.classList.contains('is-open')) { open(); }
        else { var n = Math.min(options.length - 1, idx + 1); setActive(n); options[n].scrollIntoView({ block: 'nearest' }); }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        var p = Math.max(0, idx - 1); setActive(p); options[p].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (root.classList.contains('is-open')) { select(options[idx]); } else { open(); }
      } else if (e.key === 'Escape') {
        close();
      } else if (e.key === 'Home') {
        e.preventDefault(); setActive(0);
      } else if (e.key === 'End') {
        e.preventDefault(); setActive(options.length - 1);
      }
    });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
    });
    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) {
        root.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

})();