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