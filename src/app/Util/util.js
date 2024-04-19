
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