import {
    Request,
    Response,
    NextFunction
} from "express"
import { strLength } from "./common.validators";

const createValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { name, color } = req.body
    const errorBag = [];

    if (name.strLength(10, 50)) errorBag.push({ 'name': `Must be between 10 and 50 characters` })
    if (!color || color == "") errorBag.push({ 'color': 'Color is required' })

    if (errorBag.length) {
        res.status(422).send(errorBag)
        return
    }
    next()
}

export { createValidation }