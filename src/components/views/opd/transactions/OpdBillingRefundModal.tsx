import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ApprovedSerCont, Container, DataContainer, ApprovedBtn, MainHeading, SubHeadings, PatientDetailsContainer, MgrApprovedSerContainer, SerDataRaw, ServiceName, ServiceQuantity, SmallStyledLabel, StyledLabel, StyledLabelValue, StyledTextArea, StyledTextField, SubContainer } from './OpdBillingRefundModal.styles';
import Checkbox from '@mui/material/Checkbox';
import { GetBillingServices } from '../../../../services/opdServices/transactions/RefundApprovalManagerSer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { EditedDropdown } from '../../../common/selectDropdown/EditedDropdown';
import { ApprovedManagerBillsSer, GetRefundReasons } from '../../../../services/opdServices/transactions/OpdBillingRefundSer';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    // width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 1,
    maxHeight: '90vh',
    // overflowY: 'auto'
};

export default function OpdBillingRefundModal(props: any) {

    const { showModal, setShowModal, setReloadData, selectedBill, billNo, patientId } = props;

    const [selected, setSelected] = useState<readonly number[]>([]);
    const [selectedSer, setSelectedSer] = useState<any>([]);
    const [billServices, setBillServices] = useState<any>([]);
    const [remarks, setRemarks] = useState<any>('');
    const [refundReasons, setRefundReasons] = useState<any>([]);
    const [refundReasonId, setRefundReasonId] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetBillingServices(billNo);
                setBillServices(res?.data);
            } catch (err: any) {
                console.log("GetUsersCountSer api err", err);
            }

            try {
                const res: any = await GetRefundReasons();
                setRefundReasons(res?.data);
            } catch (err: any) {
                console.log("GetRefundReasons api err", err);
            }
        }
        if (billNo === selectedBill) {
            getData();
        }
    }, [billNo, selectedBill]);

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    }

    const handleApprovedClick = async (e: any) => {
        try {
            const res: any = refundReasonId !== null ? await ApprovedManagerBillsSer(billNo, patientId, remarks, refundReasonId, selectedSer) : window.alert("Please select refund reason");
            if (res?.status === 200) {
                window.alert("Your Services approved Successfully");
                setShowModal(false);
                setReloadData(true);
                const windowFeatures = "left=100,top=100,width=620,height=580";
                const url = `/opdBillRefundPrint?billNo=${encodeURIComponent(billNo)}`;
                window.open(url, "popup", windowFeatures);
            }
        } catch (err: any) {
            console.log("ApprovedManagerBillsSer api err", err);
        }
    }

    const handleCheckBoxClick = (id: any, billingDetailId: any, serviceUnitPrice: any, refundAmt: any, serviceDiscount: any) => {
        const selectedIndex = selected.indexOf(id);

        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            setSelectedSer((prevSer: any) => [
                ...prevSer,
                {
                    billingDetailID: billingDetailId,
                    serviceUnitPrice: serviceUnitPrice,
                    refundAmt: refundAmt,
                    serviceDiscount: serviceDiscount
                }
            ]);
        } else {
            newSelected = selected.filter((selectedId) => selectedId !== id);
            setSelectedSer((prevSer: any) =>
                prevSer.filter((item: any) => item.billingDetailId !== billingDetailId)
            );
        }

        setSelected(newSelected);
    }

    const handleRemarks = (e: any) => {
        const newRemark = e.target.value;
        setRemarks(newRemark);
    }

    const handleRefundReason = (e: any) => {
        const selectedReason: any = e.target.value;
        const selectedReasonVal: any = refundReasons.find((reason: any) => reason.refund_reason === selectedReason);
        if (selectedReasonVal) {
            const selectedReasonId = selectedReasonVal.refund_reason_id;
            setRefundReasonId(selectedReasonId);
        }
    }

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    if (billNo !== selectedBill) return null;

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>OPD Billing Refund</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <PatientDetailsContainer>
                            <DataContainer>
                                <Container>
                                    <StyledLabel>Bill No:</StyledLabel>
                                    <StyledLabelValue>{billNo}</StyledLabelValue>
                                </Container>
                                <Container>
                                    <StyledLabel>Patient Id:</StyledLabel>
                                    <StyledLabelValue>{patientId}</StyledLabelValue>
                                </Container>
                                <Container>
                                    <StyledLabel>Paymode:</StyledLabel>
                                    <StyledLabelValue>CASH</StyledLabelValue>
                                </Container>
                            </DataContainer>
                            <DataContainer>
                                <Container>
                                    <StyledLabel>Remarks:</StyledLabel>
                                    <StyledTextArea
                                        id="outlined-textarea"
                                        multiline
                                        onChange={(e: any) => handleRemarks(e)}
                                        value={remarks}
                                    />
                                </Container>
                                <Container>
                                    <StyledLabel>Refund Reason:</StyledLabel>
                                    <EditedDropdown handleRefundReason={(e: any) => handleRefundReason(e)} dropdown='refundReason' options={refundReasons} />
                                </Container>
                            </DataContainer>
                        </PatientDetailsContainer>
                        <div style={{ border: '1px solid transparent' }}>
                            <MgrApprovedSerContainer>
                                <SubHeadings>Services</SubHeadings>
                                <SubContainer>
                                    {
                                        billServices?.billingDetails?.map((ser: any, index: any) => {
                                            const isItemSelected = isSelected(index);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                ser.isApproved === 1 &&
                                                <ApprovedSerCont>
                                                    <SerDataRaw>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <Checkbox
                                                                sx={{
                                                                    padding: '0px',
                                                                    '& MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root': {
                                                                        width: '25px',
                                                                        height: '20px'
                                                                    }
                                                                }}
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                                onClick={() => handleCheckBoxClick(index, ser.billingDetailId, ser.serviceUnitPrice, ser.refundAmount, ser.serviceDiscount)}
                                                            />
                                                            <ServiceName>{ser.serviceName}</ServiceName>
                                                        </div>
                                                        <div style={{ padding: '0px 10px' }}>
                                                            <ServiceQuantity>{ser.qty}</ServiceQuantity>
                                                        </div>
                                                    </SerDataRaw>
                                                    <SerDataRaw style={{ justifyContent: 'space-between', padding: '5px 0px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <SmallStyledLabel>Service Price</SmallStyledLabel>
                                                            <div style={{ display: 'flex', paddingLeft: '20px' }}>
                                                                <div style={{ padding: '2px', backgroundColor: '#9e9e9e61' }}>
                                                                    <CurrencyRupeeIcon style={{ height: '13px' }} />
                                                                </div>
                                                                <div style={{}}>
                                                                    <StyledTextField InputProps={{ readOnly: true }} value={ser.serviceUnitPrice} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', padding: '0px 10px' }}>
                                                            <SmallStyledLabel>Discount Price:</SmallStyledLabel>
                                                            <div style={{ paddingLeft: '20px' }}>{ser.serviceDiscount}</div>
                                                        </div>
                                                    </SerDataRaw>
                                                </ApprovedSerCont>
                                            )
                                        })
                                    }
                                </SubContainer>
                            </MgrApprovedSerContainer>
                        </div>
                    </div>
                    <ApprovedBtn onClick={(e: any) => handleApprovedClick(e)}>Approved</ApprovedBtn>
                </Box>
            </Modal>
        </div>
    );
}