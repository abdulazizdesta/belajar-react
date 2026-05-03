import { Search } from "lucide-react"
import { useState } from "react"

interface SearchProps {
    onSearch: (value: string) => void
    placeholder?: string
}

export default function SearchInput({ onSearch, placeholder }: SearchProps) {

    const [value, setValue] = useState<string>('')
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(value)
        }
    }

    return (
        <div className="my-2 md:my-8 flex items-center gap-4">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm pl-3 pr-4 py-2 rounded-lg focus:outline-none focus:border-slate-500 placeholder:text-slate-500"
            />
            <button
                onClick={() => onSearch(value)}
                className="text-slate-500 hover:text-white transition-colors">
                <Search size={16}  className="bg-slate-900 rounded-lg w-8 h-8 p-2"/>
            </button>
        </div>
    )
}