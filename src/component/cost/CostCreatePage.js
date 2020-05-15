import React, {Component} from 'react';
import {applicationContext} from "../../service/ApplicationContext";
import {withRouter} from "react-router-dom";
import CashFlowCreatePage from "../shared/crud/CashFlowCreatePage";
import {COST} from "../../configuration/validation-schemas";
import {COST_EDIT_PAGE_URL, COST_PAGE_URL} from "../../configuration/application-urls";

const service = applicationContext.costService;

@withRouter
class CostCreatePage extends Component {
    render() {
        return <CashFlowCreatePage title="Add a cost" service={service} validationSchema={COST} listUrl={COST_PAGE_URL} editUrl={COST_EDIT_PAGE_URL}/>
    }
}

export default CostCreatePage;
