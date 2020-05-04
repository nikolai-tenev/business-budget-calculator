import React, {Component} from "react";
import {withStyles} from "@material-ui/core";

const css = (theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3),
        "& > *": {
            marginLeft: theme.spacing(1),
        }
    }
});

@withStyles(css)
class FormButtonsContainer extends Component {
    render() {
        const {classes, children} = this.props;

        return <div className={classes.buttons}>{children}</div>;
    }
}

export default FormButtonsContainer;
