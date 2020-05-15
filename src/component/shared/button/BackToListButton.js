import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import PropTypes from "prop-types";

const BackToListButton = (props) => (
    <Button
        variant="contained"
        component={Link}
        to={props.url}
        disabled={props.disabled}
    >
        Cancel
    </Button>
);

BackToListButton.propTypes = {
    disabled: PropTypes.bool,
    url: PropTypes.string.isRequired
};

export default BackToListButton;
