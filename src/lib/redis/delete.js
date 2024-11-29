"use server"

import { captureException } from "@sentry/nextjs";
import redis from "./redisClient";

export async function delCache(key) {

    try {

        await redis.del(key)
        return [false, null];

    } catch (err) {

        console.error(err);
        captureException(err);
        
        return [true, null];

    };

};