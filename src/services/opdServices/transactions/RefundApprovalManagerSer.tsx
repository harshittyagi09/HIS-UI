import axios from "axios";

// Get all bills in Refund Approval Manager
export const GetBillsForRefund = async (days: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/BillingManager/GetBillsForRefund?days=${days}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error: any) {
        console.error('GetBillsForRefund API Failed', error.response?.data || error.message);
    }
};

export const GetSearchedBillsSer = async (searchParam: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/BillingManager/GetRefundDetailsById?searchParam=${searchParam}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error: any) {
        console.error('GetSearchedBillsSer API Failed', error.response?.data || error.message);
    }
};

// RefundAppForMgrModal Services
export const GetBillingServices = async (billNo: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }

        const response = await axios.get(`http://localhost:34553/api/BillingManager/GetBillingAggregate?billNo=${billNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error: any) {
        console.error('GetBillingServices API Failed', error.response?.data || error.message);
    }
};

export const ApproveBillServices = async (billNo: any, patientId: any, selectedSer: any) => {

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Authentication token not found.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:34553/api/BillingManager/RefundApproveForManager',
            {
                billNo: billNo,
                patientId: patientId,
                refundRemarkList: selectedSer
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