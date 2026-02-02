// ===================================
// POSTER DESIGNER PORTFOLIO - JAVASCRIPT
// ===================================

// ===================================
// STATE MANAGEMENT
// ===================================
let posters = [];
let currentFilter = 'all';
let uploadedFile = null;

// ===================================
// INITIALIZE APP
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  loadPostersFromStorage();
  renderGallery();
  setupEventListeners();
  setupScrollAnimations();
  addSamplePosters();
}

// ===================================
// SAMPLE POSTERS (Initial Gallery)
// ===================================
function addSamplePosters() {
  // Only add sample posters if storage is empty
  if (posters.length === 0) {
    const samplePosters = [
      {
        id: Date.now() + 1,
        title: 'Music Festival 2026',
        description: 'Summer music festival poster with vibrant colors',
        category: 'event',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop'
      },
      {
        id: Date.now() + 2,
        title: 'Climate Action Now',
        description: 'Social awareness campaign poster',
        category: 'social',
        image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=600&fit=crop'
      },
      {
        id: Date.now() + 3,
        title: 'Brand Identity Launch',
        description: 'Corporate branding poster',
        category: 'branding',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop'
      },
      {
        id: Date.now() + 4,
        title: 'Abstract Dreams',
        description: 'Conceptual art poster',
        category: 'concept',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop'
      },
      {
        id: Date.now() + 5,
        title: 'Jazz Night',
        description: 'Elegant jazz concert poster',
        category: 'event',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=600&fit=crop'
      }
    ];

    posters = samplePosters;
    savePostersToStorage();
    renderGallery();
  }
}

// ===================================
// LOCAL STORAGE
// ===================================
function savePostersToStorage() {
  localStorage.setItem('posterGallery', JSON.stringify(posters));
}

function loadPostersFromStorage() {
  const stored = localStorage.getItem('posterGallery');
  if (stored) {
    posters = JSON.parse(stored);
  }
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
  // Navigation
  setupNavigation();

  // Upload functionality
  setupUpload();

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
// UPLOAD FUNCTIONALITY
// ===================================
function setupUpload() {
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  const uploadForm = document.getElementById('uploadForm');

  // Click to upload
  uploadZone.addEventListener('click', () => {
    fileInput.click();
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    handleFileSelect(e.target.files[0]);
  });

  // Drag and drop
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  });

  // Form submission
  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUploadSubmit();
  });
}

function handleFileSelect(file) {
  if (!file) return;

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png'];
  if (!validTypes.includes(file.type)) {
    alert('Please upload a JPG or PNG image.');
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB.');
    return;
  }

  uploadedFile = file;

  // Update UI to show file selected
  const uploadText = document.querySelector('.upload-text');
  uploadText.textContent = `Selected: ${file.name}`;
  uploadText.style.color = 'var(--color-accent-cyan)';
}

function handleUploadSubmit() {
  if (!uploadedFile) {
    alert('Please select a file to upload.');
    return;
  }

  const title = document.getElementById('posterTitle').value;
  const description = document.getElementById('posterDescription').value;
  const category = document.getElementById('posterCategory').value;

  if (!title || !category) {
    alert('Please fill in all required fields.');
    return;
  }

  // Read file as data URL
  const reader = new FileReader();
  reader.onload = (e) => {
    const newPoster = {
      id: Date.now(),
      title: title,
      description: description,
      category: category,
      image: e.target.result
    };

    // Add to posters array
    posters.unshift(newPoster);
    savePostersToStorage();
    renderGallery();

    // Reset form
    document.getElementById('uploadForm').reset();
    uploadedFile = null;
    const uploadText = document.querySelector('.upload-text');
    uploadText.textContent = 'Drag & Drop your poster here';
    uploadText.style.color = '';

    // Show success message
    alert('Poster uploaded successfully!');

    // Scroll to gallery
    document.querySelector('#posters').scrollIntoView({ behavior: 'smooth' });
  };

  reader.readAsDataURL(uploadedFile);
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
    galleryGrid.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">No posters found. Upload your first poster!</p>';
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
    <button class="poster-delete" title="Delete poster" aria-label="Delete poster">🗑️</button>
    <div class="poster-overlay">
      <h3 class="poster-title">${poster.title}</h3>
      <span class="poster-category">${poster.category}</span>
    </div>
  `;

  // Delete button functionality
  const deleteBtn = card.querySelector('.poster-delete');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent lightbox from opening
    deletePoster(poster.id);
  });

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
// DELETE POSTER
// ===================================
function deletePoster(posterId) {
  // Find the poster
  const poster = posters.find(p => p.id === posterId);

  if (!poster) return;

  // Confirm deletion
  const confirmDelete = confirm(`Are you sure you want to delete "${poster.title}"?`);

  if (!confirmDelete) return;

  // Remove from array
  posters = posters.filter(p => p.id !== posterId);

  // Update storage
  savePostersToStorage();

  // Re-render gallery with animation
  const card = document.querySelector(`[data-poster-id="${posterId}"]`);
  if (card) {
    card.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      renderGallery();
    }, 300);
  } else {
    renderGallery();
  }
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
console.log('%c🎨 Poster Designer Portfolio', 'font-size: 20px; font-weight: bold; color: #00f5ff;');
console.log('%cWelcome to my creative space!', 'font-size: 14px; color: #b794f6;');
