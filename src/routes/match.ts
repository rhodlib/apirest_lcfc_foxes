import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';
import {
    getLastMatch,
    getByIdOrDate,
    getBetterOpponent,
    createNewMatch,
    getPoints,
} from '../controllers/match.controller';

const router = Router();

router.get('/last', TokenValidation, getLastMatch);
router.get('/search/:id?', TokenValidation, getByIdOrDate);
router.get('/betteropponent', TokenValidation, getBetterOpponent);
router.post('/create', TokenValidation, createNewMatch);
router.get('/points', TokenValidation, getPoints);

export default router;
