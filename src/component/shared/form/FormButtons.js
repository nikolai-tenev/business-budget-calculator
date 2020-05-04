import SubmitButton from "../button/SubmitButton";
import BackToListButton from "../button/BackToListButton";
import BackToDashboardButton from "../button/BackToDashboardButton";
import React, {Component} from "react";
import PropTypes from "prop-types";
import FormButtonsContainer from "./FormButtonContainer";

class FormButtons extends Component {
    static propTypes = {
        isSubmitting: PropTypes.bool.isRequired,
        listUrl: PropTypes.string.isRequired
    };

    render() {
        const {isSubmitting, listUrl} = this.props;

        return <FormButtonsContainer>
            <SubmitButton disabled={isSubmitting}/>
            <BackToListButton disabled={isSubmitting} url={listUrl}/>
            <BackToDashboardButton disabled={isSubmitting}/>
        </FormButtonsContainer>;
    }
}

export default FormButtons;
