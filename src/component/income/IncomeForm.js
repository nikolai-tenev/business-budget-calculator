import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import {isEmpty} from "lodash";
import {INCOME_CREATE, INCOME_EDIT} from "../../configuration/validation-schemas";
import {INCOME_PAGE_URL} from "../../configuration/application-urls";
import FormButtons from "../shared/form/FormButtons";

@observer
class IncomeForm extends Component {
    static propTypes = {
        values: PropTypes.object,
        handleSubmit: PropTypes.func.isRequired,
    };

    render() {
        const {values} = this.props;

        let initialValues = {name: ""};

        if (!isEmpty(values)) {
            initialValues = values;
        }

        return <Formik
            initialValues={initialValues}
            validationSchema={isEmpty(values) ? INCOME_CREATE : INCOME_EDIT}
            onSubmit={this.props.handleSubmit}
            enableReinitialize={true}
            validateOnBlur={false}
        >
            {({isSubmitting}) => (
                <Form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Field component={TextField}
                                   id="name"
                                   label="Name"
                                   name="name"
                                   autoFocus
                            />
                        </Grid>
                    </Grid>
                    <FormButtons isSubmitting={isSubmitting} listUrl={INCOME_PAGE_URL}/>
                </Form>
            )}
        </Formik>;
    }
}

export default IncomeForm;
