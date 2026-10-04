
/**
 * dashboard.js — Wenlo Dashboard Logic
 * Handles: greeting, theme switching, to-do interactions, modal
 */


// theme engine

// this is the same copy pasted shit 






const THEMES = {
  lavender: { name: "Lavender & Ash", accent: "#6D5BD0", accentSoft: "rgba(109,91,208,0.15)" },
  amber:    { name: "Amber & Onyx",   accent: "#F59E0B", accentSoft: "rgba(245,158,11,0.15)" },

  sage:     { name: "Sage & Wood",    accent: "#636A51", accentSoft: "rgba(99,106,81,0.15)"  },
  ocean:    { name: "Ocean & Mist",   accent: "#3B82F6", accentSoft: "rgba(59,130,246,0.15)" },
  charcoal: { name: "Charcoal & Sand",accent: "#64748B", accentSoft: "rgba(100,116,139,0.15)"},

  red:      { name: "Red & Ivory",    accent: "#B91C1C", accentSoft: "rgba(185,28,28,0.15)"  },
};





let currentTheme = "charcoal";
let isDark = true;



function applyTheme(themeKey, dark) {

  const t = THEMES[themeKey] ?? THEMES.charcoal;
  currentTheme = themeKey;

  isDark = dark;




  const root = document.documentElement;

  root.setAttribute("data-theme", dark ? "dark" : "light");





  // Push accent tokens
  root.style.setProperty("--accent-primary", t.accent);
  root.style.setProperty("--accent-soft", t.accentSoft);






  // Update toggle button states
  document.getElementById("btn-dark-mode")?.classList.toggle("active",  dark);
  document.getElementById("btn-dark-mode")?.classList.toggle("inactive", !dark);

  document.getElementById("btn-light-mode")?.classList.toggle("active",  !dark);
  document.getElementById("btn-light-mode")?.classList.toggle("inactive", dark);





  // Mark selected swatch
  document.querySelectorAll(".theme-picker-btn").forEach(btn => {

    btn.classList.toggle("selected-theme", btn.dataset.theme === themeKey);
  });






  // Persist preference
  try {
    localStorage.setItem("wenlo-theme", themeKey);

    localStorage.setItem("wenlo-dark", dark ? "1" : "0");
  } 
  
  
  catch (_) {

  }




}






// greeting 


// Daily prompts are all ai made cuz im too tired to think of some 

const DAILY_PROMPTS = [
  "Do you lean more optimistic or realistic when making decisions?",
  "What's one thing you'd automate if you could?",

  "What skill do you most want to develop this quarter?",
  "How do you recharge after an intense work sprint?",

  "What's the best piece of feedback you've ever received?",
];
















// the entire prompt thingy is ai cuz i needed sum shit to fill up space

// this will be turned into the daily login function 


function updateGreeting() {


  const now = new Date();



  const h = now.getHours();


  let salutation = "Good morning";
  if (h >= 12 && h < 17) salutation = "Good afternoon";
  else if (h >= 17) salutation = "Good evening";

  const greetingEl = document.getElementById("greeting-text");
  const nameEl     = document.getElementById("greeting-name");

  if (greetingEl && nameEl) {
    greetingEl.firstChild.textContent = salutation + ", ";
  }




  const dateEl = document.getElementById("greeting-date");
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  }




  // Pick a daily prompt based on day of year



  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const promptEl = document.getElementById("prompt-question");
  if (promptEl) {
    promptEl.textContent = DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
  }
}











// todo interations

function toggleTodoItem(li) {
  const isDoneNow = li.dataset.done === "true";
  const newState = !isDoneNow;

  li.dataset.done = newState ? "true" : "false";
  li.classList.toggle("done", newState);

  const checkBtn = li.querySelector(".todo-check");
  if (newState) {
    checkBtn.classList.remove("empty");
    checkBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  } else {
    checkBtn.classList.add("empty");
    checkBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}











function addTodoItem(text) {
  if (!text.trim()) return;
  const list = document.getElementById("todo-list");
  const li = document.createElement("li");
  li.className = "todo-item new-item";
  li.dataset.done = "false";
  li.innerHTML = `
    <button class="todo-check empty" aria-label="Mark complete">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg>
    </button>
    <span class="todo-text">${escapeHtml(text)}</span>`;
  list.appendChild(li);

  li.querySelector(".todo-check").addEventListener("click", () => toggleTodoItem(li));

  // Remove animation class after it plays
  li.addEventListener("animationend", () => li.classList.remove("new-item"), { once: true });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}





// modal 
function openModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.getElementById("new-task-input")?.focus();
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  const input = document.getElementById("new-task-input");
  if (input) input.value = "";
}

function confirmModal() {
  const input = document.getElementById("new-task-input");
  const val = input?.value ?? "";
  addTodoItem(val);
  closeModal();
}












// notification dot 
function updateNotifDot() {
  const val = parseInt(document.getElementById("val-notifications")?.textContent ?? "0", 10);
  const dot = document.getElementById("notif-dot");
  if (dot) dot.classList.toggle("visible", val > 0);
}


// init 
document.addEventListener("DOMContentLoaded", () => {

  // Load saved prefs
  let savedTheme = "charcoal";
  let savedDark  = true;
  try {
    savedTheme = localStorage.getItem("wenlo-theme") ?? "charcoal";
    savedDark  = localStorage.getItem("wenlo-dark") !== "0";
  } catch (_) {}
  applyTheme(savedTheme, savedDark);

  // Greeting + prompt
  updateGreeting();

  // Notification dot
  updateNotifDot();

  // Theme toggles
  document.getElementById("btn-dark-mode")?.addEventListener("click",  () => applyTheme(currentTheme, true));
  document.getElementById("btn-light-mode")?.addEventListener("click", () => applyTheme(currentTheme, false));

  // Theme swatches
  document.querySelectorAll(".theme-picker-btn").forEach(btn => {
    btn.addEventListener("click", () => applyTheme(btn.dataset.theme, isDark));
  });

  // Wire up existing todo item checks
  document.querySelectorAll(".todo-item").forEach(li => {
    li.querySelector(".todo-check")?.addEventListener("click", () => toggleTodoItem(li));
  });

  // Add task button → open modal
  document.getElementById("btn-add-todo")?.addEventListener("click", openModal);

  // Modal actions
  document.getElementById("btn-cancel-modal")?.addEventListener("click", closeModal);
  document.getElementById("btn-confirm-modal")?.addEventListener("click", confirmModal);

  // Close on overlay click
  document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Confirm on Enter
  document.getElementById("new-task-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") confirmModal();
    if (e.key === "Escape") closeModal();
  });






  // Keyboard shortcut: N to add task from anywhere (when not in an input)



  document.addEventListener("keydown", (e) => {
    if (e.key === "n" && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      openModal();
    }
  });





  // Prompt answer button (cosmetic)


  document.getElementById("btn-answer-prompt")?.addEventListener("click", () => {
    const btn = document.getElementById("btn-answer-prompt");
    btn.textContent = "Thanks! ✓";
    btn.disabled = true;
    btn.style.opacity = "0.6";
  });




  // Feedback buttons (cosmetic toasts)
  document.getElementById("btn-roadmap")?.addEventListener("click", () => {
    showToast("Roadmap coming soon — we're cooking 🍳");
  });



  document.getElementById("btn-share-feedback")?.addEventListener("click", () => {
    showToast("Feedback form coming soon!");
  });


});




// tiny toast
function showToast(msg) {







  // Remove existing
  document.querySelector(".wenlo-toast")?.remove();





  const t = document.createElement("div");


  t.className = "wenlo-toast";
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    background: var(--text); color: var(--bg);
    padding: 0.6rem 1.25rem; border-radius: 99px;
    font-family: var(--font); font-size: 0.82rem; font-weight: 600;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 999;
    animation: toastIn 0.2s ease forwards;
  `;




  document.body.appendChild(t);




  const style = document.createElement("style");
  style.textContent = `
    @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(8px); }
     to
      { opacity:1; transform:translateX(-50%) translateY(0); } }




    @keyframes toastOut { to { opacity:0; transform:translateX(-50%) translateY(8px); } }
  `;



  document.head.appendChild(style);

  setTimeout(() => {

    t.style.animation = "toastOut 0.2s ease forwards";


    t.addEventListener("animationend", () => t.remove(), { once: true });

  }, 2500);
}
