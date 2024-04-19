import axios from "@/axios";
import { User } from "@/models";

const decodeToken = (token: string) => {
	const base64Payload = token.split(".")[1];
	const payload = decodeURIComponent(
		atob(base64Payload)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
	return JSON.parse(payload);
};

const getUserFromToken = (token: string): User => {
	const decoded = decodeToken(token);
	const user = JSON.parse(decoded.User) as User;
	return user;
};

const isTokenValid = (token: string): boolean => {
	const decoded = decodeToken(token);
	const currentTime = Math.floor(Date.now() / 1000);

	return decoded.exp > currentTime;
};

const validateTokenAtStartup = async (): Promise<boolean> => {
	const token = localStorage.getItem("token");
	if (!token) return false;

	if (!isTokenValid(token)) {
		localStorage.removeItem("token");
		return false;
	}

	axios
		.get("users/validate-token")
		.then(() => {
			return true;
		})
		.catch(() => {
			localStorage.removeItem("token");
			return false;
		});

	return true;
};

export { getUserFromToken, validateTokenAtStartup };
