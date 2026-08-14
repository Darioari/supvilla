/* ==========================================
   SUPERMERCADO VILLA - VANILLA JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Header Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  }

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
      title: 'Hortifrúti Fresco',
      tagline: 'Frescor e Sabor Selecionados Diariamente',
      image: 'images/hortifruti.jpg',
      badge: 'Direto do Produtor',
      desc: 'Por isso, selecionamos diariamente o melhor em frutas, verduras e legumes no nosso Hortifrúti, garantindo o frescor e o sabor que a sua família merece.',
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
});
