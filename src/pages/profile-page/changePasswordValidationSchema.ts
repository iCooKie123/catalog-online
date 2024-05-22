import * as yup from "yup";
const validationSchema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup
        .string()
        .required()
        .test("passwords-match", "passwords must match", function (value) {
            return this.parent.newPassword === value;
        }),
});

export { validationSchema };
