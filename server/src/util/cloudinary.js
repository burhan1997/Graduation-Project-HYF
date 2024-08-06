import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Yüklenmiş ortam değişkenlerini al
dotenv.config();

// Cloudinary yapılandırmasını yap
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// `cloudinary`'yi ES6 modülü olarak dışa aktar
export { cloudinary };
