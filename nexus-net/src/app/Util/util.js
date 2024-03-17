
export function dateFormatter(dateString) {
    let dateArr = dateString.split("T");
    const date = dateArr[0];
    const time = dateArr[1].slice(0, -4);
    return date + " " + time;
}