import { FormControl, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TextFieldProps {
	name: string;
	defaultValue?: string;
	label: string;
	id: string;
	dataTestId: string;
	disabled?: boolean;
}

export const Textfield = ({
	name,
	defaultValue,
	label,
	id,
	dataTestId,
	disabled = false,
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
						}}
						error={!!errors[name]}
						helperText={errors[name]?.message?.toString()}
						variant="filled"
						disabled={disabled}
						data-testid={dataTestId}></TextField>
				</FormControl>
			)}></Controller>
	);
};
