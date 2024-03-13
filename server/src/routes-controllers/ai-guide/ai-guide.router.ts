import express from 'express';
import { httpGenerateGuide } from './ai-guide.controller';

const aiGuideRouter=express.Router();

aiGuideRouter.post('/',httpGenerateGuide);

export default aiGuideRouter;