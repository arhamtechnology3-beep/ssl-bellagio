// SSL BELLAGIO - AI LIVING | INTERACTIVE ENGINE

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPhoneInputs();
  initContentGating();
  initEmiCalculator();
  initFloorPlanTabs();
  initModals();
  initFaqAccordion();
  initLeadForms();
  initGalleryLightbox();
  initAmenityFilter();
  initBentoSpotlight();
  initVideoShowcase();
  initSmartHomeSimulator();
  initDatePickers();
  initCounterEffect();
});

// 1. NAVBAR & SCROLL BEHAVIOR
function initNavbar() {
  const stickyHeader = document.getElementById('sticky-header');
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar shadow & compactness on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (stickyHeader) stickyHeader.classList.add('is-scrolled');
      if (navbar) {
        navbar.classList.add('bg-white/98', 'shadow-md', 'border-b', 'border-[#ded7c8]');
        navbar.classList.remove('bg-white/90');
      }
    } else {
      if (stickyHeader) stickyHeader.classList.remove('is-scrolled');
      if (navbar) {
        navbar.classList.add('bg-white/90');
        navbar.classList.remove('shadow-md', 'bg-white/98');
      }
    }
  });

  // Mobile Menu Toggle with click-outside detection
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on clicking a nav link
    document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach(el => {
      el.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Close mobile menu on clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // Active section scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('text-amber-400', 'font-semibold'));
        if (targetNav) {
          targetNav.classList.add('text-amber-400', 'font-semibold');
        }
      }
    });
  });
}

// 2. EMI CALCULATOR
function initEmiCalculator() {
  const loanAmountInput = document.getElementById('loanAmount');
  const loanAmountVal = document.getElementById('loanAmountVal');
  const interestRateInput = document.getElementById('interestRate');
  const interestRateVal = document.getElementById('interestRateVal');
  const loanTenureInput = document.getElementById('loanTenure');
  const loanTenureVal = document.getElementById('loanTenureVal');

  const monthlyEmiEl = document.getElementById('monthlyEmi');
  const totalInterestEl = document.getElementById('totalInterest');
  const totalAmountEl = document.getElementById('totalAmount');

  if (!loanAmountInput) return;

  function calculateEMI() {
    const P = parseFloat(loanAmountInput.value); // Principal in ₹
    const annualR = parseFloat(interestRateInput.value); // Annual %
    const years = parseFloat(loanTenureInput.value); // Years

    // Display formatted values
    const lakhsOrCr = P >= 10000000 
      ? `₹ ${(P / 10000000).toFixed(2)} Cr` 
      : `₹ ${(P / 100000).toFixed(2)} Lakhs`;
    loanAmountVal.textContent = lakhsOrCr;
    interestRateVal.textContent = `${annualR.toFixed(1)} %`;
    loanTenureVal.textContent = `${years} Years`;

    const monthlyR = (annualR / 12) / 100;
    const n = years * 12;

    const emi = (P * monthlyR * Math.pow(1 + monthlyR, n)) / (Math.pow(1 + monthlyR, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    monthlyEmiEl.textContent = `₹ ${Math.round(emi).toLocaleString('en-IN')}`;
    totalInterestEl.textContent = `₹ ${Math.round(totalInterest).toLocaleString('en-IN')}`;
    totalAmountEl.textContent = `₹ ${Math.round(totalPayment).toLocaleString('en-IN')}`;
  }

  loanAmountInput.addEventListener('input', calculateEMI);
  interestRateInput.addEventListener('input', calculateEMI);
  loanTenureInput.addEventListener('input', calculateEMI);

  // Preset quick buttons (1 BHK ~ ₹35L Loan, 2 BHK ~ ₹48L Loan)
  const preset1Bhk = document.getElementById('preset-1bhk');
  const preset2Bhk = document.getElementById('preset-2bhk');
  if (preset1Bhk) {
    preset1Bhk.addEventListener('click', () => {
      loanAmountInput.value = 3500000;
      calculateEMI();
    });
  }
  if (preset2Bhk) {
    preset2Bhk.addEventListener('click', () => {
      loanAmountInput.value = 4800000;
      calculateEMI();
    });
  }

  // Initial calculation
  calculateEMI();
}

// 3. FLOOR PLAN TABS
function initFloorPlanTabs() {
  const tabButtons = document.querySelectorAll('.plan-tab-btn');
  const planPanels = document.querySelectorAll('.plan-tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-amber-600', 'to-amber-500', 'text-white', 'border-amber-400');
        btn.classList.add('bg-slate-900/80', 'text-slate-300', 'border-slate-800');
      });

      button.classList.add('active', 'bg-gradient-to-r', 'from-amber-600', 'to-amber-500', 'text-white', 'border-amber-400');
      button.classList.remove('bg-slate-900/80', 'text-slate-300', 'border-slate-800');

      const targetId = button.getAttribute('data-target');
      planPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
          panel.classList.add('animate-fadeIn');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

// 4. MODALS & POPUPS
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const modals = document.querySelectorAll('.app-modal');

  // Open modal handler
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        // Preset form context if button has data-context (e.g. 1 BHK, 2 BHK, Brochure)
        const context = trigger.getAttribute('data-context');
        if (context) {
          const configSelect = targetModal.querySelector('select[name="configuration"]');
          if (configSelect) {
            configSelect.value = context;
          }
          const modalTitle = targetModal.querySelector('.modal-dynamic-title');
          if (modalTitle && trigger.getAttribute('data-title')) {
            modalTitle.textContent = trigger.getAttribute('data-title');
          }
        }

        targetModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  // Close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modals.forEach(modal => modal.classList.add('hidden'));
      document.body.classList.remove('overflow-hidden');
      // Pause any active modal video
      const modalVideo = document.querySelector('#video-modal video');
      if (modalVideo) modalVideo.pause();
    });
  });

  // Backdrop click to close
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        const modalVideo = document.querySelector('#video-modal video');
        if (modalVideo) modalVideo.pause();
      }
    });
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => modal.classList.add('hidden'));
      document.body.classList.remove('overflow-hidden');
      const modalVideo = document.querySelector('#video-modal video');
      if (modalVideo) modalVideo.pause();
    }
  });
}

// 5. FAQ ACCORDION
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close all other items
        faqItems.forEach(other => {
          other.querySelector('.faq-answer')?.classList.add('hidden');
          other.querySelector('.faq-icon')?.classList.remove('rotate-180');
          other.classList.remove('border-amber-500/40');
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
          item.classList.add('border-amber-500/40');
        }
      });
    }
  });
}

// 6. INDIAN PHONE NUMBER VALIDATION & LIVE SANITIZATION
function sanitizeIndianPhone(raw) {
  let digits = (raw || '').replace(/\D/g, '');
  // If user pasted with leading country code 91 or trunk 0 (11 or 12 digits)
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

function initPhoneInputs() {
  const phoneInputs = document.querySelectorAll('input[name="phone"], input[type="tel"]');

  phoneInputs.forEach(input => {
    // Force numeric attributes
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('maxlength', '10');
    input.setAttribute('autocomplete', 'tel');

    // Filter non-digits on keypress/input immediately
    input.addEventListener('input', (e) => {
      const sanitized = sanitizeIndianPhone(e.target.value);
      e.target.value = sanitized;
      validatePhoneField(e.target, false);
    });

    // Handle paste event
    input.addEventListener('paste', (e) => {
      setTimeout(() => {
        const sanitized = sanitizeIndianPhone(input.value);
        input.value = sanitized;
        validatePhoneField(input, false);
      }, 0);
    });

    // Validate on blur
    input.addEventListener('blur', (e) => {
      if (e.target.value.trim().length > 0) {
        validatePhoneField(e.target, true);
      }
    });
  });
}

// Helper to validate single phone field
function validatePhoneField(input, showFullError = false) {
  if (!input) return false;
  
  const val = input.value.trim();
  const parentContainer = input.closest('form') || input.parentElement;
  let errorEl = parentContainer.querySelector(`.phone-error-msg[data-for="${input.id}"]`) ||
                parentContainer.querySelector('.phone-error-msg');

  // If no error container exists, create one right under the input wrapper
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'phone-error-msg';
    if (input.id) errorEl.setAttribute('data-for', input.id);
    const wrapper = input.closest('.relative') || input;
    wrapper.insertAdjacentElement('afterend', errorEl);
  }

  // Reset styles
  input.classList.remove('input-phone-invalid', 'input-phone-valid');
  errorEl.classList.remove('visible');
  errorEl.innerHTML = '';

  if (val.length === 0) {
    if (showFullError) {
      input.classList.add('input-phone-invalid');
      errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation text-xs mr-1"></i> Mobile number is required.';
      errorEl.classList.add('visible');
    }
    return false;
  }

  // Indian numbers must begin with 6, 7, 8, or 9
  if (!/^[6-9]/.test(val)) {
    input.classList.add('input-phone-invalid');
    errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation text-xs mr-1"></i> Indian mobile numbers must start with 6, 7, 8, or 9.';
    errorEl.classList.add('visible');
    return false;
  }

  // Must be complete 10 digits
  if (val.length < 10) {
    if (showFullError || val.length >= 4) {
      input.classList.add('input-phone-invalid');
      errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation text-xs mr-1"></i> Please enter all 10 digits (${val.length}/10 entered).`;
      errorEl.classList.add('visible');
    }
    return false;
  }

  // Strict regex check: 10 digits starting with 6-9
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(val)) {
    input.classList.add('input-phone-invalid');
    errorEl.innerHTML = '<i class="fa-solid fa-circle-exclamation text-xs mr-1"></i> Please enter a valid 10-digit Indian mobile number.';
    errorEl.classList.add('visible');
    return false;
  }

  // Valid!
  input.classList.add('input-phone-valid');
  errorEl.classList.remove('visible');
  return true;
}

// 7. GATED CONTENT (PRICES & FLOOR PLANS)
function initContentGating() {
  const isUnlocked = localStorage.getItem('ssl_bellagio_unlocked') === 'true';

  if (isUnlocked) {
    revealAllGatedContent(false);
  }

  // Handle click on locked floor plan containers or buttons
  const lockedTriggers = document.querySelectorAll('.locked-plan-trigger');
  lockedTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const currentlyUnlocked = localStorage.getItem('ssl_bellagio_unlocked') === 'true';
      if (!currentlyUnlocked) {
        e.preventDefault();
        e.stopPropagation();
        const brochureModal = document.getElementById('brochure-modal');
        if (brochureModal) {
          const title = brochureModal.querySelector('.modal-dynamic-title');
          if (title) title.textContent = 'Unlock High-Res Floor Plans';
          brochureModal.classList.remove('hidden');
          document.body.classList.add('overflow-hidden');
        }
      }
    });
  });
}

function revealAllGatedContent(animate = true) {
  // 1. Reveal Prices across the website
  const maskedPriceBlocks = document.querySelectorAll('.gated-price-masked');
  const revealedPriceBlocks = document.querySelectorAll('.gated-price-revealed');
  const pricePills = document.querySelectorAll('.gated-price-pill');
  const heroPriceVal = document.getElementById('hero-gated-price');

  maskedPriceBlocks.forEach(el => el.classList.add('hidden'));
  revealedPriceBlocks.forEach(el => {
    el.classList.remove('hidden');
    if (animate) el.classList.add('animate-fadeIn');
  });

  pricePills.forEach(pill => {
    pill.classList.remove('bg-amber-100', 'text-amber-800', 'border-amber-300', 'bg-amber-500/20', 'text-gold-300');
    pill.classList.add('bg-emerald-100', 'text-emerald-800', 'border-emerald-300');
    pill.innerHTML = '<i class="fa-solid fa-lock-open text-[10px] text-emerald-600 mr-1"></i> Price Unlocked';
  });

  if (heroPriceVal) {
    heroPriceVal.textContent = '₹42.40 Lakhs*';
    heroPriceVal.classList.remove('blur-sm');
  }

  // Update FAQ prices if present
  const faq1Bhk = document.querySelector('.gated-faq-1bhk');
  const faq2Bhk = document.querySelector('.gated-faq-2bhk');
  if (faq1Bhk) faq1Bhk.innerHTML = '₹42.40 Lakhs Onwards* <span class="text-emerald-400 font-bold text-xs">[Unlocked]</span>';
  if (faq2Bhk) faq2Bhk.innerHTML = '₹57.80 Lakhs Onwards* <span class="text-emerald-400 font-bold text-xs">[Unlocked]</span>';

  // 2. Reveal Floor Plans
  const planImages = document.querySelectorAll('.gated-plan-img');
  const planOverlays = document.querySelectorAll('.gated-plan-overlay');
  const planStatusBadges = document.querySelectorAll('.gated-plan-badge');

  planImages.forEach(img => {
    img.classList.remove('is-locked');
    img.classList.add('is-unlocked');
  });

  planOverlays.forEach(overlay => {
    overlay.classList.add('is-hidden');
  });

  planStatusBadges.forEach(badge => {
    badge.classList.remove('bg-amber-500/20', 'text-amber-300', 'border-amber-400/40');
    badge.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-400/40');
    badge.innerHTML = '<i class="fa-solid fa-unlock-keyhole mr-1 text-emerald-400"></i> Blueprints Unlocked';
  });

  // Enable direct lightbox zoom on floor plans
  const lockedZoomBtns = document.querySelectorAll('.locked-zoom-btn');
  lockedZoomBtns.forEach(btn => {
    btn.classList.remove('locked-zoom-btn');
    btn.classList.add('active-zoom-btn');
  });
}

// 8. LEAD CAPTURE FORMS WITH STRICT PHONE CHECK & AUTO-UNLOCK
function initLeadForms() {
  const forms = document.querySelectorAll('form[data-lead-form]');
  const successModal = document.getElementById('success-modal');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // STRICT VALIDATION: Check Indian Mobile Number
      const phoneInput = form.querySelector('input[name="phone"], input[type="tel"]');
      const isPhoneValid = validatePhoneField(phoneInput, true);

      if (!isPhoneValid) {
        if (phoneInput) {
          phoneInput.focus();
          phoneInput.classList.add('shake-animation');
          setTimeout(() => phoneInput.classList.remove('shake-animation'), 450);
        }
        return false;
      }

      // Check Name Field
      const nameInput = form.querySelector('input[name="name"]');
      if (nameInput && !nameInput.value.trim()) {
        nameInput.focus();
        nameInput.classList.add('shake-animation');
        setTimeout(() => nameInput.classList.remove('shake-animation'), 450);
        return false;
      }

      // Submit Button Loading State
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Unlocking Prices & Plans...
        `;
      }

      const formData = new FormData(form);
      const leadData = {
        name: formData.get('name') || '',
        phone: formData.get('phone') || '',
        email: formData.get('email') || '',
        configuration: formData.get('configuration') || '1 BHK / 2 BHK',
        visitDate: formData.get('visitDate') || '',
        needCab: formData.get('needCab') ? 'Yes' : 'No',
        source: form.getAttribute('data-source') || 'Landing Page Form',
        destinationEmail: 'ssl.bellagio1@gmail.com',
        destinationPhone: '8850574004',
        timestamp: new Date().toISOString()
      };

      // Construct instant WhatsApp lead message for 88505 74004
      const waLeadMsg = `*New Lead Enquiry - SSL Bellagio*%0A` +
        `👤 *Name:* ${encodeURIComponent(leadData.name)}%0A` +
        `📞 *Mobile:* %2B91%20${encodeURIComponent(leadData.phone)}%0A` +
        (leadData.email ? `✉️ *Email:* ${encodeURIComponent(leadData.email)}%0A` : '') +
        `🏠 *Configuration:* ${encodeURIComponent(leadData.configuration)}%0A` +
        (leadData.visitDate ? `📅 *Preferred Visit Date:* ${encodeURIComponent(leadData.visitDate)}%0A` : '') +
        `🚗 *Free Cab Facility:* ${encodeURIComponent(leadData.needCab)}%0A` +
        `📍 *Source:* ${encodeURIComponent(leadData.source)}%0A` +
        `⏰ *Time:* ${encodeURIComponent(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}`;

      const waLeadUrl = `https://wa.me/918850574004?text=${waLeadMsg}`;

      // Save lead locally
      try {
        const storedLeads = JSON.parse(localStorage.getItem('ssl_bellagio_leads') || '[]');
        storedLeads.push(leadData);
        localStorage.setItem('ssl_bellagio_leads', JSON.stringify(storedLeads));
        console.log('Lead captured for 88505 74004 & ssl.bellagio1@gmail.com:', leadData);
      } catch (err) {
        console.warn('LocalStorage lead error:', err);
      }

      // UNLOCK ALL GATED CONTENT IMMEDIATELY
      localStorage.setItem('ssl_bellagio_unlocked', 'true');
      revealAllGatedContent(true);

      // Simulate network response & present lead confirmation
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        // Close any open input modal
        document.querySelectorAll('.app-modal').forEach(m => {
          if (m.id !== 'success-modal') m.classList.add('hidden');
        });

        // Show thank you modal with unlocked confirmation
        if (successModal) {
          const leadNameEl = document.getElementById('success-user-name');
          if (leadNameEl && leadData.name) {
            leadNameEl.textContent = leadData.name;
          }

          // Direct lead recipient button on WhatsApp
          const waSuccessBtn = document.getElementById('success-whatsapp-btn');
          if (waSuccessBtn) {
            waSuccessBtn.href = waLeadUrl;
            waSuccessBtn.innerHTML = `<i class="fa-brands fa-whatsapp text-base"></i> Send Enquiry to Sales Desk (+91 88505 74004)`;
          }

          successModal.classList.remove('hidden');
          document.body.classList.add('overflow-hidden');
        }

        // Check if form requested brochure download
        const isBrochure = form.getAttribute('data-download-brochure') === 'true';
        if (isBrochure) {
          const downloadLink = document.createElement('a');
          downloadLink.href = 'assets/SSL_Bellagio_Brochure.pdf';
          downloadLink.download = 'SSL_Bellagio_Official_Brochure.pdf';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.remove();
        }

        // Auto-launch WhatsApp lead transmission in background tab
        try {
          window.open(waLeadUrl, '_blank');
        } catch (e) {
          // Popup blocked, user can click the button in success modal
        }

        form.reset();
      }, 600);
    });
  });
}

// 9. LIGHTBOX GALLERY
function initGalleryLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const zoomTriggers = document.querySelectorAll('[data-zoom-img]');

  if (!lightboxModal || !lightboxImg) return;

  zoomTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      // If plan is locked, don't open zoom; prompt unlock form instead
      const isPlanZoom = el.classList.contains('locked-zoom-btn');
      const isUnlocked = localStorage.getItem('ssl_bellagio_unlocked') === 'true';

      if (isPlanZoom && !isUnlocked) {
        e.preventDefault();
        e.stopPropagation();
        const brochureModal = document.getElementById('brochure-modal');
        if (brochureModal) {
          const title = brochureModal.querySelector('.modal-dynamic-title');
          if (title) title.textContent = 'Unlock Blueprint High-Res Zoom';
          brochureModal.classList.remove('hidden');
          document.body.classList.add('overflow-hidden');
        }
        return;
      }

      const src = el.getAttribute('data-zoom-img');
      const caption = el.getAttribute('data-caption') || 'SSL Bellagio - AI Living';
      lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightboxModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });
}

// 10. 21ST.DEV AMENITY CATEGORY FILTER
function initAmenityFilter() {
  const filterBtns = document.querySelectorAll('.amenity-filter-btn');
  const amenityCards = document.querySelectorAll('[data-amenity-cat]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      amenityCards.forEach(card => {
        const cardCats = (card.getAttribute('data-amenity-cat') || '').split(' ');
        if (category === 'all' || cardCats.includes(category)) {
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 11. 21ST.DEV SPOTLIGHT MOUSE TRACKER
function initBentoSpotlight() {
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 12. 21ST.DEV CINEMATIC VIDEO CONTROLS & TIMELINE JUMP
function initVideoShowcase() {
  const video = document.getElementById('project-walkthrough-video');
  const playOverlay = document.getElementById('video-custom-play-overlay');
  const customPlayBtn = document.getElementById('video-custom-play-btn');
  const jumpButtons = document.querySelectorAll('.video-jump-btn');

  if (!video) return;

  function startVideo() {
    video.play();
    if (playOverlay) {
      playOverlay.classList.add('opacity-0', 'pointer-events-none');
    }
    video.setAttribute('controls', 'true');
  }

  if (customPlayBtn) {
    customPlayBtn.addEventListener('click', startVideo);
  }
  if (playOverlay) {
    playOverlay.addEventListener('click', startVideo);
  }

  jumpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const seconds = parseFloat(btn.getAttribute('data-time') || '0');
      video.currentTime = seconds;
      startVideo();

      jumpButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  video.addEventListener('timeupdate', () => {
    const cur = video.currentTime;
    jumpButtons.forEach(btn => {
      const time = parseFloat(btn.getAttribute('data-time') || '0');
      if (Math.abs(cur - time) < 20) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });

  video.addEventListener('pause', () => {
    if (playOverlay && video.currentTime === 0) {
      playOverlay.classList.remove('opacity-0', 'pointer-events-none');
    }
  });
}

// 13. 21ST.DEV INTERACTIVE SMART HOME SIMULATOR
function initSmartHomeSimulator() {
  // 1. Biometric Door Lock Simulator
  const lockBtn = document.getElementById('sim-lock-trigger');
  const lockBadge = document.getElementById('sim-lock-badge');
  const lockIcon = document.getElementById('sim-lock-icon');
  const lockText = document.getElementById('sim-lock-text');
  let lockTimer = null;

  if (lockBtn && lockBadge) {
    lockBtn.addEventListener('click', () => {
      if (lockTimer) clearTimeout(lockTimer);

      // Scanning pulse feedback
      lockBtn.disabled = true;
      lockBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin text-cyan-400"></i> Scanning Biometrics...';

      setTimeout(() => {
        // Unlock state
        lockBadge.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5';
        lockBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span> UNLOCKED';
        if (lockIcon) lockIcon.className = 'fa-solid fa-lock-open text-amber-400 text-xl';
        if (lockText) lockText.textContent = 'Main Entrance Door Unlocked • Welcome Home';

        lockBtn.disabled = false;
        lockBtn.innerHTML = '<i class="fa-solid fa-lock text-slate-300"></i> Tap to Lock Now';

        // Auto relock after 6s
        lockTimer = setTimeout(() => {
          relockDoor();
        }, 6000);
      }, 500);
    });

    function relockDoor() {
      lockBadge.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5';
      lockBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> SECURED';
      if (lockIcon) lockIcon.className = 'fa-solid fa-shield-halved text-emerald-400 text-xl';
      if (lockText) lockText.textContent = 'Main Entrance Door Locked & Armed';
      lockBtn.innerHTML = '<i class="fa-solid fa-fingerprint text-cyan-400"></i> Tap Biometric Unlock';
    }
  }

  // 2. Smart AC Temperature & Power Controls
  let acTemp = 21;
  let acPower = true;
  const tempDisplay = document.getElementById('sim-ac-temp');
  const tempStatus = document.getElementById('sim-ac-status');
  const tempMinus = document.getElementById('sim-ac-minus');
  const tempPlus = document.getElementById('sim-ac-plus');
  const powerToggle = document.getElementById('sim-ac-power');
  const breezeGlow = document.getElementById('sim-ac-glow');

  function updateAcUI() {
    if (!tempDisplay) return;
    if (acPower) {
      tempDisplay.textContent = `${acTemp}°C`;
      tempDisplay.className = 'text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400';
      if (tempStatus) {
        tempStatus.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-cyan-400 pulse-emerald mr-1.5"></span> Climate: Pre-Cooling Active (${acTemp}°C)`;
      }
      if (breezeGlow) breezeGlow.classList.remove('opacity-0');
      if (powerToggle) {
        powerToggle.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all';
        powerToggle.innerHTML = '<i class="fa-solid fa-power-off mr-1"></i> ON';
      }
    } else {
      tempDisplay.textContent = '--°C';
      tempDisplay.className = 'text-3xl sm:text-4xl font-extrabold font-mono text-slate-500';
      if (tempStatus) {
        tempStatus.innerHTML = '<span class="inline-block w-2 h-2 rounded-full bg-slate-500 mr-1.5"></span> AC Standby Mode';
      }
      if (breezeGlow) breezeGlow.classList.add('opacity-0');
      if (powerToggle) {
        powerToggle.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 transition-all';
        powerToggle.innerHTML = '<i class="fa-solid fa-power-off mr-1"></i> OFF';
      }
    }
  }

  if (tempMinus) {
    tempMinus.addEventListener('click', () => {
      if (!acPower) acPower = true;
      if (acTemp > 16) acTemp--;
      updateAcUI();
    });
  }

  if (tempPlus) {
    tempPlus.addEventListener('click', () => {
      if (!acPower) acPower = true;
      if (acTemp < 28) acTemp++;
      updateAcUI();
    });
  }

  if (powerToggle) {
    powerToggle.addEventListener('click', () => {
      acPower = !acPower;
      updateAcUI();
    });
  }

  // 3. Smart Lighting Mood Preset Simulator
  const sceneButtons = document.querySelectorAll('.sim-scene-btn');
  const lightMoodBar = document.getElementById('sim-light-glow-bar');
  const lightPercentText = document.getElementById('sim-light-pct');

  sceneButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sceneButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pct = btn.getAttribute('data-pct') || '80';
      const color = btn.getAttribute('data-color') || '#c59b27';

      if (lightPercentText) lightPercentText.textContent = `${pct}%`;
      if (lightMoodBar) {
        lightMoodBar.style.width = `${pct}%`;
        lightMoodBar.style.backgroundColor = color;
        lightMoodBar.style.boxShadow = `0 0 16px ${color}`;
      }
    });
  });

  // 4. Live Gate Visitor Access Simulator
  const gateActionBtn = document.getElementById('sim-gate-action-btn');
  const gateStatusBadge = document.getElementById('sim-gate-status');

  if (gateActionBtn && gateStatusBadge) {
    gateActionBtn.addEventListener('click', () => {
      gateActionBtn.disabled = true;
      gateActionBtn.className = 'w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white flex items-center justify-center gap-1.5 shadow-lg transition-all';
      gateActionBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Gate 1 Unlocked • Elevator Called';

      gateStatusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      gateStatusBadge.textContent = 'ACCESS GRANTED';

      setTimeout(() => {
        gateActionBtn.disabled = false;
        gateActionBtn.className = 'w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all';
        gateActionBtn.innerHTML = '<i class="fa-solid fa-unlock"></i> Authorize & Unlock Gate';
        gateStatusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40';
        gateStatusBadge.textContent = 'VISITOR AT GATE';
      }, 4500);
    });
  }
}

// 14. LUXURY FLATPICKR DATE PICKER & QUICK SELECTION CHIPS
function initDatePickers() {
  const dateInputs = document.querySelectorAll('.site-visit-datepicker');
  if (!dateInputs.length) return;

  const instances = [];

  dateInputs.forEach(input => {
    let fp = null;
    if (typeof window.flatpickr === 'function') {
      fp = window.flatpickr(input, {
        minDate: 'today',
        dateFormat: 'd M Y',
        altInput: false,
        disableMobile: true, // Guarantees custom luxury UI across iOS/Android
        animate: true,
        static: false,
        onReady: function(selectedDates, dateStr, instance) {
          // Wrap calendar in theme class if needed
          if (instance.calendarContainer) {
            instance.calendarContainer.classList.add('ssl-bellagio-calendar');
          }
        }
      });
      instances.push({ input, fp });
    }

    // Clicking calendar icon opens the picker
    const icon = input.parentElement.querySelector('.fa-calendar-days');
    if (icon && fp) {
      icon.style.cursor = 'pointer';
      icon.style.pointerEvents = 'auto';
      icon.addEventListener('click', () => {
        fp.open();
      });
    }
  });

  // Handle Quick Date Chips
  document.querySelectorAll('.quick-date-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Find the associated date input in the same form/container
      const container = btn.closest('form') || btn.closest('.grid') || document;
      const targetInput = container.querySelector('.site-visit-datepicker');
      if (!targetInput) return;

      const instanceObj = instances.find(item => item.input === targetInput);
      const targetDate = new Date();

      if (btn.hasAttribute('data-offset')) {
        const offset = parseInt(btn.getAttribute('data-offset') || '0', 10);
        targetDate.setDate(targetDate.getDate() + offset);
      } else if (btn.getAttribute('data-weekend') === 'sat') {
        const day = targetDate.getDay();
        const diff = (6 - day + 7) % 7 || 7; // Next Saturday (or today if Saturday)
        targetDate.setDate(targetDate.getDate() + diff);
      } else if (btn.getAttribute('data-weekend') === 'sun') {
        const day = targetDate.getDay();
        const diff = (7 - day) % 7 || 7; // Next Sunday (or today if Sunday)
        targetDate.setDate(targetDate.getDate() + diff);
      }

      if (instanceObj && instanceObj.fp) {
        instanceObj.fp.setDate(targetDate, true);
      } else {
        // Fallback for native date formatting: YYYY-MM-DD or readable
        const dd = String(targetDate.getDate()).padStart(2, '0');
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const mm = months[targetDate.getMonth()];
        const yyyy = targetDate.getFullYear();
        targetInput.value = `${dd} ${mm} ${yyyy}`;
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Visual highlight feedback for clicked button
      const siblingChips = btn.parentElement.querySelectorAll('.quick-date-btn');
      siblingChips.forEach(b => {
        b.classList.remove('bg-gold-500', 'text-wine-950', 'border-gold-400', 'font-bold');
      });
      btn.classList.add('bg-gold-500', 'text-wine-950', 'border-gold-400', 'font-bold');
    });
  });
}

// 15. LUXURY ANIMATED STAT COUNTER EFFECT
function initCounterEffect() {
  const counterElements = document.querySelectorAll('.stat-counter');
  if (!counterElements.length) return;

  const animateCounter = (el) => {
    if (el.getAttribute('data-has-animated') === 'true') return;
    el.setAttribute('data-has-animated', 'true');
    el.classList.add('counting');

    const targetVal = parseFloat(el.getAttribute('data-counter') || '0');
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = parseInt(el.getAttribute('data-duration') || '1800', 10); // ms
    const startTime = performance.now();

    const formatNumber = (val) => {
      if (decimals > 0) {
        return val.toFixed(decimals);
      }
      return Math.round(val).toLocaleString('en-IN');
    };

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Luxury easeOutExpo curve: fast energetic ramp that smoothly settles into place
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeProgress * targetVal;

      el.textContent = `${prefix}${formatNumber(currentVal)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${prefix}${formatNumber(targetVal)}${suffix}`;
        el.classList.remove('counting');
        el.classList.add('counted');
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Setup IntersectionObserver to trigger counter when section scrolls into view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targets = entry.target.querySelectorAll ? entry.target.querySelectorAll('.stat-counter') : [];
          if (targets.length) {
            targets.forEach(c => animateCounter(c));
          }
          if (entry.target.classList && entry.target.classList.contains('stat-counter')) {
            animateCounter(entry.target);
          }
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    });

    // Observe counter containers as well as direct counters
    document.querySelectorAll('.stat-counter-container, .stat-counter, #developer-stats').forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    counterElements.forEach(animateCounter);
  }
}
