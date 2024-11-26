import { useState, useEffect } from 'react';
import { A4Page, BillFromContainer, BillToContainer, Content, HospitalAddress, HospitalDetail, HospitalName, MidContainer, PrintButton, StyledLabel, StyledLabelValue, SubHeadings, TableData, TableHeader, TopContainer } from './OpdBillRefundPrint.styles';
import Logo from '../../images/RamaHospitalLogoHindi.png';
import { GetRefundedServices, OpdBillHospitalDetailsSer, RefundedBillPatientDetailsSer } from '../../../services/printServices/OpdBillRefundPrintSer';
import { useLocation } from 'react-router-dom';

export default function OpdBillRefundPrint() {

    const [hospitalDetails, setHospitalDetails] = useState<any>({});
    const [patientDetails, setPatientDetails] = useState<any>({});
    const [refundServices, setRefundServices] = useState<any>({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const billNo = query.get('billNo');

    useEffect(() => {
        const getData = async () => {

            try {
                const OpdBillHospitalDetailsSerRes: any = await OpdBillHospitalDetailsSer(billNo);
                if (OpdBillHospitalDetailsSerRes?.status === 200) {
                    setHospitalDetails(OpdBillHospitalDetailsSerRes.data[0]);
                } else {
                    console.error('Error fetching in OpdBillHospitalDetailsSer:', OpdBillHospitalDetailsSerRes?.status);
                }
            } catch (error) {
                console.error('Error fetching in OpdBillHospitalDetailsSer:', error);
            }

            try {
                const RefundedBillPatientDetailsSerRes: any = await RefundedBillPatientDetailsSer(billNo);
                if (RefundedBillPatientDetailsSerRes?.status === 200) {
                    setPatientDetails(RefundedBillPatientDetailsSerRes.data);
                } else {
                    console.error('Error fetching in RefundedBillPatientDetailsSer:', RefundedBillPatientDetailsSerRes?.status);
                }
            } catch (error) {
                console.error('Error fetching in RefundedBillPatientDetailsSer:', error);
            }

            try {
                const GetRefundedServicesRes: any = await GetRefundedServices(billNo);
                if (GetRefundedServicesRes?.status === 200) {
                    setRefundServices(GetRefundedServicesRes.data);
                } else {
                    console.error('Error fetching in GetRefundedServices:', GetRefundedServicesRes?.status);
                }
            } catch (error) {
                console.error('GetRefundedServices Error:', error);
            }

        }
        getData();
    }, [])

    const handlePrint = () => {
        window.print();
    };

    return (
        <A4Page id="print-root">
            <Content>
                <TopContainer>
                    <div>
                        <img alt="" src={Logo} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StyledLabel>Bill No:</StyledLabel>
                            <StyledLabelValue>{patientDetails?.billNo}</StyledLabelValue>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StyledLabel>Bill Date:</StyledLabel>
                            <StyledLabelValue>26-August-2024</StyledLabelValue>
                        </div>
                    </div>
                </TopContainer>
                <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', padding: '10px', borderBottom: '1px solid grey', borderRadius: '0px 0px 5px 5px', marginBottom: '10px' }}>OPD Refund Bill Receipt</div>
                <MidContainer>
                    <BillFromContainer>
                        <SubHeadings>Bill From:</SubHeadings>
                        <HospitalName>{hospitalDetails.hospital_name}</HospitalName>
                        <HospitalDetail>{`Website: ${hospitalDetails.website}, E-mail: ${hospitalDetails.email}`}</HospitalDetail>
                        <HospitalDetail>{hospitalDetails.phone}</HospitalDetail>
                        <HospitalAddress>{`${hospitalDetails.address}, ${hospitalDetails.city}, ${hospitalDetails.state_name}`}</HospitalAddress>
                    </BillFromContainer>
                    <BillToContainer>
                        <SubHeadings>Bill To:</SubHeadings>
                        <div style={{ padding: '5px', fontSize: '13px' }}>
                            <span>{patientDetails?.patientId} / <b>{patientDetails?.name}</b></span>
                        </div>
                        <HospitalDetail>{patientDetails?.phoneNo}</HospitalDetail>
                        <HospitalAddress>{patientDetails?.patientAddress}</HospitalAddress>
                    </BillToContainer>
                </MidContainer>
                <div style={{ marginTop: '20px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: 'grey', color: 'white' }}>
                            <tr>
                                <TableHeader>S.No</TableHeader>
                                <TableHeader>Service Name</TableHeader>
                                <TableHeader>Quantity</TableHeader>
                                <TableHeader>Service Price</TableHeader>
                                <TableHeader>Disc.(Rs.)</TableHeader>
                                <TableHeader>Amount(Rs.)</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                refundServices?.serviceDetails?.length >= 0 &&
                                refundServices?.serviceDetails?.map((ser: any, index: any) => {
                                    return (
                                        <>
                                            <tr>
                                                <TableData style={{ textAlign: 'center' }}>{index + 1}</TableData>
                                                <TableData>{ser.item_name}</TableData>
                                                <TableData style={{ textAlign: 'center' }}>{ser.qty}</TableData>
                                                <TableData style={{ textAlign: 'center' }}>{ser.service_unit_price}</TableData>
                                                <TableData style={{ textAlign: 'center' }}>{ser.service_discount}</TableData>
                                                <TableData style={{ textAlign: 'center' }}>{ser.service_unit_price - ser.service_discount}</TableData>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{ width: '100%', display: 'flex', padding: '20px 0mm' }}>
                    <div style={{ width: '60%' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '40%', backgroundColor: 'grey', color: 'white' }}>
                        <div style={{ padding: '5px 20px', fontSize: '15px', fontWeight: '600' }}>Total Amount:</div>
                        <div style={{ padding: '5px 20px', fontWeight: '600' }}>{refundServices?.netAmountPayable}</div>
                    </div>
                </div>
                <PrintButton className="no-print" onClick={handlePrint}>Print</PrintButton>
            </Content>
        </A4Page>
    )
}