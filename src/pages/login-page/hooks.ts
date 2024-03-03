import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginInfoValidationSchema } from "./validation-schema";
import { LoginInfo } from "../../models";

export const useLoginPage = () => {
	const methods = useForm<LoginInfo>({
		defaultValues: { username: "", password: "" },
		resolver: yupResolver(loginInfoValidationSchema),
		mode: "onBlur",
	});
	return {
		...methods,
	};
};
