import { Router } from 'express';
import { deletePet, getPet, getPets, postPets, updatePet } from '../controllers/pet.controller.js';

const router = Router();

router.get('/', getPets);
router.post('/', postPets);
router.get('/:id', getPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router