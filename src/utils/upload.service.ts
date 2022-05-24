import { UploadedFile } from 'express-fileupload'
import config from '../config'

export const uploadFileAsync = async (file: UploadedFile, path: string): Promise<string> => {
    try {
        const timestamp = Date.now()
        const fileName = `${path}/${timestamp}-${file.name}`
        const filePath = `${config.app.storageDir}/${fileName}`
        await file.mv(filePath)
        return fileName
    } catch (err) {
        throw err
    }
}