import "server-only";
import { captureException } from "@sentry/nextjs";

export class Analytics {

    constructor(config) {

        this.config = {
            apiKey: config.apiKey,
            baseUrl: config.baseUrl,
            maxRetries: config?.retries || 3
        };

    };

    async makeRequest(endpoint, options) {

        const url = `${this.config.baseUrl}${endpoint}`;
        let attempts = 0;

        while (attempts < this.config.maxRetries) {

            try {

                const response = await fetch(url, {
                    ...options,
                    headers: {
                        "Authorization": `Bearer ${this.config.apiKey}`,
                        "Content-Type": "application/json",
                        ...options.headers
                    },
                });

                if (response.status === 429) {

                    return {
                        success: false, 
                        error: "Rate Limit"
                    };

                };
        
                return {
                    success: !!response.ok,
                };

            } catch (err) {

                attempts++;

                if (attempts === this.config.maxRetries) {

                    return {
                        success: false,
                    };

                };

                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));

            };

        };

    };

    async captureEventServerSide(eventType, payload) {

        try {

            const result = await this.makeRequest("/events", {
                method: "POST",
                body: JSON.stringify({
                    eventType,
                    ...payload
                }),
            });

            console.log(`event (${eventType}) logged with payload:`, payload);

            return result;

        } catch (err) {

            console.log(err);

            captureException(err);

            return {
                error: true
            };

        };

    };

};

export const analyticsServer = new Analytics({
    apiKey: process.env.ANALYTICS_API_KEY,
    baseUrl: process.env.ANALYTICS_API_URL
});