# distreaming

Frontend buat aplikasi streaming film. Dibikin pake React + TypeScript + Vite, terus connect ke backend Laravel yang gua bikin di project sebelumnya.

## Fitur

- Register & login (pake token)
- Browse film, ada search sama filter
- Pagination
- Halaman kategori film
- Admin panel buat CRUD movies & users (cuma admin yang bisa akses)
- Upload thumbnail film create/update
- Delete pake modal konfirmasi
- Responsive desing

## Tech stack

Frontend:
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM v7
- Axios (buat hit API)
- React Toastify (buat notif)
- Lucide React (icon)

Backend (project terpisah):
- Laravel 11 + Sanctum
- MySQL

## Run

Pastiin backend Laravel-nya udah jalan dulu di `http://localhost:8000`. Kalo belum, clone dulu dari [distreaming](https://github.com/abdulazizdesta/distreaming).

Lalu:

bash
git clone https://github.com/abdulazizdesta/belajar-react.git
cd belajar-react
npm install
npm run dev

Buka `http://localhost:5173` di browser.

## Struktur folder

```
src/
├── App.tsx              # Root
├── main.tsx             # Entry point
├── components/          # Komponen reusable (Button, Pagination, dll)
├── contexts/            # AuthContext
├── hooks/               # useAuth
├── services/            # api.tsx (axios instance)
├── routes/              # Gabungan semua routes
└── modules/             # Per fitur
    ├── auth/            # Login, Register
    ├── home/            # Home page
    ├── categories/      # Halaman kategori
    └── adminpanel/      # Admin CRUD
```

Idenya: tiap fitur punya foldernya sendiri di `modules/`, isinya page sama route-nya. Kalo ada komponen yang dipake di lebih dari 1 tempat, tempatkan di `components/`.

## Cara kerja auth

1. User login → backend kasih token
2. Token disimpen di localStorage + AuthContext
3. Setiap request ke API, axios interceptor otomatis pasang token di header
4. Kalo mau akses halaman tertentu, dibungkus `<ProtectedRoute>`. Kalo belum login, otomatis di-redirect ke login

## Routes

| Path | Akses |
|---|---|
| `/` | Login |
| `/register` | Register |
| `/home` | Browse film (perlu login) |
| `/categories` | List kategori (perlu login) |
| `/admin/movies` | List movies (cuma admin) |
| `/admin/movies/create` | Tambah film (cuma admin) |
| `/admin/movies/:id/edit` | Edit film (cuma admin) |
| `/admin/users` | List users (cuma admin) |
| `/admin/users/:id/edit` | Edit user (cuma admin) |

## Login buat testing

Tergantung seeder di backend, biasanya:

- Admin: `admin@mail.com` / `password`
- User: `user@mail.com` / `password`

Cek `database/seeders/UserSeeder.php` di repo backend.

## Catatan

- Backend wajib jalan dulu
- Storage Laravel harus di-link biar gambar muncul: `php artisan storage:link`
- Kalo CORS error, set `config/cors.php` di Laravel-nya, allow origin `http://localhost:5173`

## Bagian menarik

- **Pagination** punya logic sendiri buat naro titik-titik (...) kalo halamannya banyak.
- **Update movie** harus pake trick `_method: PATCH` karena PHP gabisa parse multipart di method PATCH langsung. Jadi kirim sebagai POST tapi ada field `_method` di FormData-nya.
- **Conditional spread** pas update user, password baru dikirim kalo user emang ngisi. Kalo kosong, gak dikirim sama sekali biar password lama gak ke-overwrite.

## Improve

- Pisahin logic API call ke service file biar gak nyampur sama component
- Bikin custom hook `useMovies()` buat fetching

## Lisensi

Buat belajar aja, bebas dipake.