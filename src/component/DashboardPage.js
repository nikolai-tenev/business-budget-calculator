import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import AppLayout from "./shared/AppLayout";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {COST_CREATE_PAGE_URL, INCOME_CREATE_PAGE_URL} from "../configuration/application-urls";

class DashboardPage extends Component {
    render() {
        return <AppLayout title="Dashboard">
            <Grid container spacing={3}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add/>}
                        component={Link}
                        to={COST_CREATE_PAGE_URL}
                    >
                        Add a Cost
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add/>}
                        component={Link}
                        to={INCOME_CREATE_PAGE_URL}
                    >
                        Add an Income
                    </Button>
                </Grid>
            </Grid>
        </AppLayout>;
    }
}

export default DashboardPage;
