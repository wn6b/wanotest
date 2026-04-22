// js/modules/ui-engine.js
export class UIEngine {
    static createButton(text, id) {
        const btn = document.createElement('button');
        btn.className = 'cyber-btn';
        btn.id = id;
        btn.innerText = text;
        return btn;
    }

    static updateStatus(message, isSuccess = true) {
        const statusEl = document.getElementById('system-status');
        statusEl.innerText = message;
        statusEl.style.color = isSuccess ? 'var(--primary-glow)' : 'var(--danger-glow)';
        statusEl.style.textShadow = `0 0 10px ${statusEl.style.color}`;
    }
}
