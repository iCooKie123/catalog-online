import { FormControl, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface TextFieldProps {
    name: string;
    defaultValue?: string;
    label: string;
    id: string;
    dataTestId: string;
    disabled?: boolean;
    type?: React.HTMLInputTypeAttribute;
}

export const Textfield = ({
    name,
    defaultValue,
    label,
    id,
    dataTestId,
    disabled = false,
    type = "text",
}: TextFieldProps) => {
    const {
        trigger,
        control,
        formState: { errors },
    } = useFormContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getError = (errors: any, name: string) => {
        return name.split(".").reduce((acc, part) => acc?.[part], errors);
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue ?? ""}
            render={({ field }) => (
                <FormControl
                    sx={{ width: "100%" }}
                    variant="standard"
                    error={!!getError(errors, name)}>
                    <TextField
                        {...field}
                        id={id}
                        label={label}
                        onChange={field.onChange}
                        onBlur={() => {
                            trigger(name);
                        }}
                        error={!!getError(errors, name)}
                        helperText={getError(errors, name)?.message?.toString()}
                        variant="filled"
                        disabled={disabled}
                        type={type}
                        data-testid={dataTestId}></TextField>
                </FormControl>
            )}
        />
    );
};
