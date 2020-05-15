import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {Form, Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import {isEmpty} from "lodash";
import FormButtons from "../form/FormButtons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {CashFlowTypes} from "../../../configuration/enums";
import moment from "moment";
import {TextField} from "../form/input/TextField";
import {MoneyField} from "../form/input/MoneyField";
import {RadioGroup} from "../form/input/RadioGroup";
import {Switch} from "../form/input/Switch";
import {DatePicker} from "../form/input/DatePicker";
import {observer} from "mobx-react";

@observer
class CashFlowForm extends Component {
    static propTypes = {
        values: PropTypes.object,
        validationSchema: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        listUrl: PropTypes.string.isRequired,
        createUrl: PropTypes.string,
    };

    render() {
        const {values, validationSchema, listUrl, createUrl} = this.props;

        let initialValues;

        if (!isEmpty(values)) {
            initialValues = {...values};

            initialValues.from = moment(initialValues.from);
            initialValues.to = moment(initialValues.to);
        } else {
            initialValues = {name: "", type: Object.keys(CashFlowTypes)[0], ongoing: false, from: moment(), to: moment(), value: 0};
        }

        return <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={this.onSubmit}
            enableReinitialize={true}
            validateOnBlur={false}
        >
            {({isSubmitting, values: formValues}) => (
                <Form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Name"
                                name="name"
                                autoFocus
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MoneyField
                                label="Value"
                                name="value"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                label="Type"
                                name="type"
                                required
                            >
                                {
                                    Object.entries(CashFlowTypes).map(([key, value]) => <FormControlLabel key={key} value={key} control={<Radio/>} label={value.label}/>)
                                }
                            </RadioGroup>
                        </Grid>
                        {formValues && formValues["type"] !== CashFlowTypes.ONE_TIME.id &&
                        <>
                            <Grid item xs={12} md={4}>
                                <Switch
                                    name="ongoing"
                                    label="Ongoing"
                                />
                            </Grid>
                            {formValues && !formValues["ongoing"] &&
                            <>
                                <Grid item xs={12} md={4}>
                                    <DatePicker
                                        label="From"
                                        name="from"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <DatePicker
                                        label="To"
                                        name="to"
                                    />
                                </Grid>
                            </>}
                        </>}
                    </Grid>
                    <FormButtons isSubmitting={isSubmitting} listUrl={listUrl} createUrl={createUrl}/>
                </Form>
            )}
        </Formik>;
    }

    onSubmit = (values, {setSubmitting}) => {

        const preparedValues = {...values,};

        if (preparedValues.type === CashFlowTypes.ONE_TIME.id) {
            preparedValues.ongoing = false;
            preparedValues.from = moment();
            preparedValues.to = moment();
        }

        if (!preparedValues.ongoing) {
            preparedValues.from = !!preparedValues.from ? preparedValues.from.toISOString() : preparedValues.from;
            preparedValues.to = !!preparedValues.to ? preparedValues.to.toISOString() : preparedValues.to;
        } else {
            delete preparedValues.from;
            delete preparedValues.to;
        }

        this.props.handleSubmit(preparedValues, {setSubmitting});
    };
}

export default CashFlowForm;
