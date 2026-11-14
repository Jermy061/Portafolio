(() => {
  const data = window.PORTFOLIO_DATA;
  const supportedLanguages = Object.keys(data.translations);
  const languageSelect = document.querySelector('#language-select');
  const themeToggle = document.querySelector('#theme-toggle');
  const menuToggle = document.querySelector('#menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const projectsGrid = document.querySelector('#projects-grid');
  const projectDialog = document.querySelector('#project-dialog');
  const dialogContent = document.querySelector('#dialog-content');
  const dialogClose = document.querySelector('#dialog-close');
  const metaDescription = document.querySelector('meta[name="description"]');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  const browserLanguage = (navigator.language || 'es').slice(0, 2).toLowerCase();
  let currentLanguage = localStorage.getItem('jscs-language');
  if (!supportedLanguages.includes(currentLanguage)) {
    currentLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : 'es';
  }

  const translate = (path) => {
    const keys = path.split('.');
    let value = data.translations[currentLanguage];
    for (const key of keys) value = value?.[key];
    return value ?? path;
  };

  const projectText = (project, field) => {
    const value = project[field];
    if (Array.isArray(value)) return value;
    return value?.[currentLanguage] ?? value?.es ?? value;
  };

  const applyTranslations = () => {
    document.documentElement.lang = currentLanguage;
    document.title = translate('meta.title');
    metaDescription.setAttribute('content', translate('meta.description'));
    languageSelect.value = currentLanguage;
    languageSelect.setAttribute('aria-label', translate('controls.language'));
    themeToggle.setAttribute('aria-label', translate('controls.theme'));
    menuToggle.setAttribute('aria-label', mobileNav.classList.contains('is-open') ? translate('controls.closeMenu') : translate('controls.menu'));
    dialogClose.setAttribute('aria-label', translate('work.close'));

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
      element.setAttribute('alt', translate(element.dataset.i18nAlt));
    });

    renderProjects();
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const demoLabels = () => window.DEMO_LABELS[currentLanguage] || window.DEMO_LABELS.es;
  const demoConfig = (project) => {
    const config = window.PORTFOLIO_DEMOS?.[project.id] || {};
    let url = '';
    try { const parsed = new URL(config.url); if (parsed.protocol === 'https:') url = parsed.href; } catch { /* Unconfigured demo. */ }
    const image = /^(assets\/[\w./-]+|https:\/\/[^\s]+)$/.test(config.image || '') ? config.image : '';
    const video = /^(assets\/[\w./-]+|https:\/\/[^\s"'<>]+)\.(mp4|webm)$/i.test(config.video || '') ? config.video : '';
    const slides = (Array.isArray(config.slides) ? config.slides : []).filter((slide) => /^assets\/[\w./-]+\.(jpe?g|png|webp|avif)$/i.test(slide?.image || ''));
    const chapters = (Array.isArray(config.chapters) ? config.chapters : []).filter((chapter) => Number.isFinite(chapter?.t));
    return { ...config, url, image, video, slides, chapters };
  };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Pasarela de capturas reales de la demo: avanza sola, como una historia.
  const slideCaption = (slide) => slide.caption?.[currentLanguage] || slide.caption?.en || slide.caption?.es || '';
  const slideCount = (index, total) => `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const slideshow = (demo, { controls = false } = {}) => `
    <div class="slideshow${controls ? ' has-controls' : ''}" data-slideshow data-index="0"${controls ? ` role="group" aria-roledescription="carousel" aria-label="${escapeHtml(demoLabels().tour)}"` : ''}>
      ${demo.slides.map((slide, i) => `<img class="slide${i === 0 ? ' is-active' : ''}" src="${escapeHtml(slide.image)}" alt="${controls ? escapeHtml(slideCaption(slide)) : ''}" data-caption="${escapeHtml(slideCaption(slide))}" loading="lazy" decoding="async" />`).join('')}
      <div class="slide-segments" aria-hidden="true">${demo.slides.map((_, i) => `<span class="slide-seg${i === 0 ? ' is-active' : ''}"><i></i></span>`).join('')}</div>
      <div class="slide-caption"><span class="slide-count">${slideCount(0, demo.slides.length)}</span><span class="slide-text"${controls ? ' aria-live="polite"' : ''}>${escapeHtml(slideCaption(demo.slides[0]))}</span></div>
      ${controls ? `<button class="slide-nav is-prev" type="button" data-slide-step="-1" aria-label="${escapeHtml(demoLabels().prev)}">‹</button><button class="slide-nav is-next" type="button" data-slide-step="1" aria-label="${escapeHtml(demoLabels().next)}">›</button>` : ''}
    </div>`;
  const goToSlide = (show, target) => {
    const slides = [...show.querySelectorAll('.slide')];
    if (!slides.length) return;
    const index = ((target % slides.length) + slides.length) % slides.length;
    show.dataset.index = String(index);
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    show.querySelectorAll('.slide-seg').forEach((segment, i) => {
      segment.classList.toggle('is-done', i < index);
      segment.classList.remove('is-active');
      // Reinicia la animación de progreso del segmento activo.
      if (i === index) { void segment.offsetWidth; segment.classList.add('is-active'); }
    });
    show.querySelector('.slide-count').textContent = slideCount(index, slides.length);
    show.querySelector('.slide-text').textContent = slides[index].dataset.caption || '';
  };

  // Video con capítulos: qué se está viendo en cada momento, separado en sitio público y panel.
  const localized = (value) => value?.[currentLanguage] || value?.en || value?.es || '';
  const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  const chapterData = (demo) => escapeHtml(JSON.stringify(demo.chapters.map((chapter) => ({ t: chapter.t, group: chapter.group, label: demoLabels()[chapter.group] || '', caption: localized(chapter.caption) }))));
  const chapterOverlay = (demo) => `
    <div class="slide-segments" aria-hidden="true">${demo.chapters.map(() => '<span class="slide-seg"><i></i></span>').join('')}</div>
    <div class="slide-caption"><span class="chapter-tag"></span><span class="slide-text"></span></div>`;
  const chapterChips = (demo) => {
    const groups = [];
    demo.chapters.forEach((chapter) => {
      if (groups.at(-1)?.id !== chapter.group) groups.push({ id: chapter.group, items: [] });
      groups.at(-1).items.push(chapter);
    });
    return `<div class="chapter-groups">${groups.map((group) => `
      <div class="chapter-group">
        <span class="chapter-group-title">${escapeHtml(demoLabels()[group.id] || '')}</span>
        <div class="chapter-chips">${group.items.map((chapter) => `<button class="chapter-chip" type="button" data-seek="${chapter.t}"><span>${clock(chapter.t)}</span>${escapeHtml(localized(chapter.title))}</button>`).join('')}</div>
      </div>`).join('')}</div>`;
  };
  const setupChapterVideo = (box) => {
    const video = box.querySelector('video');
    let chapters = [];
    try { chapters = JSON.parse(box.dataset.chapters || '[]'); } catch { /* Sin capítulos. */ }
    if (!video || !chapters.length) return;
    const segments = [...box.querySelectorAll('.slide-seg')];
    const chips = [...box.querySelectorAll('[data-seek]')];
    const tag = box.querySelector('.chapter-tag');
    const text = box.querySelector('.slide-text');
    let current = -1;
    const sync = () => {
      const duration = video.duration || chapters.at(-1).t + 4;
      const now = video.currentTime;
      let index = 0;
      chapters.forEach((chapter, i) => { if (now >= chapter.t - 0.05) index = i; });
      segments.forEach((segment, i) => {
        const start = chapters[i].t;
        const end = chapters[i + 1]?.t ?? duration;
        segment.style.flexGrow = String(Math.max(end - start, 0.5));
        segment.firstElementChild.style.transform = `scaleX(${Math.min(1, Math.max(0, (now - start) / (end - start)))})`;
      });
      if (index === current) return;
      current = index;
      if (tag) { tag.textContent = chapters[index].label; tag.dataset.group = chapters[index].group; }
      if (text) text.textContent = chapters[index].caption;
      chips.forEach((chip, i) => chip.classList.toggle('is-current', i === index));
    };
    ['timeupdate', 'loadedmetadata', 'seeked'].forEach((name) => video.addEventListener(name, sync));
    chips.forEach((chip) => chip.addEventListener('click', () => {
      video.currentTime = Number(chip.dataset.seek);
      video.play().catch(() => {});
    }));
    sync();
  };

  const demoAction = (demo) => demo.url
    ? `<a class="demo-button" href="${escapeHtml(demo.url)}" target="_blank" rel="noopener noreferrer">${demoLabels().try}<span aria-hidden="true"> ↗</span></a>`
    : `<button class="demo-button" type="button" disabled>${demoLabels().soon}</button>`;

  const createProjectCard = (project, index) => {
    const demo = demoConfig(project);
    const description = projectText(project, 'description');
    const techPreview = project.technologies.slice(0, 4).map((tech) => `<span>${tech}</span>`).join('');
    return `
      <article class="project-card reveal" style="--project-accent:${project.accent};--card-delay:${(index % 2) * 90}ms" data-project-id="${project.id}">
        <div class="project-preview" aria-hidden="true">
          <div class="preview-toolbar"><i></i><i></i><i></i><span>${String(index + 1).padStart(2, '0')} / ${String(data.projects.length).padStart(2, '0')}</span></div>
          ${demo.slides.length && !demo.video ? `<div class="preview-media has-slides">${slideshow(demo)}</div>` : demo.video ? `<div class="preview-media${demo.chapters.length ? ' has-chapters' : ''}"${demo.chapters.length ? ` data-chapters="${chapterData(demo)}"` : ''}><video class="demo-video" src="${escapeHtml(demo.video)}" ${demo.image ? `poster="${escapeHtml(demo.image)}" preload="none"` : 'preload="metadata"'} muted loop playsinline disablepictureinpicture tabindex="-1"></video>${demo.chapters.length ? chapterOverlay(demo) : `<span class="preview-badge">▶ ${demoLabels().video}</span>`}</div>` : demo.image ? `<div class="preview-media"><img class="demo-screenshot" src="${escapeHtml(demo.image)}" alt="" loading="lazy" /></div>` : `<div class="preview-canvas">
            <span class="preview-category">${project.category}</span>
            <strong>${project.name}</strong>
            <div class="preview-lines"><i></i><i></i><i></i></div>
            <div class="preview-orbit"></div>
            <div class="preview-chart"><i></i><i></i><i></i><i></i><i></i></div>
            <span class="preview-cursor"></span>
            <span class="preview-progress"></span>
          </div><span class="demo-preview-note">${demoLabels().preview}</span>`}
        </div>
        <div class="project-body">
          <div class="project-topline"><span>${project.category}</span><span>${String(index + 1).padStart(2, '0')}</span></div>
          <h3>${project.name}</h3>
          <span class="demo-status ${demo.url ? 'is-live' : ''}">${demo.url ? demoLabels().live : demoLabels().soon}</span>
          <p>${description}</p>
          <div class="tech-tags">${techPreview}</div>
          <div class="project-actions">${demoAction(demo)}
          <button class="project-link" type="button" data-open-project="${project.id}">
            <span>${translate('work.viewProject')}</span><span aria-hidden="true">↗</span>
          </button>
          </div>
        </div>
      </article>`;
  };

  function renderProjects() {
    projectsGrid.innerHTML = data.projects.map(createProjectCard).join('');
    projectsGrid.querySelectorAll('[data-open-project]').forEach((button) => {
      button.addEventListener('click', () => openProject(button.dataset.openProject));
    });
    observeReveals(projectsGrid);
    projectsGrid.querySelectorAll('[data-chapters]').forEach(setupChapterVideo);
    projectsGrid.querySelectorAll('.project-card').forEach((card) => {
      if (playObserver) playObserver.observe(card);
      else card.classList.add('in-view');
    });
  }

  const openProject = (projectId) => {
    const project = data.projects.find((item) => item.id === projectId);
    if (!project) return;
    const demo = demoConfig(project);
    const instructions = demo.instructions?.[currentLanguage] || demo.instructions?.es || '';

    const features = projectText(project, 'features').map((feature) => `<li><span aria-hidden="true">↳</span>${feature}</li>`).join('');
    const technologies = project.technologies.map((tech) => `<span>${tech}</span>`).join('');
    dialogContent.innerHTML = `
      <div class="dialog-hero" style="--project-accent:${project.accent}">
        <span>${project.category}</span>
        <h2 id="dialog-title">${project.name}</h2>
        <p>${projectText(project, 'description')}</p>
      </div>
      <section class="demo-panel">
        <h3>${demoLabels().title}</h3>
        ${demo.video ? `<div class="dialog-player"${demo.chapters.length ? ` data-chapters="${chapterData(demo)}"` : ''}><video class="dialog-video" src="${escapeHtml(demo.video)}" ${demo.image ? `poster="${escapeHtml(demo.image)}"` : ''} preload="metadata" controls playsinline aria-label="${escapeHtml(`${demoLabels().watch} · ${project.name}`)}"></video>${demo.chapters.length ? chapterChips(demo) : ''}</div>` : ''}
        ${demo.slides.length && !demo.video ? `<p class="overline slide-heading">${demoLabels().tour}</p>${slideshow(demo, { controls: true })}` : ''}
        <p>${demo.url ? demoLabels().help : demoLabels().pending}</p>
        ${demo.url && instructions ? `<h4>${demoLabels().steps}</h4><p class="demo-instructions">${escapeHtml(instructions)}</p>` : ''}
        ${demoAction(demo)}
      </section>
      <div class="dialog-grid">
        <section>
          <p class="overline">${translate('work.scope')}</p>
          <ul class="feature-list">${features}</ul>
        </section>
        <aside>
          <p class="overline">${translate('work.contribution')}</p>
          <p>${projectText(project, 'context')}</p>
          <p class="overline dialog-tech-title">${translate('work.technologies')}</p>
          <div class="tech-tags dialog-tags">${technologies}</div>
        </aside>
      </div>
      <a class="button dialog-button" href="${project.repository}" target="_blank" rel="noreferrer">
        <span>${translate('work.repository')}</span><span aria-hidden="true">↗</span>
      </a>`;

    dialogContent.querySelectorAll('[data-chapters]').forEach(setupChapterVideo);
    if (typeof projectDialog.showModal === 'function') projectDialog.showModal();
    else projectDialog.setAttribute('open', '');
    document.body.classList.add('dialog-open');
  };

  const closeProject = () => {
    dialogContent.querySelectorAll('video').forEach((video) => video.pause());
    if (typeof projectDialog.close === 'function') projectDialog.close();
    else projectDialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
  };

  const setThemeAssets = (theme) => {
    themeColor.setAttribute('content', theme === 'dark' ? '#111714' : '#f7f5f0');
    document.querySelectorAll('.radar-wrap picture').forEach((picture) => {
      const image = picture.querySelector('img');
      const source = picture.querySelector('source');
      const path = theme === 'dark' ? 'assets/radar-dark.svg' : 'assets/radar-light.svg';
      image.src = path;
      if (source) source.srcset = path;
    });
  };

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('jscs-theme', next);
    setThemeAssets(next);
  };

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', translate('controls.menu'));
  };

  const toggleMenu = () => {
    const open = mobileNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', translate(open ? 'controls.closeMenu' : 'controls.menu'));
  };

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px' })
    : null;

  // Las vistas animadas y los videos solo corren mientras la ficha está en pantalla.
  const playObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
          const video = entry.target.querySelector('.demo-video');
          if (!video) return;
          if (entry.isIntersecting && !reducedMotion) video.play().catch(() => {});
          else video.pause();
        });
      }, { threshold: 0.35 })
    : null;

  function observeReveals(root = document) {
    root.querySelectorAll('.reveal:not(.is-visible)').forEach((element) => {
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-visible');
    });
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // La pasarela avanza cuando termina la barra de progreso del segmento activo;
  // el CSS la pausa fuera de pantalla y con «reducir movimiento» no avanza sola.
  document.addEventListener('animationend', (event) => {
    if (reducedMotion || event.animationName !== 'slide-progress') return;
    const show = event.target.closest?.('[data-slideshow]');
    if (show) goToSlide(show, Number(show.dataset.index) + 1);
  });
  document.addEventListener('click', (event) => {
    const show = event.target.closest?.('[data-slide-step]')?.closest('[data-slideshow]');
    if (show) goToSlide(show, Number(show.dataset.index) + Number(event.target.closest('[data-slide-step]').dataset.slideStep));
  });

  languageSelect.addEventListener('change', (event) => {
    currentLanguage = event.target.value;
    localStorage.setItem('jscs-language', currentLanguage);
    applyTranslations();
  });
  themeToggle.addEventListener('click', toggleTheme);
  menuToggle.addEventListener('click', toggleMenu);
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  dialogClose.addEventListener('click', closeProject);
  projectDialog.addEventListener('click', (event) => {
    if (event.target === projectDialog) closeProject();
  });
  projectDialog.addEventListener('close', () => {
    dialogContent.querySelectorAll('video').forEach((video) => video.pause());
    document.body.classList.remove('dialog-open');
  });

  // Barra de progreso de lectura y sombra del encabezado.
  const header = document.querySelector('.site-header');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  header.append(progress);
  let scrollQueued = false;
  const updateScroll = () => {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();

  if (!reducedMotion) {
    // Cinta continua de tecnologías.
    const techLine = document.querySelector('.tech-line');
    if (techLine) {
      const set = `${techLine.innerHTML.trim()}<i></i>`;
      techLine.innerHTML = `<div class="tech-track">${set}<span class="tech-clone" aria-hidden="true">${set.repeat(3)}</span></div>`;
      techLine.classList.add('is-marquee');
    }

    // Terminal del retrato: escribe y borra comandos.
    const typed = document.querySelector('.code-card strong');
    if (typed) {
      const commands = ['build --with-purpose', 'test --every-flow', 'deploy --secure', 'ship --on-time'];
      let command = 0;
      let length = commands[0].length;
      let erasing = true;
      typed.classList.add('is-typing');
      const tick = () => {
        length += erasing ? -1 : 1;
        typed.textContent = commands[command].slice(0, length);
        let wait = erasing ? 34 : 68;
        if (erasing && length === 0) { erasing = false; command = (command + 1) % commands.length; wait = 380; }
        else if (!erasing && length === commands[command].length) { erasing = true; wait = 2400; }
        setTimeout(tick, wait);
      };
      setTimeout(tick, 3200);
    }

    // Conteo del indicador numérico de la portada.
    const counter = document.querySelector('.hero-meta strong');
    const target = Number(counter?.textContent);
    if (counter && Number.isInteger(target) && target > 0) {
      const width = counter.textContent.length;
      const started = performance.now() + 700;
      const step = (now) => {
        const t = Math.min(Math.max((now - started) / 900, 0), 1);
        counter.textContent = String(Math.round(target * (1 - (1 - t) ** 3))).padStart(width, '0');
        if (t < 1) requestAnimationFrame(step);
      };
      counter.textContent = '0'.padStart(width, '0');
      requestAnimationFrame(step);
    }
  }

  document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));
  setThemeAssets(document.documentElement.dataset.theme);
  applyTranslations();
  observeReveals();
})();
