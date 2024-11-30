"use client"

import { localeRegex } from "@/app/i18n/settings";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureNavigation } from "./client";

export default function AnalyticsProvider({ children }) {

    const pathname = usePathname();

    useEffect(() => {

        const handleAnalyticsNavigationTracking = async () => await captureNavigation()
        if (pathname) handleAnalyticsNavigationTracking();

    }, [pathname]);
    
    return children;

};