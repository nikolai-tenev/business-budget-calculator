import React, {Component} from 'react';
import {observer} from "mobx-react";
import AppLayout from "../shared/AppLayout";
import IncomeForm from "./IncomeForm";
import {applicationContext} from "../../service/ApplicationContext";
import {withRouter} from "react-router-dom";
import {INCOME_PAGE_URL} from "../../configuration/application-urls";

const service = applicationContext.incomeService;
const uiService = applicationContext.uiService;

@withRouter
@observer
class IncomeEditPage extends Component {
    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            service.loadSingle(id);
        } else {
            this.props.history.push(INCOME_PAGE_URL);
        }
    }

    render() {
        return <AppLayout title={`Income "${service.single.name}"`}>
            <IncomeForm
                values={service.single}
                handleSubmit={this.handleSubmit}
            />
        </AppLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        try {
            await service.save({...values, id: this.props.match.params.id});
            uiService.showSuccessSnackbar({message: "Record successfully updated!"});
        } catch (e) {
            uiService.showErrorSnackbar({message: "There was a problem while trying to update record!"});
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };
}

export default IncomeEditPage;
