import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Backend Running 🚀",
            time: result.rows[0].now,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Backend Connected Successfully 🚀"
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});