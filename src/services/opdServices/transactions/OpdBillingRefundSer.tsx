import axios from "axios";

// OPD Billing Refund
export const GetApprovedRefundBills = async (days: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/BillingManager/GetApprovedRefundBills?days=${days}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error: any) {
        console.error('GetApprovedRefundBills API Failed', error.response?.data || error.message);
    }
};

// OpdBillingRefundModal Services
export const ApprovedManagerBillsSer = async (billNo: any, patientId: any, remarks: any, refundReasonId: any, selectedSer: any) => {

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:34553/api/BillingManager/InsertServiceRefund',
            {
                billNo: billNo,
                patientID: patientId,
                refundReasonID: refundReasonId,
                refundMode: "CA",
                createdBy: userId,
                refundRemarks: remarks,
                refundDetails: selectedSer
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response;

    } catch (error: any) {
        throw new Error(`ApproveBillServices error: ${error?.message}`);
    }
};

export const GetRefundReasons = async() => {
    try {
        const response = await axios.get('http://localhost:34553/api/BillingManager/RefundReason');
        return response;

    } catch (error: any) {
        console.error('GetRefundReasons API Failed', error.response?.data || error.message);
    }
};