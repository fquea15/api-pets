import Pet from '../models/pet.model.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';
import fs from 'fs-extra';

// GET PETS
export const getPets = async (req, res) => {
    try {
        const pets = await Pet.find()
        res.json(pets)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET PET
export const getPet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id)
        if (!pet) return res.status(404).json({ msg: 'Pet does not exists' })
        return res.json(pet)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//CREATE PET
export const postPets = async (req, res) => {
    try {
        const { name, species, age } = req.body;
        const pet = new Pet({
            name,
            species,
            age
        });

        if (req.files?.image) {
            try {
                const result = await uploadImage(req.files.image.tempFilePath);
                pet.image = {
                    id: result.public_id,
                    url: result.secure_url
                };
                console.log(result)
                await fs.unlink(req.files.image.tempFilePath);
            } catch (uploadError) {
                return res.status(500).json({ message: "Error al subir la imagen", error: uploadError.message });
            }
        } 
        await pet.save();
        res.json(pet);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el plato", error: error.message });
    }
};


export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const petUpdated = await Pet.findByIdAndUpdate(id, req.body, {
            new: true
        })
        return res.json(petUpdated)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id)
        if (!pet) return res.status(404).json({ msg: 'Pet does not exist' })
        return res.json(pet)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}