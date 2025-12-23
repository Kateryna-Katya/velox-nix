document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Lucide Icons
    if (window.lucide) { window.lucide.createIcons(); }

    // 3. Анимация заголовков (forEach + SplitType)
    const splitTitles = document.querySelectorAll('.split-text');
    splitTitles.forEach(el => {
        // Обязательно разбиваем по словам И буквам, чтобы применить white-space: nowrap к словам
        const text = new SplitType(el, { types: 'words,chars' });
        
        gsap.from(text.chars, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            opacity: 0,
            y: 30,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out"
        });
    });

    // 4. Мобильное меню (forEach для кнопок)
    const burgers = document.querySelectorAll('#burger-menu');
    const mobileMenu = document.querySelector('#mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    burgers.forEach(burger => {
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            }
        });
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            burgers.forEach(b => b.classList.remove('open'));
            document.body.style.overflow = '';
        });
    });

    // 5. Логика форм (forEach)
    const forms = document.querySelectorAll('.contact-form');
    forms.forEach(form => {
        const captchaLabel = form.querySelector('.captcha-label');
        const captchaInput = form.querySelector('.captcha-input');
        const successMessage = document.getElementById('form-success');
        
        // Генерация примера
        const a = Math.floor(Math.random() * 10), b = Math.floor(Math.random() * 10);
        if (captchaLabel) captchaLabel.innerText = `${a} + ${b} = ?`;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Валидация капчи
            if (captchaInput && parseInt(captchaInput.value) !== (a + b)) {
                alert("Ошибка в расчетах!");
                return;
            }

            const btn = form.querySelector('button');
            if (btn) {
                btn.disabled = true;
                btn.innerText = "Отправка...";
            }

            setTimeout(() => {
                // Прячем форму, показываем успех
                form.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
            }, 1000);
        });
    });

    // 6. Хедер при скролле
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header?.classList.toggle('header--scrolled', window.scrollY > 50);
    });
});