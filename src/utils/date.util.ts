import dayjs from 'dayjs'
export const stringDateToTimestamp = (datetime: string) => {
    const date = Date.parse(datetime)
    return date
}
export const formatDateToFormatString = (datetime: string, format: string) => {
    const formated = dayjs(datetime).format(format)
    return formated
}