export const deepCloneObject = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}

export const formatCurrency = (value: string): string => {
    const numeric = value.replace(/\D/g, "");
    if (!numeric) return "";
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};