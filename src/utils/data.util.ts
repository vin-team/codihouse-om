export const deepCloneObject = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}