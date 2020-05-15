import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import MuiSwitch from "@material-ui/core/Switch/Switch";
import {Field} from "formik";
import React from "react";

const SwitchBridge = ({field, form, ...rest}) => {
    return <FormControlLabel
        control={<MuiSwitch {...field}/>}
        {...rest}
    />
};

export const Switch = (props) => <Field {...props} type="checkbox" component={SwitchBridge}/>;
