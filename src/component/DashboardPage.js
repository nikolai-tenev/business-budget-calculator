import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import AppLayout from "./shared/AppLayout";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {COST_CREATE_PAGE_URL, INCOME_CREATE_PAGE_URL} from "../configuration/application-urls";
import {withStyles} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import deepOrange from "@material-ui/core/colors/deepOrange";

const css = (theme) => ({
    costButton: {
        color: "#fff",
        backgroundColor: deepOrange[500],
        '&:hover': {
            backgroundColor: deepOrange[700],
        }
    },
    incomeButton: {
        color: "#fff",
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        }
    },
});

@withStyles(css)
class DashboardPage extends Component {
    render() {
        const {classes} = this.props;

        return <AppLayout title="Dashboard">
            <Grid container spacing={3}>
                <Grid item>
                    <Button
                        variant="contained"
                        className={classes.costButton}
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
                        className={classes.incomeButton}
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
