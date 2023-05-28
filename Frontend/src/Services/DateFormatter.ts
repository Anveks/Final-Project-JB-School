
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    // date.setDate(date.getDate()); // Subtract 1 day from the date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
}

export default formatDate;
