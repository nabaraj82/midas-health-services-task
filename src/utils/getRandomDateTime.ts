export function getRandomDateTime(index:number):string {
    const randomYear = Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020;

    const randomMonth = Math.floor(Math.random() * 12);

    const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate();

    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

    const randomDate = new Date(randomYear, randomMonth, randomDay, 8 + Math.floor(index / 3), (index % 3) * 20);

    const formattedDateTime = `${randomYear}-${String(randomMonth + 1).padStart(2, '0')}-${String(randomDay).padStart(2, '0')} ${String(randomDate.getHours()).padStart(2, '0')}:${String(randomDate.getMinutes()).padStart(2, '0')}:${String(randomDate.getSeconds()).padStart(2, '0')}`;

    return formattedDateTime;
}
