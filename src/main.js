document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LENIS SMOOTH SCROLL ---
  // Плавный скролл для всей страницы
  const lenis = new Lenis();
  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);


  // --- 2. LUCIDE ICONS ---
  // Инициализация иконок, если библиотека подключена
  if (window.lucide) {
      window.lucide.createIcons();
  }


  // --- 3. АНИМАЦИЯ ЗАГОЛОВКОВ (SplitType + GSAP) ---
  const splitTitles = document.querySelectorAll('.split-text');
  splitTitles.forEach(el => {
      // Разбиваем текст на слова и символы
      const text = new SplitType(el, { types: 'words,chars' });

      gsap.from(text.chars, {
          scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none"
          },
          opacity: 0,
          y: 30,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out"
      });
  });


  // --- 4. МОБИЛЬНОЕ МЕНЮ ---
  const burgers = document.querySelectorAll('#burger-menu');
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = (state) => {
      const isOpen = state !== undefined ? state : !mobileMenu.classList.contains('active');

      burgers.forEach(b => b.classList.toggle('open', isOpen));
      if (mobileMenu) {
          mobileMenu.classList.toggle('active', isOpen);
          document.body.style.overflow = isOpen ? 'hidden' : '';
      }
  };

  burgers.forEach(burger => {
      burger.addEventListener('click', () => toggleMenu());
  });

  mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
  });


  // --- 5. ЛОГИКА ФОРМ И УСПЕШНАЯ ОТПРАВКА ---
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach(form => {
      const captchaLabel = form.querySelector('.captcha-label');
      const captchaInput = form.querySelector('.captcha-input');
      const submitBtn = form.querySelector('button[type="submit"]');
      const successMessage = document.getElementById('form-success');

      // Генерация простой капчи
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const answer = num1 + num2;

      if (captchaLabel) captchaLabel.innerText = `${num1} + ${num2} = ?`;

      form.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка капчи
          if (captchaInput && parseInt(captchaInput.value) !== answer) {
              // Анимация тряски при ошибке
              gsap.to(captchaInput, { x: 10, repeat: 3, yoyo: true, duration: 0.05, clearProps: "x" });
              alert("Ошибка в расчетах! Попробуйте еще раз.");
              return;
          }

          // Блокировка кнопки
          if (submitBtn) {
              submitBtn.disabled = true;
              submitBtn.innerText = "Отправка...";
          }

          // Имитация запроса на сервер (1.5 сек)
          setTimeout(() => {
              // Анимация исчезновения формы
              gsap.to(form, {
                  opacity: 0,
                  y: -20,
                  duration: 0.5,
                  onComplete: () => {
                      form.style.display = 'none';

                      if (successMessage) {
                          successMessage.style.display = 'block';
                          // Плавное появление сообщения об успехе
                          gsap.fromTo(successMessage,
                              { opacity: 0, scale: 0.9, y: 20 },
                              { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" }
                          );
                      }
                  }
              });

              form.reset();
          }, 1500);
      });
  });


  // --- 6. ХЕДЕР ПРИ СКРОЛЛЕ ---
  const header = document.querySelector('.header');
  const updateHeader = () => {
      if (header) {
          header.classList.toggle('header--scrolled', window.scrollY > 50);
      }
  };

  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Проверка при загрузке


  // --- 7. ДОПОЛНИТЕЛЬНО: АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ (REVEAL) ---
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
      gsap.from(el, {
          scrollTrigger: {
              trigger: el,
              start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out"
      });
  });

});