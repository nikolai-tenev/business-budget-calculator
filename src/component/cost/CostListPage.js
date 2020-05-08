import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {observer} from "mobx-react";
import AppLayout from "../shared/AppLayout";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {COST_CREATE_PAGE_URL, COST_EDIT_PAGE_URL} from "../../configuration/application-urls";
import Button from "@material-ui/core/Button";
import {applicationContext} from "../../service/ApplicationContext";
import TablePagination from "@material-ui/core/TablePagination";
import {PAGINATION_ROWS_PER_PAGE_OPTIONS} from "../../configuration/ui";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const service = applicationContext.costService;
const uiService = applicationContext.uiService;

@observer
class CostListPage extends Component {
    componentDidMount() {
        service.loadList();
    }

    render() {
        const {list, sortField, sortDirection} = service;

        return <AppLayout title="All costs">
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add/>}
                component={Link}
                to={COST_CREATE_PAGE_URL}
            >
                Add new
            </Button>
            <TableContainer>
                <Table aria-label="Cost list">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sortDirection={sortField === "name" ? sortDirection : false}
                            >
                                <TableSortLabel
                                    active={sortField === "name"}
                                    direction={sortField === "name" ? sortDirection : "asc"}
                                    onClick={() => {
                                        service.setSortDirection(service.sortDirection === "asc" ? "desc" : "asc");
                                        service.setSortField("name");
                                    }}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow key={row.id}
                                      hover
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        component={Link}
                                        to={COST_EDIT_PAGE_URL.replace(":id", row.id)}
                                        aria-label="edit"
                                        color="primary">
                                        <Edit/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => this.handleItemDeleteClick(row.id)}
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

    handleItemDeleteClick = async (id) => {
        uiService.showConfirmationDialog({
            title: "Delete Confirmation",
            content: "Are you sure you want to delete this record?",
            onOk: async () => {
                try {
                    await service.delete(id);
                    uiService.showSuccessSnackbar({message: "Record successfully deleted!"});
                } catch (e) {
                    uiService.showErrorSnackbar({message: "There was a problem while trying to delete record!"});
                    console.error(e);
                }

                service.loadList();
            }
        });
    };

    handleChangePage = (event, page) => {
        service.setCurrentPage(page);
        service.loadList();
    };

    handleChangeRowsPerPage = (event) => {
        service.setRowsPerPage(event.target.value);
        service.loadList();
    };
}

export default CostListPage;
