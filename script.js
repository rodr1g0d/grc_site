// JavaScript para o menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Inicializar partículas
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // JavaScript para iniciar o vídeo quando visível usando Intersection Observer
    const video = document.querySelector('.about-img');
    
    // Pré-carregamento do vídeo para evitar travamentos
    if (video) {
        video.load();
        
        // Verificar se é dispositivo móvel
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Em dispositivos móveis, adicionamos controles e mantemos muted para permitir autoplay
        if (isMobile) {
            video.setAttribute('controls', '');
            video.muted = true; // Mantém mudo para permitir autoplay em dispositivos móveis
            
            // Adicionar botão grande para ativar o som
            const soundButton = document.createElement('button');
            soundButton.innerHTML = "🔊";
            soundButton.className = "video-sound-btn";
            soundButton.style.cssText = "position: absolute; bottom: 20px; right: 20px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 24px; cursor: pointer; z-index: 11;";
            video.parentNode.style.position = "relative";
            video.parentNode.appendChild(soundButton);
            
            // Ativar o som quando o usuário clicar no botão
            soundButton.addEventListener('click', function() {
                video.muted = false;
                soundButton.style.display = "none";
            });
        }
        
        // Tentativa inicial de reprodução (responderá à interação do usuário)
        video.addEventListener('canplaythrough', function() {
            // Só tenta reproduzir após o vídeo estar carregado
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play foi bloqueado pelo navegador
                    console.log("Reprodução automática bloqueada pelo navegador. Aguardando interação do usuário.");
                    
                    // Adicionar botão de play sobreposto ao vídeo
                    const playButton = document.createElement('button');
                    playButton.innerHTML = "▶";
                    playButton.className = "video-play-btn";
                    playButton.style.cssText = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 80px; height: 80px; font-size: 32px; cursor: pointer; z-index: 10;";
                    video.parentNode.style.position = "relative";
                    video.parentNode.appendChild(playButton);
                    
                    // Reproduzir o vídeo quando o usuário clicar no botão
                    playButton.addEventListener('click', function() {
                        video.play();
                        playButton.style.display = "none";
                    });
                });
            }
        });

        // Usando Intersection Observer para melhor performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando o vídeo fica visível
                    video.play().catch(e => console.log("Aguardando interação do usuário para reprodução"));
                } else {
                    // Quando o vídeo não está visível
                    video.pause();
                }
            });
        }, { threshold: 0.2 }); // Inicia quando pelo menos 20% do vídeo está visível
        
        // Observe o vídeo
        observer.observe(video);
    }
    
    // Animação para as barras de progresso
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar a barra de progresso quando visível
                setTimeout(() => {
                    entry.target.style.width = entry.target.getAttribute('data-width');
                }, 200);
                progressObserver.unobserve(entry.target); // Parar de observar após animar
            }
        });
    }, { threshold: 0.2 });
    
    // Observar todas as barras de progresso
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Adicionar animação aos números de contador
    const animateNumbers = () => {
        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 30); // Atualiza a cada 30ms
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Iniciar animação dos números quando o elemento for visível
    const statsSection = document.querySelector('.tech');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });
        
        statsObserver.observe(statsSection);
    }

    // JavaScript para o botão de "Voltar ao Topo"
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }

    // JavaScript para o chatbot
    initChatbot();

    // Animação do ticker para a seção CTA
    const tickerContainers = document.querySelectorAll('.ticker-container');
    
    tickerContainers.forEach(container => {
        const tickerText = container.querySelector('.ticker-text');
        if (tickerText) {
            // Duplicar o conteúdo do ticker para uma animação contínua
            tickerText.innerHTML = tickerText.innerHTML + ' ' + tickerText.innerHTML;
            
            // Ajustar a largura para animação
            const animationDuration = (tickerText.textContent.length * 0.15) + 's';
            tickerText.style.animationDuration = animationDuration;
        }
    });
    
    // Animação de fade-in para os elementos da seção CTA
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        const ctaElements = [
            ctaSection.querySelector('.section-title'),
            ctaSection.querySelector('.cta-subtitle-container'),
            ctaSection.querySelector('.cta-visual-elements'),
            ctaSection.querySelector('.ticker-container'),
            ctaSection.querySelector('.cta-actions')
        ];
        
        // Função para verificar se um elemento está visível na viewport
        function isElementInViewport(el) {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // Aplicar animação quando elementos estiverem visíveis
        function animateOnScroll() {
            ctaElements.forEach((element, index) => {
                if (element && isElementInViewport(element) && !element.classList.contains('animated')) {
                    setTimeout(() => {
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(30px)';
                        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                            element.classList.add('animated');
                        }, 100);
                    }, index * 200);
                }
            });
        }
        
        // Inicializar opacidade zero
        ctaElements.forEach(element => {
            if (element) {
                element.style.opacity = '0';
            }
        });
        
        // Verificar na carga e no scroll
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        animateOnScroll(); // Executar uma vez no carregamento
    }

    // Animação para os cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    
    // Adiciona observador de interseção para animar os cards ao entrar na viewport
    const projectCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Aplica animação com delay baseado na posição do card
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(50px)';
                    entry.target.style.transition = 'all 0.8s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 150);
                
                // Parar de observar após animar
                projectCardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Inicializa os cards com opacidade 0
    projectCards.forEach(card => {
        card.style.opacity = '0';
        projectCardObserver.observe(card);
    });
    
    // Adiciona interatividade aos cards
    projectCards.forEach(card => {
        // Destaque ao passar o mouse
        card.addEventListener('mouseenter', function() {
            // Ampliar levemente o card e destacar o botão
            const cta = this.querySelector('.project-cta');
            if (cta) {
                cta.style.backgroundColor = 'var(--secondary)';
                cta.style.color = 'white';
            }
        });
        
        // Retorna ao normal ao remover o mouse
        card.addEventListener('mouseleave', function() {
            // Retorna o card ao tamanho normal
            const cta = this.querySelector('.project-cta');
            if (cta) {
                cta.style.backgroundColor = 'transparent';
                cta.style.color = 'var(--secondary)';
            }
        });
        
        // Efeito ao clicar
        card.addEventListener('click', function(e) {
            // Não aplica o efeito se clicar no botão
            if (e.target.classList.contains('project-cta') || e.target.closest('.project-cta')) {
                return;
            }
            
            // Efeito de pulsação
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Redireciona para o CTA do card
            const cta = this.querySelector('.project-cta');
            if (cta) {
                const href = cta.getAttribute('href');
                if (href) {
                    setTimeout(() => {
                        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        });
    });
    
    // Adiciona efeito flutuante ao ícone do projeto ao passar o mouse
    const projectIcons = document.querySelectorAll('.project-icon');
    projectIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animações para a seção Sobre
    const aboutSection = document.querySelector('.about');
    const aboutHeading = document.querySelector('.about-heading');
    const aboutTexts = document.querySelectorAll('.about-text');
    const featureItems = document.querySelectorAll('.about .feature-item');
    const aboutImage = document.querySelector('.about-image');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el, offset = 0) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (rect.top <= window.innerHeight - offset && rect.bottom >= 0);
    }
    
    // Animar elementos quando estiverem visíveis
    function animateAboutElements() {
        // Animar o título
        if (aboutHeading && isElementInViewport(aboutHeading, 100) && !aboutHeading.classList.contains('animated')) {
            aboutHeading.style.opacity = '0';
            aboutHeading.style.transform = 'translateY(30px)';
            aboutHeading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                aboutHeading.style.opacity = '1';
                aboutHeading.style.transform = 'translateY(0)';
                aboutHeading.classList.add('animated');
            }, 200);
        }
        
        // Animar os textos com delay
        aboutTexts.forEach((text, index) => {
            if (isElementInViewport(text, 100) && !text.classList.contains('animated')) {
                text.style.opacity = '0';
                text.style.transform = 'translateY(30px)';
                text.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                    text.classList.add('animated');
                }, 300 + (index * 200));
            }
        });
        
        // Animar os feature items com delay
        featureItems.forEach((item, index) => {
            if (isElementInViewport(item, 50) && !item.classList.contains('appeared')) {
                item.style.opacity = '0';
                item.style.transform = 'translateY(40px)';
                item.style.transition = 'all 0.8s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.classList.add('appeared');
                }, 600 + (index * 150));
            }
        });
        
        // Animar a imagem
        if (aboutImage && isElementInViewport(aboutImage) && !aboutImage.classList.contains('animated')) {
            aboutImage.style.opacity = '0';
            aboutImage.style.transform = 'translateX(50px)';
            aboutImage.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                aboutImage.style.opacity = '1';
                aboutImage.style.transform = 'translateX(0)';
                aboutImage.classList.add('animated');
            }, 300);
        }
    }
    
    // Inicializar estilos
    if (aboutHeading) aboutHeading.style.opacity = '0';
    aboutTexts.forEach(text => text.style.opacity = '0');
    featureItems.forEach(item => item.style.opacity = '0');
    if (aboutImage) aboutImage.style.opacity = '0';
    
    // Adicionar evento de interatividade aos feature items
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Aumentar levemente o tamanho e adicionar sombra
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            // Aumentar o ícone
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Restaurar ao normal
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Restaurar o ícone
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Verificar na carga e no scroll
    window.addEventListener('scroll', animateAboutElements);
    window.addEventListener('load', animateAboutElements);
    animateAboutElements(); // Executar uma vez no carregamento

    // Animações para a seção de contato
    const contactSection = document.querySelector('.contact');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    const contactItems = document.querySelectorAll('.contact-item');
    const formGroups = document.querySelectorAll('.contact-form .form-group');
    const submitButton = document.querySelector('.contact-form .btn');
    
    // Aplicar animações para os elementos da seção de contato
    function animateContactElements() {
        // Verificar se os elementos estão visíveis na viewport
        if (isElementInViewport(contactInfo) && !contactInfo.classList.contains('animated')) {
            contactInfo.style.opacity = '0';
            contactInfo.style.transform = 'translateX(-30px)';
            contactInfo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                contactInfo.style.opacity = '1';
                contactInfo.style.transform = 'translateX(0)';
                contactInfo.classList.add('animated');
            }, 200);
            
            // Animar itens de contato com delay
            contactItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 400 + (index * 150));
            });
        }
        
        if (isElementInViewport(contactForm) && !contactForm.classList.contains('animated')) {
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateX(30px)';
            contactForm.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                contactForm.style.opacity = '1';
                contactForm.style.transform = 'translateX(0)';
                contactForm.classList.add('animated');
            }, 300);
            
            // Animar campos do formulário com delay
            formGroups.forEach((group, index) => {
                group.style.opacity = '0';
                group.style.transform = 'translateY(20px)';
                group.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                }, 600 + (index * 120));
            });
            
            // Animar botão de envio
            if (submitButton) {
                submitButton.style.opacity = '0';
                submitButton.style.transform = 'translateY(20px)';
                submitButton.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    submitButton.style.opacity = '1';
                    submitButton.style.transform = 'translateY(0)';
                }, 600 + (formGroups.length * 120));
            }
        }
    }
    
    // Inicializar estilos
    if (contactInfo) contactInfo.style.opacity = '0';
    contactItems.forEach(item => item.style.opacity = '0');
    if (contactForm) contactForm.style.opacity = '0';
    formGroups.forEach(group => group.style.opacity = '0');
    if (submitButton) submitButton.style.opacity = '0';
    
    // Validação de formulário e feedback
    const contactFormElement = document.getElementById('contactForm');
    if (contactFormElement) {
        contactFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio de formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                // Simular sucesso
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Limpar campos
                const inputs = contactFormElement.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.value = '';
                });
                
                // Adicionar mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.';
                successMessage.style.color = '#28a745';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.borderRadius = '8px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                successMessage.style.display = 'flex';
                successMessage.style.alignItems = 'center';
                successMessage.style.gap = '10px';
                
                // Verificar se já existe uma mensagem anterior
                const existingMessage = contactFormElement.querySelector('.success-message');
                if (existingMessage) {
                    contactFormElement.removeChild(existingMessage);
                }
                
                contactFormElement.appendChild(successMessage);
                
                // Restaurar botão após 3 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }, 2000);
        });
        
        // Adicionar classe active para campos com valor
        const formControls = contactFormElement.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('active');
                } else {
                    this.classList.remove('active');
                }
            });
            
            // Verificar inicialmente se já tem valor
            if (control.value.trim() !== '') {
                control.classList.add('active');
            }
        });
    }
    
    // Adicionar efeito nos itens de contato
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'rotateY(0)';
            }
        });
        
        // Efeito de clique para copiar informações
        item.addEventListener('click', function() {
            const textElement = this.querySelector('.contact-text p');
            if (!textElement) return;
            
            const text = textElement.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Criar um tooltip temporário
                const tooltip = document.createElement('div');
                tooltip.className = 'copy-tooltip';
                tooltip.textContent = 'Copiado!';
                tooltip.style.position = 'absolute';
                tooltip.style.right = '-80px';
                tooltip.style.top = '50%';
                tooltip.style.transform = 'translateY(-50%)';
                tooltip.style.backgroundColor = '#333';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.fontSize = '12px';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.3s ease';
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                // Mostrar e esconder o tooltip
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    
                    setTimeout(() => {
                        tooltip.style.opacity = '0';
                        
                        setTimeout(() => {
                            this.removeChild(tooltip);
                        }, 300);
                    }, 1500);
                }, 100);
            });
        });
    });
    
    // Verificar na carga e no scroll
    window.addEventListener('scroll', animateContactElements);
    window.addEventListener('load', animateContactElements);
    animateContactElements(); // Executar uma vez no carregamento
});

// Função para inicializar o chatbot
function initChatbot() {
    // Seleciona elementos do chatbot
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const typingIndicator = document.getElementById('typing-indicator');
    
    if (!chatbotToggle || !chatbotWindow) return;
    
    // Abre/fecha o chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            userInput.focus();
        }
    });
    
    // Fecha o chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });
    
    // Envia a mensagem do usuário
    function sendMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Adiciona a mensagem do usuário
            addMessage(message, 'user');
            userInput.value = '';
            
            // Mostra o indicador de digitação
            typingIndicator.classList.add('active');
            
            // Simula resposta do bot após um pequeno atraso
            setTimeout(function() {
                typingIndicator.classList.remove('active');
                botResponse(message);
            }, 1000 + Math.random() * 2000);
        }
    }
    
    // Adiciona mensagem ao chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        
        // Rolagem automática para a última mensagem
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Respostas do bot
    function botResponse(userMessage) {
        let response = '';
        userMessage = userMessage.toLowerCase();
        
        // Respostas básicas do chatbot
        if (userMessage.includes('olá') || userMessage.includes('oi') || userMessage.includes('bom dia') || userMessage.includes('boa tarde') || userMessage.includes('boa noite')) {
            response = 'Olá! Como posso ajudar você hoje?';
        } else if (userMessage.includes('serviço') || userMessage.includes('solução')) {
            response = 'A GRC Innovate oferece serviços de desenvolvimento de software, chatbots inteligentes e automação de tarefas. Em qual deles você tem interesse?';
        } else if (userMessage.includes('preço') || userMessage.includes('custo') || userMessage.includes('valor')) {
            response = 'Os preços variam de acordo com as necessidades específicas do seu projeto. Também temos soluções prontas com preços a partir de R$19,99/mês. Posso detalhar alguma solução específica?';
        } else if (userMessage.includes('contato') || userMessage.includes('falar') || userMessage.includes('atendente')) {
            response = 'Você pode entrar em contato conosco pelo telefone (11) 1234-5678 ou pelo email contato@grcinnovate.com. Deseja que um de nossos consultores entre em contato com você?';
        } else if (userMessage.includes('chatbot') || userMessage.includes('assistente virtual')) {
            response = 'Nossos chatbots são desenvolvidos com tecnologia de ponta para fornecer atendimento 24/7, melhorar a experiência do cliente e automatizar processos. Posso fornecer mais informações sobre como isso pode beneficiar sua empresa.';
        } else if (userMessage.includes('projeto') || userMessage.includes('pronto') || userMessage.includes('solução pronta')) {
            response = 'Temos 4 projetos prontos para implementação imediata: 1) Bloqueador de Casas de Apostas (R$49,99/mês), 2) Sistema de Mecânica AutoSync (R$39,99/mês), 3) Sistema de Agendamento para Barbearias e Salões (R$19,99/mês) e 4) Manutenção de Computadores no Local (R$49,99/mês). Qual deles gostaria de conhecer melhor?';
        } else if (userMessage.includes('bloqueador') || userMessage.includes('aposta')) {
            response = 'Nosso sistema Bloqueador de Casas de Apostas (R$49,99/mês) ajuda pessoas com vício em jogos, bloqueando o acesso a sites e aplicativos de apostas. É uma solução ideal para quem busca controlar esse tipo de comportamento.';
        } else if (userMessage.includes('mecanica') || userMessage.includes('autosync') || userMessage.includes('oficina')) {
            response = 'O Sistema de Mecânica AutoSync (R$39,99/mês) oferece controle total para sua oficina: gestão financeira, projeção de gastos, controle de produtividade e permite que seus clientes acompanhem o histórico de manutenção de seus veículos.';
        } else if (userMessage.includes('barbearia') || userMessage.includes('salão') || userMessage.includes('agendar') || userMessage.includes('agendamento')) {
            response = 'Nosso Sistema de Agendamento para Barbearias e Salões (R$19,99/mês) automatiza todo o processo de agendamento, envia lembretes aos clientes e permite marcações com apenas um clique, aumentando a eficiência do seu negócio.';
        } else if (userMessage.includes('computador') || userMessage.includes('manutenção') || userMessage.includes('pc') || userMessage.includes('técnico')) {
            response = 'Nosso serviço de Manutenção de Computadores no Local (R$49,99/mês) conecta técnicos especializados aos clientes em até 2 horas. Inclui formatação, limpeza, upgrades, instalação de jogos, backup e otimização do sistema para melhor desempenho, mesmo em máquinas antigas.';
        } else if (userMessage.includes('obrigado') || userMessage.includes('valeu')) {
            response = 'Por nada! Estou aqui para ajudar. Tem mais alguma pergunta?';
        } else {
            response = 'Entendo. Posso ajudar você com informações sobre nossos serviços, projetos prontos, preços ou agendar uma demonstração. O que você gostaria de saber?';
        }
        
        addMessage(response, 'bot');
    }
    
    // Evento de clique no botão enviar
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Evento de pressionar Enter no campo de entrada
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
} 