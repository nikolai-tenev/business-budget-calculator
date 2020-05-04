import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {green} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core";

const css = () => ({
    submitButton: {
        color: "#fff",
        backgroundColor: green[600],
        '&:hover': {
            backgroundColor: green[900],
        },
    }
});

@withStyles(css)
class SubmitButton extends Component {
    static propTypes = {
        disabled: PropTypes.bool
    };

    render() {
        const {disabled, classes} = this.props;

        return <Button
            className={classes.submitButton}
            type="submit"
            color="primary"
            variant="contained"
            disabled={disabled}
        >
            Save
        </Button>;
    }
}

export default SubmitButton;
