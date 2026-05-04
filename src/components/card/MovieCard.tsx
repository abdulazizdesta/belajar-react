import { Clapperboard } from "lucide-react"
import { Link } from "react-router-dom"

interface MovieCardProps {
    id: number
    title: string
    description: string
    rating: string
    release_year: number
    rating_class: string
    category: string
    thumbnail: string | null
}

export default function MovieCard({
    id,
    title,
    description,
    rating,
    release_year,
    rating_class,
    category,
    thumbnail,
}: MovieCardProps) {
    return (
        <Link
            to={`/movies/${id}`}
            className="bg-slate-900 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer flex flex-col"
        >
            <div className="aspect-[2/3] bg-slate-800 flex items-center justify-center overflow-hidden">
                {thumbnail
                    ? <img
                        src={`http://localhost:8000/storage/${thumbnail}`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    : <Clapperboard size={48} className="text-slate-600" />
                }
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1 flex-1">
                <p className="text-white text-sm font-medium truncate">{title}</p>
                <p className="text-slate-500 text-xs">{release_year} • {category}</p>
                <p className="text-slate-400 text-xs line-clamp-2 mt-1">{description}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-yellow-400 text-xs">★ {rating}</span>
                    <span className="text-slate-500 text-xs">{rating_class}</span>
                </div>
            </div>
        </Link>
    )
}