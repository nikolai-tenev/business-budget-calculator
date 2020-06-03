import {action, observable} from "mobx";
import {BaseService} from "./BaseService";
import {PAGINATION_ROWS_PER_PAGE_OPTIONS} from "../configuration/ui";
import localforage from "localforage";
import {forOwn, isNil, isString} from "lodash";
import {isMoment} from "moment";

export class BaseLocalStorageService extends BaseService {

    /**
     * LocalForage instance. Created by implementing classes.
     */
    store;

    /**
     * How many rows per page will the table show.
     * @type {number}
     */
    @observable
    rowsPerPage = PAGINATION_ROWS_PER_PAGE_OPTIONS[0];

    /**
     * How many rows are there in total.
     * @type {number}
     */
    @observable
    totalRows = 0;

    /**
     * Zero-based index of the current shown page.
     * @type {number}
     */
    @observable
    currentPage = 0;

    /**
     * Value to search for in the records loaded in the CRUD list.
     * @type {String}
     */
    @observable
    searchValue;

    /**
     * Field on which the CRUD list is sorted.
     * @type {String}
     */
    @observable
    sortField;

    /**
     * Sort direction for the CRUD list.
     * @type {String}
     */
    @observable
    sortDirection;

    /**
     * Special sorting function. If nil, the default comparison operators will be used.
     */
    sortingFunction;

    /**
     * All items.
     * @type {Array}
     */
    @observable
    all = [];

    /**
     * List of items loaded in a CRUD list.
     * @type {Array}
     */
    @observable
    list = [];

    /**
     * Single item, used in create/edit forms.
     * @type {{}}
     */
    @observable
    single = {};

    @action
    setRowsPerPage = (rowsPerPage) => {
        this.rowsPerPage = rowsPerPage;
    };

    @action
    setTotalRows = (totalRows) => {
        this.totalRows = totalRows;
    };

    @action
    setCurrentPage = (currentPage) => {
        this.currentPage = currentPage;
    };

    @action
    setSortField = (sortField) => {
        this.sortField = sortField;
    };

    @action
    setSortDirection = (sortDirection) => {
        this.sortDirection = sortDirection;
    };

    setSortingFunction = (func) => {
        this.sortingFunction = func;
    };

    @action
    setAll = (all) => {
        this.all = all;
    };

    @action
    setList = (list) => {
        this.list = list;
    };

    @action
    setSingle = (single) => {
        this.single = single;
    };

    /**
     * Load all items.
     * @returns {Promise<void>}
     */
    loadAll = async () => {
        this.setLoading(true);

        try {
            const allRecords = [];
            await this.store.iterate((record) => {
                allRecords.push(record);
            });

            this.setAll(allRecords);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Load list of items. Takes into account pagination.
     * @returns {Promise<void>}
     */
    loadList = async () => {
        this.setLoading(true);

        try {
            const allItems = [];
            const searchValue = this.searchValue;
            const sortField = this.sortField;
            const sortDirection = this.sortDirection;
            const currentPage = this.currentPage;
            const rowsPerPage = this.rowsPerPage;

            await this.store.iterate((record, id) => {
                let passedSearch = false;

                forOwn(record, val => {
                    if (isNil(val)) {
                        return;
                    }

                    let stringValue;

                    if (isMoment(val)) {
                        stringValue = val.toISOString();
                    }

                    if (!isString(val)) {
                        stringValue = val.toString();
                    }

                    if (!searchValue || stringValue.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
                        passedSearch = true;
                    }
                });

                if (!passedSearch) {
                    return;
                }

                allItems.push(record);
            });

            allItems.sort((first, second) => {
                const isAsc = sortDirection === "asc";
                const left = first[sortField];
                const right = second[sortField];

                if (isNil(left)) {
                    return isAsc ? -1 : 1;
                }

                if (isNil(right)) {
                    return isAsc ? 1 : -1;
                }

                if (!isNil(this.sortingFunction)) {
                    return this.sortingFunction(first, second);
                }

                if (left < right) {
                    return isAsc ? -1 : 1;
                }
                if (left > right) {
                    return isAsc ? 1 : -1;
                }

                return 0;
            });

            let totalCount = allItems.length;

            this.setTotalRows(totalCount);
            this.setList(allItems.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage));
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Load single item by passed id.
     * @param id
     * @returns {Promise<void>}
     */
    loadSingle = async (id) => {
        this.setLoading(true);

        try {
            const item = await this.store.getItem(id);

            this.setSingle(item);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Save (create or update) a single item.
     * @param values
     * @returns {Promise<any>}
     */
    save = async (values) => {
        // this.setLoading(true);
        let id = values.id;
        let oldRecord = {};

        try {
            if (!id) {
                const keys = await this.store.keys();

                id = (keys.length + 1).toString();
                oldRecord = {id};
            } else {
                oldRecord = await this.store.getItem(id);
            }

            return await this.store.setItem(id, {...oldRecord, ...values});
        } finally {
            // this.setLoading(false);
        }
    };

    /**
     * Delete a single item.
     * @param id
     * @returns {Promise<void>}
     */
    delete = async (id) => {
        // this.setLoading(true);

        try {
            return await this.store.removeItem(id);
        } finally {
            // this.setLoading(false);
        }
    };
}
