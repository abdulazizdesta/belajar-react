export default function MovieCardSkeleton() {
    return (
        <div className="bg-slate-800 rounded-xl animate-pulse">
            <div className="aspect-[2/3] bg-slate-700 rounded-t-xl" />
            <div className="p-3 flex flex-col gap-2">
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-700 rounded w-1/2" />
            </div>
        </div>
    )
}