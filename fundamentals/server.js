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

// contoh post
app.post("/users", (req, res) => {
    const { nama, umur } = req.body;
    res.send(`User ${nama} umur ${umur} ditambahkan`)
})

// contoh put
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { nama, umur } = req.body;

    res.send(`User id ${id} diupdate jadi ${nama}, umur ${umur}`)
})

app.put('/profile/:nama', (req, res) => {
    const { nama } = req.params;
    const { umur, kota } = req.body;
    
    res.send(`Profile ${nama} diupdate jadi ${umur}, kota ${kota}`)
})

// contoh delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    res.send(`User dengan id ${id} sudah dihapus!!`)
})

// chanllenge 7
app.delete('/profil/:nama', (req, res) => {
    const { nama } = req.params;
    res.send(`Profil ${nama} berhasil dihapus`)
})

// learn again
app.get("/kedua", (req, res) => {
    res.status(200).json({ message: "kedua" });
});

app.get("/kedua/nama", (req, res) => {
    const nama = req.query.nama;
    res.send(`Hello ${nama}`);
});

app.get("/kedua/:tahun", (req, res) => {
    const { tahun } = req.params.tahun;
    res.send(`Halo ${tahun}`);
});

app.get("/kedua/profile/:nama/:tahun", (req, res) => {
    const { nama, tahun } = req.params;
    res.send(`Halo ${nama} tahun ${tahun}`);
});

app.get("/kedua/nama", (req, res) => {
    const namaDepan = req.query.namaDepan;
    const namaBelakang = req.query.namaBelakang;
    res.send(`Hello ${namaDepan} ${namaBelakang}`);
});

app.get("/kedua/umur", (req, res) => {
    const umur = req.query.umur;
    if (umur < 18) {
        res.send("Belum Dewasa");
    }
});

app.get("/kedua/tamu", (req, res) => {
    const tamu = req.query.tamu || "tamu";

    res.send(`Hallo ${tamu}`);
});

app.post("/kedua/login", (req, res) => {
    const { username, email } = req.body;

    res.send(`email ${username} dan email ${email}`);
});

app.post("/kedua/register", (req, res) => {
    const { nama, email, password } = req.body;
    res.send(`${nama} berhasil register`);
});

app.get("/kedua/menu/:username/:genre", (req, res) => {
    const { username, genre } = req.params;
    res.send(`Username : ${username} dengan genre : ${genre}`);
});

app.get("/kedua/user", (req, res) => {
    res.send("ambil data user");
});

app.post("/kedua/user", (req, res) => {
    res.send("tambah data user");
});

app.put("/kedua/user/:id", (req, res) => {
    res.send("ubah data user");
});

app.delete("/kedua/user/:id", (req, res) => {
    res.send("hapus data user");
});

app.post("/ketiga/user", (req, res) => {
    const { nama, email } = req.body;

    res.send(`User ${nama} & email ${email} ditambahkan`)
})

app.put('/ketiga/buku/:id', (req, res) => {
    const { id } = req.params;
    const { namaBuku, penulis, terbit } = req.body;

    res.send(`buku dengan id ${id} sudah dibuah`)
})