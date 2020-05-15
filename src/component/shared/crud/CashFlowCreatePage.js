import React, {Component} from 'react';
import AppLayout from "../../shared/AppLayout";
import {applicationContext} from "../../../service/ApplicationContext";
import {withRouter} from "react-router-dom";
import CashFlowForm from "./CashFlowForm";
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";

const uiService = applicationContext.uiService;

@withRouter
@observer
class CashFlowCreatePage extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        service: PropTypes.object.isRequired,
        validationSchema: PropTypes.object.isRequired,
        listUrl: PropTypes.string.isRequired,
        editUrl: PropTypes.string.isRequired,
    };

    render() {
        const {title, validationSchema, listUrl} = this.props;

        return <AppLayout title={title}>
            <CashFlowForm
                validationSchema={validationSchema}
                listUrl={listUrl}
                handleSubmit={this.handleSubmit}
            />
        </AppLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        const {service, history, editUrl} = this.props;

        try {
            const result = await service.save(values);

            uiService.showSuccessSnackbar({message: "Record successfully created!"});
            history.push(editUrl.replace(":id", result.id));
        } catch (e) {
            setSubmitting(false);
            uiService.showErrorSnackbar({message: "There was a problem while trying to create record!"});
            console.error(e);
        }
    };
}

export default CashFlowCreatePage;
