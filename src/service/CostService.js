import localforage from "localforage";
import {BaseLocalStorageService} from "./BaseLocalStorageService";

export class CostService extends BaseLocalStorageService {

    /**
     * Creates the datastore for the given resource.
     * @param applicationContext
     */
    constructor(applicationContext) {
        super(applicationContext);

        this.store = localforage.createInstance({
            name: "cost"
        });
    }
}
