import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkAdminAuth } from '../controller/admin.controller.js';

const adminRouter = express.Router()


// Route to check admin authentication
adminRouter.get('/admin/check-auth', authMiddleware, checkAdminAuth );

export default adminRouter