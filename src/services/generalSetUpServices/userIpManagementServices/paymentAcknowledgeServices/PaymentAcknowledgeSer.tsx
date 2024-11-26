import axios from "axios";

// User Management Initial Screen
export const GetAcknowledgedDataDetails = async (searchParams: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }


        let apiUrl = `http://localhost:34553/api/BillingDetails/GetPaymentListForAcknowledge?FromDate=${encodeURIComponent(searchParams.fromDate)}&ToDate=${encodeURIComponent(searchParams.toDate)}&BillingGroup=${encodeURIComponent(searchParams.biilinggroup)}`;

        if (searchParams?.PatientId) {
            apiUrl += `&PatientId=${encodeURIComponent(searchParams?.PatientId)}`;
        }

        const res = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (err: any) {
        console.log("GetServiceAckUsersList error", err);
    }
}

// AcknowledgePaymentModal Service

export const AckPaymentService = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response: any = await axios.put(`http://localhost:34553/api/BillingManager/UpdatePaymentVerification?ReceiptNo=${props?.receiptNo}`,
            props?.payData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (err: any) {
        console.error("AckPaymentService error", err);
        throw err;
    }
};

export const CancelPaymentService = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response: any = await axios.put(`http://localhost:34553/api/BillingManager/CancelPatientStatus?ReceiptNo=${props?.receiptNo}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response;
    } catch (err: any) {
        console.error("UpdatePaymentModeService error", err);
        throw err;
    }
};

export const GetPaymentModeTypesService = async () => {
    try {
        const getPaymentModeTypesSerRes: any = await axios.get('http://localhost:34553/api/BillingManager/GetPayMode?BillType=CA');
        return getPaymentModeTypesSerRes;
    } catch (err: any) {
        console.log("GetPaymentModeTypesService err", err);
    }
}

export const UpdatePaymentModeService = async (paymentDetails: any) => {

    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const getBodyData = (payMode: any, paymentDetails: any) => {
            switch (payMode) {

                case 'CA':
                case 'CP':
                case 'BT':
                case 'UP':
                case 'DC':
                    return {
                        PatientPayment: {
                            ReceiptNo: paymentDetails?.paymentData?.ReceiptNo,
                            PaymentDate: paymentDetails?.paymentData?.PaymentDate,
                            BillNo: paymentDetails?.paymentData?.BillNo,
                            PaidAmount: paymentDetails?.paymentData?.PaidAmount,
                            PayMode: paymentDetails?.paymentData?.payMode,
                            PaymentType: "BP", //fix
                            UpdateRemarks: paymentDetails?.paymentData?.UpdateRemarks,
                            PayModeShort: paymentDetails?.paymentData?.payMode
                        },
                        PatientPaymentDetails: [],
                        LocationId: 1 // fix
                    };
                case 'CH':
                case 'CC':
                case 'DD':
                    return {
                        PatientPayment: {
                            ReceiptNo: paymentDetails?.paymentData?.ReceiptNo,
                            PaymentDate: paymentDetails?.paymentData?.PaymentDate,
                            BillNo: paymentDetails?.paymentData?.BillNo,
                            PaidAmount: paymentDetails?.paymentData?.PaidAmount,
                            PayMode: paymentDetails?.paymentData?.payMode,
                            PaymentType: "BP", //fix
                            UpdateRemarks: paymentDetails?.paymentData?.UpdateRemarks,
                            PayModeShort: paymentDetails?.paymentData?.payMode
                        },
                        PatientPaymentDetails: [
                            {
                                ReceiptNo: paymentDetails?.paymentData?.ReceiptNo,
                                ChequeDDCCNo: paymentDetails?.paymentData?.ChequeDDCCNo,
                                BankName: paymentDetails?.paymentData?.BankName,
                                ChequeDDdate: paymentDetails?.paymentData?.ChequeDDdate,
                                ChequeDDCCAmount: paymentDetails?.paymentData?.CreditCardChequeDDCCAmount,
                                CCHolderName: paymentDetails?.paymentData?.CCHolderName,
                                CCType: paymentDetails?.paymentData?.CCType,
                                BatchNo: paymentDetails?.paymentData?.BatchNo,
                                InvoiceNo: paymentDetails?.paymentData?.InvoiceNo
                            }
                        ],
                        LocationId: 1
                    };

                default:
                    console.error(`No body data found for stageId ${paymentDetails?.paymentData?.payMode}`);
                    return null;
            }
        };

        // Get the body data for the current paymode
        const bodyData = getBodyData(paymentDetails?.paymentData?.payMode, paymentDetails);
        if (!bodyData) {
            console.error(`No valid body data for selected payment mode ${paymentDetails?.paymentData?.payMode}`);
            return;
        }

        const response = await axios.post(`http://localhost:34553/api/BillingManager/UpdatePaymentPayMode`,
            bodyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response;

    } catch (error: any) {
        console.error('DiagnosisInsertionService2 Failed', error.response?.data || error.message, error);
    }
};