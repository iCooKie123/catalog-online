import axios from "@/axios";
import { PasswordField } from "@/components";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

export const ChangePassword = () => {
	interface ChangePasswordProps {
		oldPassword: string;
		newPassword: string;
		confirmPassword: string;
	}
	const validationSchema = yup.object().shape({
		oldPassword: yup.string().required(),
		newPassword: yup.string().required(),
		confirmPassword: yup
			.string()
			.required()
			.oneOf([yup.ref("newPass")], "Passwords do not match"),
	});

	const methods = useForm<ChangePasswordProps>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		resolver: yupResolver(validationSchema),
		mode: "onBlur",
	});

	const { showSnackBar } = useSnackBar();
//TODO: implement something after the change.
	const changePassword = () => {
		const form = methods.getValues();
		console.log(form);
		axios
			.patch("/users/change-password", form)
			.then((res) => showSnackBar("Password changed successfully"))
			.catch((err) =>showSnackBar("Password change failed"));
	};

	return (
		<>
			<FormProvider {...methods}>
				<PasswordField
					name={"oldPassword"}
					id={"oldPassword"}
					label="Parolă veche"
					dataTestId={"oldPass"}></PasswordField>
				<PasswordField
					name={"newPassword"}
					id={"newPassword"}
					label="Parolă nouă"
					dataTestId={"newPass"}></PasswordField>
				<PasswordField
					name={"confirmPassword"}
					id={"confirmPassword"}
					label="Confirmare parolă nouă"
					dataTestId={"confirmPass"}></PasswordField>
				<Button onClick={changePassword}>Button</Button>
			</FormProvider>
		</>
	);
};
