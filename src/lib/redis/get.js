"use server"

import redis from "./redisClient";

export async function getCache(data) {

    const {
        key,
        fn, 
        params = [],
        invalidateDuration = 5 * 60,
        fallbackValue
    } = data;

    try {

        const cachedValue = await redis.get(key);

        if (cachedValue) {

            const { value, timestamp } = JSON.parse(cachedValue);
            const cacheAge = (Date.now() - timestamp) / 1000;

            if (cacheAge < invalidateDuration) {

                return [null, value];

            };

            await redis.del(key);

        };

        const freshData = fn ? await fn(...params) : fallbackValue;

        await redis.set(key, JSON.stringify({
            value: freshData,
            timestamp: Date.now()
        }));

        return [null, freshData];

    } catch (err) {

        console.log(err);

        return [true];

    };

};