import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import {Field} from "formik";
import {Switch} from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import React from "react";

const SwitchWithLabel = (props) => {
    const {onChange, ...rest} = props;

    return  <FormControlLabel control={<Field component={Switch}
                                              id="ongoing"
                                              label="Ongoing"
                                              name="ongoing"
                                              type="checkbox"
    />} label="Ongoing" />;
}
