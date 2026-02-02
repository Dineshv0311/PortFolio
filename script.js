// ===================================
// POSTER DESIGNER PORTFOLIO - JAVASCRIPT
// ===================================

// ===================================
// STATE MANAGEMENT
// ===================================
let posters = [];
let currentFilter = 'all';

// ===================================
// INITIALIZE APP
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  loadPosters();
  renderGallery();
  setupEventListeners();
  setupScrollAnimations();
}

// ===================================
// LOAD POSTERS (8 Provided Images)
// ===================================
function loadPosters() {
  // Using the 8 specific images provided by the user
  const myPosters = [
    {
      id: 1,
      title: 'HACK THE HORIZON',
      description: 'Tech event poster',
      category: 'event',
      image: 'HACK THE HORIZON.jpg'
    },
    {
      id: 2,
      title: 'Opening Ceremony',
      description: 'Event invitation design',
      category: 'event',
      image: 'Opening ceremony.jpg'
    },
    {
      id: 3,
      title: 'VIT Gold',
      description: 'Golden luxury design',
      category: 'branding',
      image: 'vit gold poster.jpg'
    },
    {
      id: 4,
      title: 'Z Flower Shop',
      description: 'Floral shop promotion',
      category: 'branding',
      image: 'z flower shop.jpg'
    },
    {
      id: 5,
      title: 'Be Calm',
      description: 'Typography art poster',
      category: 'concept',
      image: 'DINESH POSTER BE CALM.jpg'
    },
    {
      id: 6,
      title: 'Campus Chronicles',
      description: 'Magazine cover design',
      category: 'branding',
      image: 'CAMPUS CHRONICALS-Magazine cover.jpg'
    },
    {
      id: 7,
      title: 'Vibrance Event',
      description: 'Colorful event page',
      category: 'event',
      image: 'Event page -Vibrance.jpg'
    },
    {
      id: 8,
      title: 'Bottomless Breakfast',
      description: 'Food and dining poster',
      category: 'social',
      image: 'Bottom Less Breakfast.jpg'
    }
  ];

  posters = myPosters;
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
  // Navigation
  setupNavigation();

  // Gallery filters
  setupFilters();

  // Lightbox
  setupLightbox();

  // Contact form
  setupContactForm();

  // Navbar scroll effect
  setupNavbarScroll();
}

// ===================================
// NAVIGATION
// ===================================
function setupNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(10px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Smooth scroll and close menu on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }

      // Close mobile menu
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===================================
// GALLERY RENDERING
// ===================================
function renderGallery() {
  const galleryGrid = document.getElementById('galleryGrid');

  // Filter posters
  const filteredPosters = currentFilter === 'all'
    ? posters
    : posters.filter(poster => poster.category === currentFilter);

  // Clear gallery
  galleryGrid.innerHTML = '';

  // Render posters
  if (filteredPosters.length === 0) {
    galleryGrid.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">No posters found in this category.</p>';
    return;
  }

  filteredPosters.forEach(poster => {
    const posterCard = createPosterCard(poster);
    galleryGrid.appendChild(posterCard);
  });
}

function createPosterCard(poster) {
  const card = document.createElement('div');
  card.className = 'poster-card';
  card.dataset.posterId = poster.id;

  card.innerHTML = `
    <img src="${poster.image}" alt="${poster.title}" class="poster-image">
    <!-- Delete button removed as these are portfolio items -->
    <div class="poster-overlay">
      <h3 class="poster-title">${poster.title}</h3>
      <span class="poster-category">${poster.category}</span>
    </div>
  `;

  // Click to open lightbox
  card.addEventListener('click', () => {
    openLightbox(poster);
  });

  return card;
}

// ===================================
// FILTERS
// ===================================
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update filter
      currentFilter = btn.dataset.filter;

      // Re-render gallery
      renderGallery();
    });
  });
}

// ===================================
// LIGHTBOX
// ===================================
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function openLightbox(poster) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');

  lightboxImage.src = poster.image;
  lightboxTitle.textContent = poster.title;
  lightboxCategory.textContent = poster.category.toUpperCase();

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ===================================
// CONTACT FORM
// ===================================
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    // In a real application, you would send this to a server
    console.log('Contact form submitted:', { name, email, message });

    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);

    contactForm.reset();
  });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function setupScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElements.forEach(el => observer.observe(el));
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🎨 DINESH V Portfolio', 'font-size: 20px; font-weight: bold; color: #00f5ff;');
