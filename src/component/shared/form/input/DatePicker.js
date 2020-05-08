import React, {Component} from "react";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Field} from "formik";

class DatePickerBridge extends Component {
    render() {
        const {field, form, ...rest} = this.props;

        return <KeyboardDatePicker
            format="DD.MM.YYYY"
            {...rest}
            {...field}
            onChange={this.onChange}
        />;
    }

    onChange = (value) => {
        this.props.form.setFieldValue(this.props.field.name, value);
    }
}

export const DatePicker = (props) => <Field {...props} component={DatePickerBridge}/>;
