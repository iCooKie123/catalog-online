import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginInfoValidationSchema } from "./validation-schema";

export const useLoginPage = () => {
	const methods = useForm({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(loginInfoValidationSchema),
		mode: "onBlur",
	});
	return {
		...methods,
	};
};
