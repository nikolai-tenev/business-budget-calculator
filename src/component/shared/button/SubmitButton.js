import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import PropTypes from "prop-types";

class SubmitButton extends Component {
    static propTypes = {
        disabled: PropTypes.bool
    };

    render() {
        const {disabled} = this.props;

        return <Button
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
