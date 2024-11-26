import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { LoginBtn, MainHeading, StyledLabel, StyledTextField } from './EditRoleModal.styles';
import { EditRoleService } from '../../../../../services/generalSetUpServices/manageUserRolesServices/ManageUserRoleSercices';

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
    p: 1,
};

export default function EditRoleModal(props: any) {

    const { roleId, roleName, selectedRawId, showEditRole, setShowEditRole, selectedRoleId, setReloadData } = props;

    const [changedRoleName, setChangedRoleName] = useState<any>(roleName);
    const [status, setStatus] = useState<any>('A');

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowEditRole(false);
    };

    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setChangedRoleName(value);
    };

    const handleKeyPress = (e: any, roleName: any) => {
        if (e.key === 'Enter') {
            handleUpdateClick(e, roleName);
        }
    };

    const handleUpdateClick = async (e: any, roleName: any) => {
        e.stopPropagation();
        try {
            const res: any = await EditRoleService(selectedRoleId, roleName, status);
            if (res?.status === 200) {
                window.alert("New role updated successfully :)");
                setShowEditRole(false);
                setReloadData(true);
            }
        } catch (err: any) {
            console.log("AddNewRoleRes api err", err);
        }
    };

    const handleChange = (e: any) => {
        setStatus(e.target.value);
    };

    if (roleId !== selectedRawId) return null;

    return (
        <div>
            <Modal
                open={showEditRole}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    '&. .css-1k4hvgc': {
                        borderColor: 'transparent'
                    }
                }}
            >
                <Box sx={style}>
                    <MainHeading>Edit Role</MainHeading>
                    <StyledLabel>Role Name</StyledLabel>
                    <StyledTextField
                        type="text"
                        name="roleName"
                        value={changedRoleName}
                        onChange={handleInputChange}
                        fullWidth
                        onKeyPress={(e: any) => handleKeyPress(e, changedRoleName)}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <StyledLabel>Status: </StyledLabel>
                        <div style={{ marginLeft: '10px', fontSize: '13px' }}>
                            <input
                                style={{ marginRight: '5px', alignItems: 'center' }}
                                type="radio"
                                checked={status === 'A'}
                                name="status"
                                value="A"
                                onChange={handleChange}
                            /> Active
                            <input
                                style={{ marginLeft: '10px', marginRight: '5px' }}
                                type="radio"
                                checked={status === 'I'}
                                name="status"
                                value="I"
                                onChange={handleChange}
                            /> InActive
                        </div>
                    </div>
                    <LoginBtn onClick={(e: any) => handleUpdateClick(e, changedRoleName)}>Update</LoginBtn>
                </Box>
            </Modal>
        </div>
    );
}
