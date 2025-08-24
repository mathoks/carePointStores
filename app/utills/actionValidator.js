import joi from "joi";
import { createArray} from "./generateLink";

const FormSchema = joi.object({
  storename: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9\s]+$")).min(6).max(20)
    .required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).allow(null),
  location: joi.string().required(),
  address: joi.string().pattern(new RegExp("[a-zA-Z0-9s\u00A0.,-]+$")).min(6).max(50).required(),
});

const FormSchema1 = joi.object({
name: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9s]+$"))
    .min(4)
    .max(20)
    .required(),
  description: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
    .min(6)
    .max(100)
    .required(),
  categoryId: joi.number().required(),
  link: joi.string().allow(null),
  price: joi.number().required(),
  negotiable: joi.string().required(),
  availability: joi.string().required(),
})

const FormSchema3 = joi.object({
  name: joi
      .string().trim()
      .pattern(new RegExp("[a-zA-Z0-9s]+$"))
      .min(4)
      .max(20)
      .allow(''),
    description: joi
      .string().trim()
      .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
      .min(6)
      .max(200)
      .allow(''),
    category: joi.string().trim().allow(null),
    link: joi.string().trim().allow(null),
    price: joi.number().allow(''),
    negotiable: joi.string().trim().allow(null),
    availability: joi.string().trim().allow(null),
  })

  const FormSchema4 = joi.object({
    brand: joi
        .string().trim()
        .pattern(new RegExp("[a-zA-Z0-9s]+$"))
        .min(3)
        .max(20)
        .allow(''),
      size: joi
        .string().trim()
        .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
        .min(1)
        .max(20)
        .allow(''),
        color: joi
        .string().trim()
        .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
        .min(1)
        .max(20)
        .allow(''),
      status: joi.string().trim().allow(null).pattern(new RegExp("[a-zA-Z0-9s]+$")),
      material: joi.string().trim().allow('').pattern(new RegExp("[a-zA-Z0-9s]+$")).max(50),
      weight: joi.number().allow(''),
      warranty: joi.string().trim().allow('').pattern(new RegExp("[a-zA-Z0-9s]+$")).max(50),
    })
  
    const FormSchema5 = joi.object({
      text: joi
        .string()
        .trim()
        .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
        .min(10)
        .max(400),
      category: joi
        .array()
        .items(
          joi
            .number()
        ),
      productId: joi
        .array()
        .items(
          joi
            .string()
            .trim()
            .min(3)
            .max(30)
            .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
        ),
    });

    const FormSchema6= joi.object({
      text: joi
        .string()
        .trim()
        .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
        .min(4)
        .max(400).allow(''),
      value: joi.number().required()})
    
export const validateProduct = async (formData) => {

  let validatedFields = {};
  try {
    validatedFields = await FormSchema1.validateAsync({
      name: formData.get("name"),
      description: formData.get("description"),
      negotiable: formData.get("negotiable"),
      categoryId: formData.get("category"),
      availability: formData.get("availability"),
      link: formData.get("link"),
      price: formData.get("price"),
    },{
      convert: true
    }
  );

    
    return  validatedFields;
  } catch (error) {
  
    throw error;
  }
};

export const validateProdEdit = async (formData) => {

  let validatedFields = {};
  try {
    validatedFields = await FormSchema3.validateAsync({
      name: formData.get("name"),
      description: formData.get("description"),
      negotiable: formData.get("negotiable"),
      category: formData.get("category"),
      availability: formData.get("availability"),
      link: formData.get("link"),
      price: formData.get("price"),
    }, {
      convert: true
    });

    
    return  validatedFields;
  } catch (error) {
  console.log(error)
    throw error;
  }
};

export const validateProdAttri = async (formData) => {

  let validatedFields = {};
  try {
    validatedFields = await FormSchema4.validateAsync({
      brand: formData.get("brand"),
      status: formData.get("status"),
      color: formData.get("color"),
      weight: formData.get("weight"),
      warranty: formData.get("warranty"),
      size: formData.get("size"),
      material: formData.get('material')
    });

    
    return  validatedFields;
  } catch (error) {
    throw error;
  }
};


export const validateBranch = async (formData) => {

    let validatedFields = {};
    try {
      
        validatedFields = await FormSchema.validateAsync({
            storename: formData.get("storename"),
            address: formData.get("address"),
            location: formData.get('location')
          });

      return validatedFields;
    } catch (error) {
        validatedFields= {};
      throw error;
    }
  };

  export const validatePost = async (formData) => {
   
    let validatedFields = {};
    try {
      
        validatedFields = await FormSchema5.validateAsync({
            text: formData.get("text"),
            category: createArray(formData, 'category'),
            productId: createArray(formData, 'productId')
          });

      return validatedFields;
    } catch (error) {
      console.log(error)
        validatedFields= {};
      throw error;
    }
  };

  export const validateReview = async (formData) => {
   
    let validatedFields = {};
    try {
      
        validatedFields = await FormSchema6.validateAsync({
            text: formData.get("review"),
            value: formData.get("rating")
          });

      return validatedFields;
    } catch (error) {
      console.log(error)
        validatedFields= {};
      throw error;
    }
  };
