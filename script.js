/**
 * LUXURY PHOTOGRAPHY & CINEMATOGRAPHY STUDIO PORTFOLIO
 * Vanilla JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       01. PORTFOLIO DATA MODEL (Projects Array)
       ========================================================================== */
    const projectsData = [
        {
            id: 1,
            title: "Riya & Arjun Wedding",
            category: "wedding",
            medium: "photography",
            tags: ["wedding", "photography", "candid"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/hero/hero-editorial.jpg",
            spanClass: "grid-span-8",
            caption: "Intimate solar courtyard wedding ceremony in golden hour light."
        },
        {
            id: 2,
            title: "Aura of Silence",
            category: "portrait",
            medium: "photography",
            tags: ["portrait", "photography"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/portraits/portrait-01.jpg",
            spanClass: "grid-span-4-tall",
            caption: "Fine-art portraiture exploring soft natural window shadows."
        },
        {
            id: 3,
            title: "Oceanfront Vows",
            category: "engagement",
            medium: "videography",
            tags: ["engagement", "pre-wedding", "videography"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/engagement/engagement-01.jpg",
            spanClass: "grid-span-6",
            caption: "Cinematic pre-wedding romance film along coastal cliffs."
        },
        {
            id: 4,
            title: "Laughter in Twilight",
            category: "candid",
            medium: "photography",
            tags: ["candid", "birthday", "event", "photography"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/candid/candid-01.jpg",
            spanClass: "grid-span-6",
            caption: "Unscripted evening celebration laughter under warm festoon lights."
        },
        {
            id: 5,
            title: "Generations Walk",
            category: "family",
            medium: "photography",
            tags: ["family", "photography", "anniversary"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/family/family-01.jpg",
            spanClass: "grid-span-6",
            caption: "Warm lifestyle family portrait session in open fields."
        },
        {
            id: 6,
            title: "First Mornings",
            category: "newborn",
            medium: "photography",
            tags: ["newborn", "photography", "family"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/newborn/newborn-01.jpg",
            spanClass: "grid-span-6",
            caption: "Peaceful organic linen newborn portraiture."
        },
        {
            id: 7,
            title: "The Day We Said Yes",
            category: "wedding",
            medium: "videography",
            tags: ["wedding", "videography"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/weddings/film-poster.jpg",
            spanClass: "grid-span-4-tall",
            caption: "Feature length 4K cinematic wedding motion film."
        },
        {
            id: 8,
            title: "Pre-Wedding Sunset Embrace",
            category: "pre-wedding",
            medium: "photography",
            tags: ["pre-wedding", "engagement", "photography"],
            location: "[CITY]",
            year: "2026",
            cover: "assets/images/engagement/engagement-01.jpg",
            spanClass: "grid-span-8",
            caption: "Dusk silhouette romance session."
        }
    ];

    /* ==========================================================================
       02. NAVIGATION & SCROLL PROGRESS
       ========================================================================== */
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    window.addEventListener('scroll', () => {
        // Update Scroll Progress Bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) progressBar.style.width = scrollPercent + '%';

        // Navbar Shadow state
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile Menu Toggle
    if (mobileToggle && mobileMenuOverlay) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function openMobileMenu() {
        mobileToggle.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileMenuOverlay.classList.add('open');
        mobileMenuOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenuOverlay.classList.remove('open');
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ==========================================================================
       03. INTERSECTION OBSERVER FOR SCROLL REVEALS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal, .image-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: keep observing or unobserve for single reveal
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       04. BACKGROUND AMBIENT CANVAS (bg-canvas)
       ========================================================================== */
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = bgCanvas.getContext('2d');
        let width = bgCanvas.width = window.innerWidth;
        let height = bgCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = bgCanvas.width = window.innerWidth;
            height = bgCanvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(Math.floor(width / 25), 45);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function animateBgCanvas() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
                ctx.fill();

                // Draw thin connection lines between close particles
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(14, 165, 233, ${(1 - dist / 130) * 0.15})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateBgCanvas);
        }

        animateBgCanvas();
    }

    /* ==========================================================================
       05. SERVICE VIEWFINDER CANVAS (service-canvas)
       ========================================================================== */
    const serviceCanvas = document.getElementById('service-canvas');
    if (serviceCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const sCtx = serviceCanvas.getContext('2d');
        let sAngle = 0;

        function drawServiceCanvas() {
            const w = serviceCanvas.width;
            const h = serviceCanvas.height;
            sCtx.clearRect(0, 0, w, h);

            // Dark camera viewfinder frame
            sCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            sCtx.lineWidth = 1;

            // Rule of thirds grid
            sCtx.beginPath();
            sCtx.moveTo(w / 3, 0); sCtx.lineTo(w / 3, h);
            sCtx.moveTo((w * 2) / 3, 0); sCtx.lineTo((w * 2) / 3, h);
            sCtx.moveTo(0, h / 3); sCtx.lineTo(w, h / 3);
            sCtx.moveTo(0, (h * 2) / 3); sCtx.lineTo(w, (h * 2) / 3);
            sCtx.stroke();

            // Viewfinder Corner brackets
            const bracketSize = 20;
            sCtx.strokeStyle = '#2563EB';
            sCtx.lineWidth = 2;

            // Top-left corner
            sCtx.beginPath();
            sCtx.moveTo(30, 30 + bracketSize); sCtx.lineTo(30, 30); sCtx.lineTo(30 + bracketSize, 30);
            sCtx.stroke();

            // Top-right corner
            sCtx.beginPath();
            sCtx.moveTo(w - 30 - bracketSize, 30); sCtx.lineTo(w - 30, 30); sCtx.lineTo(w - 30, 30 + bracketSize);
            sCtx.stroke();

            // Bottom-left corner
            sCtx.beginPath();
            sCtx.moveTo(30, h - 30 - bracketSize); sCtx.lineTo(30, h - 30); sCtx.lineTo(30 + bracketSize, h - 30);
            sCtx.stroke();

            // Bottom-right corner
            sCtx.beginPath();
            sCtx.moveTo(w - 30 - bracketSize, h - 30); sCtx.lineTo(w - 30, h - 30); sCtx.lineTo(w - 30, h - 30 - bracketSize);
            sCtx.stroke();

            // Rotating Aperture / Focus ring in center
            sAngle += 0.008;
            sCtx.save();
            sCtx.translate(w / 2, h / 2);
            sCtx.rotate(sAngle);

            sCtx.strokeStyle = 'rgba(14, 165, 233, 0.6)';
            sCtx.lineWidth = 1.5;
            sCtx.beginPath();
            sCtx.arc(0, 0, 75, 0, Math.PI * 2);
            sCtx.stroke();

            // Aperture Blades
            for (let i = 0; i < 6; i++) {
                let rot = (i * Math.PI) / 3;
                sCtx.save();
                sCtx.rotate(rot);
                sCtx.beginPath();
                sCtx.moveTo(25, 0);
                sCtx.lineTo(75, 25);
                sCtx.strokeStyle = 'rgba(37, 99, 235, 0.4)';
                sCtx.stroke();
                sCtx.restore();
            }

            sCtx.restore();

            // Center Target Crosshair
            sCtx.strokeStyle = '#2563EB';
            sCtx.lineWidth = 1.5;
            sCtx.beginPath();
            sCtx.arc(w / 2, h / 2, 8, 0, Math.PI * 2);
            sCtx.stroke();

            requestAnimationFrame(drawServiceCanvas);
        }

        drawServiceCanvas();
    }



    /* ==========================================================================
       07. DYNAMIC PORTFOLIO GRID
       ========================================================================== */
    const portfolioGrid = document.getElementById('portfolio-grid');

    function renderPortfolio() {
        if (!portfolioGrid) return;

        portfolioGrid.style.opacity = '0';
        
        setTimeout(() => {
            portfolioGrid.innerHTML = '';

            projectsData.forEach((proj, idx) => {
                const card = document.createElement('div');
                card.className = `project-card ${proj.spanClass}`;
                card.setAttribute('data-id', proj.id);

                card.innerHTML = `
                    <img src="${proj.cover}" alt="${proj.title}" loading="lazy">
                    <div class="project-overlay">
                        <span class="project-num">0${idx + 1}</span>
                        <div class="project-meta-bottom">
                            <span class="project-tag">${proj.category.toUpperCase()} · ${proj.medium.toUpperCase()}</span>
                            <h3 class="project-title">${proj.title}</h3>
                            <p class="project-location">${proj.location} · ${proj.year}</p>
                        </div>
                    </div>
                `;

                card.addEventListener('click', () => openLightbox(proj, projectsData, idx));
                portfolioGrid.appendChild(card);
            });

            portfolioGrid.style.opacity = '1';
        }, 200);
    }

    // Initial render
    renderPortfolio();

    /* ==========================================================================
       08. FULLSCREEN PHOTO LIGHTBOX MODAL
       ========================================================================== */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentList = [];
    let currentIndex = 0;

    function openLightbox(project, list, index) {
        currentList = list;
        currentIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxContent() {
        if (!currentList[currentIndex]) return;
        const p = currentList[currentIndex];
        lightboxImg.src = p.cover;
        lightboxImg.alt = p.title;
        lightboxCaption.textContent = p.title + " — " + p.caption;
        lightboxCategory.textContent = `${p.category.toUpperCase()} (${p.location})`;
        lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentList.length).padStart(2, '0')}`;
    }

    function closeLightbox() {
        lightboxModal.classList.remove('open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function prevLightbox() {
        currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
        updateLightboxContent();
    }

    function nextLightbox() {
        currentIndex = (currentIndex + 1) % currentList.length;
        updateLightboxContent();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);

    /* ==========================================================================
       09. CINEMATIC VIDEO MODAL PLAYER
       ========================================================================== */
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('modal-video-player');
    const videoTitle = document.getElementById('video-modal-title');
    const videoMeta = document.getElementById('video-modal-meta');
    const videoClose = document.getElementById('video-modal-close');
    const filmCards = document.querySelectorAll('.film-card');

    filmCards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-video-url');
            const title = card.getAttribute('data-title');
            const cat = card.getAttribute('data-category');
            const loc = card.getAttribute('data-location');
            const yr = card.getAttribute('data-year');

            if (url && videoPlayer) {
                videoPlayer.src = url;
                if (videoTitle) videoTitle.textContent = title;
                if (videoMeta) videoMeta.textContent = `${cat} · ${loc} · ${yr}`;
                
                videoModal.classList.add('open');
                videoModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
            }
        });
    });

    function closeVideoModal() {
        if (videoModal && videoPlayer) {
            videoPlayer.pause();
            videoPlayer.src = '';
            videoModal.classList.remove('open');
            videoModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (videoClose) videoClose.addEventListener('click', closeVideoModal);

    // Global ESC Key bindings for Modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeVideoModal();
            closeMobileMenu();
        } else if (lightboxModal && lightboxModal.classList.contains('open')) {
            if (e.key === 'ArrowLeft') prevLightbox();
            if (e.key === 'ArrowRight') nextLightbox();
        }
    });

    /* ==========================================================================
       10. FAQ ACCORDION INTERACTIVITY
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');

            // Close other items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
                if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = null;
            });

            if (!isOpen) {
                question.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       11. DYNAMIC BOOKING FORM & ROBUST VALIDATION ENGINE
       ========================================================================== */
    const bookingForm = document.getElementById('booking-form');
    const serviceMediumSelect = document.getElementById('form-service-medium');
    const subCategoryGroup = document.getElementById('sub-category-group');
    const checkboxGrid = document.getElementById('checkbox-grid');
    const whatsappDirectBtn = document.getElementById('whatsapp-direct-btn');
    const formStatusMessage = document.getElementById('form-status-message');

    // Restrict date picker to today or future dates
    const dateInput = document.getElementById('form-date');
    if (dateInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', todayStr);
    }

    const photoServices = [
        "Portrait Photography", "Candid Photography", "Wedding Photography", "Newborn Photography",
        "Family & Group Photography", "Birthday Photography", "Engagement & Pre-Wedding Photography", "Anniversary Photography"
    ];

    const videoServices = [
        "Cinematic Videography", "Wedding & Reception Videography", "Engagement & Pre-Wedding Videography",
        "Birthday & Anniversary Videography", "Cultural Event Videography", "Corporate Event Videography"
    ];

    // Dynamic Category Checkbox Population
    if (serviceMediumSelect && subCategoryGroup && checkboxGrid) {
        serviceMediumSelect.addEventListener('change', () => {
            const val = serviceMediumSelect.value;
            checkboxGrid.innerHTML = '';

            let listToRender = [];
            if (val === 'photography') listToRender = photoServices;
            else if (val === 'videography') listToRender = videoServices;
            else if (val === 'both') listToRender = [...photoServices, ...videoServices];

            if (listToRender.length > 0) {
                subCategoryGroup.style.display = 'block';
                listToRender.forEach(srv => {
                    const label = document.createElement('label');
                    label.className = 'checkbox-label';
                    label.innerHTML = `
                        <input type="checkbox" name="categories" value="${srv}">
                        <span>${srv}</span>
                    `;
                    checkboxGrid.appendChild(label);
                });
            } else {
                subCategoryGroup.style.display = 'none';
            }
        });
    }

    // Make 14 Creative Services Clickable to Auto-Select in Booking Form
    const serviceClickRows = document.querySelectorAll('.service-row[data-service-name]');
    serviceClickRows.forEach(row => {
        row.addEventListener('click', () => {
            const sName = row.getAttribute('data-service-name');
            const sMedium = row.getAttribute('data-medium');

            if (serviceMediumSelect) {
                serviceMediumSelect.value = sMedium;
                serviceMediumSelect.dispatchEvent(new Event('change'));

                // Find and check the target checkbox
                setTimeout(() => {
                    const targetCheckbox = document.querySelector(`input[name="categories"][value="${sName}"]`);
                    if (targetCheckbox) targetCheckbox.checked = true;
                }, 50);
            }

            // Smooth scroll to contact section
            const contactSection = document.getElementById('scene-contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form Validation Rules & Helpers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7,}$/;

    function clearFieldError(inputEl, errorEl) {
        if (inputEl) {
            inputEl.classList.remove('is-invalid');
        }
        if (errorEl) errorEl.textContent = '';
    }

    function setFieldError(inputEl, errorEl, msg) {
        if (inputEl) {
            inputEl.classList.remove('is-valid');
            inputEl.classList.add('is-invalid');
        }
        if (errorEl) errorEl.textContent = msg;
    }

    function setFieldValid(inputEl, errorEl) {
        if (inputEl) {
            inputEl.classList.remove('is-invalid');
            inputEl.classList.add('is-valid');
        }
        if (errorEl) errorEl.textContent = '';
    }

    // Real-time Input Validation Listeners
    const formFields = [
        { id: 'form-name', errId: 'error-name', validate: val => val.length >= 2, msg: 'Name must be at least 2 characters.' },
        { id: 'form-email', errId: 'error-email', validate: val => emailRegex.test(val), msg: 'Please enter a valid email address.' },
        { id: 'form-phone', errId: 'error-phone', validate: val => phoneRegex.test(val), msg: 'Please enter a valid phone number (at least 7-10 digits).' },
        { id: 'form-service-medium', errId: 'error-medium', validate: val => val !== '', msg: 'Please select a primary medium.' },
        { id: 'form-message', errId: 'error-message', validate: val => val.length >= 10, msg: 'Please provide at least 10 characters about your event.' }
    ];

    formFields.forEach(f => {
        const inputEl = document.getElementById(f.id);
        const errEl = document.getElementById(f.errId);
        if (inputEl && errEl) {
            inputEl.addEventListener('input', () => {
                const val = inputEl.value.trim();
                if (f.validate(val)) {
                    setFieldValid(inputEl, errEl);
                } else {
                    clearFieldError(inputEl, errEl);
                }
            });

            inputEl.addEventListener('blur', () => {
                const val = inputEl.value.trim();
                if (!f.validate(val)) {
                    setFieldError(inputEl, errEl, f.msg);
                } else {
                    setFieldValid(inputEl, errEl);
                }
            });
        }
    });

    // Main Form Submit Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear status message
            formStatusMessage.className = 'form-status';
            formStatusMessage.textContent = '';

            let isValid = true;
            let firstInvalidEl = null;

            // Validate standard text/select fields
            formFields.forEach(f => {
                const inputEl = document.getElementById(f.id);
                const errEl = document.getElementById(f.errId);
                const val = inputEl ? inputEl.value.trim() : '';

                if (!f.validate(val)) {
                    setFieldError(inputEl, errEl, f.msg);
                    isValid = false;
                    if (!firstInvalidEl) firstInvalidEl = inputEl;
                } else {
                    setFieldValid(inputEl, errEl);
                }
            });

            // Validate Category Checkboxes if sub-category group is visible
            const errCat = document.getElementById('error-categories');
            if (serviceMediumSelect && serviceMediumSelect.value !== '') {
                const checkedCats = document.querySelectorAll('input[name="categories"]:checked');
                if (checkedCats.length === 0) {
                    if (errCat) errCat.textContent = 'Please check at least one service category.';
                    if (checkboxGrid) checkboxGrid.classList.add('is-invalid');
                    isValid = false;
                    if (!firstInvalidEl) firstInvalidEl = checkboxGrid;
                } else {
                    if (errCat) errCat.textContent = '';
                    if (checkboxGrid) checkboxGrid.classList.remove('is-invalid');
                }
            }

            if (!isValid) {
                formStatusMessage.textContent = 'Please review and correct the highlighted fields above.';
                formStatusMessage.classList.add('show', 'error');

                if (firstInvalidEl) {
                    firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (typeof firstInvalidEl.focus === 'function') firstInvalidEl.focus();
                }
                return;
            }

            // Form is completely valid -> Simulate submission state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING INQUIRY...';
            submitBtn.classList.add('btn-loading');

            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.classList.remove('btn-loading');

                formStatusMessage.textContent = '✓ Thank you! Your inquiry has been sent successfully. We will be in touch within 24 hours.';
                formStatusMessage.classList.add('show', 'success');
                
                // Clear field valid states & reset form
                document.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
                bookingForm.reset();
                if (subCategoryGroup) subCategoryGroup.style.display = 'none';

                formStatusMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1200);
        });
    }

    // Direct WhatsApp Prefilled Chat Builder
    if (whatsappDirectBtn) {
        whatsappDirectBtn.addEventListener('click', () => {
            const name = document.getElementById('form-name').value.trim() || 'Client';
            const email = document.getElementById('form-email').value.trim() || 'Not specified';
            const phone = document.getElementById('form-phone').value.trim() || 'Not specified';
            const medium = serviceMediumSelect ? serviceMediumSelect.value : '';
            const date = document.getElementById('form-date').value || 'To be decided';
            const location = document.getElementById('form-location').value.trim() || 'To be decided';
            const guests = document.getElementById('form-guests').value.trim() || 'Not specified';
            const budgetSelect = document.getElementById('form-budget');
            const budget = budgetSelect ? budgetSelect.options[budgetSelect.selectedIndex].text : 'Flexible';
            const message = document.getElementById('form-message').value.trim() || 'No additional notes';

            // Selected categories
            const selectedCats = Array.from(document.querySelectorAll('input[name="categories"]:checked')).map(c => c.value);
            const categoriesText = selectedCats.length > 0 ? selectedCats.join(', ') : (medium || 'Photography & Videography');

            let formattedText = `Hello! I would like to inquire about booking a session.\n\n`;
            formattedText += `👤 *Name:* ${name}\n`;
            formattedText += `📧 *Email:* ${email}\n`;
            formattedText += `📞 *Phone:* ${phone}\n`;
            formattedText += `📷 *Medium:* ${medium ? medium.toUpperCase() : 'Photography & Videography'}\n`;
            formattedText += `✨ *Services:* ${categoriesText}\n`;
            formattedText += `📅 *Date:* ${date}\n`;
            formattedText += `📍 *Venue:* ${location}\n`;
            formattedText += `👥 *Guests:* ${guests}\n`;
            formattedText += `💰 *Budget:* ${budget}\n`;
            formattedText += `📝 *Story/Notes:* ${message}`;

            const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(formattedText)}`;
            window.open(waUrl, '_blank');
        });
    }

});
