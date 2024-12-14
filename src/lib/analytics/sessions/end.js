"use server"
import { logSession } from "./log";

export async function endAnalyticsSession(currentSessionId) {

    logSession(currentSessionId, "end");

};