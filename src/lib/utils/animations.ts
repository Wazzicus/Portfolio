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