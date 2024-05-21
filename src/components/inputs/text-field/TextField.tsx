import { FormControl, TextField } from "@mui/material";
import { useEffect } from "react";
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
        watch,
        trigger,
        control,
        formState: { errors },
    } = useFormContext();

    useEffect(() => {
        console.log(errors);
    }, [errors]);
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
                        onChange={(e) => {
                            field.onChange(e);
                            console.log(watch(name));
                            trigger(name);
                        }}
                        onBlur={() => {
                            trigger(name);
                            console.log(watch(name));
                        }}
                        error={!!errors[name]}
                        helperText={errors[name]?.message?.toString()}
                        variant="filled"
                        disabled={disabled}
                        type={type}
                        data-testid={dataTestId}></TextField>
                </FormControl>
            )}></Controller>
    );
};
