import { useState } from "react"
import FruitsCard from "./FruitsCard"

export default function App() {
  const nama: string = "Aziz"
  const umur: number = 25
  const gelar: string = "phd"
  const [count, setCount] = useState(0)
  const [isLogin, setIsLogin] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const buah = ["apel", "mangga", "manggis", "jeruk"]
  const kendaraan = ["truk", "F1", "motor"]
  const fruits = [
    { id: 1, nama: 'Apel', harga: 5000 },
    { id: 2, nama: 'Mangga', harga: 8000 },
    { id: 3, nama: 'Jeruk', harga: 6000 },
  ]
  const fruits_2 = [
    { id: 1, nama: 'Apel', harga: 5000, stock: 10 },
    { id: 2, nama: 'Mangga', harga: 8000, stock: 11 },
    { id: 3, nama: 'Jeruk', harga: 6000, stock: 40 },
    { id: 4, nama: 'Kiwi', harga: 9000, stock: 21 },
  ]
  return (
    <div>
      <div>
        <h1>Halo React</h1>
        <p>ini project pertama gweh</p>
        <h2>Nama ku {nama}</h2>
        <h2>Umur Gweh {umur}</h2>
        <p>Gue punya gelar sebagai: {gelar.toUpperCase()}</p>
        <br />
        <p>Counter: {count} </p>
        <button onClick={() => setCount(count + 1)}>
          Plus
        </button>
        <button onClick={() => setCount(count - 1)}>
          Min
        </button>
        <br />
        <p>{isLogin ? "Selamat Datang" : "Login Dulu ya"}</p>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Logout" : "Login"}
        </button>

        {isLogin && (
          <div>
            <p>Khusus member</p>
            <button onClick={() => setIsPremium(!isPremium)}>
              {isPremium ? "Batalkan Preium" : "Langganan Premium"}
            </button>

            {isPremium &&
              <div>
                <p>{"Selamat Sekarang lo Premium"}</p>
              </div>
            }
          </div>
        )}

        <h2>Daftar Buah</h2>
        <ul>
          {buah.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <br />
        <h2>Daftar Kendaraan</h2>
        <ul>
          {kendaraan.map((item, index) => (
            <li key={index}>{item.toUpperCase()}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>The Fruit</h2>
        <div>
          {fruits.map((item) => (
            <div key={item.id}>
              <p>Nama: {item.nama}</p>
              <p>Harga: {item.harga}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Ini Daftar Buah (komponen)</h1>
        {fruits_2.map((item) =>
          <FruitsCard
            key={item.id}
            nama={item.nama}
            harga={item.harga}
            stock={item.stock}
          />
        )}
      </div>
    </div>
  )
}