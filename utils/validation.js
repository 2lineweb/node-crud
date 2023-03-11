import joi from "joi";
import joiPasswordComplexity from "joi-password-complexity";

 const signUpValidation = (body)=>{
 const signUpSchema = joi.object({
    first_name:joi.string().required().label("First Name"),
    last_name:joi.string().required().label("Last Name"),
    email: joi.string().required().email().label("Email"),
    user_name:joi.string().required().label("User name"),
    password: joiPasswordComplexity().required().label("Pasword")
 });

 return signUpSchema.validate(body);
}
 const logInValidation = (body)=>{
    const logInSchema = joi.object({
        user_name:joi.string().required().label("User Name"),
        password:joi.string().required().label("password")
    });
    return logInSchema.validate(body);
}

const blogValidation = (body)=>{
const blogSchema = joi.object({
    title:joi.string().required().label("title"),
    blog:joi.string().required().label("blog")
})
return blogSchema.validate(body);
}

export {
    signUpValidation,
    logInValidation,
    blogValidation
}
