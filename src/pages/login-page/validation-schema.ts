import * as yup from "yup";

export const loginInfoValidationSchema = yup.object().shape({
	username: yup.string().email().required().max(5),
	password: yup.string().required().max(5),
});
