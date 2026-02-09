// Animação de entrada ao rolar
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
    }
  });
}, observerOptions);

// Elementos para animar
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  el.classList.add('animate-hidden');
  observer.observe(el);
});

// Navegação muda de cor ao rolar
const nav = document.getElementById('main-nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Adiciona/remove classe scrolled
  if (scrollTop > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Efeito de desaparecer/reaparecer ao rolar para baixo/cima
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
  
  // Ativa link ativo baseado na seção visível
  activateCurrentSection();
});

// Ativa seção atual na navegação
function activateCurrentSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Efeitos de hover nos cards
document.querySelectorAll('.detail-card, .feature-item, .control-item').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Efeito de clique nos botões de download
document.querySelectorAll('.download-btn, .btn-hero, .social-btn').forEach(btn => {
  btn.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
  });
  
  btn.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  if (navMenu.style.display === 'flex') {
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.backgroundColor = 'var(--secondary-dark)';
    navMenu.style.padding = '20px';
    navMenu.style.gap = '15px';
    navMenu.style.boxShadow = '0 10px 20px var(--shadow)';
  }
});

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navMenu.style.display = 'none';
    }
  });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Efeito de digitação no título principal (opcional)
const heroTitle = document.querySelector('.hero-text h2');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  
  // Inicia a animação após um breve delay
  setTimeout(typeWriter, 500);
}

// Efeito de partículas flutuantes no background
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '-1';
  document.body.appendChild(particlesContainer);
  
  const particles = ['🪨', '🌳', '⚔️', '💎', '🛡️', '🔥', '❄️', '💧'];
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'absolute';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.fontSize = `${Math.random() * 20 + 15}px`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particlesContainer.appendChild(particle);
  }
}

// Inicializa as partículas
window.addEventListener('load', createFloatingParticles);

// Efeito de brilho nos cards
document.querySelectorAll('.section-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', `${x}px`);
    this.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Detecta sistema operacional e ajusta instruções
function detectOS() {
  const userAgent = navigator.userAgent;
  
  // Se não for Windows, mostra aviso
  if (!userAgent.includes('Windows')) {
    const instructions = document.querySelector('.instructions');
    if (instructions) {
      const osWarning = document.createElement('div');
      osWarning.className = 'os-warning';
      osWarning.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p><strong>Atenção:</strong> Este executável é apenas para Windows. Usuários de Mac/Linux podem precisar executar o código fonte Python.</p>
      `;
      instructions.prepend(osWarning);
    }
  }
}

// Adiciona estilos CSS para as animações e avisos
const style = document.createElement('style');
style.textContent = `
  .animate-hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav-link.active {
    color: var(--accent-green) !important;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
  
  .floating-particles div {
    will-change: transform;
  }
  
  .section-card {
    position: relative;
    overflow: hidden;
  }
  
  .section-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      600px circle at var(--mouse-x, 0) var(--mouse-y, 0),
      rgba(46, 139, 87, 0.1),
      transparent 40%
    );
    z-index: 0;
    pointer-events: none;
  }
  
  .section-card > * {
    position: relative;
    z-index: 1;
  }
  
  .os-warning {
    background: rgba(212, 175, 55, 0.2);
    border-left: 4px solid #d4af37;
    padding: 15px;
    border-radius: 5px;
    display: flex;
    gap: 15px;
    align-items: flex-start;
    margin-bottom: 20px;
    font-size: 14px;
  }
  
  .os-warning i {
    color: #d4af37;
    font-size: 20px;
    margin-top: 2px;
  }
`;

document.head.appendChild(style);

// Inicialização
window.addEventListener('load', () => {
  createFloatingParticles();
  detectOS();
});