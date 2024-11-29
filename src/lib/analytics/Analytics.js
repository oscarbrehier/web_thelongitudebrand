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

            console.log(`Capturing event ${eventType} with payload`, payload);

            const result = await this.makeRequest("/events", {
                method: "POST",
                body: JSON.stringify({
                    eventType,
                    ...payload
                }),
            });

            return result;

        } catch (err) {

            captureException(err);

            return {
                error: true
            };

        };

    };

};