import { useState, useEffect } from "react"
import FruitsCard from "./FruitsCard"
import { VehicleDetails } from "./VehicleCard"

interface Post {
  id: number
  title: string
  body: string
}

interface Spek {
  machine?: string
  year?: number
}

interface Kendaraan {
  id: number
  name: string
  price: number
  color?: string
  spek?: Spek
}

export default function App() {
  const vehicles: Kendaraan[] = [
    { id: 1, 
      name: 'BMW', 
      price: 1000000,
      spek: {
        machine: 'V8',
        year: 1999,
      } 
    },
    { id: 2, 
      name: 'Mercedes Benz', 
      price: 18000000, 
      color: 'merah' },
  ]
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
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  /* Simulasi Fetch API Menggunakan useEffect */
  // useEffect(() => {
  //   setTimeout(() =>
  //     setPesan("Data sudah siap"), 5000)
  // }, [])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      
      <div>
        <p>{vehicles[1].name} dengan harga {vehicles[1].price} {vehicles[1].color && <p>mempunyai warna {vehicles[1].color}</p>}</p>
        <br />
        {vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <p>Nama kendaraan: {vehicle.name} dengan harga: {vehicle.price}</p>
            <p>Spesifikasi:
              {vehicle.spek ? 
              <div> 
                {vehicle.color ? <p>Warna: {vehicle.color}</p> : <p>Warna: belum ada warna</p>}
                <p>Mesin: {vehicle.spek.machine}</p>
                <p>Tahun rilis: {vehicle.spek.year}</p>
              </div>
               : "Belum ada spesifikasi" }
            </p>
          </div>
        ))}
      </div>
      <div>
        <h1>
          Data
        </h1>
        {loading ? (<p>loading...</p>)
          : (
            posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <hr />
              </div>
            ))
          )
        }
      </div>
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
      {/* Use from useEffect Declaration */}
      {/* <div>
        <p>{pesan}</p>
      </div> */}
    </div>
  )
}