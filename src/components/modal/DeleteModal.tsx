import Button from "../Button"

interface DeleteModalProps {
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
    loading: boolean
}

export default function DeleteModal({
    title, description, onConfirm, onCancel, loading
}: DeleteModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm">
                <h2 className="text-white font-medium mb-2">{title}</h2>
                <p className="text-slate-400 text-sm mb-6">{description}</p>
                <div className="flex gap-3 justify-end">
                    <Button label="Cancel" variant="outline" onClick={onCancel} />
                    <Button label="Delete" variant="danger" onClick={onConfirm} disabled={loading} />
                </div>
            </div>
        </div>
    )
}