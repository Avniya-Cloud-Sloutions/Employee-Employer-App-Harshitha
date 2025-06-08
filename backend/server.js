const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();

// -------------------- Middleware --------------------
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// -------------------- MySQL Connection --------------------
const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "signup1",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL");
});

// -------------------- Multer Setup --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// -------------------- Signup --------------------
app.post("/signup", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return res.status(400).json({ status: "failed", message: "Missing fields" });

  db.query("SELECT * FROM login WHERE email = ?", [email], (err, data) => {
    if (err) return res.status(500).json({ status: "error", message: "DB error" });
    if (data.length > 0)
      return res.json({ status: "failed", message: "Email already registered" });

    db.query(
      "INSERT INTO login (email, password, role) VALUES (?, ?, ?)",
      [email, password, role],
      (err) => {
        if (err) return res.status(500).json({ status: "error", message: "Insert error" });
        res.json({ status: "success", message: "Signup successful" });
      }
    );
  });
});

// -------------------- Login --------------------
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return res.status(400).json({ status: "failed", message: "Missing fields" });

  db.query(
    "SELECT * FROM login WHERE email = ? AND password = ? AND role = ?",
    [email, password, role],
    (err, data) => {
      if (err) return res.status(500).json({ status: "error", message: "Login error" });

      if (data.length > 0) {
        return res.json({
          status: "success",
          message: "Login successful",
          user: { email, role, userId: data[0].id },
        });
      } else {
        return res.json({ status: "failed", message: "Invalid credentials" });
      }
    }
  );
});

// -------------------- Forgot Password --------------------
app.post("/forgot-password", (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword)
    return res.status(400).json({ status: "failed", message: "Missing fields" });

  db.query("UPDATE login SET password = ? WHERE email = ?", [newPassword, email], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "DB error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ status: "failed", message: "Email not found" });

    res.json({ status: "success", message: "Password updated" });
  });
});

// -------------------- Add Profile --------------------
app.post(
  "/add-profile",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      fullName,
      age,
      gender,
      city,
      professionalTitle,
      qualification,
      experience,
      phone,
      alternatePhone,
      email,
      technicalLanguages,
      githubLink,
    } = req.body;

    if (!fullName || !email || !gender) {
      return res.status(400).json({ status: "failed", message: "Missing required fields" });
    }

    const resume = req.files?.resume?.[0]?.filename || null;
    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;

    const sql = `
      INSERT INTO profiles 
      (full_name, age, gender, city, professional_title, qualification, experience, phone, alternate_phone, email, technical_language, github_link, resume, profile_photo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        fullName,
        age || null,
        gender,
        city || null,
        professionalTitle || null,
        qualification || null,
        experience || null,
        phone || null,
        alternatePhone || null,
        email,
        technicalLanguages || null,
        githubLink || null,
        resume,
        profilePhoto,
      ],
      (err) => {
        if (err)
          return res.status(500).json({ status: "error", message: "Insert failed", error: err });
        res.json({ status: "success", message: "Profile added successfully" });
      }
    );
  }
);

// -------------------- View Profiles --------------------
app.get("/view-profiles", (req, res) => {
  db.query("SELECT * FROM profiles", (err, data) => {
    if (err) return res.status(500).json({ status: "error", message: "Fetch error" });
    res.json(data);
  });
});

// -------------------- Update Profile --------------------
app.put(
  "/update-profile/:id",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 }
  ]),
  (req, res) => {
    const id = req.params.id;

    const {
      fullName,
      age,
      gender,
      city,
      professionalTitle,
      qualification,
      experience,
      phone,
      alternatePhone,
      email,
      technicalLanguages,
      githubLink,
    } = req.body;

    const resume = req.files?.resume?.[0]?.filename || null;
    const profilePhoto = req.files?.profilePhoto?.[0]?.filename || null;

    let sql = `
      UPDATE profiles SET 
        full_name = ?, age = ?, gender = ?, city = ?, professional_title = ?, qualification = ?, 
        experience = ?, phone = ?, alternate_phone = ?, email = ?, technical_language = ?, github_link = ?
    `;

    const params = [
      fullName,
      age || null,
      gender || null,
      city || null,
      professionalTitle || null,
      qualification || null,
      experience || null,
      phone || null,
      alternatePhone || null,
      email,
      technicalLanguages || null,
      githubLink || null,
    ];

    if (resume) {
      sql += `, resume = ?`;
      params.push(resume);
    }
    if (profilePhoto) {
      sql += `, profile_photo = ?`;
      params.push(profilePhoto);
    }

    sql += ` WHERE id = ?`;
    params.push(id);

    db.query(sql, params, (err) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ status: "error", message: "Update failed", error: err });
      }
      res.json({ status: "success", message: "Profile updated successfully" });
    });
  }
);

// -------------------- Delete Profile --------------------
app.delete("/delete-profile/:id", (req, res) => {
  db.query("DELETE FROM profiles WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ status: "error", message: "Delete failed" });
    res.json({ status: "success", message: "Profile deleted successfully" });
  });
});
// -------------------- View Profile by id --------------------
app.get("/view-profile-by-id/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM profiles WHERE id = ?", [id], (err, data) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Database error", error: err });
    }

    if (data.length === 0) {
      return res.status(404).json({ status: "failed", message: "Profile not found" });
    }

    res.json(data[0]);
  });
});


// -------------------- Start Server --------------------
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
