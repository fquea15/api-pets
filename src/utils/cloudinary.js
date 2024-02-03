import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config/environment.js'

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "pet"
    });
}

export async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId);
}