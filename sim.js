// js/modules/api-sim.js
export const APISimulator = {
    async fetchData(endpoint) {
        console.log(`[API] Requesting: ${endpoint}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: { version: "2026.1.0", node: "Wano-Node-01", uptime: "99.9%" }
                });
            }, 1500);
        });
    }
};
