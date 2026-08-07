document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.querySelector(".about_stats_cont");
    const statNumbers = document.querySelectorAll(".stat_number");
    let animated = false;

    const startCountUp = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute("data-target"), 10);
                    const duration = 2000; // Animation duration in milliseconds (2 seconds)
                    const frameDuration = 1000 / 60; // 60 FPS
                    const totalFrames = Math.round(duration / frameDuration);
                    let frame = 0;

                    const counter = setInterval(() => {
                        frame++;
                        // Ease-out progress calculation for smooth deceleration
                        const progress = frame / totalFrames;
                        const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

                        if (frame >= totalFrames) {
                            stat.textContent = target + "+";
                            clearInterval(counter);
                        } else {
                            stat.textContent = currentCount + "+";
                        }
                    }, frameDuration);
                });

                observer.unobserve(entry.target);
            }
        });
    };

    // Use IntersectionObserver to start counting only when the section is visible
    const observer = new IntersectionObserver(startCountUp, {
        threshold: 0.5 // Triggers when 50% of the section is visible
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
});