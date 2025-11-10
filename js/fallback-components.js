// Fallback components script - loads without ES6 modules
console.log('Loading fallback components...');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallbackComponents);
} else {
    initFallbackComponents();
}

function initFallbackComponents() {
    console.log('Initializing fallback components...');
    
    // Load header and footer
    loadHeaderFallback();
    loadFooterFallback();
    
    // Initialize mobile navigation
    initMobileNavigationFallback();
    
    // Initialize mega menu
    initMegaMenuFallback();
    
    // Initialize scroll effects
    initScrollEffectsFallback();
    
    // Initialize map scroll fix
    initMapScrollFix();
    
    // Initialize product carousel (mobile-only)
    initProductCarousel();
    
    // Initialize Lenis smooth scroll
    initLenisSmootScrollFallback();
    
    // Initialize GSAP animations
    initGSAPAnimationsFallback();
    
    console.log('Fallback components initialized');
}

function loadHeaderFallback() {
    console.log('Loading header fallback...');
    
    const currentPath = window.location.pathname;
    
    // More robust path detection
    const isInPagesFolder = currentPath.includes('/pages/') || currentPath.includes('\\pages\\');
    const isInSubFolder = (currentPath.includes('/Presklenne-steny/') || currentPath.includes('\\Presklenne-steny\\') || 
                          currentPath.includes('/projekty/') || currentPath.includes('\\projekty\\') ||
                          currentPath.includes('/Okna/') || currentPath.includes('\\Okna\\') ||
                          currentPath.includes('/Vchodove-dvere/') || currentPath.includes('\\Vchodove-dvere\\') ||
                          currentPath.includes('/Interierove-dvere/') || currentPath.includes('\\Interierove-dvere\\') ||
                          currentPath.includes('/Historicke-objekty/') || currentPath.includes('\\Historicke-objekty\\') ||
                          currentPath.includes('/realizacie/') || currentPath.includes('\\realizacie\\') ||
                          currentPath.includes('/realizacie/') || currentPath.includes('\\realizacie\\'));
    
    // Debug logging for presklenne-steny
    if (currentPath.includes('Presklenne-steny')) {
        console.log('Presklenne-steny page detected:', currentPath);
        console.log('isInSubFolder:', isInSubFolder);
    }
    
    // Additional check for file protocol with different path structure
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    const hasSubfolder = pathSegments.length >= 3 && (pathSegments.includes('Presklenne-steny') || pathSegments.includes('projekty') || 
                                                     pathSegments.includes('Okna') || pathSegments.includes('Vchodove-dvere') || 
                                                     pathSegments.includes('Interierove-dvere') || pathSegments.includes('Historicke-objekty') || 
                                                     pathSegments.includes('realizacie') || pathSegments.includes('realizacie'));
    const hasPagesFolder = pathSegments.includes('pages');
    
    // Set navigation paths based on current location
    let basePath, logoPath, pagesPath;
    
    // Use more robust detection
    if (isInSubFolder || hasSubfolder) {
        // We're in /pages/subfolder/ (like Presklenne-steny or projekty)
        basePath = '../../';  // To reach root
        logoPath = '../../logo.png';
        pagesPath = '../';  // To reach /pages/ from subfolder
    } else if (isInPagesFolder || hasPagesFolder) {
        // We're in /pages/
        basePath = '../';  // To reach root
        logoPath = '../logo.png';
        pagesPath = '';  // Stay in current /pages/ directory
    } else {
        // We're in root directory
        basePath = '';
        logoPath = 'logo.png';
        pagesPath = 'pages/';  // Go to /pages/ from root
    }
    
    const navigationHTML = `
        <!-- Scroll Progress Indicator -->
        <div class="scroll-progress">
            <div class="scroll-progress-bar"></div>
        </div>

        <!-- Transparent Navigation -->
        <nav class="navbar navbar-transparent">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="${basePath}index.html" class="logo-link">
                        <img src="${logoPath}" alt="DREVIS" class="logo-image">
                    </a>
                </div>
                <ul class="nav-menu nav-menu-main">
                    <li><a href="${pagesPath}Okna/drevohlinikove-okna.html" class="nav-link has-mega-menu white-underline" data-mega="okna">Okná</a></li>
                    <li><a href="${pagesPath}Vchodove-dvere/drevohlinikove-dvere.html" class="nav-link has-mega-menu white-underline" data-mega="vchodove-dvere">Vchodové dvere</a></li>
                    <li><a href="${pagesPath}Interierove-dvere/ramove.html" class="nav-link has-mega-menu white-underline" data-mega="interierove-dvere">Interiérové dvere</a></li>
                    <li><a href="${pagesPath}Presklenne-steny/hs-portal.html" class="nav-link has-mega-menu white-underline" data-mega="presklenne-steny">Presklenné steny</a></li>
                    <li><a href="${pagesPath}Historicke-objekty/historicke-okna.html" class="nav-link has-mega-menu white-underline" data-mega="historicke-objekty">Historické objekty</a></li>
                    <li><a href="${pagesPath}realizacie/rodinne-domy.html" class="nav-link has-mega-menu white-underline" data-mega="realizacie">Realizácie</a></li>
                    <li><a href="${pagesPath}sluzby.html" class="nav-link white-underline">Služby</a></li>
                </ul>
                <div class="nav-kontakt">
                    <a href="${pagesPath}kontakt.html" class="kontakt-button">
                        Kontakt
                    </a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                <!-- Mega Menu Container -->
                <div class="mega-menu" id="mega-menu">
                    <div class="mega-menu-content">
                        <!-- Dynamic mega menu content will be inserted here -->
                    </div>
                </div>
            </div>
        </nav>
    `;
    
    const headerContainer = document.getElementById('header-container') || document.body;
    if (headerContainer === document.body) {
        headerContainer.insertAdjacentHTML('afterbegin', navigationHTML);
    } else {
        headerContainer.innerHTML = navigationHTML;
    }
    setActiveNavLink();
    console.log('Header loaded successfully');
}

function loadFooterFallback() {
    console.log('Loading footer fallback...');

    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    // Set navigation paths based on current location
    let basePath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/ - need different paths for different targets
        basePath = '../../';  // To reach root for index.html
    } else if (isInPagesDir) {
        // We're in /pages/ - stay in pages directory for other pages
        basePath = '../';     // To reach root for index.html
    } else {
        // We're in root directory
        basePath = '';
    }

    const footerHTML = `
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-main">
                    <div class="footer-column">
                        <div class="footer-company">
                            <h3>DREVIS – MIROSLAV HARAG</h3>
                            <div class="footer-contact-info">
                                <p><strong>IČO:</strong> 32945078</p>
                                <p><strong>DIČ:</strong> 1020583861</p>
                                <br>
                                <p><strong>Sídlo:</strong></p>
                                <p>1.Mája 2</p>
                                <p>Prievidza časť Hradec</p>
                                <p>971 01</p>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <div class="footer-navigation">
                            <h4>Navigácia</h4>
                            <div class="footer-nav-links">
                                <a href="${basePath}pages/kontakt.html">Kontakt</a>
                                <a href="${basePath}pages/sluzby.html">Služby</a>
                                <a href="${basePath}pages/realizacie.html">Realizácie</a>
                                <a href="#" onclick="openPrivacyPopup(); return false;">Ochrana údajov</a>
                                <a href="#" onclick="openCookieSettings(); return false;">Cookies</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <div class="footer-contact-icons">
                            <h4>Kontakt</h4>
                            <div class="contact-icon-item">
                                <div class="contact-icon-wrapper">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/>
                                        <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <span>E-mail: info@drevis.sk</span>
                            </div>
                            
                            <div class="contact-icon-item">
                                <div class="contact-icon-wrapper">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <span>Mobil: +421 905 171 865</span>
                            </div>
                            
                            <div class="contact-icon-item">
                                <div class="contact-icon-wrapper">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
                                        <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <span>1.Mája 2<br>Prievidza časť Hradec<br>971 01</span>
                            </div>
                            
                            <div class="contact-icon-item">
                                <div class="contact-icon-wrapper">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                        <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <span>pon-pia: 7:00-12:00 / 12:30-15:30<br>sob-ned: zatvorené<br>Stretnutie mimo otváracích hodín je možné po dohode.</span>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                
                <div class="footer-divider"></div>
                
                
                <div class="footer-copyright">
                    <p>© 2024 DREVIS – MIROSLAV HARAG. Všetky práva vyhradené</p>
                    <p>Tvorba stránky - <a href="https://aebdigital.sk" target="_blank" rel="noopener">AEB Digital</a></p>
                </div>
                
            </div>
        </footer>
        
        <!-- Cookie Consent Popup -->
        <div id="cookie-consent" class="cookie-consent">
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <div class="cookie-icon">🍪</div>
                    <div class="cookie-message">
                        Používame cookies na zlepšenie vašej používateľskej skúsenosti a na analýzu návštevnosti. Kliknutím na "Súhlasím" súhlasíte s používaním všetkých cookies.
                    </div>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn settings" onclick="openCookieSettings()">Nastavenia</button>
                    <button class="cookie-btn accept" onclick="acceptAllCookies()">Súhlasím</button>
                </div>
            </div>
        </div>
        
        <!-- Cookie Settings Modal -->
        <div id="cookie-settings-modal" class="cookie-settings-modal">
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h2 class="cookie-settings-title">Nastavenia cookies</h2>
                    <button class="cookie-settings-close" onclick="closeCookieSettings()">&times;</button>
                </div>
                <div class="cookie-settings-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Nevyhnutné cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="necessary-cookies" checked disabled>
                                <span class="cookie-toggle-slider"></span>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Tieto cookies sú potrebné pre základnú funkčnosť stránky a nemožno ich vypnúť.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Analytické cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies">
                                <span class="cookie-toggle-slider"></span>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku, aby sme ju mohli zlepšiť.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Marketingové cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies">
                                <span class="cookie-toggle-slider"></span>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Používajú sa na personalizáciu reklám a meranie ich účinnosti.
                        </p>
                    </div>
                </div>
                <div class="cookie-settings-footer">
                    <button class="cookie-settings-btn save" onclick="saveCookieSettings()">Uložiť nastavenia</button>
                    <button class="cookie-settings-btn accept-all" onclick="acceptAllCookies()">Súhlasím so všetkými</button>
                </div>
            </div>
        </div>
        
        <!-- Privacy Policy Popup -->
        <div id="privacy-popup" class="privacy-popup">
            <div class="privacy-popup-content">
                <div class="privacy-popup-header">
                    <h2>Ochrana osobných údajov</h2>
                    <button class="privacy-popup-close" onclick="closePrivacyPopup()">&times;</button>
                </div>
                <div class="privacy-popup-body">
                    <div class="company-info">
                        <strong>DREVIS – MIROSLAV HARAG</strong><br>
                        <a href="https://maps.google.com/?q=1.+M%C3%A1ja+2,+Prievidza+%C4%8Das%C5%A5+Hradec,+971+01" target="_blank" rel="noopener" style="text-decoration: underline; color: #9f062e;">1.Mája 2, Prievidza časť Hradec, 971 01</a><br>
                        Slovenská republika<br>
                        IČO: 32945078<br>
                        DIČ: 1020583861<br>
                        E-mail: info@drevis.sk<br>
                        Tel.: +421 905 171 865
                    </div>
                    
                    <p>Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.</p>
                    
                    <h3>I. Kontaktný formulár</h3>
                    <p>Na stránke www.drevis.sk prevádzkujeme kontaktný formulár ktorého účelom je umožniť vám:</p>
                    <p>Položiť otázku k našim produktom a službám<br>
                    Požiadať o cenovú ponuku</p>
                    
                    <p><strong>Rozsah spracúvaných údajov:</strong></p>
                    <p>Meno a priezvisko<br>
                    E-mailová adresa<br>
                    Telefónne číslo<br>
                    Správu</p>
                    
                    <p><strong>Účel spracovania:</strong><br>
                    Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>
                    
                    <p><strong>Právny základ:</strong><br>
                    Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>
                    
                    <p><strong>Doba uchovávania:</strong><br>
                    Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>
                    
                    <h3>II. Súbory cookies</h3>
                    <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
                    <p>Nevyhnutné cookies – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).<br>
                    Štatistické (analytické) cookies – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</p>
                    
                    <p><strong>Správa súhlasov:</strong><br>
                    Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>
                    
                    <h3>III. Práva dotknutej osoby</h3>
                    <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
                    <p>Prístup k osobným údajom, ktoré spracúvame<br>
                    Oprava nepresných alebo neúplných údajov<br>
                    Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ<br>
                    Obmedzenie spracovania<br>
                    Prenosnosť údajov<br>
                    Odvolanie súhlasu – stane sa účinným dňom odvolania<br>
                    Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</p>
                    
                    <p>V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na info@drevis.sk alebo telefónnom čísle +421 905 171 865.</p>
                    
                    <p><strong>Tieto Zásady nadobúdajú účinnosť dňom 25. 7. 2025.</strong></p>
                </div>
            </div>
        </div>
    `;
    
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
        initPrivacyModalFallback();
        console.log('Footer loaded successfully');
    } else {
        console.error('Footer container not found');
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === '/' || currentPage.includes('index.html')) {
            if (href.includes('index.html')) {
                link.classList.add('active');
            }
        } else if (currentPage.includes(href.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

function initMobileNavigationFallback() {
    document.addEventListener('click', function(e) {
        // Toggle mobile sidebar
        if (e.target.closest('.hamburger')) {
            const hamburger = e.target.closest('.hamburger');
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const navbar = document.querySelector('.navbar-transparent');
            
            hamburger.classList.toggle('active');
            mobileSidebar.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                navbar.classList.add('mobile-menu-open');
                document.body.style.overflow = 'hidden';
            } else {
                navbar.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        }
        
        // Close mobile sidebar when clicking overlay, mobile link, or close button
        if (e.target.classList.contains('mobile-overlay') || e.target.classList.contains('mobile-nav-link') || e.target.classList.contains('mobile-close-btn')) {
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar-transparent');
            
            if (mobileSidebar) mobileSidebar.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            if (navbar) navbar.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar-transparent');
            
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                mobileSidebar.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
                if (navbar) navbar.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        }
    });
}

function initScrollEffectsFallback() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const transparentNavbar = document.querySelector('.navbar-transparent');
    
    // Set initial navbar state on page load
    updateNavbarBackgroundFallback();
    
    // Minimal scroll listener like template
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update scroll progress (minimal calculation)
        if (scrollProgress) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            scrollProgress.style.height = scrollPercentage + '%';
        }
        
        // Update navbar background (lightweight)
        updateNavbarBackgroundFallback();
    });
}

function updateNavbarBackgroundFallback() {
    const scrollPosition = window.scrollY;
    const transparentNavbar = document.querySelector('.navbar-transparent');
    const logoImage = document.querySelector('.logo-image');

    if (!transparentNavbar) return;
    
    // 8vh trigger point for all pages
    const triggerPoint = window.innerHeight * 0.08;

    // Determine logo path based on current location - USE SAME LOGIC AS HEADER LOADING
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/') || currentPath.includes('\\pages\\');
    const isInSubFolder = (currentPath.includes('/Presklenne-steny/') || currentPath.includes('\\Presklenne-steny\\') || 
                          currentPath.includes('/projekty/') || currentPath.includes('\\projekty\\') ||
                          currentPath.includes('/Okna/') || currentPath.includes('\\Okna\\') ||
                          currentPath.includes('/Vchodove-dvere/') || currentPath.includes('\\Vchodove-dvere\\') ||
                          currentPath.includes('/Interierove-dvere/') || currentPath.includes('\\Interierove-dvere\\') ||
                          currentPath.includes('/Historicke-objekty/') || currentPath.includes('\\Historicke-objekty\\') ||
                          currentPath.includes('/realizacie/') || currentPath.includes('\\realizacie\\') ||
                          currentPath.includes('/realizacie/') || currentPath.includes('\\realizacie\\'));
    
    // Additional check for file protocol with different path structure
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    const hasSubfolder = pathSegments.length >= 3 && (pathSegments.includes('Presklenne-steny') || pathSegments.includes('projekty') || 
                                                     pathSegments.includes('Okna') || pathSegments.includes('Vchodove-dvere') || 
                                                     pathSegments.includes('Interierove-dvere') || pathSegments.includes('Historicke-objekty') || 
                                                     pathSegments.includes('realizacie') || pathSegments.includes('realizacie'));
    const hasPagesFolder = pathSegments.includes('pages');

    let basePath;
    if (isInSubFolder || hasSubfolder) {
        // We're in /pages/subfolder/ (like Presklenne-steny or projekty)
        basePath = '../../';
    } else if (isInPagesFolder || hasPagesFolder) {
        // We're in /pages/
        basePath = '../';
    } else {
        // We're in root directory
        basePath = '';
    }

    // Debug for presklenne-steny
    if (currentPath.includes('Presklenne-steny')) {
        console.log('UpdateNavbar - logoPath:', `${basePath}logo.png`);
    }

    if (scrollPosition > triggerPoint) {
        transparentNavbar.classList.add('scrolled');
        if (logoImage) {
            logoImage.src = `${basePath}logo.png`;
        }
    } else {
        transparentNavbar.classList.remove('scrolled');
        if (logoImage) {
            logoImage.src = `${basePath}logo.png`;
        }
    }
}

function initPrivacyModalFallback() {
    // Make privacy functions globally available
    let privacyScrollPosition = 0;

    window.openPrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.add('active');
            // Save scroll position and prevent scrolling
            privacyScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            document.body.style.top = `-${privacyScrollPosition}px`;
            document.body.classList.add('no-scroll');
        }
    };

    window.closePrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.remove('active');
            // Restore scrolling and scroll position
            document.body.classList.remove('no-scroll');
            document.body.style.top = '';
            window.scrollTo(0, privacyScrollPosition);
        }
    };

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('privacy-popup');
        if (popup && e.target === popup) {
            window.closePrivacyPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closePrivacyPopup();
        }
    });
    
    // Initialize cookie consent
    setTimeout(initCookieConsentFallback, 1000);
}

function initCookieConsentFallback() {
    // Prevent double initialization if regular module already ran
    if (window.cookieConsentInitialized) return;
    window.cookieConsentInitialized = true;
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (cookiesAccepted === null) {
        // Show cookie consent banner after a short delay
        setTimeout(() => {
            const cookieConsent = document.getElementById('cookie-consent');
            if (cookieConsent) {
                cookieConsent.classList.add('show');
            }
        }, 2000);
    }
    
    // Make cookie functions globally available
    window.acceptCookies = function() {
        localStorage.setItem('cookiesAccepted', 'true');
        const cookieConsent = document.getElementById('cookie-consent');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
        }
    };
    
    window.acceptAllCookies = function() {
        localStorage.setItem('cookiesAccepted', 'true');
        const cookieConsent = document.getElementById('cookie-consent');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
        }
    };
    
    window.rejectCookies = function() {
        localStorage.setItem('cookiesAccepted', 'false');
        const cookieConsent = document.getElementById('cookie-consent');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
        }
    };
}

// Mobile-only product tabs carousel
function initProductCarousel() {
    // Only initialize on mobile
    if (window.innerWidth > 768) return;
    
    const container = document.querySelector('.product-tabs-container');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (!container || !leftArrow || !rightArrow) return;
    
    let currentIndex = 0;
    const totalTabs = 6;
    
    // Tab data for redirects
    const tabData = [
        { tab: 'dvere', text: 'Dvere' },
        { tab: 'zarubne', text: 'Zárubne' },
        { tab: 'drevo-schody', text: 'Drevené schody' },
        { tab: 'nabytok', text: 'Nábytok na mieru' },
        { tab: 'celoskla', text: 'Celosklá' },
        { tab: 'obklady', text: 'Obklady' }
    ];
    
    function updateCarousel() {
        const translateX = -(currentIndex * 16.666); // Move by 1/6 of container width
        container.style.transform = `translateX(${translateX}%)`;
        
        // Update active tab
        const tabs = document.querySelectorAll('.product-tab-hero');
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', index === currentIndex);
        });
    }
    
    function redirectToTab(index) {
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        const basePath = isInPagesDir ? '' : 'pages/';
        
        window.location.href = `${basePath}produkty-sluzby.html?tab=${tabData[index].tab}`;
    }
    
    leftArrow.addEventListener('click', () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : totalTabs - 1;
        redirectToTab(newIndex);
    });
    
    rightArrow.addEventListener('click', () => {
        const newIndex = currentIndex < totalTabs - 1 ? currentIndex + 1 : 0;
        redirectToTab(newIndex);
    });
    
    // Initialize
    updateCarousel();
}

// Fix Google Maps scroll interference
function initMapScrollFix() {
    const mapContainers = document.querySelectorAll('.location-map-container');
    
    mapContainers.forEach(container => {
        container.addEventListener('click', function() {
            this.classList.add('active');
        });
        
        // Deactivate when clicking outside
        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                container.classList.remove('active');
            }
        });
    });
}

// Cookie Consent Functions
function showCookieConsent() {
    const cookieConsent = localStorage.getItem('cookiesAccepted');
    if (!cookieConsent) {
        document.getElementById('cookie-consent').classList.add('show');
    }
}

function acceptAllCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('analytics-cookies', 'true');
    localStorage.setItem('marketing-cookies', 'true');
    document.getElementById('cookie-consent').classList.remove('show');
    closeCookieSettings();
}

let cookieScrollPosition = 0;

function openCookieSettings() {
    // Load current settings
    const analyticsEnabled = localStorage.getItem('analytics-cookies') === 'true';
    const marketingEnabled = localStorage.getItem('marketing-cookies') === 'true';

    document.getElementById('analytics-cookies').checked = analyticsEnabled;
    document.getElementById('marketing-cookies').checked = marketingEnabled;

    document.getElementById('cookie-settings-modal').classList.add('show');
    // Save scroll position and prevent scrolling
    cookieScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.top = `-${cookieScrollPosition}px`;
    document.body.classList.add('no-scroll');
}

function closeCookieSettings() {
    document.getElementById('cookie-settings-modal').classList.remove('show');
    // Restore scrolling and scroll position
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, cookieScrollPosition);
}

function saveCookieSettings() {
    const analyticsEnabled = document.getElementById('analytics-cookies').checked;
    const marketingEnabled = document.getElementById('marketing-cookies').checked;
    
    localStorage.setItem('cookiesAccepted', 'custom');
    localStorage.setItem('analytics-cookies', analyticsEnabled.toString());
    localStorage.setItem('marketing-cookies', marketingEnabled.toString());
    
    document.getElementById('cookie-consent').classList.remove('show');
    closeCookieSettings();
}

// Close modal when clicking on backdrop
document.addEventListener('click', function(e) {
    if (e.target.id === 'cookie-settings-modal') {
        closeCookieSettings();
    }
});

// Show cookie consent on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showCookieConsent, 1000); // Show after 1 second
});

// Lenis Smooth Scrolling for Fallback
function initLenisSmootScrollFallback() {
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis not loaded in fallback mode');
        return;
    }

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        if (typeof gsap !== 'undefined') {
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }
    }
    
    console.log('Lenis smooth scroll initialized in fallback mode');
}

// GSAP Animations for Fallback - Simplified Section-Level
function initGSAPAnimationsFallback() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded in fallback mode');
        return;
    }

    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // No animations for any hero sections - they should be immediately visible

    // Remove section animations that cause slow loading - content should be immediately visible
    // Simple fade-in only for non-essential decorative elements
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.decorative-element').forEach((element) => {
            gsap.fromTo(element, 
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 95%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }
    
    console.log('GSAP animations initialized in fallback mode');
}

// Mega Menu Functionality Fallback
function initMegaMenuFallback() {
    // Determine paths based on current location
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/') || currentPath.includes('\\pages\\');
    const isInSubFolder = (currentPath.includes('/Presklenne-steny/') || currentPath.includes('\\Presklenne-steny\\') || 
                          currentPath.includes('/projekty/') || currentPath.includes('\\projekty\\') ||
                          currentPath.includes('/Okna/') || currentPath.includes('\\Okna\\') ||
                          currentPath.includes('/Interierove-dvere/') || currentPath.includes('\\Interierove-dvere\\') ||
                          currentPath.includes('/Vchodove-dvere/') || currentPath.includes('\\Vchodove-dvere\\') ||
                          currentPath.includes('/Historicke-objekty/') || currentPath.includes('\\Historicke-objekty\\') ||
                          currentPath.includes('/realizacie/') || currentPath.includes('\\realizacie\\') ||
                          currentPath.includes('/realizacie/') || currentPath.includes('\\realizacie\\'));
    
    let sourcesPath;
    if (isInSubFolder) {
        sourcesPath = '../../sources/';
    } else if (isInPagesFolder) {
        sourcesPath = '../sources/';
    } else {
        sourcesPath = 'sources/';
    }
    
    const megaMenuData = {
        'okna': {
            title: 'Okná',
            items: [
                {
                    title: 'Drevohliníkové',
                    description: 'Kombinácia dreva a hliníka',
                    image: `${sourcesPath}okna/drevohlinikove/ALU classic.jpg`,
                    link: 'Okna/drevohlinikove-okna.html'
                },
                {
                    title: 'Drevené',
                    description: 'Tradičné drevené okná',
                    image: `${sourcesPath}okna/drevene/Drevene okno Clasic 68-18.jpg`,
                    link: 'Okna/drevene-okna.html'
                }
            ]
        },
        'vchodove-dvere': {
            title: 'Vchodové dvere',
            items: [
                {
                    title: 'Drevohliníkové',
                    description: 'Moderná kombinácia materiálov',
                    image: `${sourcesPath}drevohlinikove.jpg`,
                    link: 'Vchodove-dvere/drevohlinikove-dvere.html'
                },
                {
                    title: 'Drevené',
                    description: 'Klasické drevené dvere',
                    image: `${sourcesPath}drevene.jpg`,
                    link: 'Vchodove-dvere/drevene-dvere.html'
                }
            ]
        },
        'interierove-dvere': {
            title: 'Interiérové dvere',
            items: [
                {
                    title: 'Rámové dvere',
                    description: 'Klasické rámové riešenie',
                    image: `${sourcesPath}interierove/ramove.jpg`,
                    link: 'Interierove-dvere/ramove.html'
                },
                {
                    title: 'Hladké dvere',
                    description: 'Moderný minimalistický vzhľad',
                    image: `${sourcesPath}interierove/hladke.jpg`,
                    link: 'Interierove-dvere/hladke.html'
                }
            ]
        },
        'presklenne-steny': {
            title: 'Presklenné steny',
            items: [
                {
                    title: 'HS Portal',
                    description: 'Paralelné posuvné steny',
                    image: `${sourcesPath}Presklenne steny/HS Portal.jpg`,
                    link: 'Presklenne-steny/hs-portal.html'
                },
                {
                    title: 'FS Portal',
                    description: 'Skladacie systémy',
                    image: `${sourcesPath}Presklenne steny/FS portal.jpg`,
                    link: 'Presklenne-steny/fs-portal.html'
                },
                {
                    title: 'PSK',
                    description: 'Výklopno-posuvné dvere',
                    image: `${sourcesPath}Presklenne steny/PSK.jpg`,
                    link: 'Presklenne-steny/psk.html'
                },
                {
                    title: 'Zimné záhrady',
                    description: 'Presklené priestory',
                    image: `${sourcesPath}6.jpg`,
                    link: 'Presklenne-steny/zimne-zahrady.html'
                }
            ]
        },
        'historicke-objekty': {
            title: 'Historické objekty',
            items: [
                {
                    title: 'Historické okná',
                    description: 'Obnova historických drevených okien',
                    image: `${sourcesPath}historicke objekty/okna.jpg`,
                    link: 'Historicke-objekty/historicke-okna.html'
                },
                {
                    title: 'Vchodové dvere',
                    description: 'Repliky s kováčskym kovaním',
                    image: `${sourcesPath}historicke objekty/vchodove.jpg`,
                    link: 'Historicke-objekty/historicke-vchodove-dvere.html'
                },
                {
                    title: 'Interiérové dvere',
                    description: 'Ozdobné profilovacie prvky',
                    image: `${sourcesPath}historicke objekty/interierove dvere.jpg`,
                    link: 'Historicke-objekty/historicke-interierove-dvere.html'
                },
                {
                    title: 'Historické brány',
                    description: 'Masívne konštrukcie s ozdobným kovaním',
                    image: `${sourcesPath}historicke objekty/brany.jpg`,
                    link: 'Historicke-objekty/historicke-brany.html'
                }
            ]
        },
        'realizacie': {
            title: 'Realizácie',
            items: [
                {
                    title: 'Rodinné domy',
                    description: 'Realizácie v rodinných domoch a chatách',
                    image: `${sourcesPath}realizacie-main/rodinne domz.jpg`,
                    link: 'realizacie/rodinne-domy.html'
                },
                {
                    title: 'Verejné budovy',
                    description: 'Projekty pre školy, úrady a kultúrne zariadenia',
                    image: `${sourcesPath}realizacie-main/verejne budovy.jpg`,
                    link: 'realizacie/verejne-budovy.html'
                }
            ]
        }
    };
    
    const megaMenuLinks = document.querySelectorAll('.nav-link.has-mega-menu');
    const megaMenu = document.getElementById('mega-menu');
    let currentActiveMenu = null;
    let megaMenuTimeout;
    
    megaMenuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            clearTimeout(megaMenuTimeout);
            const menuType = link.getAttribute('data-mega');
            if (megaMenuData[menuType] && menuType !== currentActiveMenu) {
                showMegaMenu(menuType);
                currentActiveMenu = menuType;
            }
        });
        
        link.addEventListener('mouseleave', () => {
            megaMenuTimeout = setTimeout(() => {
                hideMegaMenu();
                currentActiveMenu = null;
            }, 150);
        });
    });
    
    if (megaMenu) {
        megaMenu.addEventListener('mouseenter', () => {
            clearTimeout(megaMenuTimeout);
        });
        
        megaMenu.addEventListener('mouseleave', () => {
            hideMegaMenu();
            currentActiveMenu = null;
        });
    }
    
    function showMegaMenu(menuType) {
        const data = megaMenuData[menuType];
        if (!data || !megaMenu) return;
        
        const content = megaMenu.querySelector('.mega-menu-content');
        let pathPrefix = '';
        
        if (isInSubFolder) {
            pathPrefix = '../';
        } else if (!isInPagesFolder) {
            pathPrefix = 'pages/';
        }
        
        // Add fade out effect
        content.classList.add('fade-out');
        
        // Wait for fade out, then update content and fade in
        setTimeout(() => {
            content.innerHTML = `
                <div class="mega-menu-section">
                    ${data.items.map(item => `
                        <div class="mega-menu-item">
                            <a href="${pathPrefix}${item.link}" class="mega-menu-link white-underline" style="background-image: url('${item.image}')">
                                <img src="${item.image}" alt="${item.title}" class="mega-menu-image">
                                <div class="mega-menu-info">
                                    <h4 class="white-underline">${item.title}</h4>
                                    <p>${item.description}</p>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Remove fade out to fade back in
            content.classList.remove('fade-out');
        }, 150); // Half of the CSS transition time for smooth effect
        
        // Remove active class from all nav links
        megaMenuLinks.forEach(l => l.classList.remove('active'));
        // Add active class to current link
        const activeLink = document.querySelector(`[data-mega="${menuType}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        megaMenu.classList.add('active');
        // Activate header when mega menu opens
        const navbar = document.querySelector('.navbar-transparent');
        if (navbar) navbar.classList.add('mega-menu-open');
    }
    
    function hideMegaMenu() {
        if (megaMenu) {
            megaMenu.classList.remove('active');
            megaMenuLinks.forEach(link => link.classList.remove('active'));
        }
        // Deactivate header when mega menu closes
        const navbar = document.querySelector('.navbar-transparent');
        if (navbar) navbar.classList.remove('mega-menu-open');
    }
}

// Minimal fallback - no complex animations that could conflict
console.log('Fallback: Using minimal approach like template');