# EXPRESS.JS — DAY 1 LEARNING NOTES

## 1. Apa itu Express.js

Express.js adalah framework Node.js untuk membangun backend/server.
Tugas backend:

- Menerima request dari client
- Mengolah data
- Mengirim response

---

## 2. Server Dasar Express

```js
const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server berjalan di port 3000");
});
```

`app.listen()` = server siap menerima request
`console.log()` = hanya info untuk developer

---

## 3. Routing Dasar

```js
app.get("/", (req, res) => {
    res.send("Hello Express");
});
```

- `req` = request dari client
- `res` = response dari server
- Urutan `(req, res)` tidak boleh tertukar

---

## 4. Query Parameter

Digunakan untuk data opsional.

URL:

```
/sapa?nama=Antum
```

Code:

```js
app.get("/sapa", (req, res) => {
    const nama = req.query.nama || "tamu";
    res.send(`Halo ${nama}`);
});
```

Akses data:

```js
req.query.nama;
```

---

## 5. Route Params

Digunakan untuk data wajib & identitas.

Route:

```js
app.get("/umur/:tahun", (req, res) => {
    const tahun = req.params.tahun;
    res.send(`Tahun lahir: ${tahun}`);
});
```

URL:

```
/umur/2003
```

Akses:

```js
req.params.tahun;
```

---

## 6. HTTP Methods (REST)

| Method | Fungsi      |
| ------ | ----------- |
| GET    | Ambil data  |
| POST   | Tambah data |
| PUT    | Update data |
| DELETE | Hapus data  |

Contoh:

```js
app.post("/user", (req, res) => {
    res.send("Tambah user");
});
```

---

## 7. Middleware JSON

Agar server bisa membaca body JSON.

```js
app.use(express.json());
```

Tanpa ini → `req.body` = undefined

---

## 8. POST & PUT dengan Body

```js
app.post("/user", (req, res) => {
    const { nama, umur } = req.body;
    res.send(`User ${nama} umur ${umur} ditambahkan`);
});
```

Body dikirim via Postman / Thunder Client (JSON).

---

## 9. DELETE dengan Params

```js
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} dihapus`);
});
```

DELETE umumnya:

- Pakai params
- Tanpa body

---

## 10. Struktur Project (Industri)

```
project/
├─ index.js
├─ routes/
│  └─ profile.routes.js
├─ controllers/
│  └─ profile.controller.js
```

---

## 11. Controller (Logika)

```js
exports.createProfile = (req, res) => {
    const { username, nama } = req.body;
    res.send(`Profile ${username} dibuat`);
};
```

---

## 12. Routes (URL)

```js
const router = require("express").Router();
const { createProfile } = require("../controllers/profile.controller");

router.post("/profile", createProfile);

module.exports = router;
```

---

## 13. Standar Response API (Industri)

```js
res.status(201).json({
    success: true,
    message: "Profile berhasil dibuat",
    data: {
        username,
        nama,
    },
});
```

Kenapa pakai JSON:

- Konsisten
- Frontend-friendly
- Siap scaling

---

## 14. HTTP Status Code Dasar

| Code | Arti         |
| ---- | ------------ |
| 200  | OK           |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 404  | Not Found    |
| 500  | Server Error |
