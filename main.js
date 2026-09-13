document.documentElement.classList.add('js-motion');

/* ==========================================
   SUPERMERCADO VILLA - VANILLA JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Hero Load Animation — trigger staggered entrance
  const heroSections = document.querySelectorAll('.hero-section, .hero-slider-section, .page-hero');
  if (heroSections.length > 0) {
    requestAnimationFrame(() => {
      heroSections.forEach(heroSection => heroSection.setAttribute('data-loaded', 'true'));
    });
  }

  // 0.1 Hero Banner Slider (Carrossel Automático com Touch Swipe)
  const sliderTrack = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  if (sliderTrack && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // Criar dots indicadores se o container existir
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }

    const updateDots = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    };

    const goToSlide = (index) => {
      currentSlide = (index + totalSlides) % totalSlides;
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    const startTimer = () => {
      stopTimer();
      autoSlideTimer = setInterval(nextSlide, 5000);
    };

    const stopTimer = () => {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    };

    const resetTimer = () => {
      stopTimer();
      startTimer();
    };

    // Pausar no hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopTimer);
      sliderContainer.addEventListener('mouseleave', startTimer);

      // Suporte a Touch Swipe
      sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDiff = touchEndX - touchStartX;
        if (Math.abs(swipeDiff) > 40) {
          if (swipeDiff < 0) nextSlide();
          else prevSlide();
          resetTimer();
        }
      }, { passive: true });
    }

    startTimer();
  }

  // 0.3 Scroll Header Effect + indicador de progresso da página
  const header = document.querySelector('.header');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  let scrollFrame;
  const updateScrollState = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    progress.style.transform = `scaleX(${scrollRatio})`;
    scrollFrame = undefined;
  };

  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
  }, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });
  updateScrollState();

  // 0.4 Menu de navegação: suporte a toggle mobile, fechar ao clicar fora ou pressionar Esc
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    const toggleMenu = (open) => {
      const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('active');
      navMenu.classList.toggle('active', shouldOpen);
      mobileToggle.setAttribute('aria-expanded', String(shouldOpen));
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
        toggleMenu(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // 0.5 Formulário Trabalhe Conosco (Feedback)
  const careerForm = document.getElementById('careerForm');
  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('careerSuccess');
      if (feedback) {
        careerForm.style.display = 'none';
        feedback.style.display = 'block';
      }
    });
  }

  // 0.7 Flipbook & Tablóide Lightbox Zoom Modal
  const tabloideFrame = document.getElementById('tabloideFrame');
  const tabloideLightbox = document.getElementById('tabloideLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const openFullscreenBtn = document.getElementById('openFullscreenBtn');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxPageCounter = document.getElementById('lightboxPageCounter');

  let currentFlipPage = 0;
  let currentPages = ['images/tabloide-oficial.jpg'];

  function updateLightboxView() {
    if (!lightboxImg) return;
    lightboxImg.src = currentPages[currentFlipPage] || currentPages[0];
    if (lightboxPageCounter) {
      lightboxPageCounter.textContent = `Página ${currentFlipPage + 1} de ${currentPages.length}`;
    }
    if (lightboxPrev) lightboxPrev.style.display = currentPages.length > 1 ? 'flex' : 'none';
    if (lightboxNext) lightboxNext.style.display = currentPages.length > 1 ? 'flex' : 'none';
  }

  const openLightbox = (pageIndex) => {
    if (typeof pageIndex === 'number') {
      currentFlipPage = pageIndex;
    }
    if (tabloideLightbox && lightboxImg) {
      updateLightboxView();
      tabloideLightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (tabloideLightbox) {
      tabloideLightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (tabloideFrame) tabloideFrame.addEventListener('click', () => openLightbox(0));
  if (openFullscreenBtn) openFullscreenBtn.addEventListener('click', () => openLightbox(currentFlipPage));
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentFlipPage = (currentFlipPage - 1 + currentPages.length) % currentPages.length;
      updateLightboxView();
      if (typeof window.goToFlipPage === 'function') window.goToFlipPage(currentFlipPage);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentFlipPage = (currentFlipPage + 1) % currentPages.length;
      updateLightboxView();
      if (typeof window.goToFlipPage === 'function') window.goToFlipPage(currentFlipPage);
    });
  }

  if (tabloideLightbox) {
    tabloideLightbox.addEventListener('click', (e) => {
      if (e.target === tabloideLightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (tabloideLightbox && tabloideLightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && currentPages.length > 1) {
        currentFlipPage = (currentFlipPage - 1 + currentPages.length) % currentPages.length;
        updateLightboxView();
        if (typeof window.goToFlipPage === 'function') window.goToFlipPage(currentFlipPage);
      }
      if (e.key === 'ArrowRight' && currentPages.length > 1) {
        currentFlipPage = (currentFlipPage + 1) % currentPages.length;
        updateLightboxView();
        if (typeof window.goToFlipPage === 'function') window.goToFlipPage(currentFlipPage);
      }
    }
  });

  // 3. Timeline Tabs Data & Switching
  const timelineData = [
    {
      year: '2008',
      badge: 'Início Humilde (Aos 20 Anos)',
      title: 'O Primeiro Passo na Rua Mário Fregonesi',
      subtitle: 'Mercearia de Bairro',
      desc: 'Tudo começou há 18 anos, quando o jovem empresário Ivail Ribeiro Desiderio dos Santos, aos 20 anos de idade, deu o seu primeiro passo no comércio ao abrir uma pequena mercearia na Rua Mário Fregonesi, em Jardinópolis.',
      highlight: 'Com muito trabalho e a confiança da vizinhança, a mercearia prosperou rapidamente.'
    },
    {
      year: '2013',
      badge: 'Primeira Expansão (5 Anos Depois)',
      title: 'Espaço Maior + Açougue & Padaria',
      subtitle: 'Transformação do Atendimento',
      desc: 'Após 5 anos de dedicação total, veio a primeira grande expansão: a mudança para um espaço maior em frente ao endereço inicial na mesma rua, trazendo como novidade os setores de Açougue e Padaria.',
      highlight: 'Um marco decisivo que transformou completamente a experiência de compra dos nossos clientes.'
    },
    {
      year: 'Consolidação',
      title: 'Nascimento da Loja 1 na Área Industrial',
      subtitle: 'Rua Eugênio Lamonato, 386',
      badge: 'Estrutura Ampla',
      desc: 'Acompanhando o desenvolvimento de Jardinópolis e a necessidade de atender cada vez melhor as famílias da região, o supermercado deu um salto ainda maior, mudando-se para a estrutura ampla na Área Industrial.',
      highlight: 'Consolidação definitiva da nossa Loja 1 de Jardinópolis - SP.'
    },
    {
      year: 'Atualidade',
      title: 'Loja 2 & Reforma Modernizada',
      subtitle: 'Rua Alcides Pizeta, 461 – Jardim Aroeira',
      badge: 'Conforto & Inovação',
      desc: 'Com a confiança do público fortalecida, há 3 anos inauguramos a Loja 2. Pensada para oferecer total conforto e praticidade, essa unidade passou recentemente por uma grande reforma e modernização.',
      highlight: 'Ambiente climatizado, moderno e acolhedor para as suas compras do dia a dia.'
    }
  ];

  const timelineTabs = document.querySelectorAll('.timeline-tab');
  const timelineBadge = document.getElementById('timelineBadge');
  const timelineTitle = document.getElementById('timelineTitle');
  const timelineSubtitle = document.getElementById('timelineSubtitle');
  const timelineDesc = document.getElementById('timelineDesc');
  const timelineHighlight = document.getElementById('timelineHighlight');

  timelineTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      timelineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const data = timelineData[index];
      if (data && timelineBadge) {
        timelineBadge.textContent = `${data.year} — ${data.badge}`;
        timelineTitle.textContent = data.title;
        timelineSubtitle.textContent = data.subtitle;
        timelineDesc.textContent = data.desc;
        timelineHighlight.textContent = `"${data.highlight}"`;
      }
    });
  });

  // 4. Quality Sector Tabs Data & Switching
  const sectorData = [
    {
      title: 'Hortifruti Fresco',
      tagline: 'Frescor e Sabor Selecionados Diariamente',
      image: 'images/hortifruti.jpg',
      badge: 'Direto do Produtor',
      desc: 'Por isso, selecionamos diariamente o melhor em frutas, verduras e legumes no nosso Hortifruti, garantindo o frescor e o sabor que a sua família merece.',
      benefits: [
        'Frutas e verduras selecionadas manualmente todo dia',
        'Reposição contínua para garantir o máximo frescor',
        'Grande variedade de itens orgânicos e regionais',
        'Higiene impecável e conservação controlada'
      ]
    },
    {
      title: 'Açougue Premium',
      tagline: 'Cortes Selecionados e Padrão de Excelência',
      image: 'images/acougue.jpg',
      badge: 'Cortes Especiais',
      desc: 'Nosso setor de Açougue mantém o mais alto padrão de qualidade: cortes frescos e selecionados, higiene rigorosa e profissionais preparados para servir o corte exato que você precisa.',
      benefits: [
        'Cortes nobres para o seu churrasco e refeições do dia a dia',
        'Carne moída na hora e manipulada com rigor sanitário',
        'Opções temperadas prontas para assar',
        'Atendimento atencioso de açougueiros experientes'
      ]
    },
    {
      title: 'Padaria & Confeitaria',
      tagline: 'Pães Quentinhos Assados a Toda Hora',
      image: 'images/padaria.jpg',
      badge: 'Assado Toda Hora',
      desc: 'Pães quentinhos, crocantes por fora e macios por dentro, assados continuamente ao longo do dia, além de bolos, broas e salgados deliciosos para a sua mesa.',
      benefits: [
        'Pão francês quentinho de hora em hora',
        'Bolos caseiros, tortas e salgados fresquinhos',
        'Receitas tradicionais feitas com carinho',
        'Café da manhã e lanche da tarde perfeitos'
      ]
    }
  ];

  const sectorBtns = document.querySelectorAll('.sector-tab-btn');
  const sectorImg = document.getElementById('sectorImg');
  const sectorImgBadge = document.getElementById('sectorImgBadge');
  const sectorTitle = document.getElementById('sectorTitle');
  const sectorTagline = document.getElementById('sectorTagline');
  const sectorDesc = document.getElementById('sectorDesc');
  const sectorBenefitsList = document.getElementById('sectorBenefitsList');

  sectorBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      sectorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = sectorData[index];
      if (data && sectorImg) {
        const sectorImageWrap = sectorImg.closest('.sector-img-wrap');
        sectorImageWrap?.classList.add('is-changing');
        sectorImg.src = data.image;
        sectorImg.alt = data.title;
        sectorImgBadge.textContent = data.badge;
        sectorTitle.textContent = data.title;
        sectorTagline.textContent = data.tagline;
        sectorDesc.textContent = data.desc;

        if (sectorBenefitsList) {
          sectorBenefitsList.innerHTML = data.benefits
            .map(b => `<li class="sector-benefit-item">${b}</li>`)
            .join('');
        }

        sectorImg.addEventListener('load', () => {
          sectorImageWrap?.classList.remove('is-changing');
        }, { once: true });
      }
    });
  });

  // 5. Stores Card Selector
  const storeCards = document.querySelectorAll('.store-card');
  storeCards.forEach(card => {
    card.addEventListener('click', () => {
      storeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // 6. Clube Villa Modal Logic
  const modalOverlay = document.getElementById('clubeModal');
  const openModalBtns = document.querySelectorAll('.js-open-clube');
  const closeModalBtn = document.getElementById('modalCloseBtn');
  const modalFormView = document.getElementById('modalFormView');
  const modalSuccessView = document.getElementById('modalSuccessView');
  const clubeForm = document.getElementById('clubeForm');
  const successUserName = document.getElementById('successUserName');

  const openModal = () => {
    if (modalOverlay) {
      modalFormView.style.display = 'block';
      modalSuccessView.style.display = 'none';
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Evita scroll do body com modal aberto
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (clubeForm) {
    clubeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('inputName');
      const userName = nameInput ? nameInput.value : 'Cliente';

      if (successUserName) successUserName.textContent = userName;
      if (modalFormView && modalSuccessView) {
        modalFormView.style.display = 'none';
        modalSuccessView.style.display = 'block';
      }
    });
  }

  // 7. Intersection Observer para Animações de Scroll Reveal (Estilo Medico)
  document.querySelector('.timeline-card')?.classList.add('reveal--from-left');
  document.querySelector('.sector-grid')?.classList.add('reveal', 'reveal--from-right');
  document.querySelector('.clube-grid')?.classList.add('reveal--from-left');
  document.querySelector('.stores-grid')?.classList.add('reveal', 'reveal--from-right');
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 8. Animated Rolling Numbers (Contador Numérico Animado ao Rolar)
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let counted = false;

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach(numEl => {
            const target = parseInt(numEl.getAttribute('data-target'), 10);
            const suffix = numEl.getAttribute('data-suffix') || '';
            const isLocale = numEl.getAttribute('data-format') === 'locale';
            const duration = 2000;
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              // Ease Out Expo progress calculation
              const easeProgress = 1 - Math.pow(2, -10 * progress);
              const currentVal = Math.floor(easeProgress * target);

              const formattedVal = isLocale 
                ? currentVal.toLocaleString('pt-BR') 
                : currentVal;

              numEl.textContent = formattedVal + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                const finalFormatted = isLocale 
                  ? target.toLocaleString('pt-BR') 
                  : target;
                numEl.textContent = finalFormatted + suffix;
              }
            }

            requestAnimationFrame(updateCount);
          });
        }
      });
    }, { threshold: 0.2 });

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) statsObserver.observe(statsGrid);
  }

  // 10. DYNAMIC HYDRATION (Site Data via site-data.js & Supabase)
  function applyVillaSiteData(customData) {
    const data = customData || window.VILLA_SITE_DATA || window.DEFAULT_VILLA_DATA;
    if (!data) return;

    // Atualizar imagens e páginas do Jornal de Ofertas / Encarte
    if (data.jornal) {
      const pages = (Array.isArray(data.jornal.paginas) && data.jornal.paginas.length > 0)
        ? data.jornal.paginas
        : [data.jornal.imagem || 'images/tabloide-oficial.jpg'];
      
      currentPages = pages;

      // 1. Atualiza elementos com imagem simples (home, hero, etc.)
      const mainCoverImg = pages[0];
      const singleTabloideImgs = document.querySelectorAll('#tabloideFrame img, .hero-slider-section [alt*="Encarte"]');
      singleTabloideImgs.forEach(img => {
        img.src = mainCoverImg;
      });

      // 2. Renderizar Flipbook Interativo se existir container
      const flipSheetsContainer = document.getElementById('flipbookSheets');
      const flipThumbsContainer = document.getElementById('flipbookThumbnails');
      const flipLabel = document.getElementById('flipbookPageLabel');
      const flipPrev = document.getElementById('flipPrevBtn');
      const flipNext = document.getElementById('flipNextBtn');

      if (flipSheetsContainer) {
        flipSheetsContainer.innerHTML = '';
        if (flipThumbsContainer) flipThumbsContainer.innerHTML = '';

        pages.forEach((pageSrc, idx) => {
          // Criar folha 3D do Flipbook
          const sheet = document.createElement('div');
          sheet.className = `flipbook-sheet ${idx === currentFlipPage ? 'active' : (idx < currentFlipPage ? 'flipped' : '')}`;
          sheet.setAttribute('data-index', idx);
          
          const img = document.createElement('img');
          img.src = pageSrc;
          img.alt = `Jornal de Ofertas Villa - Página ${idx + 1}`;
          img.addEventListener('click', () => openLightbox(idx));
          sheet.appendChild(img);
          flipSheetsContainer.appendChild(sheet);

          // Criar Miniatura clicável
          if (flipThumbsContainer && pages.length > 1) {
            const thumb = document.createElement('div');
            thumb.className = `flipbook-thumb ${idx === currentFlipPage ? 'active' : ''}`;
            thumb.title = `Ir para Página ${idx + 1}`;
            thumb.innerHTML = `<img src="${pageSrc}" alt="Página ${idx + 1}">`;
            thumb.addEventListener('click', () => goToFlipPage(idx));
            flipThumbsContainer.appendChild(thumb);
          }
        });

        function updateFlipView() {
          const sheets = flipSheetsContainer.querySelectorAll('.flipbook-sheet');
          sheets.forEach((sheet, idx) => {
            sheet.classList.remove('active', 'flipped');
            if (idx === currentFlipPage) {
              sheet.classList.add('active');
            } else if (idx < currentFlipPage) {
              sheet.classList.add('flipped');
            }
          });

          if (flipThumbsContainer) {
            const thumbs = flipThumbsContainer.querySelectorAll('.flipbook-thumb');
            thumbs.forEach((th, idx) => {
              th.classList.toggle('active', idx === currentFlipPage);
            });
          }

          if (flipLabel) {
            flipLabel.textContent = `Página ${currentFlipPage + 1} de ${pages.length}`;
          }

          if (flipPrev) flipPrev.style.display = pages.length > 1 ? 'flex' : 'none';
          if (flipNext) flipNext.style.display = pages.length > 1 ? 'flex' : 'none';
        }

        window.goToFlipPage = (index) => {
          currentFlipPage = Math.max(0, Math.min(index, pages.length - 1));
          updateFlipView();
        };

        if (flipPrev) {
          flipPrev.onclick = (e) => {
            e.stopPropagation();
            currentFlipPage = (currentFlipPage - 1 + pages.length) % pages.length;
            updateFlipView();
          };
        }

        if (flipNext) {
          flipNext.onclick = (e) => {
            e.stopPropagation();
            currentFlipPage = (currentFlipPage + 1) % pages.length;
            updateFlipView();
          };
        }

        updateFlipView();
      }

      if (data.jornal.statusBadge) {
        const badgeEls = document.querySelectorAll('.tabloide-status span:not(.tabloide-status-dot)');
        badgeEls.forEach(badge => {
          badge.textContent = data.jornal.statusBadge;
        });
      }
      if (data.jornal.titulo) {
        const titleEl = document.querySelector('.page-title');
        if (titleEl && document.title.includes('Ofertas')) {
          titleEl.textContent = data.jornal.titulo;
        }
      }
      if (data.jornal.validade) {
        const validadeEls = document.querySelectorAll('.tabloide-validade-txt');
        validadeEls.forEach(el => {
          el.textContent = data.jornal.validade;
        });
      }
    }

    // Atualizar redes sociais e links WhatsApp
    if (data.contatoGeral) {
      if (data.contatoGeral.instagramUrl) {
        document.querySelectorAll('a[href*="instagram.com"]').forEach(a => {
          a.href = data.contatoGeral.instagramUrl;
        });
      }
    }
  }

  window.applyVillaSiteData = applyVillaSiteData;
  applyVillaSiteData();
});

