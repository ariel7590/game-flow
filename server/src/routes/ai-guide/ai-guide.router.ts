import express from 'express';
import { httpGenerateGuide } from '../../controllers/ai-guide/ai-guide.controller';
import { validateGenerateGuide } from '../../api/validations/ai-guide/ai-guide.validations';
import { validate } from '../../api/middlewares/validate-resourse.middleware';

const aiGuideRouter = express.Router();

aiGuideRouter.post('/', validate(validateGenerateGuide), httpGenerateGuide);

export default aiGuideRouter;