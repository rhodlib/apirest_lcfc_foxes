import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';
import {
    getLastMatch,
    getByIdOrDate,
    getByDateRange,
    getBetterOpponent,
} from '../controllers/match.controller';

const router = Router();

router.get('/search', getByIdOrDate);
router.get('/last', getLastMatch);
router.get('/range', getByDateRange);
router.get('/betteropponent', getBetterOpponent);

export default router;
