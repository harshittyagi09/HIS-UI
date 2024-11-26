import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Container, LoginBtn, MainHeading, StyledLabel, StyledTextField } from './AddDepartment.styles';
import { AddNewDeptService } from '../../../../../services/generalSetUpServices/departmentServices/DepartmentServices';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    outline: 'none',
    boxShadow: 24,
    p: 2,
};

export default function AddDepartment(props: any) {

    const { showAddDept, setShowAddDept } = props;

    const [newDeptData, setNewDeptData] = useState<any>({
        deptName: '',
        timeSlot: ''
    });

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowAddDept(false);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewDeptData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleAddClick = async () => {
        try {
            const res: any = await AddNewDeptService({ dept_name: newDeptData.deptName, appointment_time_slot: newDeptData.timeSlot });
            if (res?.status === 200) {
                window.alert("New Departmentadded successfully :)");
                setShowAddDept(false);
            }
        } catch (err: any) {
            console.log("UpdateDepartmentTimeSlot api err", err);
        }
    }


    return (
        <div>
            <Modal
                open={showAddDept}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Add New Department</MainHeading>
                    <Container>
                        <StyledLabel>Department Name</StyledLabel>
                        <StyledTextField name="deptName" value={newDeptData.deptName} onChange={(e: any) => handleChange(e)} />
                    </Container>
                    <Container>
                        <StyledLabel>Appointment Time Slot(In Minutes)</StyledLabel>
                        <StyledTextField name="timeSlot" value={newDeptData.timeSlot} onChange={(e: any) => handleChange(e)} />
                    </Container>
                    <LoginBtn onClick={(e: any) => handleAddClick()}>Add</LoginBtn>
                </Box>
            </Modal>
        </div>
    );
}