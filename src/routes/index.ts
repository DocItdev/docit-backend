import { Router } from 'express';
import healthCheck from 'src/controllers/healthCheck';


// Export the base-router
const baseRouter = Router();
baseRouter.use('/healthCheck', healthCheck);
export default baseRouter;
