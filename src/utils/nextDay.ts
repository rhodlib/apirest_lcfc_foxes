export const nextDay = (value: Date) => {
    const nextDayDate = new Date(value);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    return nextDayDate;
};
