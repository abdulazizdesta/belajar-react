export default function FruitsCard({nama, harga, stock} : {nama: string, harga:number, stock:number} ){

  return(
    <div>
      <p>Nama: {nama}</p>
      <p>Harga: {harga}</p>
      <p>Stock: {stock}</p>
    </div>
  )
}