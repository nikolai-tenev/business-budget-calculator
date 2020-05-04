import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";
import {Field, Form, Formik} from "formik";
import {CheckboxWithLabel, RadioGroup, Switch, TextField} from "formik-material-ui";
import {COST_PAGE_URL} from "../../configuration/application-urls";
import Grid from "@material-ui/core/Grid";
import {isEmpty} from "lodash";
import {COST_CREATE, COST_EDIT} from "../../configuration/validation-schemas";
import FormButtons from "../shared/form/FormButtons";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {CostTypes} from "../../configuration/enums";

@observer
class CostForm extends Component {
    static propTypes = {
        values: PropTypes.object,
        handleSubmit: PropTypes.func.isRequired,
    };

    render() {
        const {values} = this.props;

        let initialValues = {name: "", type: Object.keys(CostTypes)[0], ongoing: "", from: "", to: "", value: ""};

        if (!isEmpty(values)) {
            initialValues = values;
        }

        return <Formik
            initialValues={initialValues}
            validationSchema={isEmpty(values) ? COST_CREATE : COST_EDIT}
            onSubmit={this.props.handleSubmit}
            enableReinitialize={true}
            validateOnBlur={false}
        >
            {({isSubmitting}) => (
                <Form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Field component={TextField}
                                   id="name"
                                   label="Name"
                                   name="name"
                                   autoFocus
                                   required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormLabel component="legend">Type</FormLabel>
                            <Field component={RadioGroup}
                                   id="type"
                                   label="Type"
                                   name="type"
                                   required
                            >
                                {
                                    Object.entries(CostTypes).map(([key, value]) => <FormControlLabel key={key} value={key} control={<Radio/>} label={value.label}/>)
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControlLabel control={<Field component={Switch}
                                   id="ongoing"
                                   label="Ongoing"
                                   name="ongoing"
                                   type="checkbox"
                            />} label="Ongoing" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field component={TextField}
                                   id="from"
                                   label="From"
                                   name="from"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field component={TextField}
                                   id="to"
                                   label="To"
                                   name="to"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   id="value"
                                   label="Value"
                                   name="value"
                                   required
                            />
                        </Grid>
                    </Grid>
                    <FormButtons isSubmitting={isSubmitting} listUrl={COST_PAGE_URL}/>
                </Form>
            )}
        </Formik>;
    }
}

export default CostForm;
