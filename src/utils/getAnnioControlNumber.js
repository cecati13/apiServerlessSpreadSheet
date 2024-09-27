export const getAnnio = (number) => {
    const value = number.toString().slice(0,4);
    return Number(value);
};