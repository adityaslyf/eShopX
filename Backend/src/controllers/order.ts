
import { TryCatch } from "../middleware/error.js"


export const newOrder = TryCatch(async (req, res, next) => {
    try {
        
        const order = 
        res.status(200).json({
        success: true,
        order,
        });
    } catch (error) {
        next(error);
    }
    });