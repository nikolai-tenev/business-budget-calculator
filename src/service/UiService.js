import {action, observable} from "mobx";
import {BaseService} from "./BaseService";
import {uniqueId} from "lodash/util";

export class UiService extends BaseService {

    @observable
    drawerOpen = true;

    @observable
    snackbars = [];

    @observable
    confirmationDialogs = [];

    @action
    closeDrawer = () => {
        this.drawerOpen = false
    };

    @action
    openDrawer = () => {
        this.drawerOpen = true
    };

    @action
    hideSnackbar = (id) => {
        this.hideAnimatedListedUiComponent(id, this.snackbars);
    };

    @action
    removeSnackbar = (id) => {
        this.removeAnimatedListedUiComponent(id, this.snackbars);
    };

    @action
    showSuccessSnackbar = (snackbar) => {
        this.showAnimatedListedUiComponent({...snackbar, type: "success"}, this.snackbars);
    };

    @action
    showErrorSnackbar = (snackbar) => {
        this.showAnimatedListedUiComponent({...snackbar, type: "error"}, this.snackbars);
    };

    hideConfirmationDialog = (id) => {
        this.hideAnimatedListedUiComponent(id, this.confirmationDialogs);
    };

    removeConfirmationDialog = (id) => {
        this.removeAnimatedListedUiComponent(id, this.confirmationDialogs);
    };

    showConfirmationDialog = (confirmationDialog) => {
        this.showAnimatedListedUiComponent(confirmationDialog, this.confirmationDialogs);
    };

    @action
    showAnimatedListedUiComponent = (componentProps, componentList) => {
        componentList.push({
            ...componentProps,
            open: true,
            id: uniqueId().toString()
        });
    };

    @action
    hideAnimatedListedUiComponent = (id, componentList) => {
        const cmp = componentList.find((el) => {
            return el.id === id;
        });

        cmp.open = false;
    };

    @action
    removeAnimatedListedUiComponent = (id, componentList) => {
        const index = componentList.findIndex((el) => {
            return el.id !== id;
        });

        componentList.splice(index, 1);
    };
}
