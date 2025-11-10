// Header Component - Navigation functionality

export function initHeader() {
    loadNavigation();
    initMobileNavigation();
    initScrollEffects();
    initNavigationListeners();
    initMegaMenu();
}

// Make functions globally available for fallback - after function declarations

function loadNavigation() {
    // Determine current location and set appropriate paths
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
        console.log('Header JS - Presklenne-steny page detected:', currentPath);
        console.log('Header JS - isInSubFolder:', isInSubFolder);
        console.log('Header JS - logoPath will be:', '../../logo.png');
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

function initMobileNavigation() {
    document.addEventListener('click', function(e) {
        // Toggle mobile sidebar
        if (e.target.closest('.hamburger')) {
            const hamburger = e.target.closest('.hamburger');
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
}

function initScrollEffects() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    // Ensure navbar starts transparent
    const transparentNavbar = document.querySelector('.navbar-transparent');
    if (transparentNavbar) {
        transparentNavbar.classList.remove('scrolled');
    }
    
    // Set initial navbar state after a short delay to ensure scroll position is 0
    setTimeout(() => {
        updateNavbarBackground();
    }, 100);
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update scroll progress
        if (scrollProgress) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            scrollProgress.style.height = `${scrollPercentage}%`;
        }
        
        // Update navbar background
        updateNavbarBackground();
    });
}

function updateNavbarBackground() {
    const transparentNavbar = document.querySelector('.navbar-transparent');
    
    if (!transparentNavbar) return;
    
    const scrollPosition = window.scrollY;
    const heroElement = document.querySelector('.hero, .subpage-hero');
    
    if (scrollPosition > 100) {
        // Add white background when scrolled down
        transparentNavbar.classList.add('scrolled');
    } else {
        // Keep transparent when at top
        transparentNavbar.classList.remove('scrolled');
    }
}

function initNavigationListeners() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Mega Menu Functionality
function initMegaMenu() {
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
                    description: 'Moderná kombináácia materiálov',
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
                            <a href="${pathPrefix}${item.link}" class="mega-menu-link" style="background-image: url('${item.image}')">
                                <img src="${item.image}" alt="${item.title}" class="mega-menu-image">
                                <div class="mega-menu-info">
                                    <h4>${item.title}</h4>
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

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadNavigation = loadNavigation;
    window.initMobileNavigation = initMobileNavigation;
    window.initScrollEffects = initScrollEffects;
    window.initNavigationListeners = initNavigationListeners;
    window.updateNavbarBackground = updateNavbarBackground;
    window.setActiveNavLink = setActiveNavLink;
    window.initMegaMenu = initMegaMenu;
}