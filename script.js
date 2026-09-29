/* ============================================================
   1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
});

/* ============================================================
   2. КОРЗИНА (счётчик + / -)
   ============================================================ */
const cartCountEl = document.getElementById('cartCount');
let cartCount = 0;

function updateCart(newValue) {
    cartCount = Math.max(0, cartCount + newValue);
    cartCountEl.textContent = cartCount;

    // лёгкая анимация «подпрыгивания»
    cartCountEl.classList.add('bump');
    setTimeout(() => cartCountEl.classList.remove('bump'), 250);
}

document.querySelectorAll('.btn--buy').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.action === 'add') {
            updateCart(1);
            btn.textContent = '− Убрать';
            btn.dataset.action = 'remove';
        } else {
            updateCart(-1);
            btn.textContent = 'В корзину';
            btn.dataset.action = 'add';
        }
    });
});

/* ============================================================
   3. СЛАЙДЕР (интерактивный элемент)
   ============================================================ */
const track  = document.getElementById('sliderTrack');
const slides = track.querySelectorAll('.slider__slide');
const dotsEl = document.getElementById('sliderDots');
let current  = 0;

// создаём точки
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
});

const dots = dotsEl.querySelectorAll('span');

function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('sliderPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('sliderNext').addEventListener('click', () => goTo(current + 1));

// авто-смена каждые 5 секунд
let auto = setInterval(() => goTo(current + 1), 5000);

// пауза при наведении
document.getElementById('slider').addEventListener('mouseenter', () => clearInterval(auto));
document.getElementById('slider').addEventListener('mouseleave', () => {
    auto = setInterval(() => goTo(current + 1), 5000);
});

/* ============================================================
   4. ФОРМА (5 вопросов) + валидация
   ============================================================ */
const form = document.getElementById('quizForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const light   = form.light.value;
    const exp     = form.querySelector('input[name="experience"]:checked');

    // простая проверка
    if (!name || !email || !light || !exp) {
        formMessage.textContent = 'Пожалуйста, заполните все обязательные поля';
        formMessage.className = 'form__message error';
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMessage.textContent = 'Проверьте корректность email';
        formMessage.className = 'form__message error';
        return;
    }

    formMessage.textContent = `Спасибо, ${name}! Мы свяжемся с вами в течение дня.`;
    formMessage.className = 'form__message success';
    form.reset();
});
