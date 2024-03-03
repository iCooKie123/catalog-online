import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	FilledInput,
	FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface PasswordFieldProps {
	name: string;
	defaultValue?: string;
	label?: string;
	id: string;
}

export const PasswordField = ({
	name,
	defaultValue,
	label,
	id,
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
	const {
		control,
		watch,
		trigger,
		formState: { errors },
	} = methods;
	return (
		<Controller
			name={name ?? ""}
			control={control}
			defaultValue={defaultValue ?? ""}
			render={({ field }) => (
				<FormControl
					sx={{ width: "100%" }}
					variant="filled"
					error={!!errors[name]}>
					<InputLabel htmlFor={id}>{label ?? "Password"}</InputLabel>
					<FilledInput
						id={id}
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
						value={watch(name)}
						onChange={field.onChange}
						onBlur={() => {
							trigger(name);
						}}
					/>
					<FormHelperText>
						{errors[name]?.message?.toString()}
					</FormHelperText>
				</FormControl>
			)}></Controller>
	);
};
