import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';
import { getLastMatch, getByIdOrDate } from '../controllers/match.controller';

const router = Router();

router.get('/search', getByIdOrDate);
router.get('/last', getLastMatch);

export default router;
