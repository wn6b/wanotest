// js/core/data-manager.js
export class DataManager {
    static save(key, data) {
        try {
            // تشفير وهمي بسيط كنوع من الحماية لنظام 2026
            const encryptedData = btoa(JSON.stringify(data));
            localStorage.setItem(`WanoHost_${key}`, encryptedData);
            return true;
        } catch (e) {
            console.error('[System Error] Failed to save data', e);
            return false;
        }
    }

    static load(key) {
        try {
            const data = localStorage.getItem(`WanoHost_${key}`);
            if (!data) return null;
            return JSON.parse(atob(data));
        } catch (e) {
            console.error('[System Error] Failed to load data', e);
            return null;
        }
    }

    static clearSystem() {
        localStorage.clear();
        console.log('[System Alert] All local databases purged.');
    }
}
