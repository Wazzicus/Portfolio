export function reveal(node: HTMLElement, options: { threshold?: number; delay?: number } = {}) {
    const { threshold = 0.1, delay = 0 } = options;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        node.classList.add('visible');
                    }, delay);
                    observer.unobserve(node);
                }
            });
        },
        { threshold }
    );

    node.classList.add('reveal');
    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}

export function typewriter(node: HTMLElement, { speed = 50, delay = 0 }: { speed?: number; delay?: number } = {}) {
    const text = node.textContent || '';
    node.textContent = '';
    node.style.visibility = 'visible';

    let i = 0;

    const type = () => {
        if (i < text.length) {
            node.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    setTimeout(type, delay);

    return {};
}

export function hover3D(node: HTMLElement, { intensity = 10 }: { intensity?: number } = {}) {
    const handleMouseMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        node.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        node.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    node.style.transition = 'transform 0.3s ease';
    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return {
        destroy() {
            node.removeEventListener('mousemove', handleMouseMove);
            node.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}

export function magneticHover(node: HTMLElement, { strength = 0.3, duration = 300 }: { strength?: number, duration?: number } = {}) {
    const handleMouseMove = (e: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        // Calculate distance from center of the element
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        node.style.transition = 'transform 0s'; // Instant movement while tracking
    };

    const handleMouseLeave = () => {
        node.style.transform = 'translate(0, 0)';
        node.style.transition = `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`; // Smooth return
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);

    return {
        destroy() {
            node.removeEventListener('mousemove', handleMouseMove);
            node.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}

export function scrambleText(node: HTMLElement, { duration = 1500, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*' } = {}) {
    const originalText = node.textContent?.trim() || '';
    if (!originalText) return;

    let iteration = 0;
    let interval: any;

    // Wait until element is visible/in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startScramble();
            observer.disconnect();
        }
    });
    observer.observe(node);

    function startScramble() {
        clearInterval(interval);

        interval = setInterval(() => {
            node.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    if (char === ' ') return ' '; // Preserve spaces
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            // Calculate progress based on duration steps instead of fixed value
            // Total iterations needed is text length
            // Run interval ~30ms (30fps)
            // duration / 30 = max steps
            if (iteration >= originalText.length) {
                clearInterval(interval);
                node.textContent = originalText; // Ensure purity at end
            }

            iteration += originalText.length / (duration / 30);
        }, 30);
    }

    return {
        destroy() {
            clearInterval(interval);
            observer.disconnect();
        }
    }
}
