import { FormControl, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TextFieldProps {
	name: string;
	defaultValue?: string;
	label: string;
	id: string;
}

export const Textfield = ({
	name,
	defaultValue,
	label,
	id,
}: TextFieldProps) => {
	const {
		watch,
		trigger,
		control,
		formState: { errors },
	} = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ?? ""}
			render={({ field }) => (
				<FormControl
					sx={{ width: "100%" }}
					variant="standard"
					error={!!errors[name]}>
					<TextField
						id={id}
						value={watch(name)}
						defaultValue={defaultValue}
						label={label}
						onChange={field.onChange}
						onBlur={() => {
							trigger(name);
							console.log(errors[name]);
						}}
						error={!!errors[name]}
						helperText={errors[name]?.message?.toString()}
						variant="filled"></TextField>
				</FormControl>
			)}></Controller>
	);
};
