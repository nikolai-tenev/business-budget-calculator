import React, {Component} from 'react';
import {observer} from "mobx-react";
import AppLayout from "../../shared/AppLayout";
import {applicationContext} from "../../../service/ApplicationContext";
import {withRouter} from "react-router-dom";
import Loading from "../../shared/Loading";
import CashFlowForm from "../../shared/crud/CashFlowForm";
import {PropTypes} from "prop-types";

const uiService = applicationContext.uiService;

@withRouter
@observer
class CashFlowEditPage extends Component {
    static propTypes = {
        titlePrefix: PropTypes.string.isRequired,
        service: PropTypes.object.isRequired,
        validationSchema: PropTypes.object.isRequired,
        listUrl: PropTypes.string.isRequired,
        createUrl: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const {service, match, history, listUrl} = this.props;

        if (match && match.params && match.params.id) {
            const id = match.params.id;
            service.loadSingle(id);
        } else {
            history.push(listUrl);
        }
    }

    render() {
        const {service, validationSchema, listUrl, createUrl, titlePrefix} = this.props;

        if (service.loading) {
            return <Loading/>;
        }

        return <AppLayout title={`${titlePrefix} "${service.single.name}"`}>
            <CashFlowForm
                listUrl={listUrl}
                createUrl={createUrl}
                validationSchema={validationSchema}
                values={service.single}
                handleSubmit={this.handleSubmit}
            />
        </AppLayout>;
    }

    handleSubmit = async (values, {setSubmitting}) => {
        const {service} = this.props;

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

export default CashFlowEditPage;
