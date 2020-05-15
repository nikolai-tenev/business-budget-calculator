import React, {Component} from 'react';
import {applicationContext} from "../../service/ApplicationContext";
import {INCOME_EDIT_PAGE_URL, INCOME_PAGE_URL} from "../../configuration/application-urls";
import {withRouter} from "react-router-dom";
import CashFlowCreatePage from "../shared/crud/CashFlowCreatePage";
import {INCOME} from "../../configuration/validation-schemas";

const service = applicationContext.incomeService;

@withRouter
class IncomeCreatePage extends Component {
    render() {
        return <CashFlowCreatePage title="Add an income" service={service} validationSchema={INCOME} listUrl={INCOME_PAGE_URL} editUrl={INCOME_EDIT_PAGE_URL}/>
    }
}

export default IncomeCreatePage;
