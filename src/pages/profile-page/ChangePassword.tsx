import axios from "@/axios";
import { PasswordField } from "@/components";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { validationSchema } from "./changePasswordValidationSchema.ts";

export const ChangePassword = () => {
	interface ChangePasswordProps {
		oldPassword: string;
		newPassword: string;
		confirmPassword: string;
	}

	const methods = useForm<ChangePasswordProps>({
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		resolver: yupResolver(validationSchema),
		mode: "onChange",
	});

	const { showSnackBar } = useSnackBar();

	const changePassword = () => {
		const form = methods.getValues();
		console.log(form);
		axios
			.patch("/users/change-password", form)
			.then(() => {
				methods.reset();
				showSnackBar("Password changed successfully");
			})
			.catch(() => showSnackBar("Password change failed"));
	};

	return (
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
			<Button onClick={methods.handleSubmit(changePassword)}>
				Button
			</Button>
		</FormProvider>
	);
};
