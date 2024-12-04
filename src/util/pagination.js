export default function generatePagination(totalPages, currentPage)
{
    const visiblePages = 1;
    const pagination = [];

    pagination.push(1);

    if (currentPage > visiblePages + 2)
    {
        pagination.push("...");
    }


    for (let i = Math.max(2, currentPage - visiblePages); i <= Math.min(totalPages - 1, currentPage + visiblePages); i++)
    {
        pagination.push(i);
    }

    if (currentPage < totalPages - visiblePages - 1)
    {
        pagination.push("...");
    }

    if (totalPages > 1)
    {
        pagination.push(totalPages);
    }

    return pagination;
};