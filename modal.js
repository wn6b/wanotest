// js/modules/modal.js
export const ModalSystem = {
    open(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fade-in';
        modal.innerHTML = `
            <div class="modal-content glass-container">
                <h2>${title}</h2>
                <p>${content}</p>
                <button class="cyber-btn" onclick="this.parentElement.parentElement.remove()">إغلاق</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
};
