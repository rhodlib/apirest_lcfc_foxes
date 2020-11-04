import { Router } from 'express';
import { TokenValidation } from '../middlewares/verifyToken';
import { getLastMatch } from '../controllers/match.controller';

const router = Router();

router.get('/last', getLastMatch);

export default router;
