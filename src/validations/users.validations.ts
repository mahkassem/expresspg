import {
    Request,
    Response,
    NextFunction
} from "express"
import { getUserByEmail } from "../entities/users/users.repo";
import { isEmail } from "./common.validators";

const createUserValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { name, color, email, password } = req.body
    const errorBag = [];

    if (!name || name == "") errorBag.push({ 'name': 'Name is required' })
    if (!color || color == "") errorBag.push({ 'color': 'Color is required' })
    if(!email || email == "") errorBag.push({ 'email': 'Email is required' })
    if(!password || password == "") errorBag.push({ 'password': 'Password is required' })
    // password must be at least 6 characters
    if (password.length < 6) errorBag.push({ 'password': 'Password must be at least 6 characters' })
    // email must be valid
    if(!isEmail(email)) errorBag.push({ 'email': 'Email is not valid' })
    // email must be unique
    const user = await getUserByEmail(email)
    if (user) errorBag.push({ 'email': 'Email is already in use' })

    if (errorBag.length) {
        res.status(422).send(errorBag)
        return
    }
    next()
}

export { createUserValidation }