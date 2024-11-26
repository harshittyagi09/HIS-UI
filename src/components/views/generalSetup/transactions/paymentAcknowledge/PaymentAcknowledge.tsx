import { useState, useEffect } from 'react';
import UserRoleMgmtImg from '../../../../images/ManageUsersIcon.png';
import SearchBar from '../../../../common/search/SearchBar';
import { CancelPaymentService, GetAcknowledgedDataDetails } from '../../../../../services/generalSetUpServices/userIpManagementServices/paymentAcknowledgeServices/PaymentAcknowledgeSer';
import { Container, Heading, TableCellData } from './PaymentAcknowledge.styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import { Link } from '@mui/material';
import AcknowledgePaymentModal from '../../../modals/generalSetUp/transactions/paymentAcknowledge/AcknowledgePaymentModal';
import UpdatePaymentModeModal from '../../../modals/generalSetUp/transactions/paymentAcknowledge/UpdatePaymentModeModal';
import SwitchButton from '../../../../common/switch/Switch';

export default function PaymentAcknowledge() {

    const [filteredUserRoles, setFilteredUserRoles] = useState<any>([]);
    const [searchParams, setSearchParams] = useState<any>({
        fromDate: getCurrentFormattedDate(),
        toDate: getCurrentFormattedDate(),
        biilinggroup: 'OPD',
        PatientId: null,
    })
    const [showAckPayment, setShowAckPayment] = useState<any>(false);
    const [showPayMode, setShowPayMode] = useState<any>(false);
    const [selectedRaw, setSelectedRaw] = useState<any>(null);
    const [isDataChange, setIsDataChange] = useState<any>(false);
    const [reloadData, setReloadData] = useState<any>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetAcknowledgedDataDetails(searchParams);
                setFilteredUserRoles(res?.data);
                setIsDataChange(false);
                setReloadData(false);
            } catch (err: any) {
                console.log("GetAssignIpUsers api err", err);
            }
        }
        getData();
    }, [searchParams, isDataChange, reloadData])

    const formatSelectedDate = (dateString: any) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    }

    function getCurrentFormattedDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleSearchChange = async (e: any) => {
        const value = e?.target?.value;
        setSearchParams({
            ...searchParams,
            PatientId: value
        })
    }

    const handleFromDate = (date: any) => {
        setSearchParams({
            ...searchParams,
            fromDate: formatSelectedDate(date)
        })
    }

    const handleToDate = (date: any) => {
        setSearchParams({
            ...searchParams,
            toDate: formatSelectedDate(date)
        })
    }

    const handlePatientIdClick = (receiptNo: any) => {
        setSelectedRaw(receiptNo);
        setShowAckPayment(true);
    }

    const handleChangePayMode = (receiptNo: any) => {
        setSelectedRaw(receiptNo);
        setShowPayMode(true);
    }

    const handleCancelClick = async (receiptNo: any) => {
        try {
            const res: any = await CancelPaymentService({ receiptNo: receiptNo });
            if (res?.status === 200) {
                window.alert("Payment Cancel Successfully :)");
                setIsDataChange(true);
            }
        } catch (err: any) {
            console.log("CancelPaymentService api err", err);
        }
    }

    const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Switch state:", e.target.checked ? 'OPD' : 'IPD');
        setSearchParams({
            ...searchParams,
            biilinggroup: e?.target?.checked ? 'OPD' : 'IPD'
        })
    }

    return (
        <div style={{ padding: '10px', backgroundColor: '#e0e0e05e' }}>
            {/* <div style={{ border: '1px solid transparent', backgroundColor: '#55c79c', padding: '0px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={UserRoleMgmtImg} height='40px' />
                    <div style={{ fontSize: '25px', fontWeight: '700', color: 'white', padding: '0px 10px' }}>Payment Acknowledge</div>
                </div>
                <SearchBar page='paymentAck' searchValue={searchParams.PatientId} handleSearchChange={(e: any) => handleSearchChange(e)} />
            </div> */}
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                {/* <div style={{ border: '1px solid transparent', width: '4.5vw', minWidth: '60px', height: 'calc(100vh - 25vh)', backgroundColor: '#55c79c', padding: '10px 0px', textAlign: 'center' }}>
                </div> */}
                <div style={{ marginLeft: '2%', flexGrow: 1, paddingTop: '5px' }}>
                    <Container>
                        <Heading>
                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                                <div style={{ margin: '0px 5px' }}>
                                    <FormControl sx={{ m: 1, borderRadius: '4px', width: '150px', backgroundColor: 'white' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                slotProps={{
                                                    desktopPaper: {
                                                        sx: {
                                                            '& .MuiPickersCalendarHeader-root': {
                                                                minHeight: '20px',
                                                                fontSize: '10px' // Adjust header height
                                                            },
                                                            '& .MuiDateCalendar-root': {
                                                                width: '200px', // Adjust the width of the calendar
                                                                height: '270px', // Adjust the height of the calendar
                                                                padding: '3px',
                                                                //   overflowY: 'auto'
                                                            },
                                                            '& .MuiPickersDay-root': {
                                                                width: '30px', // Adjust the size of the days
                                                                height: '30px',
                                                            },
                                                            '& .css-1vs7z2v-MuiYearCalendar-root': {
                                                                width: 'inherit',
                                                                maxHeight: '200px'
                                                            },
                                                            '& .css-innj4t-MuiPickersYear-yearButton': {
                                                                margin: '0px',
                                                                width: 'inherit',
                                                                height: '26px',
                                                                fontSize: '13px'
                                                            }
                                                        },
                                                    },
                                                }}
                                                sx={{
                                                    '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        padding: '4px 8px'
                                                    },
                                                    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                                        transform: 'translate(14px, 7px) scale(1)',
                                                        fontSize: '13px'
                                                    },
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        border: 'transparent',
                                                        fontSize: '13px'
                                                    },
                                                    '& .MuiFormControl-root.css-9h85id-MuiFormControl-root': {
                                                        width: '100%'
                                                    },
                                                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                                        color: '#40b4c1'
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#40b4c1',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#40b4c1',
                                                            color: '#40b4c1'
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        borderColor: 'transparent',
                                                    },
                                                    '& .Mui-focused': {
                                                        color: '#40b4c1',
                                                        borderColor: '#40b4c1',
                                                        border: 'transparent',
                                                    },
                                                }}
                                                // label={selectedDate === '' ? "From Date" : selectedDate}
                                                format="DD/MM/YYYY"
                                                onChange={handleFromDate}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </div>
                                <div style={{ margin: '0px 5px' }}>
                                    <FormControl sx={{ m: 1, borderRadius: '4px', width: '150px', backgroundColor: 'white' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                slotProps={{
                                                    desktopPaper: {
                                                        sx: {
                                                            '& .MuiPickersCalendarHeader-root': {
                                                                minHeight: '20px',
                                                                fontSize: '10px' // Adjust header height
                                                            },
                                                            '& .MuiDateCalendar-root': {
                                                                width: '200px', // Adjust the width of the calendar
                                                                height: '230px', // Adjust the height of the calendar
                                                                padding: '3px',
                                                            },
                                                            '& .MuiPickersDay-root': {
                                                                width: '30px', // Adjust the size of the days
                                                                height: '30px',
                                                            },
                                                            '& .css-1vs7z2v-MuiYearCalendar-root': {
                                                                width: 'inherit',
                                                                maxHeight: '200px'
                                                            },
                                                            '& .css-innj4t-MuiPickersYear-yearButton': {
                                                                margin: '0px',
                                                                width: 'inherit',
                                                                height: '26px',
                                                                fontSize: '13px'
                                                            }
                                                        },
                                                    },
                                                }}
                                                sx={{
                                                    '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        padding: '4px 8px'
                                                    },
                                                    '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                                        transform: 'translate(14px, 7px) scale(1)',
                                                        fontSize: '13px'
                                                    },
                                                    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                                                        border: 'transparent',
                                                        fontSize: '13px'
                                                    },
                                                    '& .MuiFormControl-root css-9h85id-MuiFormControl-root': {
                                                        width: '100%'
                                                    },
                                                    '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                                        color: '#40b4c1'
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#40b4c1',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#40b4c1',
                                                            color: '#40b4c1'
                                                        }
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        borderColor: 'transparent',
                                                    },
                                                    '& .Mui-focused': {
                                                        borderColor: '#40b4c1',
                                                        border: 'transparent'
                                                    }
                                                }}
                                                format="DD/MM/YYYY"
                                                // label={selectedDate === '' ? "To Date" : selectedDate}
                                                onChange={handleToDate}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{ float: 'right', display: 'flex' }}>
                                <SwitchButton page="paymentAck" checked={searchParams.biilinggroup} handleSwitch={handleSwitch} />
                            </div>
                        </Heading>
                    </Container>
                    <TableContainer component={Paper} sx={{ maxHeight: '60vh', maxWidth: '90vw', overflowY: 'auto' }}>
                        <Table sx={{ minWidth: 650, overflowX: 'auto' }} stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '15px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>S.No</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '15px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Name</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>PatientId</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>IP Id</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Bill No</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Billing Group</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Amount</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Paymode</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Payment Date</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Payment By</TableCellData>
                                    <TableCellData align="center" style={{ fontWeight: '400', fontSize: '13px', backgroundColor: '#40b4c1', color: 'white', textAlign: 'center' }}>Cancel</TableCellData>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUserRoles.length > 0 && filteredUserRoles?.map((row: any, index: any) => (
                                    (<TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '0px', width: '100%' }}
                                    >
                                        <TableCellData style={{ padding: '0px' }} align="center">{index + 1}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.patientName}</TableCellData>
                                        {/* <TableCellData style={{ padding: '0px 20px' }} align="center">{row.patientId}</TableCellData> */}
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">
                                            <Link onClick={() => handlePatientIdClick(row.receiptNo)}>{row.patientId}</Link>
                                            {
                                                showAckPayment && <AcknowledgePaymentModal setIsDataChange={setIsDataChange} paymentData={{ patientId: row.patientId, patientName: row.patientName, billNo: row.billNo, amount: row.paidAmount, payMode: row.payMode }} receiptNo={row.receiptNo} selectedRaw={selectedRaw} showAckPayment={showAckPayment} setShowAckPayment={(open: boolean) => setShowAckPayment(open)} />
                                            }
                                        </TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.ipid}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.billNo}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.billingGroup}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.paidAmount}</TableCellData>
                                        <TableCellData style={{ minWidth: '50px', padding: '2px 20px' }} align="center">
                                            <div style={{ padding: '5px', backgroundColor: '#566f82', borderRadius: '20px', color: 'white', cursor: 'pointer' }} onClick={() => handleChangePayMode(row.receiptNo)}>{row.payMode}</div>
                                            {
                                                showPayMode && <UpdatePaymentModeModal paymentData={{ patientId: row.patientId, patientName: row.patientName, billNo: row.billNo, amount: row.paidAmount, payMode: row.payMode, payModeShort: row.payModeShort, receiptNo: row.receiptNo, paymentDate: row.paymentDate }} receiptNo={row.receiptNo} selectedRaw={selectedRaw} showPayMode={showPayMode} setShowPayMode={(open: boolean) => setShowPayMode(open)} setReloadData={setReloadData} />
                                            }
                                        </TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.paymentDate}</TableCellData>
                                        <TableCellData style={{ padding: '0px 20px' }} align="center">{row.created_by_name}</TableCellData>
                                        <TableCellData style={{ minWidth: '50px', padding: '2px 20px' }} align="center">
                                            <div style={{ padding: '5px', backgroundColor: '#566f82', borderRadius: '20px', color: 'white', cursor: 'pointer' }} onClick={(e: any) => handleCancelClick(row.receiptNo)}>Cancel</div>
                                        </TableCellData>
                                    </TableRow>)
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}