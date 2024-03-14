import express from 'express';
import { httpGenerateGuide } from '../../controllers/ai-guide/ai-guide.controller';

const aiGuideRouter=express.Router();

aiGuideRouter.post('/',httpGenerateGuide);

export default aiGuideRouter;