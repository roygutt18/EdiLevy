
const images = [
  "transition1.jpeg",
  "transition2.jpeg",
  "transition3.jpeg",
  "transition4.jpeg",
  "transition5.jpeg",
  "transition6.jpeg",
  "transition7.jpeg",
  "transition8.jpeg",
  "transition9.jpeg",
  "transition10.jpeg",
  "transition11.jpeg",
  "transition12.jpeg",
  "transition13.jpeg",
  "transition14.jpeg",
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function fillGrid(selector, imagesArray) {
  const grid = document.querySelector(selector);
  shuffle(imagesArray).forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    grid.appendChild(img);
  });
}

fillGrid(".results-grid", images);



// Navbar נייד - Enhanced functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks && hamburger && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => {
  element.style.opacity = 1;
  element.style.transform = "translateY(0)";
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

// Studio Section - Fixed button functionality
const studioBtns = document.querySelectorAll(".studio-btn");
const studioCards = document.querySelectorAll(".studio-card");

studioBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // הסרת active מכל הכפתורים והכרטיסים
    studioBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    
    studioCards.forEach(card => {
      card.classList.remove("active");
    });

    // הוספת active לכפתור שנבחר
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    // מציאת הכרטיסייה המתאימה
    const type = btn.getAttribute("data-type");
    const targetCard = document.getElementById(`${type}-tab`);

    if (targetCard) {
      targetCard.classList.add("active");
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// Scroll animations
const animated = document.querySelectorAll('.animate');

function reveal() {
  animated.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

const btn = document.getElementById('accessibilityBtn');
const menu = document.getElementById('accessibilityMenu');
const increaseText = document.getElementById('increaseText');
const decreaseText = document.getElementById('decreaseText');
const toggleContrast = document.getElementById('toggleContrast');
const resetAccessibility = document.getElementById('resetAccessibility');

let textSizeLevel = 0;

btn.addEventListener('click', () => {
  menu.classList.toggle('active');
});

increaseText.addEventListener('click', () => {
  if (textSizeLevel < 2) textSizeLevel++;
  document.documentElement.classList.remove('normal-text', 'large-text', 'larger-text');
  if (textSizeLevel === 0) document.documentElement.classList.add('normal-text');
  if (textSizeLevel === 1) document.documentElement.classList.add('large-text');
  if (textSizeLevel === 2) document.documentElement.classList.add('larger-text');
});

decreaseText.addEventListener('click', () => {
  if (textSizeLevel > 0) textSizeLevel--;
  document.documentElement.classList.remove('normal-text', 'large-text', 'larger-text');
  if (textSizeLevel === 0) document.documentElement.classList.add('normal-text');
  if (textSizeLevel === 1) document.documentElement.classList.add('large-text');
});

toggleContrast.addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});

resetAccessibility.addEventListener('click', () => {
  document.body.classList.remove('high-contrast');
  document.documentElement.classList.remove('large-text', 'larger-text');
  textSizeLevel = 0;
});


document.getElementById('acceptCookies').addEventListener('click', () => {
    document.getElementById('cookieBanner').style.display = 'none';
    localStorage.setItem('cookiesAccepted', '1');
  });
  if (localStorage.getItem('cookiesAccepted') === '1') {
    document.getElementById('cookieBanner').style.display = 'none';
  }


const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookieAccept');
  const moreBtn = document.getElementById('cookieMore');

  // אם כבר התקבל אישור – לא להציג שוב
  if (localStorage.getItem('cookiesAccepted') === '1') {
    banner.style.display = 'none';
  }

  acceptBtn.addEventListener('click', () => {
    banner.style.opacity = '0';
    setTimeout(() => banner.style.display = 'none', 300);
    localStorage.setItem('cookiesAccepted', '1');
  });

  moreBtn.addEventListener('click', () => {
    window.open('/privacy.html', '_blank');
  });

localStorage.removeItem('cookiesAccepted')
