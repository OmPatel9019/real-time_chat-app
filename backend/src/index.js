
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" })); // Increase limit for profile pic upload
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        console.warn('Blocked CORS request from origin:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
});

