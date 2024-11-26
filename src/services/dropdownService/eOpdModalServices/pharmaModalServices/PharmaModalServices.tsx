import axios from 'axios';

export const GetMedicinesSer = async() => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Pharma/GetPharmaItems`);
        return response;

    } catch (error: any) {
        console.error('GetMedicinesSer Error', error.response?.data || error.message);
    }
}

export const GetPrevPharmaSer = async (deptId: any, patientId: any, stageId: any) => {

    try {
        const response = await axios.get(`http://localhost:34553/api/Accounts/GetPharmaService?patientId=${patientId}&deptId=${deptId}&stageId=${stageId}`);
        return response;

    } catch (error: any) {
        console.error('GetPrevPharmaSer Error', error.response?.data || error.message);
    }
}