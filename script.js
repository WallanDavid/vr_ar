// Smooth scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animações de entrada com Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.feature-card, .example-item, .benefit-card, .ux-step');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Interatividade dos modelos 3D
    const model3dElements = document.querySelectorAll('.model-3d');
    
    model3dElements.forEach(model => {
        model.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        model.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // Controles AR interativos
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Adicionar efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Simular ação do controle
            const action = this.querySelector('i').className;
            const model3d = this.closest('.ar-model').querySelector('.model-3d');
            
            if (action.includes('rotate')) {
                model3d.style.animation = 'rotate 2s linear infinite';
            } else if (action.includes('search-plus')) {
                model3d.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    model3d.style.transform = 'scale(1)';
                }, 1000);
            } else if (action.includes('hand-pointer')) {
                model3d.style.animation = 'float 1s ease-in-out infinite';
            }
        });
    });

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Parallax effect para o hero
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animações dos botões do hero
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.2}s`;
        button.style.animation = 'fadeInUp 0.8s ease forwards';
    });

    // Efeito de hover nos cards
    const cards = document.querySelectorAll('.feature-card, .benefit-card, .ux-step');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animação de contagem para números (se houver)
    const numberElements = document.querySelectorAll('[data-count]');
    
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    });

    // Efeito de typing para o título principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Tooltip para os controles AR
    const tooltips = document.createElement('div');
    tooltips.className = 'tooltip';
    tooltips.style.cssText = `
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(tooltips);

    controlButtons.forEach(button => {
        const icon = button.querySelector('i');
        let tooltipText = '';
        
        if (icon.className.includes('rotate')) {
            tooltipText = 'Rotacionar';
        } else if (icon.className.includes('search-plus')) {
            tooltipText = 'Aproximar';
        } else if (icon.className.includes('hand-pointer')) {
            tooltipText = 'Interagir';
        }
        
        button.addEventListener('mouseenter', function(e) {
            tooltips.textContent = tooltipText;
            tooltips.style.left = e.pageX + 10 + 'px';
            tooltips.style.top = e.pageY - 30 + 'px';
            tooltips.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            tooltips.style.opacity = '0';
        });
    });

    // Efeito de partículas no background (opcional)
    createParticles();
});

// Função para criar partículas no background
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Adicionar CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
    }
    
    .hero-buttons .btn {
        opacity: 0;
    }
    
    .feature-card,
    .example-item,
    .benefit-card,
    .ux-step {
        transition: all 0.3s ease;
    }
    
    .model-3d {
        transition: transform 0.3s ease;
    }
    
    .control-btn {
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);

// Função para simular carregamento de modelos 3D
function simulateModelLoading() {
    const models = document.querySelectorAll('.model-3d');
    
    models.forEach((model, index) => {
        setTimeout(() => {
            model.style.opacity = '0';
            model.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                model.style.transition = 'all 0.5s ease';
                model.style.opacity = '1';
                model.style.transform = 'scale(1)';
            }, 200);
        }, index * 300);
    });
}

// Simular carregamento quando a página carrega
window.addEventListener('load', function() {
    setTimeout(simulateModelLoading, 1000);
});

// Função para demonstrar interação AR
function demonstrateARInteraction() {
    const arModels = document.querySelectorAll('.model-3d');
    
    arModels.forEach((model, index) => {
        setTimeout(() => {
            // Simular rotação
            model.style.animation = 'rotate 3s linear infinite';
            
            setTimeout(() => {
                // Simular zoom
                model.style.animation = 'none';
                model.style.transform = 'scale(1.3)';
                
                setTimeout(() => {
                    model.style.transform = 'scale(1)';
                    model.style.animation = 'float 3s ease-in-out infinite';
                }, 1000);
            }, 3000);
        }, index * 2000);
    });
}

// Demonstrar interação AR quando o usuário clica em "Ver Demonstração"
const demoButton = document.querySelector('.hero-buttons .btn-primary');
if (demoButton) {
    demoButton.addEventListener('click', function() {
        demonstrateARInteraction();
        
        // Scroll para a seção de exemplos
        const examplesSection = document.querySelector('#examples');
        if (examplesSection) {
            examplesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
} 