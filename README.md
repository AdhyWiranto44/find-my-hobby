# Definisi
Find My Hobby merupakan aplikasi berbasis web yang berisi daftar hobi, dimana pengunjung dapat mencari hobi secara manual, mencari hobi secara acak/random, mencari hobi berdasarkan kategori, dan website ini menyediakan rekomendasi hobi yang populer digemari orang-orang.

# Teknologi Yang Digunakan
- Next JS
- Bootstrap
- Express JS
- MongoDB

# Fitur Unggulan
- Pencarian Hobi Secara Acak
- Rekomendasi Hobi Berdasarkan Jumlah Views
- Form Saran Hobi Untuk Menambahkan Hobi Baru Dari Pengguna


# Instalasi

## Clone Repository
```bash
git clone https://github.com/AdhyWiranto44/find-my-hobby.git
```

## Install Dependencies

### Backend
```bash
cd find-my-hobby/backend/ && npm install
```

### Frontend Admin
```bash
cd ../frontend-admin/ && npm install
```

### Frontend Visitor
```bash
cd ../frontend-visitor/ && npm install
```

## Konfigurasi Environment Variables

### Frontend Visitor
```bash
cp .env.example .env.local
```

Konfigurasi seperti berikut
```bash
NEXT_PUBLIC_BACKEND_DOMAIN=http://localhost:8080
NEXT_PUBLIC_ADMIN_DOMAIN=http://localhost:3001
```

### Frontend Admin
```bash
cd ../frontend-admin/ && cp .env.example .env.local
```

Konfigurasi seperti berikut
```
NEXT_PUBLIC_BACKEND_DOMAIN=http://localhost:8080
NEXT_PUBLIC_VISITOR_DOMAIN=http://localhost:3000
NEXT_PUBLIC_SECRET=[isi secret bebas sesuai keinginan]
```

### Backend
```bash
cd ../backend/ && cp .env.example .env
```

Konfigurasi seperti berikut
```
ENVIRONMENT=local
ORIGIN=*
SECRET=[secret ini harus sama dengan yang ada pada Frontend Admin]
TOKEN_EXPIRES_IN=2h
DB_NAME=findmyhobby
DB_PASSWORD=
```

## Jalankan Aplikasi
```bash
cd ../
```

Karena menggunakan package concurrently, maka 3 folder akan berjalan bersamaan menggunakan perintah berikut melalui folder root projek
```bash
npm run dev
```

Buka web browser: http://localhost:3000/

# Referensi
https://www.discoverahobby.com/
