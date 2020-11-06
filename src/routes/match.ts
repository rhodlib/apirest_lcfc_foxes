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

router.get('/last', getLastMatch);
router.get('/search/:id?', getByIdOrDate);
router.get('/betteropponent', getBetterOpponent);
router.post('/create', createNewMatch);
router.get('/points', getPoints);

export default router;
