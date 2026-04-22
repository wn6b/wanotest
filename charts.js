// js/modules/charts.js
export const ChartEngine = {
    renderServerLoad(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        
        setInterval(() => {
            const load = Math.floor(Math.random() * 100);
            el.style.width = `${load}%`;
            el.innerText = `Server Load: ${load}%`;
            el.style.backgroundColor = load > 80 ? 'var(--danger-glow)' : 'var(--primary-glow)';
        }, 2000);
    }
};
