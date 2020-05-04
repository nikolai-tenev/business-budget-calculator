import React, {Component} from 'react';
import {observer} from "mobx-react";
import AppLayout from "../shared/AppLayout";
import CostForm from "./CostForm";
import {applicationContext} from "../../service/ApplicationContext";
import {withRouter} from "react-router-dom";
import {COST_PAGE_URL} from "../../configuration/application-urls";

const service = applicationContext.costService;
const uiService = applicationContext.uiService;

@withRouter
@observer
class CostEditPage extends Component {
    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            service.loadSingle(id);
        } else {
            this.props.history.push(COST_PAGE_URL);
        }
    }

    render() {
        return <AppLayout title={`Cost "${service.single.name}"`}>
            <CostForm
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

export default CostEditPage;
