import { useState, useEffect, useCallback } from "react";
import { fetchByPin } from "../api/client";

export function usePin(pin) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cacheKey = `qs_pin_${pin}`;

    const loadData = useCallback(async (isRefresh = false) => {
        try {
            if (!isRefresh) {
                setLoading(true);
            }

            const freshData = await fetchByPin(pin);

            setData(freshData);
            setError(null);

            localStorage.setItem(cacheKey, JSON.stringify(freshData));
        } catch (err) {
            console.error("Failed to fetch pin data", err);
            if (err.status === 404) {
                localStorage.removeItem(cacheKey);
                setData(null);
                setError("Pin not found");
                return;
            }

            const cached = localStorage.getItem(cacheKey);
            if (!cached) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [pin, cacheKey]);

    useEffect(() => {
        if (!pin) return;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                setData(JSON.parse(cached));
            } catch (e) {
                console.warn("Invalid cache", e);
            }
        }
        loadData();
    }, [pin, loadData, cacheKey]);

    return { data, loading, error, refresh: () => loadData(true) };
}
