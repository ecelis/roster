import differenceInCalendarYears from "date-fns/differenceInCalendarYears";

export function validateBirthDate(date) {
    const years = differenceInCalendarYears(new Date(), date);
    return years > 4;
}
