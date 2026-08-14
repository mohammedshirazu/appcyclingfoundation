document.addEventListener("DOMContentLoaded", () => {
    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navPagesWrap = document.getElementById('navPagesWrap');

    if (navToggle && navPagesWrap) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navPagesWrap.classList.toggle('active');
        });
    }

    // Count up Animation
    const initCountUp = (sectionSelector, numberSelector) => {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const statNumbers = section.querySelectorAll(numberSelector);
        if (!statNumbers.length) return;

        let animated = false;

        const animateNumbers = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;

                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute("data-target"), 10);
                        if (isNaN(target)) return;

                        const suffix = stat.getAttribute("data-suffix") || "+";
                        const duration = 2000; // Animation duration in milliseconds (2s)
                        let startTime = null;

                        // Smooth animation callback using requestAnimationFrame
                        const step = (timestamp) => {
                            if (!startTime) startTime = timestamp;
                            const elapsed = timestamp - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            // Ease-out cubic calculation for smooth deceleration
                            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));
                            stat.textContent = currentCount.toLocaleString() + suffix;

                            if (progress < 1) {
                                window.requestAnimationFrame(step);
                            } else {
                                stat.textContent = target.toLocaleString() + suffix;
                            }
                        };

                        window.requestAnimationFrame(step);
                    });

                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateNumbers, {
            threshold: 0.3 // Triggers when 30% of the section is visible
        });

        observer.observe(section);
    };

    // Initialize count-up sections
    initCountUp(".about_stats_cont", ".stat_number");
    initCountUp(".impact_goals_section", ".metric_card h3");

    // donate amount click
    const amountBtns = document.querySelectorAll('.amount_btn');

    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});
