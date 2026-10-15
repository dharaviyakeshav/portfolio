(() => {
  const loader = document.getElementById('loader');
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const backTop = document.querySelector('.back-top');
  const year = document.getElementById('year');
  const progress = document.getElementById('scrollProgress');
  if (year) year.textContent = new Date().getFullYear();
  const finishLoading = () => window.setTimeout(() => loader?.classList.add('done'), 750);
  if (document.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(el => revealObserver.observe(el));
  } else revealItems.forEach(el => el.classList.add('is-visible'));

  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(isOpen));
    nav?.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${maxScroll > 0 ? y / maxScroll : 0})`;
      header?.classList.toggle('scrolled', y > 20);
      backTop?.classList.toggle('visible', y > 500);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', e => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.07}px, ${y * 0.12}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }
  // Pointer-driven depth tilt and soft spotlight interactions.
  if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.classList.add('tilt-ready');
      card.addEventListener('pointermove', e => { const r=card.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height; card.style.setProperty('--tilt-x',`${(0.5-py)*5}deg`); card.style.setProperty('--tilt-y',`${(px-0.5)*6}deg`); });
      card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
    });
  }
  document.querySelectorAll('.project-card, .skill-card').forEach(card => card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--spot-x',`${e.clientX-r.left}px`);card.style.setProperty('--spot-y',`${e.clientY-r.top}px`)},{passive:true}));

})();
