import {
    Request,
    Response,
    NextFunction
} from "express"

const createValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { name, color } = req.body
    const errorBag = [];

    if (!name || name == "") errorBag.push({ 'name': 'Name is required' })
    if (!color || color == "") errorBag.push({ 'color': 'Color is required' })

    if (errorBag.length) {
        res.status(422).send(errorBag)
        return
    }
    next()
}

export { createValidation }