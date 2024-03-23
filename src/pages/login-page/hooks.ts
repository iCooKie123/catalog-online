import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginInfoValidationSchema } from "./validation-schema";
import { LoginInfo, User } from "@/models";
import axios from "../../axios";
import { useContext } from "react";
import { AuthContext } from "@/contexts";

export const useLoginPage = () => {
	const { setCurrentUser } = useContext(AuthContext);
	const methods = useForm<LoginInfo>({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(loginInfoValidationSchema),
		mode: "onBlur",
	});

	const onLogin = async () => {
		const formValues = methods.getValues();

		await axios
			.post("user/login", formValues)
			.then((response) => {
				const userResponse = response.data as User;
				setCurrentUser(userResponse);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return {
		methods,
		onLogin,
	};
};
