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
}

Array(200).fill().forEach(addStar);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
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
    { name: 'Advertising', icon: '🚀' },
    { name: 'WhatsApp API', icon: '💬' },
    { name: 'Automation', icon: '⚙️' },
    { name: 'SaaS', icon: '☁️' }
];

const serviceIconsContainer = document.querySelector('.service-icons');
services.forEach(service => {
    const serviceIcon = document.createElement('div');
    serviceIcon.classList.add('service-icon');
    serviceIcon.innerHTML = `
        <span class="icon">${service.icon}</span>
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
testimonials.forEach(testimonial => {
    const testimonialElement = document.createElement('div');
    testimonialElement.classList.add('testimonial');
    testimonialElement.innerHTML = `
        <p>"${testimonial.text}"</p>
        <p class="author">- ${testimonial.name}, ${testimonial.company}</p>
    `;
    testimonialCarousel.appendChild(testimonialElement);
});

// Simple carousel functionality
let currentTestimonial = 0;
function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials[currentTestimonial].style.display = 'none';
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].style.display = 'block';
}

setInterval(rotateTestimonials, 5000);