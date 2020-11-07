/**
 * Take a value type Date
 * and returns the Date of the next day
 * @param value date.
 */
export const nextDay = (value: Date) => {
    const nextDayDate = new Date(value);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    return nextDayDate;
};
