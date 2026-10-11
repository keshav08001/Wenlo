import Image from "next/image";

export default function Home() {
  return (
    <>
  
      {/* floating pill navbar -- looks cool */}
      <div className="nav-wrapper">
        <nav className="pill-nav" aria-label="Main-nav">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#roadmap" className="nav-link">
            Roadmap
          </a>
          <a href="comming_soon.html" className="nav-btn nav-btn-outline">
            Test Beta
          </a>
        </nav>
        <div className="pill-nav-standalone">
          <a href="#newsletter-form" className="nav-btn nav-btn-solid" id="nav-get-started">
            Join waitlist
          </a>
        </div>
      </div>

      {/* Theme Toggle Bottom Left */}
      <div className="theme-controls">
        <div className="theme-toggle">
          <button id="btn-dark-mode" className="theme-btn active">Dark</button>
          <button id="btn-light-mode" className="theme-btn inactive">Light</button>
        </div>

        <div className="theme-picker">
          <button className="theme-picker-btn" data-theme="lavender" style={{ background: '#6D5BD0' }} title="Lavender & Ash"></button>
          <button className="theme-picker-btn" data-theme="amber" style={{ background: '#F59E0B' }} title="Amber & Onyx"></button>
          <button className="theme-picker-btn" data-theme="sage" style={{ background: '#636A51' }} title="Sage & Wood"></button>
          <button className="theme-picker-btn" data-theme="ocean" style={{ background: '#3B82F6' }} title="Ocean & Mist"></button>
          <button className="theme-picker-btn" data-theme="charcoal" style={{ background: '#64748B' }} title="Charcoal & Sand"></button>
          <button className="theme-picker-btn" data-theme="red" style={{ background: '#B91C1C' }} title="Red & Ivory"></button>
        </div>
      </div>

      <button className="scroll-hint" id="scroll-hint" type="button" aria-label="Scroll or click to start onboarding">
        <span>Scroll to explore</span>
        <span className="scroll-dot" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <main className="main-shiiii" id="hero-main">
        {/* Center Logo & Subtitle */}
        <div className="hero-center">
          <h1 className="logo-large">WENLO<span className="copyright">©</span></h1>
          <p className="subtitle">A task manager alternative for <span className="pill-highlight">teams that ship</span></p>
        </div>

        {/* orbiting/floating thingy */}
        <div className="orbit-container">
          <div className="float-card card-1">
            <div className="card-header"><span className="dot red"></span> Design system</div>
            <div className="card-line"></div>
            <div className="card-line short"></div>
          </div>
          <div className="float-card card-2">
            <div className="card-header"><span className="dot yellow"></span> API Specs</div>
            <div className="card-line"></div>
          </div>
          <div className="float-card card-3">
            <div className="card-header"><span className="dot green"></span> Launch prep</div>
            <div className="card-line"></div>
            <div className="card-line"></div>
          </div>
          <div className="float-card card-4 dark-card">
            <div className="card-header">Weekly Sync</div>
            <div className="card-date">Tomorrow, 10 AM</div>
          </div>
          <div className="float-card card-5">
            <div className="card-header"><span className="dot blue"></span> Database schema</div>
            <div className="card-line"></div>
          </div>
          <div className="float-card card-6 image-card">
            <div className="img-placeholder"></div>
          </div>

          <div className="float-card card-7 blur-card">
            <div className="card-line"></div>
          </div>
          <div className="float-card card-8 blur-card">
            <div className="card-header">Q3 Goals</div>
          </div>
          <div className="float-card card-9 blur-card">
            <div className="card-line"></div>
            <div className="card-line short"></div>
          </div>
          <div className="float-card card-10 blur-card">
            <div className="img-placeholder"></div>
          </div>
          <div className="float-card card-11 blur-card">
            <div className="card-header">Hire designer</div>
          </div>
          <div className="float-card card-12 blur-card">
            <div className="card-line"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="landing-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <h2 className="section-title" style={{ fontSize: '4rem', margin: '0' }}>Features <span className="pill-highlight">(coming soon)</span></h2>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="landing-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
        <h2 className="section-title" style={{ fontSize: '4rem', margin: '0' }}>Roadmap <span className="pill-highlight">(being paved)</span></h2>
      </section>

      <footer className="wenlo-footer" id="site-footer">
        <div className="footer-bg-text" aria-hidden="true">WENLO</div>
        <div className="footer-content">
          <div className="footer-newsletter">
            <div className="newsletter-card">
              <h3>Don't miss out</h3>
              <p>Enter your email for news and updates</p>
              <div className="newsletter-form" id="newsletter-form">
                <input type="email" id="waitlist-email-input" placeholder="Enter your email" aria-label="Email address" />
                <button id="waitlist-submit-btn" aria-label="Submit email">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="footer-links-wrapper">
            <div className="footer-col">
              <h4>GET STARTED</h4>
              <ul>
                <li><a href="comming_soon.html">Overview</a></li>
                <li><a href="comming_soon.html">Download</a></li>
                <li><a href="comming_soon.html">Pricing</a></li>
                <li><a href="comming_soon.html">Enterprise</a></li>
                <li><a href="comming_soon.html">Account</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>LEARN</h4>
              <ul>
                <li><a href="comming_soon.html">Help</a></li>
                <li><a href="comming_soon.html">Developers</a></li>
                <li><a href="comming_soon.html">Changelog</a></li>
                <li><a href="comming_soon.html">About</a></li>
                <li><a href="comming_soon.html">Roadmap</a></li>
                <li><a href="comming_soon.html">Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>RESOURCES</h4>
              <ul>
                <li><a href="comming_soon.html">System status</a></li>
                <li><a href="comming_soon.html">License overview</a></li>
                <li><a href="comming_soon.html">Brand guidelines</a></li>
                <li><a href="comming_soon.html">Terms of service</a></li>
                <li><a href="comming_soon.html">Privacy policy</a></li>
                <li><a href="comming_soon.html">Security</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="comming_soon.html">Support</a></li>
                <li><a href="comming_soon.html">instagram</a></li>
                <li><a href="comming_soon.html">X</a></li>
                <li><a href="comming_soon.html">Discord</a></li>
                <li><a href="comming_soon.html">Forum</a></li>
                <li><a href="comming_soon.html">Linkedin</a></li>
                <li><a href="comming_soon.html">Threads</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <script src="/themes.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const emailInput = document.getElementById('waitlist-email-input');
            const submitBtn = document.getElementById('waitlist-submit-btn');

            if (submitBtn && emailInput) {
              submitBtn.addEventListener('click', () => {
                const email = emailInput.value.trim();
                if (email) {
                  let waitlist = JSON.parse(localStorage.getItem('wenlo_waitlist') || '[]');
                  if (!waitlist.includes(email)) {
                    waitlist.push(email);
                    localStorage.setItem('wenlo_waitlist', JSON.stringify(waitlist));
                    alert("Thanks! We've added " + email + " to the waitlist.");
                  } else {
                    alert("You're already on the waitlist!");
                  }
                  emailInput.value = '';
                }
              });

              emailInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                  submitBtn.click();
                }
              });
            }

            const navGetStarted = document.getElementById('nav-get-started');
            if (navGetStarted) {
              navGetStarted.addEventListener('click', function(e) {
                const target = document.getElementById('newsletter-form');
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => emailInput.focus(), 800);
                }
              });
            }
          `,
        }}
      />
    </>
  );
}
