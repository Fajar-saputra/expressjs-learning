require("dotenv").config();
const express = require("express");

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello word");
});

app.post("/", (req, res) => {
    res.send("got a post at /user");
});

app.get("/halo", (req, res) => {
    res.send("Halo juga 👋");
});

app.put("/user", (req, res) => {
    res.send("Got a PUT request at /user");
});

app.listen(port, () => {
    console.log("Server runing at ", port);
});

app.get("/sapaa", (req, res) => {
    const nama = req.query.nama;
    res.send(`Halo ${nama}`);
});

// challenge 1
app.get("/tahun", (req, res) => {
    const tahun = req.query.tahun;
    res.send(`Kamu lahir tahun ${tahun}`);
});

// challenge 2
app.get("/nama", (req, res) => {
    const depan = req.query.depan;
    const belakang = req.query.belakang;
    res.send(`Halo ${depan} ${belakang}`);
});

// challenge 3
app.get("/cek", (req, res) => {
    const umur = req.query.umur;
    umur < 18 ? res.send("Belum dewasa") : res.send("Sudah dewasa");
});

// chanllenge 4
app.get("/sapa", (req, res) => {
    const nama = req.query.nama || "tamu";

    res.send(`Halo ${nama}`)
});

// example params
app.get("/umur/:tahun", (req, res) => {
  const tahun = req.params.tahun;
  res.send(`Tahun lahir: ${tahun}`);
});

app.get("/profile/:nama/tahun", (req, res) => {
    const { nama, tahun } = req.params;
    res.send(`Nama : ${nama}, Tahun lahir : ${tahun}`)
})

// chanllenge 5
app.get("/buku/:judul/:tahun", (req, res) => {
    const { judul, tahun } = req.params;
    res.send(`Buku ${judul} terbit tahun ${tahun}`)
});

// chanllenge 6
// app.get("/user", (req, res) => {
//     res.send("Ambil user")
// })

// app.put("/user", (req, res) => {
//     res.send("Update user")
// })

// app.delete("/user", (req, res) => {
//     res.send("Delete user")
// })

// app.post("/user", (req, res) => {
//     res.send("Tambah user")
// })

// 
app.post("/users", (req, res) => {
    const { nama, umur } = req.body;
    res.send(`User ${nama} umur ${umur} ditambahkan`)
})