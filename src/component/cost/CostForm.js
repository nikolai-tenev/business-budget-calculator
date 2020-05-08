import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {Form, Formik} from "formik";
import {COST_PAGE_URL} from "../../configuration/application-urls";
import Grid from "@material-ui/core/Grid";
import {isEmpty} from "lodash";
import {COST} from "../../configuration/validation-schemas";
import FormButtons from "../shared/form/FormButtons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {CostTypes} from "../../configuration/enums";
import moment from "moment";
import {TextField} from "../shared/form/input/TextField";
import {MoneyField} from "../shared/form/input/MoneyField";
import {RadioGroup} from "../shared/form/input/RadioGroup";
import {Switch} from "../shared/form/input/Switch";
import {DatePicker} from "../shared/form/input/DatePicker";
import {applicationContext} from "../../service/ApplicationContext";

const uiService = applicationContext.uiService;

class CostForm extends Component {
    static propTypes = {
        values: PropTypes.object,
        handleSubmit: PropTypes.func.isRequired,
    };

    render() {
        const {values} = this.props;

        let initialValues = {name: "", type: Object.keys(CostTypes)[0], ongoing: false, from: moment(), to: moment(), value: 0};

        if (!isEmpty(values)) {
            initialValues = values;
        }

        return <Formik
            initialValues={initialValues}
            validationSchema={COST}
            onSubmit={this.onSubmit}
            enableReinitialize={true}
            validateOnBlur={false}
        >
            {({isSubmitting, values}) => (
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
                                    Object.entries(CostTypes).map(([key, value]) => <FormControlLabel key={key} value={key} control={<Radio/>} label={value.label}/>)
                                }
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Switch
                                name="ongoing"
                                label="Ongoing"
                            />
                        </Grid>
                        {values && !values["ongoing"] &&
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
                    </Grid>
                    <FormButtons isSubmitting={isSubmitting} listUrl={COST_PAGE_URL}/>
                </Form>
            )}
        </Formik>;
    }

    onSubmit = (values, {setSubmitting}) => {

        const preparedValues = {
            ...values,
            from: !!values.from ? values.from.toISOString() : values.from,
            to: !!values.to ? values.to.toISOString() : values.to
        };

        this.props.handleSubmit(preparedValues, {setSubmitting});
    };
}

export default CostForm;
