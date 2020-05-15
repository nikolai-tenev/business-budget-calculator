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
import {applicationContext} from "../service/ApplicationContext";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment";
import {MAX_DASHBOARD_SHOWN_FUTURE_YEARS} from "../configuration/ui";
import {observer} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import {isNil} from "lodash/lang";
import {currencyFormat} from "../utility/formatting";

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

const incomeService = applicationContext.incomeService;
const costService = applicationContext.costService;

const getUnitOfTime = (type) => {
    switch (type) {
        case "DAILY":
            return "d";
        case "WEEKLY":
            return "w";
        case "MONTHLY":
            return "M";
        case "YEARLY":
            return "y";
        case "ONE_TIME":
        default:
            return null;
    }
};

const getSingleFinancialValueForYear = (row, y) => {
    let value;

    let currentYearStart = moment({y});
    let currentYearEnd = currentYearStart.clone().endOf("y");

    let currentRowStart = moment(row.from);
    let currentRowEnd = moment(row.to);

    let now = moment();

    if (!isNil(row.from) && !isNil(row.to) && (currentYearStart.isAfter(currentRowEnd) || currentYearEnd.isBefore(currentRowStart))) {
        value = 0;
    } else {
        let start;
        let end;
        let unitOfTime;
        let valMultiplier;

        unitOfTime = getUnitOfTime(row.type);

        if (unitOfTime === null) {
            valMultiplier = 1;
        } else {
            if (row.ongoing) {
                start = now.isAfter(currentYearStart) ? now : currentYearStart;
                end = currentYearEnd;
            } else {
                if (currentRowStart.isBefore(currentYearStart)) {
                    start = currentYearStart;
                } else {
                    start = currentRowStart;
                }

                if (currentRowEnd.isAfter(currentYearEnd)) {
                    end = currentYearEnd;
                } else {
                    end = currentRowEnd;
                }
            }

            valMultiplier = Math.abs(start.startOf("day").diff(end.endOf("day"), unitOfTime, true));
        }

        value = row.value * valMultiplier;
    }

    return value;
};

@withStyles(css)
@observer
class DashboardPage extends Component {
    componentDidMount() {
        incomeService.loadAll();
        costService.loadAll();
    }

    render() {
        const {classes} = this.props;
        const futureYearsToDisplay = [];
        const yearlyTotals = {};

        const costs = costService.all;
        const incomes = incomeService.all;

        for (let i = 0; i < MAX_DASHBOARD_SHOWN_FUTURE_YEARS; i++) {
            const year = moment().add(i, "y").get("y");
            futureYearsToDisplay.push(year);
            yearlyTotals[year] = 0;
        }

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
                <Grid item xs={12}>
                    <TableContainer>
                        <Table className={classes.table} aria-label="Financial Projections">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6">Financial Projections</Typography>
                                    </TableCell>
                                    {futureYearsToDisplay.map(y => <TableCell key={y} align="right">{y}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" colSpan={MAX_DASHBOARD_SHOWN_FUTURE_YEARS + 1}>
                                        <Typography variant="h6">Income</Typography>
                                    </TableCell>
                                </TableRow>
                                {!!incomes && incomes.map((row) => (
                                    <TableRow key={`i-${row.id}`}>
                                        <TableCell component="th" scope="row">
                                            <Typography>{row.name}</Typography>
                                        </TableCell>
                                        {futureYearsToDisplay.map(y => {
                                            const currentIncome = getSingleFinancialValueForYear(row, y);

                                            yearlyTotals[y] = yearlyTotals[y] + currentIncome;

                                            return <TableCell key={y} align="right">
                                                <Typography>{currencyFormat(currentIncome)}</Typography>
                                            </TableCell>;
                                        })}
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell component="th" scope="row" colSpan={MAX_DASHBOARD_SHOWN_FUTURE_YEARS + 1}>
                                        <Typography variant="h6">Costs</Typography>
                                    </TableCell>
                                </TableRow>
                                {!!costs && costs.map((row) => (
                                    <TableRow key={`c-${row.id}`}>
                                        <TableCell component="th" scope="row">
                                            <Typography>{row.name}</Typography>
                                        </TableCell>
                                        {futureYearsToDisplay.map(y => {
                                            const currentCost = getSingleFinancialValueForYear(row, y);

                                            yearlyTotals[y] = yearlyTotals[y] - currentCost;

                                            return <TableCell key={y} align="right">
                                                <Typography>{currencyFormat(currentCost)}</Typography>
                                            </TableCell>;
                                        })}
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="h6">Net Profit</Typography>
                                    </TableCell>
                                    {futureYearsToDisplay.map(y => {
                                        const yearTotal = yearlyTotals[y];

                                        return <TableCell key={y} align="right">
                                            <Typography color={yearTotal < 0 ? "secondary" : "textPrimary"}>{currencyFormat(yearTotal)}</Typography>
                                        </TableCell>
                                    })}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </AppLayout>;
    }
}

export default DashboardPage;
