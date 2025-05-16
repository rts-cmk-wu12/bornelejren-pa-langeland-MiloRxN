
// Get the current year (useful for copyright notices)
const currentYear = new Date().getFullYear();

/**
 * Format a date to a readable string
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
const formatDate = (date, options = {}) => {
    const dateObj = new Date(date);

    const defaultOptions = {
        format: 'full', // 'full', 'short', 'relative', 'month-year', 'time'
        locale: 'en-US',
    };

    const config = { ...defaultOptions, ...options };

    switch (config.format) {
        case 'full':
            return dateObj.toLocaleDateString(config.locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

        case 'short':
            return dateObj.toLocaleDateString(config.locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });

        case 'month-year':
            return dateObj.toLocaleDateString(config.locale, {
                year: 'numeric',
                month: 'long',
            });

        case 'time':
            return dateObj.toLocaleTimeString(config.locale, {
                hour: '2-digit',
                minute: '2-digit',
            });

        case 'relative':
            return getRelativeTimeString(dateObj);

        default:
            return dateObj.toLocaleDateString(config.locale);
    }
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 months")
 * @param {Date|string|number} date - Date to compare
 * @param {Date} [baseDate=new Date()] - Base date to compare against
 * @returns {string} Relative time string
 */
const getRelativeTimeString = (date, baseDate = new Date()) => {
    const dateObj = new Date(date);
    const diff = baseDate - dateObj;
    const absDiff = Math.abs(diff);

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const isFuture = diff < 0;
    const prefix = isFuture ? 'in ' : '';
    const suffix = isFuture ? '' : ' ago';

    switch (true) {
        case (seconds < 60):
            return 'just now';
        case (minutes < 60):
            return `${prefix}${minutes} minute${minutes !== 1 ? 's' : ''}${suffix}`;
        case (hours < 24):
            return `${prefix}${hours} hour${hours !== 1 ? 's' : ''}${suffix}`;
        case (days < 30):
            return `${prefix}${days} day${days !== 1 ? 's' : ''}${suffix}`;
        case (months < 12):
            return `${prefix}${months} month${months !== 1 ? 's' : ''}${suffix}`;
        default:
            return `${prefix}${years} year${years !== 1 ? 's' : ''}${suffix}`;
    }
};

/**
 * Check if a date is in the past
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is in the past
 */
const isPastDate = (date) => {
    return new Date(date) < new Date();
};

/**
 * Check if a date is in the future
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is in the future
 */
const isFutureDate = (date) => {
    return new Date(date) > new Date();
};

/**
 * Check if a date is today
 * @param {Date|string|number} date - Date to check
 * @returns {boolean} True if date is today
 */
const isToday = (date) => {
    const dateObj = new Date(date);
    const today = new Date();

    return (
        dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear()
    );
};

/**
 * Format a date range
 * @param {Date|string|number} startDate - Start date
 * @param {Date|string|number} endDate - End date
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date range
 */
const formatDateRange = (startDate, endDate, options = {}) => {
    const startObj = new Date(startDate);
    const endObj = endDate ? new Date(endDate) : null;

    const defaultOptions = {
        format: 'month-year', // 'full', 'short', 'month-year'
        separator: ' - ',
        locale: 'en-US',
        presentText: 'Present',
    };

    const config = { ...defaultOptions, ...options };

    const formattedStart = formatDate(startObj, { format: config.format, locale: config.locale });

    if (!endObj) {
        return `${formattedStart} ${config.separator} ${config.presentText}`;
    }

    const formattedEnd = formatDate(endObj, { format: config.format, locale: config.locale });
    return `${formattedStart} ${config.separator} ${formattedEnd}`;
};

/**
 * Calculate duration in years and months between two dates
 * @param {Date|string|number} startDate - Start date
 * @param {Date|string|number} endDate - End date (defaults to current date)
 * @returns {Object} Object containing years and months
 */
const calculateDuration = (startDate, endDate = new Date()) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
};

/**
 * Format a duration as a readable string
 * @param {Object} duration - Duration object with years and months
 * @returns {string} Formatted duration string
 */
const formatDuration = (duration) => {
    const { years, months } = duration;

    if (years === 0 && months === 0) {
        return 'Less than a month';
    }

    const yearText = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '';

    if (years > 0 && months > 0) {
        return `${yearText}, ${monthText}`;
    }

    return yearText || monthText;
};

/**
 * Create a function to sort items by date
 * @param {string} dateProperty - Property name containing the date
 * @param {boolean} [ascending=false] - Sort in ascending order if true
 * @returns {Function} Sort function
 */
const sortByDate = (dateProperty, ascending = false) => {
    return (a, b) => {
        const dateA = new Date(a[dateProperty]);
        const dateB = new Date(b[dateProperty]);

        return ascending ? dateA - dateB : dateB - dateA;
    };
};

export {
    currentYear,
    formatDate,
    getRelativeTimeString,
    isPastDate,
    isFutureDate,
    isToday,
    formatDateRange,
    calculateDuration,
    formatDuration,
    sortByDate,
};