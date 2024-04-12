import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginInfoValidationSchema } from "./validation-schema";
import { LoginInfo, User } from "@/models";
import axios from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts";

export const useLoginPage = () => {
	const { setCurrentUser } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const methods = useForm<LoginInfo>({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(loginInfoValidationSchema),
		mode: "onBlur",
	});

	const onLogin = async () => {
		const formValues = methods.getValues();
		setIsLoading(true);
		await axios
			.put("users/login", formValues)
			.then((response) => {
				const userResponse = response.data as User;
				setCurrentUser(userResponse);
			})
			.catch((error) => {
				setErrorMessage(error.response.data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return {
		methods,
		onLogin,
		isLoading,
		errorMessage,
	};
};
