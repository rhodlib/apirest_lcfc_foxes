/**
 * Take a value type string of a timestamp
 * and returns a date
 * @param value string of timestamp.
 */
export const getDate = (value: string) => new Date(parseInt(value, 10));
