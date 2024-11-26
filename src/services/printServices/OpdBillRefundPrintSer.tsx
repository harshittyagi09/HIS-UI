import axios from 'axios';

export const OpdBillHospitalDetailsSer = async (props: any) => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('Authentication token not found.');
            return;
        }
        const response = await axios.get(`http://localhost:34553/api/BillingDetails/HospitalBillHeader?BillNo=${props}&BillingGroup=OPD&BillType=CA`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

    } catch (error: any) {
        console.error('OpdBillHospitalDetailsSer API Failed', error.response?.data || error.message);
    }
}

export const RefundedBillPatientDetailsSer = async (billNo: any) => {
    try {
        const response = await axios.get(`http://localhost:34553/api/BillingManager/RefundedBillPatientDetails?billNo=${billNo}`);
        return response;

    } catch (error: any) {
        console.error('RefundedBillPatientDetailsSer API Failed', error.response?.data || error.message);
    }
}

export const GetRefundedServices = async (billNo: any) => {
    try {
        const response = await axios.get(`http://localhost:34553/api/BillingManager/GetNetAmountPayable?billNo=${billNo}`);
        return response;

    } catch (error: any) {
        console.error('GetRefundedServices API Failed', error.response?.data || error.message);
    }
}