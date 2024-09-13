// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Add stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);

    // Animate star
    gsap.to(star.position, {
        duration: Math.random() * 10 + 5,
        x: star.position.x + Math.random() * 10 - 5,
        y: star.position.y + Math.random() * 10 - 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

Array(200).fill().forEach(addStar);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(pointLight, ambientLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Service icons
const services = [
    { name: 'Advertising', icon: 'fas fa-ad' },
    { name: 'WhatsApp API', icon: 'fab fa-whatsapp' },
    { name: 'Automation', icon: 'fas fa-robot' },
    { name: 'SaaS', icon: 'fas fa-cloud' }
];

const serviceIconsContainer = document.querySelector('.service-icons');
services.forEach(service => {
    const serviceIcon = document.createElement('div');
    serviceIcon.classList.add('service-icon');
    serviceIcon.innerHTML = `
        <i class="${service.icon} icon"></i>
        <span class="name">${service.name}</span>
    `;
    serviceIconsContainer.appendChild(serviceIcon);
});

// Testimonials
const testimonials = [
    { name: 'John Doe', company: 'Tech Co', text: 'Amazing service! Boosted our productivity.' },
    { name: 'Jane Smith', company: 'Marketing Inc', text: 'The 3D website is a game-changer!' },
    { name: 'Bob Johnson', company: 'Sales Corp', text: 'Increased our leads by 200%. Highly recommended!' }
];

const testimonialCarousel = document.querySelector('.testimonial-carousel');
testimonials.forEach((testimonial, index) => {
    const testimonialElement = document.createElement('div');
    testimonialElement.classList.add('testimonial');
    if (index === 0) testimonialElement.classList.add('active');
    testimonialElement.innerHTML = `
        <p>"${testimonial.text}"</p>
        <p class="author">- ${testimonial.name}, ${testimonial.company}</p>
    `;
    testimonialCarousel.appendChild(testimonialElement);
});

// Testimonial rotation
let currentTestimonial = 0;
function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

setInterval(rotateTestimonials, 5000);

// Animate elements on load
window.addEventListener('load', () => {
    gsap.to('.animate-text', { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
    gsap.to('.animate-button', { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.from('.service-icon', { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: {
        trigger: '#services-overview',
        start: 'top 80%'
    }});
});

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to(scene.position, {
        x: (clientX - centerX) * 0.001,
        y: (centerY - clientY) * 0.001,
        duration: 1
    });
});