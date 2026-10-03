// modal state 

let modalOpen = false;

const SLIDE_IDS_BASE      = ['ob-slide-1', 'ob-slide-2', 'ob-slide-3', 'ob-slide-review', 'ob-slide-4'];

const SLIDE_IDS_WITH_TEAM = ['ob-slide-1', 'ob-slide-2', 'ob-slide-team-code', 'ob-slide-3', 'ob-slide-review', 'ob-slide-4'];

let slideSequence = [...SLIDE_IDS_BASE];

let currentStep   = 0;

const STORAGE_KEY = 'wenlo_ob_draft';


// sequence and dots 


function rebuildSequence() {
  const selectedSizePill = document.querySelector('.ob-size-pill.selected');

  const size = selectedSizePill?.dataset.size || '';

  slideSequence = (size && size !== 'individual') ? [...SLIDE_IDS_WITH_TEAM] : [...SLIDE_IDS_BASE];




  renderDots();
  updateTopBar();
}



function renderDots() {
  const container = document.getElementById('ob-pdots');
  if (!container) return;
  container.innerHTML = '';

  slideSequence.forEach((_, i) => {
    const dot = document.createElement('span');

    dot.className = 'ob-pdot' + (i === currentStep ? ' active' : '');
    dot.dataset.step = i;


    dot.addEventListener('click', () => goToStep(i));
    container.appendChild(dot);
  });
}




function updateTopBar() {




  // Step counter

  const counter = document.getElementById('ob-step-counter');
  if (counter) counter.textContent = `${currentStep + 1} of ${slideSequence.length}`;





  // Back button — hide on slide 1, hide on final slide

  const backBtn = document.getElementById('ob-back-btn');
  if (backBtn) {
    const isFirst = currentStep === 0;
    const isFinal = slideSequence[currentStep] === 'ob-slide-4';
    backBtn.style.display = (isFirst || isFinal) ? 'none' : '';
  }
}














// modal open/close 


let lastCloseTime = 0;

function showModal() {
  if (modalOpen) return;
  modalOpen = true;

  const overlay = document.getElementById('ob-overlay');
  if (!overlay) return;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');

  document.getElementById('hero-main')?.classList.add('hero-recede');
  const hint = document.getElementById('scroll-hint');
  if (hint) {
    hint.style.opacity = '0';
    hint.style.pointerEvents = 'none';
  }

  restoreDraft();
  rebuildSequence();
  goToStep(0);
}

function hideModal() {
  if (!modalOpen) return;
  modalOpen = false;
  lastCloseTime = Date.now();

  const overlay = document.getElementById('ob-overlay');
  if (overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('hero-main')?.classList.remove('hero-recede');
  const hint = document.getElementById('scroll-hint');
  if (hint) {
    hint.style.opacity = '1';
    hint.style.pointerEvents = '';
  }
}










// navigationnn -- navpreeet bitchass
function physicalIndex(slideId) {
  const slides = document.getElementById('ob-slides');
  if (!slides) return 0;
  return Array.from(slides.children).findIndex(el => el.id === slideId);
}

function goToStep(step) {
  currentStep = Math.max(0, Math.min(step, slideSequence.length - 1));
  const targetId = slideSequence[currentStep];
  const phys = physicalIndex(targetId);

  const slidesEl = document.getElementById('ob-slides');
  if (slidesEl) slidesEl.style.transform = `translateX(-${phys * 100}%)`;

  const fill = document.getElementById('ob-progress-fill');
  if (fill) fill.style.width = `${((currentStep + 1) / slideSequence.length) * 100}%`;

  document.querySelectorAll('.ob-pdot').forEach((dot, i) =>
    dot.classList.toggle('active', i === currentStep)
  );

  updateTopBar();







  // Slide-specific side effects
  if (targetId === 'ob-slide-review') populateReview();
  if (targetId === 'ob-slide-4')      triggerFinalSlide();





  // Auto-focus first input
  setTimeout(() => {
    const slide = document.getElementById(targetId);
    const focusable = slide?.querySelector('input, select, button:not(.ob-pw-toggle)');
    focusable?.focus();
  }, 480); // after animation settles
}

function nextStep() {
  if (slideSequence[currentStep] === 'ob-slide-2') rebuildSequence();
  if (currentStep < slideSequence.length - 1) goToStep(currentStep + 1);
}

function prevStep() {
  if (currentStep > 0) goToStep(currentStep - 1);
}






// validation 
function setErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = msg ? 'block' : 'none';
}
function clearErrs(...ids) { ids.forEach(id => setErr(id, '')); }

function shake(el) {
  if (!el) return;
  el.classList.remove('ob-shake');
  void el.offsetWidth;
  el.classList.add('ob-shake');
}

function validateSlide1() {
  const name  = document.getElementById('ob-name')?.value.trim() || '';
  const email = document.getElementById('ob-email')?.value.trim() || '';
  const pw    = document.getElementById('ob-password')?.value || '';
  const terms = document.getElementById('ob-terms-check')?.checked;

  clearErrs('err-name', 'err-email', 'err-password', 'err-terms');
  let ok = true;

  if (!name) {
    setErr('err-name', 'Name is required.');
    shake(document.getElementById('ob-name'));
    ok = false;
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setErr('err-email', 'Email is required.');
    shake(document.getElementById('ob-email'));
    ok = false;
  } else if (!emailRe.test(email)) {
    setErr('err-email', 'Please enter a valid email.');
    shake(document.getElementById('ob-email'));
    ok = false;
  }
  if (!pw || pw.length < 8) {
    setErr('err-password', 'Password must be at least 8 characters.');
    shake(document.getElementById('ob-password'));
    ok = false;
  }
  if (!terms) {
    setErr('err-terms', 'Please accept the terms to continue.');
    shake(document.getElementById('ob-terms-check')?.closest('label'));
    ok = false;
  }
  return ok;
}

function validateSlide2() {
  const workspace = document.getElementById('ob-workspace')?.value.trim() || '';
  const role      = document.getElementById('ob-role')?.value || '';
  const size      = document.querySelector('.ob-size-pill.selected')?.dataset.size || '';

  clearErrs('err-workspace', 'err-role', 'err-size');
  let ok = true;

  if (!workspace) {
    setErr('err-workspace', 'Workspace name is required.');
    shake(document.getElementById('ob-workspace'));
    ok = false;
  }
  if (!role) {
    setErr('err-role', 'Please select your role.');
    shake(document.getElementById('ob-role'));
    ok = false;
  }
  if (!size) {
    setErr('err-size', 'Please select a team size.');
    shake(document.querySelector('.ob-size-pills'));
    ok = false;
  }
  return ok;
}




// validated nexttt 
function nextStepValidated() {
  const current = slideSequence[currentStep];

  if (current === 'ob-slide-1' && !validateSlide1()) return;
  if (current === 'ob-slide-2' && !validateSlide2()) return;

  saveDraft();
  if (current === 'ob-slide-2') rebuildSequence();
  if (currentStep < slideSequence.length - 1) goToStep(currentStep + 1);
}







// password strength 
function passwordStrength(pw) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}






function updatePwStrength() {
  const pw  = document.getElementById('ob-password')?.value || '';
  const bar = document.getElementById('ob-pw-bar');
  if (!bar) return;
  const score = passwordStrength(pw);
  const pct   = pw.length === 0 ? 0 : Math.max(10, (score / 5) * 100);
  bar.style.width = pct + '%';
  bar.dataset.strength = ['', 'weak', 'weak', 'fair', 'good', 'strong'][score] || '';
}






// local storage shiiiii 
function saveDraft() {
  try {
    const data = {
      name:      document.getElementById('ob-name')?.value || '',
      email:     document.getElementById('ob-email')?.value || '',
      workspace: document.getElementById('ob-workspace')?.value || '',
      role:      document.getElementById('ob-role')?.value || '',
      size:      document.querySelector('.ob-size-pill.selected')?.dataset.size || '',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {}
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);

    if (data.name)      { const el = document.getElementById('ob-name');      if (el) el.value = data.name; }
    if (data.email)     { const el = document.getElementById('ob-email');     if (el) el.value = data.email; }
    if (data.workspace) { const el = document.getElementById('ob-workspace'); if (el) el.value = data.workspace; }
    if (data.role)      { const el = document.getElementById('ob-role');      if (el) el.value = data.role; }
    if (data.size) {
      document.querySelectorAll('.ob-size-pill').forEach(p => {
        p.classList.toggle('selected', p.dataset.size === data.size);
      });
    }
  } catch(e) {}
}

function clearDraft() {
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
}





















// review slide 
function populateReview() {
  const inputVal = (id) => (document.getElementById(id)?.value || '').trim() || '—';
  const selectedSizePill = document.querySelector('.ob-size-pill.selected');
  const sizeRaw   = selectedSizePill?.dataset.size || '';
  const sizeLabel = { individual: 'Individual', small: 'Small', large: 'Large', enterprise: 'Enterprise' }[sizeRaw] || '—';
  const roleVal   = document.getElementById('ob-role')?.value || '—';
  const teamCode  = (document.getElementById('ob-team-code')?.value || '').trim();
  const hasTeamCode = slideSequence.includes('ob-slide-team-code');

  setText('rv-name',      inputVal('ob-name'));
  setText('rv-email',     inputVal('ob-email'));
  setText('rv-workspace', inputVal('ob-workspace'));
  setText('rv-role',      roleVal || '—');
  setText('rv-size',      sizeLabel);
  setText('rv-theme',     theBigBookOfThemes[currentVibe]?.name || currentVibe);

  const teamCodeRow = document.getElementById('rv-team-code-row');
  if (teamCodeRow) {
    teamCodeRow.style.display = hasTeamCode ? '' : 'none';
    if (hasTeamCode) setText('rv-team-code', teamCode || 'Skipped');
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}








// FINAL SLIDE — checkmark animation + personalised name












// stuff from below here was with help 











function triggerFinalSlide() {




  // Checkmark pop
  const icon = document.getElementById('ob-check-icon');
  if (icon) {
    icon.classList.remove('pop');
    void icon.offsetWidth;
    icon.classList.add('pop');
  }






  // Personalise name
  const nameInput   = document.getElementById('ob-name');
  const finalNameEl = document.getElementById('ob-final-name');
  if (finalNameEl) {
    const first = (nameInput?.value || '').trim().split(' ')[0];
    finalNameEl.textContent = first || 'friend';
  }






  // Clear saved draft
  clearDraft();
}






// Backward-compat alias
function triggerStep4() { triggerFinalSlide(); }


// DOM ready 
document.addEventListener('DOMContentLoaded', () => {




  // ── "Get started" nav button
  document.getElementById('nav-get-started')?.addEventListener('click', showModal);





  // ── "Scroll to explore" button click
  const scrollHintBtn = document.getElementById('scroll-hint');
  scrollHintBtn?.addEventListener('click', showModal);






  // ── Scroll / Wheel detection to trigger onboarding
  window.addEventListener('wheel', (e) => {
    if (modalOpen || Date.now() - lastCloseTime < 600) return;
    if (e.deltaY > 12 || Math.abs(e.deltaY) > 25) {
      showModal();
    }
  }, { passive: true });







  // ── Touch swipe up to trigger onboarding (mobile / touchscreens)
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (modalOpen || Date.now() - lastCloseTime < 600) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (modalOpen || Date.now() - lastCloseTime < 600) return;
    const deltaY = touchStartY - e.touches[0].clientY;
    if (deltaY > 30) {
      showModal();
    }
  }, { passive: true });






  // ── Keyboard navigation (ArrowDown, PageDown, Space) to trigger onboarding
  window.addEventListener('keydown', (e) => {
    if (modalOpen || Date.now() - lastCloseTime < 600) return;
    const isScrollKey = ['ArrowDown', 'PageDown', ' '].includes(e.key);
    const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
    if (isScrollKey && !isInputActive) {
      if (e.key === ' ') e.preventDefault();
      showModal();
    }
  });






  // ── Native window scroll fallback
  window.addEventListener('scroll', () => {
    if (!modalOpen && Date.now() - lastCloseTime >= 600 && window.scrollY > 10) {
      showModal();
    }
  }, { passive: true });




  // ── Close button
  document.getElementById('ob-close-btn')?.addEventListener('click', hideModal);




  // ── Back button
  document.getElementById('ob-back-btn')?.addEventListener('click', prevStep);




  // ── Overlay background click → close
  document.getElementById('ob-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideModal();
  });





  // ── ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOpen) hideModal();
  });




  // ── Validated Continue buttons (slide 1 + 2 have their own)
  document.getElementById('ob-slide1-next')?.addEventListener('click', nextStepValidated);
  document.getElementById('ob-slide2-next')?.addEventListener('click', nextStepValidated);





  // ── All other generic next buttons (slides 2b, 3, review)
  document.querySelectorAll('.ob-next-btn:not(#ob-slide1-next):not(#ob-slide2-next)').forEach(btn =>
    btn.addEventListener('click', () => { saveDraft(); nextStep(); })
  );










  // ── Skip team-code
  document.getElementById('ob-skip-team-code')?.addEventListener('click', () => {
    const input = document.getElementById('ob-team-code');
    if (input) input.value = '';
    saveDraft();
    nextStep();
  });









  // ── Team size pills
  document.querySelectorAll('.ob-size-pill').forEach(pill =>
    pill.addEventListener('click', () => {
      document.querySelectorAll('.ob-size-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      clearErrs('err-size');
    })
  );

  // ── Theme cards (apply live)










  document.querySelectorAll('.ob-theme-card').forEach(card =>


    card.addEventListener('click', () => slapThemeOnDom(card.dataset.theme, isLivingInTheDark))

    
  );







  // ── Enter key inside inputs → validated next


  document.querySelectorAll('.ob-input').forEach(input =>

    input.addEventListener('keydown', (e) => {

      if (e.key === 'Enter') nextStepValidated();



    })
  );












  // ── Password show/hide toggle
  const pwToggle = document.getElementById('ob-pw-toggle');

  const pwInput  = document.getElementById('ob-password');
  if (pwToggle && pwInput) {


    pwToggle.addEventListener('click', () => {
      const showing = pwInput.type === 'text';
      pwInput.type = showing ? 'password' : 'text';

      pwToggle.querySelector('.pw-eye').style.display     = showing ? '' : 'none';

      pwToggle.querySelector('.pw-eye-off').style.display = showing ? 'none' : '';
    });
  }



















  // Password strength meter


  document.getElementById('ob-password')?.addEventListener('input', updatePwStrength);











  // Auto-clear field errors on input
  const fieldErrMap = {
    'ob-name':      'err-name',
    'ob-email':     'err-email',

    'ob-password':  'err-password',

    'ob-workspace': 'err-workspace',
    'ob-role':      'err-role',
  };


  Object.entries(fieldErrMap).forEach(([inputId, errId]) => {

    document.getElementById(inputId)?.addEventListener('input',
         () => clearErrs(errId));
  });



  document.getElementById('ob-terms-check')?.addEventListener('change', 
    () => clearErrs('err-terms'));
});




















/**
 * onboarding.js — Wenlo Landing

 *  - Auto-focus first focusable element on slide enter
 *  - localStorage draft-save (survives refresh)
 *
 * Depends on themes.js: theBigBookOfThemes, currentVibe, isLivingInTheDark, slapThemeOnDom
 */
