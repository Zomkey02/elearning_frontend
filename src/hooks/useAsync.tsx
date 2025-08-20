import { useCallback, useEffect, useState } from "react";


export function useAsync<T>(fn: ()=> Promise<T>, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const run = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fn();
            setData(result);
        } catch (error: any) {
            setError(error?.message ?? 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, dependencies);

    useEffect(() => {void run(); }, [run]);

    return {data, loading, error, run }

}