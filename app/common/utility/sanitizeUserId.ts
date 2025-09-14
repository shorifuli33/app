export function sanitizeUserId(userEmail: string): string {
    if (!userEmail) return '';
    return userEmail.replace('@', 'at');
}

export function desanitizeUserId(sanitizedId: string): string {
    if (!sanitizedId) return '';
    return sanitizedId.replace('at', '@');
} 
