import SubmitButton from "../button/SubmitButton";
import BackToListButton from "../button/BackToListButton";
import BackToDashboardButton from "../button/BackToDashboardButton";
import React, {Component} from "react";
import PropTypes from "prop-types";
import FormButtonsContainer from "./FormButtonContainer";
import AddAnotherButton from "../button/AddAnotherButton";

class FormButtons extends Component {
    static propTypes = {
        isSubmitting: PropTypes.bool.isRequired,
        listUrl: PropTypes.string.isRequired,
        createUrl: PropTypes.string
    };

    render() {
        const {isSubmitting, listUrl, createUrl} = this.props;

        return <FormButtonsContainer>
            {createUrl && <AddAnotherButton url={createUrl} disabled={isSubmitting}/>}
            <SubmitButton disabled={isSubmitting}/>
            <BackToListButton disabled={isSubmitting} url={listUrl}/>
            <BackToDashboardButton disabled={isSubmitting}/>
        </FormButtonsContainer>;
    }
}

export default FormButtons;
