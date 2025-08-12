import dayjs from 'dayjs'
export const stringDateToTimestamp = (datetime: string) => {
    const date = Date.parse(datetime)
    return date;
}
export const formatDateToFormatString = (datetime: string, format: string) => {
    const formatted = dayjs(datetime).format(format)
    return formatted;
}

export const getDateFromISOString = (isoString: string) => {
    const dateObj = new Date(isoString);
    return dateObj.toLocaleDateString('vi-VN');
}

export const getTimeFromISOString = (isoString: string) => {
    const dateObj = new Date(isoString);
    return dateObj.toISOString().split('T')[1].substring(0, 5);
}