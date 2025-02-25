import vine from "@vinejs/vine";
import ErrorReporter from "./ErrorReporter";

vine.errorReporter = ()=> new ErrorReporter()

export const linkSchema = vine.object({
  userId: vine.string().trim().minLength(1),
  url: vine.string().url(),
});
