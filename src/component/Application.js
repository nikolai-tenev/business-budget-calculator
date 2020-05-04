import React, {Component} from 'react';
import {createMuiTheme, CssBaseline, responsiveFontSizes} from "@material-ui/core";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {
    COST_CREATE_PAGE_URL,
    COST_EDIT_PAGE_URL,
    COST_PAGE_URL,
    DASHBOARD_PAGE_URL,
    DEFAULT_PAGE_URL,
    HOMEPAGE_URL,
    INCOME_CREATE_PAGE_URL,
    INCOME_EDIT_PAGE_URL,
    INCOME_PAGE_URL
} from "../configuration/application-urls";
import {observer} from "mobx-react";
import {ThemeProvider} from "@material-ui/styles";
import DashboardPage from "./DashboardPage";
import IncomeListPage from "./income/IncomeListPage";
import IncomeCreatePage from "./income/IncomeCreatePage";
import IncomeEditPage from "./income/IncomeEditPage";
import SnackbarsContainer from "./ui/SnackbarsContainer";
import ConfirmationDialogsContainer from "./ui/ConfirmationDialogsContainer";
import CostListPage from "./cost/CostListPage";
import CostCreatePage from "./cost/CostCreatePage";
import CostEditPage from "./cost/CostEditPage";

let theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root: {
                display: "flex"
            }
        }
    }
});
theme = responsiveFontSizes(theme);

@observer
class Application extends Component {
    render() {
        return <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    <Route exact path={HOMEPAGE_URL}>
                        <Redirect to={DEFAULT_PAGE_URL}/>
                    </Route>
                    <Route exact path={DASHBOARD_PAGE_URL} component={DashboardPage}/>

                    <Route exact path={INCOME_PAGE_URL} component={IncomeListPage}/>
                    <Route exact path={INCOME_CREATE_PAGE_URL} component={IncomeCreatePage}/>
                    <Route exact path={INCOME_EDIT_PAGE_URL} component={IncomeEditPage}/>

                    <Route exact path={COST_PAGE_URL} component={CostListPage}/>
                    <Route exact path={COST_CREATE_PAGE_URL} component={CostCreatePage}/>
                    <Route exact path={COST_EDIT_PAGE_URL} component={CostEditPage}/>
                </Switch>
            </BrowserRouter>
            <SnackbarsContainer/>
            <ConfirmationDialogsContainer/>
        </ThemeProvider>;
    }
}

export default Application;
