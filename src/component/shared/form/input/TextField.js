import MuiTextField from "@material-ui/core/TextField/TextField";
import {Field} from "formik";
import React from "react";

const TextFieldBridge = ({field, form, ...rest}) => {
    const error = form.errors[field.name];

    return <MuiTextField
        {...rest}
        {...field}
        error={!!error}
        helperText={!!error ? error : undefined}
    />
};

export const TextField = (props) => <Field {...props} component={TextFieldBridge}/>;
