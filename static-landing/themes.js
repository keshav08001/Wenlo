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


    vibe: "Bold. Confident. Drinks black coffee."
  },

  sage: {
    name: "Sage & Wood",
    primary: "#636A51",
    secondary: "#FCEBD6",
    accent: "#8E6847",


    vibe: "Earth mother. Does yoga. Owns 14 plants."
    // cat lady vibe 
  },

  ocean: {
    name: "Ocean & Mist",
    primary: "#1E3A8A",
    secondary: "#F8FAFC",
    accent: "#3B82F6",


    vibe: "Clean, focused, slightly wet."
  },



  charcoal: {
    name: "Charcoal & Sand",
    primary: "#1F2937",
    secondary: "#F5F1E6",
    accent: "#64748B",


    vibe: "Modern, minimal, not for grilling."
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
  




  if (isDark) {
    // Dark Mode: Background is super dark (or the primary color if it's very dark), text is secondary



    // For a true "dark mode" landing page feel, let's keep the bg almost black but tint it with the primary color





// ALL ROADS LEAD TO ROME





    root.style.setProperty('--bg', '#0c0c0c');


    root.style.setProperty('--text', theme.secondary);
    root.style.setProperty('--text-muted', theme.accent);



    root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.03)');

    root.style.setProperty('--nav-border', 'rgba(255, 255, 255, 0.08)');
    
    // We'll use primary for the gradient and accents in dark mode



    root.style.setProperty('--magic-gradient-start', theme.primary);



    root.style.setProperty('--magic-gradient-end', theme.accent);
  } else {





    // Light Mode: Background is secondary (light), text is primary (dark)


    root.style.setProperty('--bg', theme.secondary);
    root.style.setProperty('--text', theme.primary);

    root.style.setProperty('--text-muted', theme.accent);



    root.style.setProperty('--nav-bg', 'rgba(0, 0, 0, 0.05)');
    root.style.setProperty('--nav-border', 'rgba(0, 0, 0, 0.1)');
    
    // Gradients for light mode


    root.style.setProperty('--magic-gradient-start', theme.primary);
    root.style.setProperty('--magic-gradient-end', theme.accent);
  }
  



  // Update the toggle buttons UI so the user knows they clicked something
  const darkBtn = document.getElementById('btn-dark-mode');


  const lightBtn = document.getElementById('btn-light-mode');
  


  if (isDark) {
    darkBtn.classList.add('active');

    darkBtn.classList.remove('inactive');
    lightBtn.classList.add('inactive');

    lightBtn.classList.remove('active');
  } 
  



  
  
  else {
    lightBtn.classList.add('active');

    lightBtn.classList.remove('inactive');
    darkBtn.classList.add('inactive');

    darkBtn.classList.remove('active');
  }

  // Update theme selectors

  
  document.querySelectorAll('.theme-picker-btn').forEach(btn => {
    
    
    


    
    if (btn.dataset.theme === themeKey) {
      btn.classList.add('selected-theme');
    } 
    
    
    else {
      btn.classList.remove('selected-theme');
    }
  });


//oke



  console.log(`Theme switched to ${theme.name}. Vibe check: ${theme.vibe}`);
}




// Once the DOM is ready to be manipulated (like my emotions)
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

    btn.addEventListener('click', (e) => {

      const selectedTheme = e.target.dataset.theme;

      slapThemeOnDom(selectedTheme, isLivingInTheDark);
    });
  });
  

// bruhhhhhhhhhhhhh




  // Slap the initial theme on load
  slapThemeOnDom('charcoal', true);
});
