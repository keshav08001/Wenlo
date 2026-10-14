/**
 * Welcome to the theme switching matrix! 
 * We got 6 distinct flavors of vibes here. 
 * Warning: reading this code might cause mild chuckling or facepalms.
 * 
 * its like 2 am im tired
 */



// The ultimate dictionary of colors and questionable jokes





const theBigBookOfThemes = {
  lavender: {
    name: "Lavender & Ash",
    primary: "#6D5BD0",
    secondary: "#F5F3FF",
    accent: "#A78BFA",


    vibe: "Soft, elegant, probably smells nice."
  },

  amber: {
    name: "Amber & Onyx",
    primary: "#1F2937",
    secondary: "#FFF7E6",
    accent: "#F59E0B",

    //for wenlo light mode
    "pill-color": "#F59E0B",      

    vibe: "Bold. Confident. Drinks black coffee."
  },

  sage: {
    name: "Sage & Wood",
    primary: "#636A51",
    secondary: "#FCEBD6",
    accent: "#8E6847",


    vibe: "Earthhy af. Owns 14 plants."
    // cat lady vibe 
  },

  ocean: {
    name: "Ocean & Mist",
    primary: "#1E3A8A",
    secondary: "#F8FAFC",
    accent: "#3B82F6",


    vibe: "Clean, focused, slightly wet."
    // watched this weird ahh real like the amt of floors you climb  .. u get progressively wetter or sum shit 
  },



  charcoal: {
    name: "Charcoal & Sand",
    primary: "#1F2937",
    secondary: "#F5F1E6",
    accent: "#64748B",


    vibe: "Modern, minimal."
  },




  red: {
    name: "Red & Ivory",
    primary: "#B91C1C",
    secondary: "#FEF7F5",
    accent: "#F87171",


    vibe: "Spicy. Energetic. Will fight you."
  }



};




// State variables holding our fragile reality together



let currentVibe = 'charcoal'; 

let isLivingInTheDark = true; 

// Because light attracts bugs --- haha get it???? 




/**
 * Unleash the colors onto the poor innocent DOM
 */



function slapThemeOnDom(themeKey, isDark) {

  const theme = theBigBookOfThemes[themeKey];
  const root = document.documentElement;
  





  // Update state so we don't forget who we are
  currentVibe = themeKey;
  isLivingInTheDark = isDark;
  
  localStorage.setItem('wenlo-theme-vibe', themeKey);
  localStorage.setItem('wenlo-theme-mode', isDark ? 'dark' : 'light');

  if (isDark) {
    root.setAttribute('data-theme', 'dark');
    // Dark Mode: Background is super dark (or the primary color if it's very dark), text is secondary



    // For a true "dark mode" landing page feel, let's keep the bg almost black but tint it with the primary color



// ALL ROADS LEAD TO ROME




    root.style.setProperty('--bg', '#0c0c0c');


    root.style.setProperty('--text', theme.secondary);
    root.style.setProperty('--text-muted', theme.accent);



    root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.03)');

    root.style.setProperty('--nav-border', 'rgba(255, 255, 255, 0.08)');
    


//pill stays white in dark mode





    root.style.setProperty('--pill-color', '#ffffff');

    // We'll use primary for the gradient and accents in dark mode



    root.style.setProperty('--magic-gradient-start', theme.primary);
    root.style.setProperty('--magic-gradient-end', theme.accent);

    // Feature section theme accent colors (vibrant and high contrast for dark & light)
    const themeAccents = {
      lavender: { dark: '#A78BFA', light: '#7C3AED' },
      amber:    { dark: '#F59E0B', light: '#D97706' },
      sage:     { dark: '#6E9877', light: '#3F6212' },
      ocean:    { dark: '#3B82F6', light: '#2563EB' },
      charcoal: { dark: '#94A3B8', light: '#475569' },
      red:      { dark: '#EF4444', light: '#B91C1C' }
    };
    const activeAccent = (themeAccents[themeKey] && themeAccents[themeKey].dark) || theme.accent || '#A78BFA';

    root.style.setProperty('--feature-accent', activeAccent);
    root.style.setProperty('--feature-badge-date-color', activeAccent);
    root.style.setProperty('--feature-badge-date-bg', `color-mix(in srgb, ${activeAccent} 15%, transparent)`);
    root.style.setProperty('--feature-tab-inactive-color', activeAccent);
    root.style.setProperty('--feature-card-bg', '#111216');
    root.style.setProperty('--feature-card-border', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--feature-title-color', '#ffffff');
    root.style.setProperty('--feature-text-color', '#ffffff');
    root.style.setProperty('--feature-muted-color', '#94a3b8');
  } else {
    root.setAttribute('data-theme', 'light');


    // Light Mode: Background is secondary (light), text is primary (dark)
    root.style.setProperty('--bg', theme.secondary);
    root.style.setProperty('--text', theme.primary);
    root.style.setProperty('--text-muted', theme.accent);
    root.style.setProperty('--nav-bg', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--nav-border', 'rgba(0, 0, 0, 0.1)');
    root.style.setProperty('--pill-color', theme.primary);

    // Gradients for light mode
    root.style.setProperty('--magic-gradient-start', theme.primary);
    root.style.setProperty('--magic-gradient-end', theme.accent);

    // Feature section theme variables for light mode
    const themeAccents = {
      lavender: { dark: '#A78BFA', light: '#7C3AED' },
      amber:    { dark: '#F59E0B', light: '#D97706' },
      sage:     { dark: '#6E9877', light: '#3F6212' },
      ocean:    { dark: '#3B82F6', light: '#2563EB' },
      charcoal: { dark: '#94A3B8', light: '#475569' },
      red:      { dark: '#EF4444', light: '#B91C1C' }
    };
    const activeAccent = (themeAccents[themeKey] && themeAccents[themeKey].light) || theme.accent || '#7C3AED';

    root.style.setProperty('--feature-accent', activeAccent);
    root.style.setProperty('--feature-badge-date-color', activeAccent);
    root.style.setProperty('--feature-badge-date-bg', `color-mix(in srgb, ${activeAccent} 12%, transparent)`);
    root.style.setProperty('--feature-tab-inactive-color', activeAccent);
    root.style.setProperty('--feature-card-bg', '#ffffff');
    root.style.setProperty('--feature-card-border', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--feature-title-color', '#111827');
    root.style.setProperty('--feature-text-color', '#111827');
    root.style.setProperty('--feature-muted-color', '#64748b');
  }

  // Determine active accent for DOM element styling
  const themeAccentsMap = {
    lavender: { dark: '#A78BFA', light: '#7C3AED' },
    amber:    { dark: '#F59E0B', light: '#D97706' },
    sage:     { dark: '#6E9877', light: '#3F6212' },
    ocean:    { dark: '#3B82F6', light: '#2563EB' },
    charcoal: { dark: '#94A3B8', light: '#475569' },
    red:      { dark: '#EF4444', light: '#B91C1C' }
  };
  const currentAccent = (themeAccentsMap[themeKey] && (isDark ? themeAccentsMap[themeKey].dark : themeAccentsMap[themeKey].light)) || theme.accent || '#7C3AED';

  // Apply accent directly to #features and #roadmap sections scope
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.style.setProperty('--feature-accent', currentAccent);
  }
  const roadmapSection = document.getElementById('roadmap');
  if (roadmapSection) {
    roadmapSection.style.setProperty('--feature-accent', currentAccent);
  }

  // Update all 5 signature card headings ("Every task", "See work", "The right people.", "Deadlines", "Make time for")


  document.querySelectorAll('.purple-text').forEach(el => {
    el.style.color = currentAccent;
  });

  // Update deadline switch if active
  const deadlineSwitch = document.getElementById('deadline-switch');
  if (deadlineSwitch) {
    if (deadlineSwitch.classList.contains('active')) {
      deadlineSwitch.style.backgroundColor = currentAccent;
      deadlineSwitch.style.borderColor = currentAccent;
    } else {
      deadlineSwitch.style.backgroundColor = '';
      deadlineSwitch.style.borderColor = '';
    }
  }

  // Update checked checkboxes
  document.querySelectorAll('.task-checkbox.checked, .task-row.checked .task-checkbox').forEach(cb => {
    cb.style.backgroundColor = currentAccent;
    cb.style.borderColor = currentAccent;
  });

  // Update theme accent badges, dates, arrows, and pomodoro badge

  document.querySelectorAll('.badge-theme-accent, .date-new, .shift-arrow, .pomodoro-badge').forEach(el => {
    el.style.color = currentAccent;
  });

  // Update the toggle buttons UI so the user knows they clicked something
  const darkBtn = document.getElementById('btn-dark-mode');
  const lightBtn = document.getElementById('btn-light-mode');

  if (darkBtn && lightBtn) {
    if (isDark) {
      darkBtn.classList.add('active');
      darkBtn.classList.remove('inactive');
      lightBtn.classList.add('inactive');
      lightBtn.classList.remove('active');
    } else {
      lightBtn.classList.add('active');
      lightBtn.classList.remove('inactive');
      darkBtn.classList.add('inactive');
      darkBtn.classList.remove('active');
    }
  }

  // Update theme selectors

  document.querySelectorAll('.theme-picker-btn').forEach(btn => {
    const btnTheme = btn.getAttribute('data-theme') || btn.dataset.theme;
    if (btnTheme === themeKey) {
      btn.classList.add('selected-theme');
    } else {
      btn.classList.remove('selected-theme');
    }
  });

  console.log(`Theme switched to ${theme.name}. Vibe check: ${theme.vibe}`);
}







// Once the DOM is ready to be manipulated (like my emotions)
//wtf why ... im sleepy


document.addEventListener('DOMContentLoaded', () => {
  // Bind the dark/light toggle buttons





  document.getElementById('btn-dark-mode').addEventListener('click', () => {
    slapThemeOnDom(currentVibe, true);
  });
  






  document.getElementById('btn-light-mode').addEventListener('click', () => {
    slapThemeOnDom(currentVibe, false);
  });
  







                                                           







  





  // Bind the theme picker dots
  document.querySelectorAll('.theme-picker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme') || btn.dataset.theme;
      if (selectedTheme) {
        slapThemeOnDom(selectedTheme, isLivingInTheDark);
      }
    });
  });
  

// bruhhhhhhhhhhhhh









  // Slap the initial theme on load


  const savedVibe = localStorage.getItem('wenlo-theme-vibe') || 'charcoal';
  const savedMode = localStorage.getItem('wenlo-theme-mode');
  const initialDark = savedMode ? savedMode === 'dark' : true;
  slapThemeOnDom(savedVibe, initialDark);









  // --- Scroll Logic ---
  const scrollHint = document.getElementById('scroll-hint');
  const sections = ['#hero-main', '#features', '#roadmap', '#site-footer'];
  
  if (scrollHint) {





    // Click to scroll to next section


    scrollHint.addEventListener('click', () => {
      const windowHeight = window.innerHeight;
      
      for (const selector of sections) {
        const el = document.querySelector(selector);
        if (el) {
          const rect = el.getBoundingClientRect();





          // If the top of the section is below the current viewport center, it's the next section
          if (rect.top > windowHeight / 2) {
            el.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
      }
    });






    // Hide scroll hint when footer is reached ------- this shi imp

    const footer = document.getElementById('site-footer');
    if (footer) {
      window.addEventListener('scroll', () => {
        const rect = footer.getBoundingClientRect();





        
        // If the footer is visible in the viewport
        if (rect.top < window.innerHeight) {
          scrollHint.style.opacity = '0';
          scrollHint.style.pointerEvents = 'none';
        } else {
          scrollHint.style.opacity = '1';
          scrollHint.style.pointerEvents = 'auto';
        }
      });
    }
  }
});
