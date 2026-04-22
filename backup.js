// js/modules/backup.js
export const BackupSystem = {
    exportData() {
        const allData = { ...localStorage };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "WanoHost_Backup_2026.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        console.log("[Backup] System state exported successfully.");
    }
};
