
function formatDate(dateString: string): string {
    const date = new Date(dateString); // turning date string into date obj
    const day = date.getDate().toString().padStart(2, '0'); // formatting day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // formatting month
    const year = date.getFullYear().toString(); // formatting year
    return `${day}.${month}.${year}`;
}

export default formatDate;
