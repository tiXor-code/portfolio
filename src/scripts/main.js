document.addEventListener('DOMContentLoaded', () => {
    fetch('../content/timeline.json')
        .then(response => response.json())
        .then(data => {
            const timeline = data;
            const main = document.querySelector('main');

            timeline.forEach(milestone => {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.id = `tooltip-${milestone.id}`;
                tooltip.innerHTML = `<h3>${milestone.title}</h3><p>${milestone.details}</p>`;
                main.appendChild(tooltip);

                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = `${milestone.x}px`;
                star.style.top = `${milestone.y}px`;
                star.style.opacity = 0;
                main.appendChild(star);

                star.addEventListener('mouseover', () => {
                    tooltip.style.display = 'block';
                });

                star.addEventListener('mouseout', () => {
                    tooltip.style.display = 'none';
                });
            });

            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercentage = scrollY / pageHeight * 100;

                timeline.forEach(milestone => {
                    const star = document.querySelector(`#tooltip-${milestone.id} + .star`);
                    if (scrollPercentage >= milestone.scrollPos) {
                        star.style.opacity = 1;
                    }
                });
            });
        });
});