import axios from "@/axios";
import { PasswordField } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export const ChangePassword = () => {
	interface ChangePasswordProps {
		oldPass: string;
		newPass: string;
		confirmPass: string;
	}
	const validationSchema = yup.object().shape({
		oldPass: yup.string().required(),
		newPass: yup.string().required(),
		confirmPass: yup
			.string()
			.required()
			.oneOf([yup.ref("newPass")], "Passwords do not match"),
	});

	const methods = useForm<ChangePasswordProps>({
		defaultValues: {
			oldPass: "",
			newPass: "",
			confirmPass: "",
		},
		resolver: yupResolver(validationSchema),
		mode: "onBlur",
	});

	const changePassword = () => {
		const form = methods.getValues();

		axios
			.patch("/users/change-password", form)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<FormProvider {...methods}>
				<PasswordField
					name={"oldPass"}
					id={"oldPass"}
					label="Parolă veche"
					dataTestId={"oldPass"}></PasswordField>
				<PasswordField
					name={"newPass"}
					id={"newPass"}
					label="Parolă nouă"
					dataTestId={"newPass"}></PasswordField>
				<PasswordField
					name={"confirmPass"}
					id={"confirmPass"}
					label="Confirmare parolă nouă"
					dataTestId={"confirmPass"}></PasswordField>
				<Button onClick={methods.handleSubmit(changePassword)}>
					Button
				</Button>
			</FormProvider>
		</>
	);
};
