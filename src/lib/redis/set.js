"use server"

import { captureException } from "@sentry/nextjs";
import redis from "./redisClient";

export async function setCache(key, value, invalidateDuration = 5 * 60) {

    try {

        await redis.set(key, JSON.stringify({
            value,
            timestamp: Date.now()
        }));

        return [null, true];

    } catch (err) {

        captureException(err);

        console.log(err);

        return [true, null];

    };
 
};