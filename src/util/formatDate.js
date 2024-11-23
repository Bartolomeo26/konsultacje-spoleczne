export function formatToEuropeanDate(dateString)
{
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const today = new Date();
    let age = today.getFullYear() - year;
    if (
        today.getMonth() < date.getMonth() ||
        (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
    )
    {
        age--;
    }

    return `${day}-${month}-${year} (${age} years old)`;
}
export function formatDateTime(timestamp)
{
    const date = new Date(timestamp); // Convert string to Date object

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Extract hours and minutes
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format to dd-MM-yyyy HH:mm
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}