/**
 * Formats the given date proposed.
 * @param {Date} date the date to format
 * @returns {string} the formatted date
 */
export function formatDateProposed(date) {
    return date.toLocaleString("en-US", {
        day: "numeric",
        month: "short"
    });
}

/**
 * Formats the given time.
 * @param {Date} date the date to format
 * @returns {string} the formatted time
 */
export function formatTime(date) {
    return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}