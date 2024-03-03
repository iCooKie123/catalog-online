import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface PasswordFieldProps {
	name: string;
	defaultValue?: string;
	label?: string;
}

export const PasswordField = ({
	name,
	defaultValue,
	label,
}: PasswordFieldProps) => {
	const methods = useFormContext();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	const { control } = methods;
	return (
		<Controller
			name={name ?? ""}
			control={control}
			defaultValue={defaultValue ?? ""}
			render={({ field }) => (
				<FormControl
					sx={{ m: 1, width: "25ch" }}
					variant="outlined">
					<InputLabel htmlFor="outlined-adornment-password">
						Password
					</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end">
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
						value={field}
						label={label ?? "Parola"}
					/>
				</FormControl>
			)}></Controller>
	);
};
