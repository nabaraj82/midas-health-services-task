export const safeString = (value?: string | null): string => {
    return (value || '').toLowerCase();
}