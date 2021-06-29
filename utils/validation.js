import Joi from 'joi'
const phoneExp = /^[789]\d{9}$/
const formValidation = (data) => {
    const formSchema = Joi.object({
        name: Joi.string().min(3).max(100).label('Name').required(),
        mobile: Joi.string()
            .min(10)
            .label('Mobile Number')
            .required()
            .pattern(phoneExp),
        address: Joi.string().min(3).max(250).label('Address').required(),
        lat: Joi.number().label('Marker').required().error(new Error('Please select marker first'))
    }).required()

    return formSchema.validate(data)
}

export { formValidation }