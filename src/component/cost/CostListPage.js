import React from 'react';
import {COST_CREATE_PAGE_URL, COST_EDIT_PAGE_URL} from "../../configuration/application-urls";
import {applicationContext} from "../../service/ApplicationContext";
import CashFlowListPage from "../shared/crud/CashFlowListPage";

const service = applicationContext.costService;

const CostListPage = () => {
    return <CashFlowListPage service={service} title="All costs" createPageUrl={COST_CREATE_PAGE_URL} editPageUrl={COST_EDIT_PAGE_URL}/>;
};

export default CostListPage;
