interface ButtonProps {
    label: string
    onClick: () => void
    variant?: 'primary' | 'danger' | 'outline'
    disabled?: boolean
    loadingLabel?: string
    loading?: boolean
}
const styles = {
    primary: 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-transparent',
    danger: 'bg-red-950 hover:bg-red-900 text-red-300 border-red-900',
    outline: 'bg-transparent hover:text-white text-slate-400 border-slate-700 hover:border-slate-500',
}
export default function Button({ label, onClick, variant = 'primary', disabled, loadingLabel, loading }: ButtonProps) {

    return (
        <button
            disabled={disabled || loading}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${styles[variant]}`}>
            {loading ? (loadingLabel ?? 'Loading...') : label}
        </button>
    )
}