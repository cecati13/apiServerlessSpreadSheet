const optionsTimeStampt = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h12",
    timeZone: "America/Mexico_city"
};

export const datetime = () => {
    const date = new Date();
    const time = date.toLocaleString("es-MX", optionsTimeStampt);
    return time;
}