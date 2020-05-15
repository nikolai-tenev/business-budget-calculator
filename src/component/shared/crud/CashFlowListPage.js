import React, {Component} from 'react';
import PropTypes from "prop-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {observer} from "mobx-react";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {applicationContext} from "../../../service/ApplicationContext";
import AppLayout from "../AppLayout";
import {CashFlowTypes} from "../../../configuration/enums";
import {currencyFormat, dateFormat} from "../../../utility/formatting";
import {PAGINATION_ROWS_PER_PAGE_OPTIONS} from "../../../configuration/ui";

const uiService = applicationContext.uiService;
const costTypeOrder = ["ONE_TIME", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"];

@observer
class SortedTableHeader extends Component {
    static propTypes = {
        service: PropTypes.object.isRequired,
        fieldName: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        const {service, fieldName, title} = this.props;
        const {sortField, sortDirection} = service;

        return <TableCell sortDirection={sortField === fieldName ? sortDirection : false}>
            <TableSortLabel
                active={sortField === fieldName}
                direction={sortField === fieldName ? sortDirection : "asc"}
                onClick={() => {
                    service.setSortDirection(service.sortDirection === "asc" ? "desc" : "asc");
                    service.setSortField(fieldName);

                    if (fieldName === "type") {
                        service.setSortingFunction((first, second) => {
                            let left = costTypeOrder.indexOf(first.type);
                            let right = costTypeOrder.indexOf(second.type);

                            return service.sortDirection === "asc" ? left - right : right - left;
                        });
                    } else {
                        service.setSortingFunction(null);
                    }

                    service.loadList();
                }}
            >
                {title}
            </TableSortLabel>
        </TableCell>;
    }
}

@observer
class CashFlowListPage extends Component {
    static propTypes = {
        service: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        createPageUrl: PropTypes.string.isRequired,
        editPageUrl: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.service.loadList();
    }

    render() {
        const {service, title, createPageUrl, editPageUrl} = this.props;
        const {list} = service;

        return <AppLayout title={title}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add/>}
                component={Link}
                to={createPageUrl}
            >
                Add new
            </Button>
            <TableContainer>
                <Table aria-label={title}>
                    <TableHead>
                        <TableRow>
                            <SortedTableHeader service={service} title="Name" fieldName="name"/>
                            <SortedTableHeader service={service} title="Type" fieldName="type"/>
                            <SortedTableHeader service={service} title="Value" fieldName="value"/>
                            <SortedTableHeader service={service} title="Period" fieldName="from"/>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {CashFlowTypes[row.type].label}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {currencyFormat(row.value)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.ongoing ? "Ongoing" : `${dateFormat(row.from)} - ${dateFormat(row.to)}`}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        component={Link}
                                        to={editPageUrl.replace(":id", row.id)}
                                        aria-label="edit"
                                        color="primary">
                                        <Edit/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => this.handleDeleteClick(row.id)}
                                        aria-label="delete"
                                        color="secondary">
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={PAGINATION_ROWS_PER_PAGE_OPTIONS}
                component="div"
                count={service.totalRows}
                rowsPerPage={service.rowsPerPage}
                page={service.currentPage}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </AppLayout>;
    }

    handleDeleteClick = async (id) => {
        uiService.showConfirmationDialog({
            title: "Delete Confirmation",
            content: "Are you sure you want to delete this record?",
            onOk: async () => {
                try {
                    await this.props.service.delete(id);
                    uiService.showSuccessSnackbar({message: "Record successfully deleted!"});
                } catch (e) {
                    uiService.showErrorSnackbar({message: "There was a problem while trying to delete record!"});
                    console.error(e);
                }

                this.props.service.loadList();
            }
        });
    };

    handleChangePage = (event, page) => {
        this.props.service.setCurrentPage(page);
        this.props.service.loadList();
    };

    handleChangeRowsPerPage = (event) => {
        this.props.service.setRowsPerPage(event.target.value);
        this.props.service.loadList();
    };
}

export default CashFlowListPage;
