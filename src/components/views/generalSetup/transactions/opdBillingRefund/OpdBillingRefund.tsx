import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableCellData } from './OpdBillingRefund.styles';
import { Link } from '@mui/material';
import OpdBillingRefundModal from '../../../opd/transactions/OpdBillingRefundModal';

const headCells: any = [
    {
        id: 'billNo',
        numeric: false,
        disablePadding: true,
        label: 'Bill No',
    },
    {
        id: 'billDate',
        numeric: true,
        disablePadding: false,
        label: 'Bill Date',
    },
    {
        id: 'billGroup',
        numeric: true,
        disablePadding: false,
        label: 'Bill Group',
    },
    {
        id: 'patientId',
        numeric: true,
        disablePadding: false,
        label: 'Patient Id',
    },
    {
        id: 'patientName',
        numeric: true,
        disablePadding: false,
        label: 'Patient Name',
    },
];

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell: any) => (
                    <TableCellData
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        style={{ backgroundColor: '#40b4c1', color: 'white', fontSize: '13px' }}
                    >
                        {headCell.label}
                    </TableCellData>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function OpdBillingRefund(props: any) {
    const { rows, filteredUsers, setReloadData } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showModal, setShowModal] = useState<any>(false);
    const [selectedBill, setSelectedBill] = useState<any>('');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBillDetails = (billNo: any) => {
        setSelectedBill(billNo);
        setShowModal(true);
    }

    const emptyRows: any = filteredUsers?.length > 0 && Math.max(0, (page + 1) * rowsPerPage - filteredUsers?.length);

    return (
        <Box sx={{}}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer sx={{ maxHeight: '50vh' }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        stickyHeader size={'medium'}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                            {filteredUsers?.length > 0 ?
                                filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: any) => (
                                    <TableRow key={row.id}>
                                        <TableCellData>
                                            <Link style={{ cursor: 'pointer' }} onClick={() => handleBillDetails(row.BillNo)}>{row.BillNo}</Link>
                                            {
                                                showModal && <OpdBillingRefundModal showModal={showModal} setShowModal={setShowModal} setReloadData={setReloadData} selectedBill={selectedBill} billNo={row.BillNo} patientId={row.PatientId} />
                                            }
                                        </TableCellData>
                                        <TableCellData align="left">{row.BillDate}</TableCellData>
                                        <TableCellData align="left">{row.BiilingGroup}</TableCellData>
                                        <TableCellData align="left">{row.PatientId}</TableCellData>
                                        <TableCellData align="left">{row.PatientName}</TableCellData>
                                    </TableRow>
                                )) :
                                <div>No Data Found</div>
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={filteredUsers?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}