import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, DataContainer, LoginBtn, MainHeading, StyledLabel, StyledTextField } from './AcknowledgePaymentModal.styles';
import { AckPaymentService } from '../../../../../../services/generalSetUpServices/userIpManagementServices/paymentAcknowledgeServices/PaymentAcknowledgeSer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
  p: 1
};

export default function AcknowledgePaymentModal(props: any) {
  const { receiptNo, selectedRaw, paymentData, setIsDataChange, showAckPayment, setShowAckPayment } = props;

  const [payData, setPaytData] = useState<any>({
    paidAmount: paymentData.amount,
    remarks: ''
  })

  const handleClose = (e: any) => {
    e.stopPropagation();
    setShowAckPayment(false);
  };

  const handleTextArea = (e: any) => {
    const { name, value } = e.target;
    setPaytData((prevData: any) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmitClick = async () => {
    try {
      const res: any = await AckPaymentService({ payData: payData, receiptNo: receiptNo });
      if (res?.status === 200) {
        window.alert("Payment Acknowledge Successfully :)");
        setIsDataChange(true);
        setShowAckPayment(false);
      }
    } catch (err: any) {
      console.log("UpdateUserStatus api err", err);
    }
  }

  if (receiptNo !== selectedRaw) return null;


  return (
    <div>
      <Modal
        open={showAckPayment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MainHeading>Acknowledge Payment</MainHeading>
          <div style={{ margin: '15px' }}>
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
                <StyledLabel>Remarks</StyledLabel>
                <textarea name='remarks' onChange={(e: any) => handleTextArea(e)} style={{ width: '145px' }} />
              </Container>
            </DataContainer>
          </div>
          <LoginBtn onClick={handleSubmitClick}>Submit</LoginBtn>
        </Box>
      </Modal>
    </div>
  );
}