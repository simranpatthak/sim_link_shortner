import vine from "@vinejs/vine";
import ErrorReporter from "./ErrorReporter";
vine.errorReporter = ()=> new ErrorReporter()
export const registerSchema = vine.object({
    name:vine.string().trim().minLength(2).maxLength(50),
    email:vine.string().email(),
    password:vine.string().minLength(6).maxLength(20).confirmed(),
}) 
export const loginSchema = vine.object({
    email:vine.string().email(),
    password:vine.string().minLength(6).maxLength(20),
}) 