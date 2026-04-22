// js/modules/auth.js
import { DataManager } from '../core/data-manager.js';

export class AuthEngine {
    static login(username, password) {
        // التحقق من بيانات الدخول (بيانات افتراضية للنظام)
        if (username === 'admin' && password === 'Wano2026') {
            const sessionData = {
                user: username,
                role: 'SuperAdmin',
                token: 'WANO-' + Math.random().toString(36).substr(2),
                timestamp: Date.now()
            };
            DataManager.save('Session', sessionData);
            return true;
        }
        return false;
    }

    static checkSession() {
        const session = DataManager.load('Session');
        if (session && session.role === 'SuperAdmin') {
            return true;
        }
        return false;
    }

    static logout() {
        DataManager.save('Session', null);
        window.location.href = 'index.html';
    }
}
