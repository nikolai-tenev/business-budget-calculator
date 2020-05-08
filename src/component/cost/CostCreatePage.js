import React, {Component} from 'react';
import AppLayout from "../shared/AppLayout";
import CostForm from "./CostForm";
import {applicationContext} from "../../service/ApplicationContext";
import {COST_EDIT_PAGE_URL} from "../../configuration/application-urls";
import {withRouter} from "react-router-dom";

const service = applicationContext.costService;
const uiService = applicationContext.uiService;

@withRouter
class CostCreatePage extends Component {
    render() {
        return <AppLayout title="Add a cost">
            <CostForm
                handleSubmit={this.handleSubmit}
            />
        </AppLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        try {
            const result = await service.save(values);

            uiService.showSuccessSnackbar({message: "Record successfully created!"});
            this.props.history.push(COST_EDIT_PAGE_URL.replace(":id", result.id));
        } catch (e) {
            setSubmitting(false);
            uiService.showErrorSnackbar({message: "There was a problem while trying to create record!"});
            console.error(e);
        }
    };
}

export default CostCreatePage;
