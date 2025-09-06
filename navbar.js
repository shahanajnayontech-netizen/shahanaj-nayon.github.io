// navbar.js - Enhanced Navbar Functionality
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const header = document.getElementById("main-header");

  // Scroll spy effect
  function changeActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    
    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[i].classList.add("active");
        
        // Update URL hash without scrolling
        if (history.pushState) {
          history.pushState(null, null, `#${section.id}`);
        }
      }
    });
    
    // Header size effect on scroll
    if (window.scrollY > 100) {
      header.classList.add('compact');
    } else {
      header.classList.remove('compact');
    }
  }
  
  // Initial call
  changeActiveLink();
  
  // Throttle scroll events for performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        changeActiveLink();
      }, 100);
    }
  });

  // Toggle menu
  function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    navbar.classList.toggle("show");
    hamburger.classList.toggle("open");
    hamburger.setAttribute('aria-expanded', !isExpanded);
  }

  hamburger.addEventListener("click", toggleMenu);
  
  // Close menu on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        navbar.classList.remove("show");
        hamburger.classList.remove("open");
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = navbar.contains(e.target) || hamburger.contains(e.target);
    
    if (window.innerWidth <= 900 && navbar.classList.contains("show") && !isClickInsideNav) {
      navbar.classList.remove("show");
      hamburger.classList.remove("open");
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
      hamburger.classList.remove("open");
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Initialize page based on URL hash
  function initFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        setTimeout(() => {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }
  
  // Call on initial load
  window.addEventListener('load', initFromHash);
});