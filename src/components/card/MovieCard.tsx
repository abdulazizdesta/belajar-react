import { Clapperboard } from "lucide-react"

interface MovieCardProps {
    title: string
    rating: string
    release_year: number
    rating_class: string
    category: string
    thumbnail: string | null
}

export default function MovieCard({
    title,
    rating,
    release_year,
    rating_class,
    category,
    thumbnail,
}: MovieCardProps) {
    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
            {/* Thumbnail */}
            <div className="aspect-[3/2] bg-slate-800 flex items-center justify-center">
                {thumbnail
                    ? <img src={`http://localhost:8000/storage/${thumbnail}`}
                        alt={title}
                        className="" />
                    : <Clapperboard size={20} className="w-full h-full object-cover" />
                }
            </div>
            {/* Info */}
            <div className="p-3">
                <p className="text-white text-sm font-medium truncate">{title}</p>
                <p className="text-slate-500 text-xs mt-1">{release_year} • {category}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-yellow-400 text-xs">★ {rating}</span>
                    <span className="text-slate-500 text-xs">{rating_class}</span>
                </div>
            </div>
        </div>
    )
}