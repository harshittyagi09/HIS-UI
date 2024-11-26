import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, DataContainer, LoginBtn, MainHeading, StyledLabel, StyledTextField } from './UpdatePaymentModeModal.styles';
import { EditedDropdown } from '../../../../../common/selectDropdown/EditedDropdown';
import { GetPaymentModeTypesService, UpdatePaymentModeService } from '../../../../../../services/generalSetUpServices/userIpManagementServices/paymentAcknowledgeServices/PaymentAcknowledgeSer';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    // width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 1,
};

export default function UpdatePaymentModeModal(props: any) {
    const { receiptNo, selectedRaw, paymentData, showPayMode, setShowPayMode, setReloadData } = props;
    const creaditCardTypes: any = ['Visa', 'Master Card']
    const [payOptions, setPayOptions] = useState<any>([]);
    const [paymentParams, setPaymentParams] = useState<any>({
        payMode: '',
        UpdateRemarks: '',
        ChequeDDCCNo: null,
        BankName: null,
        ChequeDDdate: null,
        ChequeDDCCAmount: null,
        CCHolderName: null,
        CCType: null,
        BatchNo: null,
        InvoiceNo: null
    })

    useEffect(() => {
        const getData = async () => {
            let res: any = await GetPaymentModeTypesService();
            setPayOptions(res?.data);
        }
        if (receiptNo === selectedRaw) {
            getData();
        }
    }, [])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowPayMode(false);
    };

    const handleUpdateClick = async () => {
        try {
            const res: any = await UpdatePaymentModeService({
                // BillType: payData,
                paymentData: {
                    payMode: paymentParams.payMode,

                    ReceiptNo: paymentData.receiptNo,
                    PaymentDate: paymentData.paymentDate,
                    BillNo: paymentData.billNo,
                    PaidAmount: paymentData.amount,
                    PayMode: paymentData.PayModeShort,
                    PaymentType: "BP",
                    UpdateRemarks: paymentParams.UpdateRemarks,
                    PayModeShort: paymentData.PayModeShort,

                    ChequeDDCCNo: paymentParams.ChequeDDCCNo,
                    BankName: paymentParams.BankName,
                    ChequeDDdate: paymentParams.ChequeDDdate,
                    ChequeDDCCAmount: paymentParams.ChequeDDCCAmount,
                    CCHolderName: paymentParams.CCHolderName,
                    CCType: paymentParams.CCType,
                    BatchNo: paymentParams.BatchNo,
                    InvoiceNo: paymentParams.InvoiceNo,

                    CreditCardChequeDDCCAmount: paymentData.amount
                }
            });
            if (res?.status === 200) {
                window.alert("PayMode updated Successfully :)");
                setShowPayMode(false);
                setReloadData(true);
            }
        } catch (err: any) {
            console.log("UpdateUserStatus api err", err);
        }
    }

    const handleUpdatePaymode = (e: any) => {

        const selectedMode: any = e.target.value;
        const selectedModeVal: any = payOptions.find((payOption: any) => payOption.description === selectedMode);

        if (selectedModeVal) {
            const selectedPaymode = selectedModeVal.paymode;
            setPaymentParams((prevData: any) => ({
                ...prevData,
                payMode: selectedPaymode
            }));
        }
        // const selectedMode: any = e.target.value;
        // setPaymentParams((prevData: any) => ({
        //     ...prevData,
        //     payMode: selectedMode
        // }));
    }

    const handleRemarks = (e: any) => {
        const { name, value } = e.target;
        setPaymentParams((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleCreditCardType = () => {

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setPaymentParams((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFromDate = (date: any) => {
        setPaymentParams((prevData: any) => ({
            ...prevData,
            ChequeDDdate: date
        }));
    }

    if (receiptNo !== selectedRaw) return null;

    return (
        <div>
            <Modal
                open={showPayMode}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Update Payment Mode</MainHeading>
                    <div style={{ margin: '15px', display: 'flex' }}>
                        <DataContainer>
                            <Container>
                                <StyledLabel>Patient Id</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} name="username" value={paymentData.patientId} />
                            </Container>
                            <Container>
                                <StyledLabel>Patient Name</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} name="fullname" value={paymentData.patientName} />
                            </Container>
                            <Container>
                                <StyledLabel>IPID No</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} name="phoneNo" value={0} />
                            </Container>
                            <Container>
                                <StyledLabel>Bill No</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} type='email' name="email" value={paymentData.billNo} />
                            </Container>
                            <Container>
                                <StyledLabel>Amount</StyledLabel>
                                <StyledTextField InputProps={{ readOnly: true }} type='email' name="email" value={paymentData.amount} />
                            </Container>
                            <Container>
                                <StyledLabel>Payment Mode</StyledLabel>
                                <EditedDropdown payMode={paymentParams.payMode} dropdown='updatePaymentMode' options={payOptions} handleUpdatePaymode={handleUpdatePaymode} />
                            </Container>
                            {(paymentParams.payMode !== 'CC' && paymentParams.payMode !== 'CH' && paymentParams.payMode !== 'DD') && <Container>
                                <StyledLabel>Remarks</StyledLabel>
                                <textarea name='UpdateRemarks' onChange={(e: any) => handleRemarks(e)} style={{ width: '145px' }} />
                            </Container>}
                        </DataContainer>
                        {
                            paymentParams.payMode === 'CC' &&
                            <div style={{ padding: '0px 10px', margin: '0px 10px' }}>
                                <DataContainer>
                                    <Container>
                                        <StyledLabel>Name on Credit Card:</StyledLabel>
                                        <StyledTextField name="CCHolderName" value={paymentParams.CCHolderName} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Credit Card No:</StyledLabel>
                                        <StyledTextField name="ChequeDDCCNo" value={paymentParams.ChequeDDCCNo} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Bank Name:</StyledLabel>
                                        <StyledTextField name="BankName" value={paymentParams.BankName} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Credit Card Type:</StyledLabel>
                                        <EditedDropdown payMode={paymentParams.payMode} dropdown='creditCardType' options={creaditCardTypes} handleCreditCardType={handleCreditCardType} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Batch No:</StyledLabel>
                                        <StyledTextField name="BatchNo" value={paymentParams.BatchNo} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Invoice No:</StyledLabel>
                                        <StyledTextField name="InvoiceNo" value={paymentParams.InvoiceNo} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                </DataContainer>
                            </div>
                        }
                        {
                            (paymentParams.payMode === 'CH' || paymentParams.payMode === 'DD') &&
                            <div style={{ padding: '0px 10px', margin: '0px 10px' }}>
                                <DataContainer>
                                    <Container>
                                        <StyledLabel>Cheque/DD Number:</StyledLabel>
                                        <StyledTextField name="ChequeDDCCNo" value={paymentParams.ChequeDDCCNo} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Bank Name:</StyledLabel>
                                        <StyledTextField name="BankName" value={paymentParams.BankName} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                    <Container>
                                        <StyledLabel>Cheque/DD Date:</StyledLabel>
                                        {/* <StyledTextField name="ChequeDDdate" value={paymentParams.ChequeDDdate} onChange={(e: any) => handleChange(e)} /> */}
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
                                    </Container>
                                    <Container>
                                        <StyledLabel>Cheque/DD Amount:</StyledLabel>
                                        <StyledTextField name="ChequeDDCCAmount" value={paymentParams.ChequeDDCCAmount} onChange={(e: any) => handleChange(e)} />
                                    </Container>
                                </DataContainer>
                            </div>
                        }
                    </div>
                    {(paymentParams.payMode === 'CC' || paymentParams.payMode === 'CH' || paymentParams.payMode === 'DD') &&
                        <div style={{ display: 'flex', alignItems: 'center', margin: '0px 15px' }}>
                            <StyledLabel style={{ width: '10%' }}>Remarks</StyledLabel>
                            <textarea name='UpdateRemarks' onChange={(e: any) => handleRemarks(e)} style={{ width: '350px' }} />
                        </div>}
                    <LoginBtn onClick={() => handleUpdateClick()}>Update</LoginBtn>
                </Box>
            </Modal>
        </div>
    );
}