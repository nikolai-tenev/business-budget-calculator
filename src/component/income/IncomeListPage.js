import React from 'react';
import {INCOME_CREATE_PAGE_URL, INCOME_EDIT_PAGE_URL} from "../../configuration/application-urls";
import {applicationContext} from "../../service/ApplicationContext";
import CashFlowListPage from "../shared/crud/CashFlowListPage";

const service = applicationContext.incomeService;

const IncomeListPage = () => {
    return <CashFlowListPage service={service} title="All income sources" createPageUrl={INCOME_CREATE_PAGE_URL} editPageUrl={INCOME_EDIT_PAGE_URL}/>;
};

export default IncomeListPage;
