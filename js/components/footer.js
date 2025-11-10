// Footer Component - Footer content and privacy functionality

export function initFooter() {
    loadFooter();
    initPrivacyModal();
}

function ensureFooterCSSLoaded() {
    // Check if footer CSS is already loaded
    const existingLink = document.querySelector('link[href*="footer.css"]');
    if (existingLink) return;
    
    // Determine CSS path based on current location
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    let cssPath;
    if (isInServicePage) {
        cssPath = '../../css/components/footer.css?v=1.4';
    } else if (isInPagesDir) {
        cssPath = '../css/components/footer.css?v=1.4';
    } else {
        cssPath = 'css/components/footer.css?v=1.4';
    }
    
    // Create and inject CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

function loadFooter() {
    // Ensure footer CSS is loaded
    ensureFooterCSSLoaded();
    
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage;
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInServicePage) {
        // We're in /pages/service-page/ - need different paths for different targets
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../';    // To reach /pages/ directory (go up one level from service-page)
    } else if (isInPagesDir) {
        // We're in /pages/ - stay in pages directory for other pages
        basePath = '../';     // To reach root for index.html
        pagesPath = '';       // Other pages are in same directory
    } else {
        // We're in root directory
        basePath = '';
        pagesPath = 'pages/';
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
                                <a href="${pagesPath}kontakt.html">Kontakt</a>
                                <a href="${pagesPath}sluzby.html">Služby</a>
                                <a href="${pagesPath}realizacie.html">Realizácie</a>
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
                                <span>pon-pia: 7:00-12:00 / 12:30-15:30<br>sobota: zatvorené<br>nedeľa: zatvorené<br>Stretnutie mimo otváracích hodín je možné po dohode.</span>
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
        
        <!-- Cookie Consent Banner -->
        <div id="cookie-consent" class="cookie-consent">
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <div class="cookie-icon">🍪</div>
                    <div class="cookie-message">
                        Táto stránka používa cookies na zlepšenie používateľského zážitku. Pokračovaním v prehliadaní súhlasíte s použitím cookies.
                    </div>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn settings" onclick="openPrivacyPopup()">Nastavenia</button>
                    <button class="cookie-btn accept" onclick="acceptCookies()">Súhlasím</button>
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
        
        <!-- Cookie Settings Modal -->
        <div id="cookie-settings-modal" class="cookie-settings-modal">
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h2>Nastavenia cookies</h2>
                    <button class="cookie-settings-close" onclick="closeCookieSettings()">&times;</button>
                </div>
                <div class="cookie-settings-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Nevyhnutné cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>Tieto cookies sú potrebné pre základnú funkčnosť stránky a nemožno ich vypnúť.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Analytické cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku, aby sme ju mohli zlepšiť.</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3>Marketingové cookies</h3>
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies">
                                <span class="cookie-slider"></span>
                            </label>
                        </div>
                        <p>Používajú sa na personalizáciu reklám a meranie ich účinnosti.</p>
                    </div>
                    
                    <div class="cookie-settings-actions">
                        <button class="cookie-settings-btn save" onclick="saveCookieSettings()">Uložiť nastavenia</button>
                        <button class="cookie-settings-btn accept-all" onclick="acceptAllCookies()">Súhlasím so všetkými</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
}

function initPrivacyModal() {
    let privacyScrollPosition = 0;

    // Make privacy functions globally available
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
    
    // Initialize cookie consent on page load
    setTimeout(initCookieConsent, 1000);
}

function initCookieConsent() {
    // Prevent double initialization if fallback already ran
    if (window.cookieConsentInitialized) return;
    window.cookieConsentInitialized = true;
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    // Only show if no consent recorded at all (null means never set, not just falsy)
    if (cookiesAccepted === null) {
        // Show cookie consent banner after a short delay
        setTimeout(() => {
            const cookieConsent = document.getElementById('cookie-consent');
            if (cookieConsent) {
                cookieConsent.classList.add('show');
            }
        }, 2000); // Show after 2 seconds
    }
    
    // Make cookie functions globally available
    window.acceptCookies = function() {
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
    
    // Cookie settings modal functions
    let cookieScrollPosition = 0;
    
    window.openCookieSettings = function() {
        // Load current settings
        const analyticsEnabled = localStorage.getItem('analytics-cookies') === 'true';
        const marketingEnabled = localStorage.getItem('marketing-cookies') === 'true';

        const analyticsCheckbox = document.getElementById('analytics-cookies');
        const marketingCheckbox = document.getElementById('marketing-cookies');
        
        if (analyticsCheckbox) analyticsCheckbox.checked = analyticsEnabled;
        if (marketingCheckbox) marketingCheckbox.checked = marketingEnabled;

        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.add('show');
            // Save scroll position and prevent scrolling
            cookieScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            document.body.style.top = `-${cookieScrollPosition}px`;
            document.body.classList.add('no-scroll');
        }
    };

    window.closeCookieSettings = function() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            // Restore scrolling and scroll position
            document.body.classList.remove('no-scroll');
            document.body.style.top = '';
            window.scrollTo(0, cookieScrollPosition);
        }
    };

    window.saveCookieSettings = function() {
        const analyticsEnabled = document.getElementById('analytics-cookies')?.checked || false;
        const marketingEnabled = document.getElementById('marketing-cookies')?.checked || false;
        
        localStorage.setItem('cookiesAccepted', 'custom');
        localStorage.setItem('analytics-cookies', analyticsEnabled.toString());
        localStorage.setItem('marketing-cookies', marketingEnabled.toString());
        
        const cookieConsent = document.getElementById('cookie-consent');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
        }
        
        window.closeCookieSettings();
    };
    
    window.acceptAllCookies = function() {
        localStorage.setItem('cookiesAccepted', 'true');
        localStorage.setItem('analytics-cookies', 'true');
        localStorage.setItem('marketing-cookies', 'true');
        
        const cookieConsent = document.getElementById('cookie-consent');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
        }
        
        window.closeCookieSettings();
    };

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal && e.target === modal) {
            window.closeCookieSettings();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('cookie-settings-modal');
            if (modal && modal.classList.contains('show')) {
                window.closeCookieSettings();
            }
        }
    });
}

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadFooter = loadFooter;
    window.initPrivacyModal = initPrivacyModal;
    window.ensureFooterCSSLoaded = ensureFooterCSSLoaded;
}