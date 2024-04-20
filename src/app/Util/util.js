export function dateFormatter(dateTime) {
    try {
        const year = dateTime[0];
        const month = dateTime[1];
        const day = dateTime[2];
        const hour = dateTime[3];
        const minute = dateTime[4];
        const second = dateTime[5];
        return year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second;
    } catch (error) {
        console.error(error);
        return '';
    }
}

export function stringToDate(parts) {
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const hour = parts[3];
    const minute = parts[4];
    const second = parts[5] || 0;
    return new Date(year, month, day, hour, minute, second);
}