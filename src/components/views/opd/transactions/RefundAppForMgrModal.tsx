import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, PatientDetailsContainer, ApprovedBtn, MainHeading, StyledLabel, StyledTextArea, StyledTextField, SerDataRaw, StyledLabelValue, ServicesDetailsContainer, ServicesContainer, SubHeadings, UserSerCont, ServiceName, ServiceQuantity, SmallStyledLabel, SubContainers, RefundServicesContainer, UserRefundSerCont, RefundDate, RefundServiceName, RefundSerRaw, RefundSerLabel, RefundSerLabelVal } from './RefundAppForMgrModal.styles';
import Checkbox from '@mui/material/Checkbox';
import { ApproveBillServices, GetBillingServices } from '../../../../services/opdServices/transactions/RefundApprovalManagerSer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '70%',
    // width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 1,
    maxHeight: '90vh'
};

export default function RefundAppForMgrModal(props: any) {

    const { showModal, setShowModal, setReloadData, selectedBill, billNo, patientId } = props;

    const [selected, setSelected] = useState<readonly number[]>([]);
    const [selectedSer, setSelectedSer] = useState<any>([]);
    const [billServices, setBillServices] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetBillingServices(billNo);
                setBillServices(res?.data);
            } catch (err: any) {
                console.log("GetUsersCountSer api err", err);
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

    function convertDate(serDate: any) {
        let date = new Date(serDate);
        let options: any = { day: '2-digit', month: 'long', year: 'numeric' };
        let formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    }

    const handleApprovedClick = async (e: any) => {
        try {
            const res: any = await ApproveBillServices(billNo, patientId, selectedSer);
            if (res?.status === 200) {
                window.alert("Your Services approve Successfully");
                setShowModal(false);
                setReloadData(true);
            }
        } catch (err: any) {
            console.log("ApproveBillServices api err", err);
        }
    }

    const handleCheckBoxClick = (id: any, billingDetailId: any) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            setSelectedSer((prevSer: any) => [
                ...prevSer,
                {
                    billingDetailId: billingDetailId,
                    remark: ""
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

    const handleRemarks = (e: React.ChangeEvent<HTMLInputElement>, billingDetailId: number) => {
        const newRemark = e.target.value;
        setSelectedSer((prevSelected: any) =>
            prevSelected.map((item: any) =>
                item.billingDetailId === billingDetailId
                    ? { ...item, remark: newRemark }
                    : item
            )
        );
    };

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
                    <MainHeading>Refund Approval For Manager</MainHeading>
                    <div style={{ margin: '15px' }}>
                        <PatientDetailsContainer>
                            <Container>
                                <StyledLabel>Bill No:</StyledLabel>
                                <StyledLabelValue>{billNo}</StyledLabelValue>
                            </Container>
                            <Container>
                                <StyledLabel>Patient Id:</StyledLabel>
                                <StyledLabelValue>{patientId}</StyledLabelValue>
                            </Container>
                        </PatientDetailsContainer>
                        <ServicesDetailsContainer>
                            <ServicesContainer>
                                <SubHeadings>Services</SubHeadings>
                                <SubContainers>
                                    {
                                        billServices?.billingDetails?.map((ser: any, index: any) => {
                                            const isItemSelected = isSelected(index);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <UserSerCont>
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
                                                                checked={isItemSelected || ser.isApproved === 1}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                                onClick={() => handleCheckBoxClick(index, ser.billingDetailId)}
                                                                disabled={ser.isApproved === 1}
                                                            />
                                                            <ServiceName>{ser.serviceName}</ServiceName>
                                                        </div>
                                                        <div style={{ padding: '0px 10px' }}>
                                                            <ServiceQuantity>{ser.qty}</ServiceQuantity>
                                                        </div>
                                                    </SerDataRaw>
                                                    <SerDataRaw>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <SmallStyledLabel>Service Price</SmallStyledLabel>
                                                            <div style={{ display: 'flex', paddingLeft: '20px' }}>
                                                                <div style={{ padding: '2px', backgroundColor: '#9e9e9e61' }}>
                                                                    <CurrencyRupeeIcon style={{ height: '13px' }} />
                                                                </div>
                                                                <div>
                                                                    <StyledTextField InputProps={{ readOnly: true }} value={ser.serviceUnitPrice} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', padding: '0px 10px' }}>
                                                            <SmallStyledLabel>Discount Price:</SmallStyledLabel>
                                                            <div style={{ paddingLeft: '20px' }}>{ser.serviceDiscount}</div>
                                                        </div>
                                                    </SerDataRaw>
                                                    <div style={{ display: 'flex', padding: '5px 0px' }}>
                                                        <SmallStyledLabel>Remarks</SmallStyledLabel>
                                                        <StyledTextArea
                                                            id="outlined-textarea"
                                                            multiline
                                                            onChange={(e: any) => handleRemarks(e, 67578687)}
                                                        />
                                                    </div>
                                                </UserSerCont>
                                            )
                                        })
                                    }
                                </SubContainers>
                            </ServicesContainer>
                            <RefundServicesContainer>
                                <SubHeadings>Refund Services</SubHeadings>
                                <SubContainers>
                                    {
                                        billServices?.refundDetails?.map((refSer: any, index: any) => {
                                            const refundDetail = billServices?.refundedServices?.find(
                                                (detail: any) => detail.refundId === refSer.refundId
                                            );

                                            return (
                                                <UserRefundSerCont key={index}>
                                                    <RefundDate>{convertDate(refundDetail?.refundDate)}</RefundDate>
                                                    <RefundServiceName>{refSer?.serviceName || "(Service Name not available)"}</RefundServiceName>
                                                    <RefundSerRaw>
                                                        <RefundSerLabel>Service Discount:</RefundSerLabel>
                                                        <RefundSerLabelVal>{refSer?.servicediscount ?? "0"}</RefundSerLabelVal>
                                                    </RefundSerRaw>
                                                    <RefundSerRaw>
                                                        <RefundSerLabel>Refund Amount:</RefundSerLabel>
                                                        <RefundSerLabelVal>{refSer?.refundAmt ?? "0"}</RefundSerLabelVal>
                                                    </RefundSerRaw>
                                                </UserRefundSerCont>
                                            )
                                        })
                                    }
                                </SubContainers>
                            </RefundServicesContainer>
                        </ServicesDetailsContainer>
                    </div>
                    <ApprovedBtn onClick={(e: any) => handleApprovedClick(e)}>Approved</ApprovedBtn>
                </Box>
            </Modal>
        </div>
    );
}