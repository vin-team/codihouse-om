import dayjs from 'dayjs'
export const stringDateToTimestamp = (datetime: string) => {
    const date = Date.parse(datetime)
    return date;
}
export const formatDateToFormatString = (datetime: string, format: string) => {
    const formatted = dayjs(datetime).format(format)
    return formatted;
}