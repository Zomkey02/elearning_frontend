
export function getThumbnailUrl( path?: string | null): string | null {
    
    if (!path) return null;

    if (path.startsWith('http')) return path;

    const base = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');

    const clean = path.replace(/^\/+/, '');

    const normalized = clean.startsWith('storage/') ? clean : `storage/${clean}`;

    return `${base}/${normalized}`;
}
