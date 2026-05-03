interface PaginationProps {
    currentPage: number
    lastPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {

    const getPageNumbers = () => {
        const pages: (number | string)[] = []

        if (lastPage <= 7) {
            return Array.from({ length: lastPage }, (_, i) => i + 1)
        }

        pages.push(1)

        if (currentPage > 3) pages.push("...")

        for (let i = Math.max(2, currentPage - 2); i <= Math.min(lastPage - 1, currentPage + 2); i++) {
            pages.push(i)
        }

        if (currentPage < lastPage - 2) pages.push("...")

        pages.push(lastPage)

        return pages

    }
    return (
        <div>
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                ←
            </button>
            {getPageNumbers().map((page, index) => (
                page === "..."
                    ? <span key={index} className="text-slate-500 px-2">...</span>
                    : <button
                        key={index}
                        onClick={() => onPageChange(page as number)}
                        className={`px-3 py-1 rounded-lg text-sm ${currentPage === page ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}>
                        {page}
                    </button>
            ))}
            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-3 py-1 rounded-lg text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                →
            </button>
        </div>
    )
}