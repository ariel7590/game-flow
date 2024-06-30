require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8000,
    protocol: "http",
    host: "localhost",
    origin: "http://localhost:5173",
    dbUri: process.env.MONGO_URL,
    JWTSecret: process.env.JWT_SECRET_KEY,
    cloudinaryAPI: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_SECRET_KEY,
    youtubeAPI: process.env.YOUTUBE_API_KEY
};