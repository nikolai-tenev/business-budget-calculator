import React, {Component} from 'react';
import {applicationContext} from "../../service/ApplicationContext";
import {INCOME_CREATE_PAGE_URL, INCOME_PAGE_URL} from "../../configuration/application-urls";
import CashFlowEditPage from "../shared/crud/CashFlowEditPage";
import {INCOME} from "../../configuration/validation-schemas";

const service = applicationContext.incomeService;

class IncomeEditPage extends Component {
    render() {
        return <CashFlowEditPage service={service} titlePrefix="Income" validationSchema={INCOME} listUrl={INCOME_PAGE_URL} createUrl={INCOME_CREATE_PAGE_URL}/>;
    }
}

export default IncomeEditPage;
