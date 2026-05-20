document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MOBILE NAVIGATION MENU
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Active navigation highlighting & Scrolled Navbar
  const navbar = document.querySelector('header.navbar');
  const sections = document.querySelectorAll('section');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Spy for nav links
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. MOUSE TRACKING GLOW EFFECT (SERVICE CARDS)
  // ==========================================
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================
  // 3. TEMPLATE GALLERY FILTER
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const templateCards = document.querySelectorAll('.template-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      templateCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          // Brief timeout to trigger transition
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // Add hidden class after visual exit
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });


  // ==========================================
  // 5. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 6. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('project-inquiry-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 38 38" stroke="#fff" style="animation: rotate 1s linear infinite">
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18"/>
            </g>
          </g>
        </svg> Sending Request...
      `;

      // Simulate API submit delay
      setTimeout(() => {
        // Clear Form fields
        const nameVal = document.getElementById('form-name').value;
        contactForm.reset();
        
        // Display nice customized notification banner
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `🌟 Thank you, <strong>${nameVal}</strong>! Your inquiry was successfully transmitted to VK Reddy Web Services. Our consulting architect will reach out within 2 hours.`;
        
        // Reset status message after 10 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 10000);
      }, 1500);
    });
  }
});

// Adding micro-rotator keyframe to document dynamically for loader svg
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleTag);
