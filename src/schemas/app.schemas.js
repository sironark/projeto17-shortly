import Joi from "joi";


export const SignupSchema = Joi.object({
        name: Joi.string().required().min(1),
        email: Joi.string().required().min(1).email(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password'))
});

export const SiginSchema = Joi.object({
        email: Joi.string().required().min(1).email(),
        password: Joi.string().required().min(1)        
});

export const urlSchema = Joi.object({
    url: Joi.string().uri().required()
});