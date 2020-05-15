import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {green} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core";

const css = () => ({
    addAnotherButton: {
        marginRight: "auto",
        color: "#fff",
        backgroundColor: green[600],
        '&:hover': {
            backgroundColor: green[700],
        },
    }
});

@withStyles(css)
class AddAnotherButton extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        url: PropTypes.string.isRequired
    };

    render() {
        const {url, disabled, classes} = this.props;

        return <Button
            className={classes.addAnotherButton}
            variant="contained"
            component={Link}
            to={url}
            disabled={disabled}
        >
            Add another
        </Button>;
    }
}

export default AddAnotherButton;
