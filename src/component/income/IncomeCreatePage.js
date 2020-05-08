import React, {Component} from 'react';
import AppLayout from "../shared/AppLayout";
import IncomeForm from "./IncomeForm";
import {applicationContext} from "../../service/ApplicationContext";
import {INCOME_EDIT_PAGE_URL} from "../../configuration/application-urls";
import {withRouter} from "react-router-dom";

const service = applicationContext.incomeService;
const uiService = applicationContext.uiService;

@withRouter
class IncomeCreatePage extends Component {
    render() {
        return <AppLayout title="Add an income">
            <IncomeForm
                handleSubmit={this.handleSubmit}
            />
        </AppLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        try {
            const result = await service.save(values);

            uiService.showSuccessSnackbar({message: "Record successfully created!"});
            this.props.history.push(INCOME_EDIT_PAGE_URL.replace(":id", result.id));
        } catch (e) {
            setSubmitting(false);
            uiService.showErrorSnackbar({message: "There was a problem while trying to create record!"});
            console.error(e);
        }
    };
}

export default IncomeCreatePage;
