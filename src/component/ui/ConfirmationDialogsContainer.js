import Box from "@material-ui/core/Box";
import React, {Component} from "react";
import {applicationContext} from "../../service/ApplicationContext";
import {observer} from "mobx-react";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";

const uiService = applicationContext.uiService;

@observer
class ConfirmationDialogsContainer extends Component {
    render() {
        return <Box>
            {uiService.confirmationDialogs.map(dialog => {
                const onExited = () => uiService.removeConfirmationDialog(dialog.id);
                const onClose = () => uiService.hideConfirmationDialog(dialog.id);

                const onOk = () => {
                    dialog.onOk();

                    onClose();
                };

                return <Dialog
                    key={dialog.id}
                    open={dialog.open}
                    onClose={onClose}
                    onExited={onExited}
                    aria-labelledby={`alert-dialog-title-${dialog.id}`}
                    aria-describedby={`alert-dialog-description-${dialog.id}`}
                >
                    <DialogTitle id={`alert-dialog-title-${dialog.id}`}>{dialog.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id={`alert-dialog-description-${dialog.id}`}>{dialog.content}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onOk} color="primary">Yes</Button>
                        <Button onClick={onClose} color="primary" autoFocus>No</Button>
                    </DialogActions>
                </Dialog>
            })}
        </Box>
    }
}

export default ConfirmationDialogsContainer;
