import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, StyledTextField, LoginBtn, LinkDiv } from './CCModal.styles';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import { CcModalGetData, GetPrevCCSer, GetPrevTTSer, TtPlanGetData } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
import { connect } from 'react-redux';
import { setDignosisDetail } from '../../../redux/actions/EopdAction';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: 4,
    padding: '10px 20px',
    borderRadius: '3px'
};

function CCModal(props: any) {

    const [ccValue, setCCValue] = useState('');
    const { showModal, setShowModal, modalName, query, rowData } = props;

    useEffect(() => {
        const getData = async () => {
            let res: any = modalName === 'Chief Complaint' ? await CcModalGetData(rowData.opdNo) : await TtPlanGetData(rowData.opdNo);
            if (res?.status === 200) {
                setCCValue(res?.data?.observations ? res?.data?.observations : '');
            }
            else if (res?.status === 404) {
                setCCValue('');
            }
        }
        if (rowData.opdNo === props.selectedOpdNo) {
            getData();
        }
    }, [])

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleSubmitClick = async (e: any, rowData: any) => {
        e.stopPropagation();
        if (ccValue != '') {
            let res: any = await DiagnosisInsertionService2({
                stageId: props.modalName === 'Chief Complaint' ? 1 : 5,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                Observations: ccValue
            });

            if (res?.status === 200) {
                props.setDignosisDetail(rowData.opdNo, (props.modalName === 'Chief Complaint' ? { CC: true } : { 'TT Plan': true }));
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert(`please enter some ${(props.modalName === 'Chief Complaint' ? 'cc' : 'ttPlan')} value`);
        }

    };

    const handlePrevDiagClick = async (e: any, deptId: any, patientId: any, modalName: any) => {
        try {
            const res: any = modalName === 'Chief Complaint' ? await GetPrevCCSer(deptId, patientId) : await GetPrevTTSer(deptId, patientId);
            if (res?.status === 200) {
                setCCValue(res?.data.observations ? res?.data?.observations : '');
            }
        } catch (err: any) {
            console.log("GetPrevCCSer || GetPrevTTSer api err", err);
        }
    };

    const handleInputChange = (e: any) => {
        const { value } = e.target;
        setCCValue(value);
    };

    const handleKeyPress = (e: any, rowData: any) => {
        if (e.key === 'Enter') {
            handleSubmitClick(e, rowData);
        }
    };

    if (rowData.opdNo !== props.selectedOpdNo) return null;

    return (
        <>
            {/* <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                        backgroundColor: "#00000080"
                    },
                    "& > .css-roqh9h": {
                        border: '2px solid transparent'
                    }
                }}
            > */}
            {/* <Box sx={style} bgcolor={'pink'}> */}
            <div style={{ border: '0px solid green', padding: '10px 20px', minWidth: '70%', backgroundColor: '#f5f5f5', boxShadow: '0px 1px 5px 0.25px #80808057' }}>
                <MainHeading>{modalName}</MainHeading>
                <StyledLabel>{query}</StyledLabel>
                <StyledTextField
                    type="text"
                    name="username"
                    value={ccValue}
                    onChange={handleInputChange}
                    fullWidth
                    onKeyPress={(e: any) => handleKeyPress(e, rowData)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <LoginBtn onClick={(e: any) => handleSubmitClick(e, rowData)}>Submit</LoginBtn>
                    {/* <LoginBtn onClick={(e: any) => handlePrevDiagClick(e, rowData.deptId, rowData.patientId, modalName)}>Previous Diagnosis</LoginBtn> */}
                    <LinkDiv style={{ display: 'flex' }}>Want to see Previous OPD Diagnosis?<div onClick={(e: any) => handlePrevDiagClick(e, rowData.deptId, rowData.patientId, modalName)} style={{ color: '#4074c1', cursor: 'pointer', paddingLeft: '5px' }}>Click here</div></LinkDiv>
                </div>
            </div>
            {/* </Box> */}
            {/* </Modal> */}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    // isUserAuthenticate: state?.AuthenticationInfo?.isUserAuthenticate
});

const mapDispatchToProps = (dispatch: any) => ({
    setDignosisDetail: (opdNo: any, updates: any) => dispatch(setDignosisDetail(opdNo, updates)),

});

export default connect(mapStateToProps, mapDispatchToProps)(CCModal);