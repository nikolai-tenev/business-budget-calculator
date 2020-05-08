import React, {Component} from "react";
import {Field} from "formik";
import NumberFormat from 'react-number-format';
import TextField from "@material-ui/core/TextField";

class NumberFormatBridge extends Component {
    render() {
        const {field, form, inputRef, ...rest} = this.props;

        return (
            <NumberFormat
                prefix="$"
                thousandSeparator=" "
                decimalSeparator="."
                {...rest}
                getInputRef={inputRef}
                onValueChange={this.onChange}
                isNumericString
            />
        );
    }

    onChange = (values) => {
        this.props.form.setFieldValue(this.props.field.name, values.value);
    }
}

const MoneyFieldBridge = ({field, form, ...rest}) => {
    const error = form.errors[field.name];

    return <TextField
        {...rest}
        {...field}
        InputProps={{
            inputComponent: NumberFormatBridge
        }}
        inputProps={{
            field,
            form,
            ...rest
        }}
        error={!!error}
        helperText={!!error ? error : undefined}
    />;
};

export const MoneyField = (props) => <Field {...props} component={MoneyFieldBridge}/>;


