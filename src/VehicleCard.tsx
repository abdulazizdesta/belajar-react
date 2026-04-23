export interface spect {
    machine: string
    release: number
    type: string
}

export interface VehicleProps {
    id: number
    name: string
    color?: string
    specification?: spect
}

export function VehicleDetails({ name, color, specification}: VehicleProps) {

    return (
        <div>
            <h2>{name}</h2>
            <h3>Spesifikasi: </h3>
            {color && <p>Warna: {color}</p>}
            <br />
            {specification &&
                <div>
                    <h3>Spesifikasi Mesin:</h3>
                    <br />
                    <p>Nama: {specification.machine}</p>
                    <p>Tahun rilis: {specification.release}</p>
                    <p>Tipe: {specification.type}</p>
                </div>
            }
            <p>----------</p>
            <br />
        </div>
    )
}