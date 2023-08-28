export function getObjectField<TObject>(
    field: keyof TObject,
): string {
    return String(field);
}
