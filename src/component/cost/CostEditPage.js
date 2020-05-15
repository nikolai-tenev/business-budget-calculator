import React, {Component} from 'react';
import {applicationContext} from "../../service/ApplicationContext";
import CashFlowEditPage from "../shared/crud/CashFlowEditPage";
import {COST} from "../../configuration/validation-schemas";
import {COST_CREATE_PAGE_URL, COST_PAGE_URL} from "../../configuration/application-urls";

const service = applicationContext.costService;

class CostEditPage extends Component {
    render() {
        return <CashFlowEditPage service={service} titlePrefix="Cost" validationSchema={COST} listUrl={COST_PAGE_URL} createUrl={COST_CREATE_PAGE_URL}/>;
    }
}

export default CostEditPage;
