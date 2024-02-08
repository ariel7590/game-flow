import {v2 as cloudinaryConfig} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

export const cloudinary=cloudinaryConfig.config({ 
    cloud_name: 'dwobsryyr', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true 
  });

