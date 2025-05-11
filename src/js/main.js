// filepath: /workspaces/vkusjavikusja/src/js/main.js
import { gsap } from "../../node_modules/gsap/index.js";
import { Physics2DPlugin } from "../../node_modules/gsap/Physics2DPlugin.js";

gsap.registerPlugin(Physics2DPlugin);

document.querySelectorAll('.button').forEach(button => {

    const bounding = button.getBoundingClientRect()

    button.addEventListener('mousemove', e => {

        let dy = (e.clientY - bounding.top - bounding.height / 2) / -1
        let dx = (e.clientX - bounding.left - bounding.width / 2)  / 10

        dy = dy > 10 ? 10 : (dy < -10 ? -10 : dy);
        dx = dx > 4 ? 4 : (dx < -4 ? -4 : dx);

        button.style.setProperty('--rx', dy);
        button.style.setProperty('--ry', dx);

    });

    button.addEventListener('mouseleave', e => {

        button.style.setProperty('--rx', 0)
        button.style.setProperty('--ry', 0)

    });

    button.addEventListener('click', e => {
        button.classList.add('success');
        gsap.to(button, {
            '--icon-x': -3,
            '--icon-y': 3,
            '--z-before': 0,
            duration: .2,
            onComplete() {
                particles(button.querySelector('.emitter'), 100, -2, -80, -150, 0);
                gsap.to(button, {
                    '--icon-x': 0,
                    '--icon-y': 0,
                    '--z-before': -6,
                    duration: 1,
                    ease: 'elastic.out(1, .5)',
                    onComplete() {
                        button.classList.remove('success');
                    }
                });
            }
        });
    });

});

function particles(parent, quantity, x, y, minAngle, maxAngle) {
    let images = [
        '../src/images/ogbuda1.png',
        '../src/images/ogbuda2.png',
        '../src/images/ogbuda3.png',
        '../src/images/ogbuda4.png',
    ];
    for (let i = quantity - 1; i >= 0; i--) {
        let angle = gsap.utils.random(minAngle, maxAngle),
            velocity = gsap.utils.random(100, 200),
            img = document.createElement('img'); // Create an <img> element
        img.src = images[Math.floor(gsap.utils.random(0, images.length))]; // Randomly select an image
        img.style.position = 'absolute'; // Ensure the image is positioned correctly
        img.style.width = '100px'; // Set a default size (adjust as needed)
        img.style.height = '100px'; // Set a default size (adjust as needed)
        parent.appendChild(img); // Append the image to the parent element
        gsap.set(img, {
            opacity: 0,
            x: x,
            y: y,
            scale: gsap.utils.random(0.4, 0.7),
        });
        gsap.timeline({
            onComplete() {
                img.remove(); // Remove the image after the animation
            },
        })
            .to(img, {
                duration: 0.05,
                opacity: 1,
            }, 0)
            .to(img, {
                duration: 5,
                rotationX: `-=${gsap.utils.random(720, 1440)}`,
                rotationZ: `+=${gsap.utils.random(720, 1440)}`,
                physics2D: {
                    angle: angle,
                    velocity: velocity,
                    gravity: 120,
                },
            }, 0)
            .to(img, {
                duration: 1,
                opacity: 0,
            }, 0.8);
    }
}
