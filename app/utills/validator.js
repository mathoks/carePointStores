import { nanoid } from "@reduxjs/toolkit";
import joi from "joi";

const Fields = {
  storename: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9s]+$")).min(6).max(20).required(),
  username: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,10}$")).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,10}$")).required(),
  location: joi.string().required(),
  description: joi
    .string()
    .pattern(new RegExp("[a-zA-Z0-9s\u00A0.,:?]+$"))
    .min(6)
    .max(200)
    .required(),
  address: joi.string().pattern(new RegExp("[a-zA-Z0-9s\u00A0.,-]+$")).min(6).max(50).required(),
  name: joi
  .string()
  .pattern(new RegExp("[a-zA-Z0-9s]+$"))
  .min(4)
  .max(20)
  .required(),
  category: joi.number().required(),
  price: joi.number().required(),
  negotiable: joi.string().required(),
  availability: joi.string().required(),
};

export const validate = (_, e) => {
  const id = nanoid(4)
  const { value, name } = e?.target;
  const FormSchema = joi.object({ [name]: Fields[name] });
  const valid = FormSchema.validate({
    [name]: value,
  });
  const { error, warning, value: val } = valid;
  if (error !== undefined) {
    console.log(error);
    return {
      errors: {
        error: error?.toString().split(":", 2)[1],
        // .toString().split(":", 3)[1],
        name: name,
      },
      message: null,
      id:id
    };
  }
  return {
    errors: {},
    message: null,
  };
};
