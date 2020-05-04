import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {DASHBOARD_PAGE_URL} from "../../../configuration/application-urls";
import {withStyles} from "@material-ui/core";
import {deepOrange} from "@material-ui/core/colors";

const css = () => ({
    dashboardButton: {
        color: "#fff",
        backgroundColor: deepOrange[500],
        '&:hover': {
            backgroundColor: deepOrange[700],
        },
    }
});

@withStyles(css)
class GoToDashboardButton extends Component {
    static propTypes = {
        disabled: PropTypes.bool
    };

    render() {
        const {classes, disabled} = this.props;

        return <Button
            className={classes.dashboardButton}
            variant="contained"
            component={Link}
            to={DASHBOARD_PAGE_URL}
            disabled={disabled}
        >
            Go to the dashboard
        </Button>;
    }
}


export default GoToDashboardButton;
