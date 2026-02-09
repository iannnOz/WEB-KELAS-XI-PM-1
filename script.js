// 1. Loader Logic
window.addEventListener('load', () => {
    const loaderBar = document.querySelector('.loader-bar');
    const loader = document.getElementById('loader');
    
    loaderBar.style.width = '100px';
    
    setTimeout(() => {
        loader.style.transform = 'translateY(-100%)';
        initAnimations(); // Start animations after loader
    }, 2500);
});

// 2. Smooth Scroll (Lenis)
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. GSAP Animations
function initAnimations() {
    gsap.from(".title-reveal", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out" });
    gsap.from(".animate-up", { opacity: 0, y: 30, duration: 1, stagger: 0.2, delay: 0.5 });
}

// 4. Floating Elements Movement
document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 30;
    const y = (clientY - window.innerHeight / 2) / 30;

    gsap.to(".orb-1", { x: x * 1.5, y: y * 1.5, duration: 2 });
    gsap.to(".orb-2", { x: -x * 2, y: -y * 2, duration: 2 });
    gsap.to(".orb-3", { x: x, y: -y, duration: 2 });
    gsap.to(".hero-content", { x: x / 2, y: y / 2, duration: 1 });
});

// 5. Navbar Pill Logic
const navLinks = document.querySelectorAll('.nav-link');
const pill = document.querySelector('#nav-pill');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const { offsetLeft, offsetWidth } = e.target;
        gsap.to(pill, { left: offsetLeft, width: offsetWidth, opacity: 1, duration: 0.4, ease: "power2.out" });
        link.style.color = "var(--bg)";
    });
    link.addEventListener('mouseleave', () => {
        link.style.color = "var(--text)";
    });
});

document.querySelector('.nav-container').addEventListener('mouseleave', () => {
    gsap.to(pill, { opacity: 0, duration: 0.4 });
});

// 6. Dark Mode
const toggleBtn = document.querySelector('#dark-mode-toggle');
toggleBtn.addEventListener('click', () => {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        toggleBtn.querySelector('.mode-text').innerText = 'GELAP';
    } else {
        body.setAttribute('data-theme', 'dark');
        toggleBtn.querySelector('.mode-text').innerText = 'TERANG';
    }
});

// 7. AOS Init
AOS.init({ duration: 1000, once: false });

// --- [AUDIO LOGIC] ---
const bgMusic = document.getElementById('bg-music');
const playBtn = document.getElementById('play-pause-btn');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const audioControl = document.querySelector('.audio-control');

let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        audioControl.classList.remove('playing');
    } else {
        bgMusic.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        audioControl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

playBtn.addEventListener('click', toggleMusic);

// Opsi: Putar otomatis setelah loading selesai saat user klik apa saja pertama kali
document.addEventListener('click', () => {
    if (!isPlaying && bgMusic.paused) {
        // Uncomment baris di bawah jika ingin lagu langsung main setelah klik pertama di web
        // toggleMusic(); 
    }
}, { once: true });