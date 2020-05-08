import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MuiRadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Field} from "formik";
import React from "react";

const RadioGroupBridge = ({field, form, ...rest}) => {
    const error = form.errors[field.name];

    return <FormControl component="fieldset" error={!!error}>
        <FormLabel component="legend">{rest.label}</FormLabel>
        <MuiRadioGroup aria-label={rest.label} {...rest} {...field} />
        {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
};

export const RadioGroup = (props) => <Field {...props} component={RadioGroupBridge}/>;
