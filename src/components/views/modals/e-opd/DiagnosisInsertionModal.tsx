import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DiagName, MainHeading } from './DiagnosisInsertionModal.styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CCModal from '../CCModal';
import GPEModal from '../GPEModal';
import SysExamModal from '../SysExamModal';
import ProvDiag from '../ProvDiag';
import ProvDiagDropdownSer from '../../../../services/dropdownService/ProvDiagDropdownSer';
import FollowUpModal from '../FollowUpModal';
import InvestigationModal from '../InvestigationModal';
import PharmaModal from '../PharmaModal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '60%',
    // minHeight: '60vh',
    bgcolor: 'background.paper',
    backgroundColor: '#e9e9e9',
    boxShadow: 24,
    outline: 'none',
    p: 1,
    borderRadius: '5px',
    maxHeight: '95vh',
    overflowY: 'auto'
};

export default function DiagnosisInsertionModal(props: any) {
    const { isDataChange, setIsDataChange, dignosisData, cardData, opdRegistrationNo, selectedPatient, showDiagInsertion, setShowDiagInsertion } = props;

    const [provDiagOptions, setProvDiagOptions] = useState([]);
    const [selectedModal, setSelectedModal] = useState<string | null>('CC');
    const [showModal, setShowModal] = useState(selectedModal === 'CC' ? true : false);
    const [filledDiag, setFilledDiag] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await ProvDiagDropdownSer();
                setProvDiagOptions(res.data);
            } catch (error) {
                console.error('Error fetching ProvDiag data:', error);
            }
        };
        if (opdRegistrationNo === selectedPatient) {
            selectedModal === 'Prov.Diag' && fetchData();
        }
    }, [])

    useEffect(() => {
        // if (dignosisData.length >= 0) {
        //     const currFilledDiag: any = getFilledDiagnosis(dignosisData, cardData.opdNo);
        //     setFilledDiag(currFilledDiag);
        // }

        if (dignosisData.length >= 0) {
            const currFilledDiag: any = getFilledDiagnosis(dignosisData, cardData.opdNo);
            setFilledDiag(currFilledDiag);
            if (currFilledDiag[currFilledDiag.length - 1] === 'CC') {
                setSelectedModal('GPE');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'GPE') {
                setSelectedModal('Syst Exam');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'Syst Exam') {
                setSelectedModal('Prov.Diag');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'Prov.Diag') {
                setSelectedModal('TT Plan');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'TT Plan') {
                setSelectedModal('Investigation');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'Investigation') {
                setSelectedModal('Pharma');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'Pharma') {
                setSelectedModal('Follow Up');
                setShowModal(true);
            } else if (currFilledDiag[currFilledDiag.length - 1] === 'Follow Up') {
                // setShowDiagInsertion(false);
                setIsDataChange(true);
            }
        }


    }, [dignosisData]);

    const getFilledDiagnosis = (dignosisData: any, opdNo: any) => {
        const object = dignosisData.find((item: any) => item.opdNo === opdNo);
        if (object) {
            return Object.keys(object).filter(key => object[key] && key !== 'opdNo');
        }
        return [];
    };

    const handleActionClick = (e: any, opd_no: any) => {
        const clickedAction = e.target.innerText;

        if (clickedAction === 'CC') {
            setShowModal(true);
            setSelectedModal('CC');
        }
        else if (clickedAction === 'GPE') {
            setShowModal(true);
            setSelectedModal('GPE');
        }
        else if (clickedAction === 'Syst Exam') {
            setShowModal(true);
            setSelectedModal('Syst Exam');
        }
        else if (clickedAction === 'Prov.Diag') {
            setShowModal(true);
            setSelectedModal('Prov.Diag');
        }
        else if (clickedAction === 'TT Plan') {
            setShowModal(true);
            setSelectedModal('TT Plan');
        }
        else if (clickedAction === 'Investigation') {
            setShowModal(true);
            setSelectedModal('Investigation');
        }
        else if (clickedAction === 'Pharma') {
            setShowModal(true);
            setSelectedModal('Pharma');
        }
        else if (clickedAction === 'Follow Up') {
            setShowModal(true);
            setSelectedModal('Follow Up');
        }
        else {
            console.error("No Actions Found or Invalid Action");
        }
    };

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowDiagInsertion(false);
    };

    if (opdRegistrationNo !== selectedPatient) return null;

    return (
        <div>
            <Modal
                open={showDiagInsertion}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <MainHeading>Diagnosis Insertion</MainHeading>
                    <div style={{ display: 'flex', padding: '20px 10px', borderBottom: '1px solid grey', borderRadius: '3px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('CC')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: ' #40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>CC</DiagName>
                        </div>

                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('GPE')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>GPE</DiagName>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('Syst Exam')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>Syst Exam</DiagName>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('Prov.Diag')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>Prov.Diag</DiagName>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('TT Plan')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>TT Plan</DiagName>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('Investigation')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>Investigation</DiagName>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('Pharma')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>Pharma</DiagName>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                (filledDiag?.includes('Follow Up')) ?
                                    <CheckCircleIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} /> :
                                    <RadioButtonUncheckedIcon sx={{ fontSize: '20px' }} style={{ color: '#40b4c1' }} />
                            }
                            <hr style={{ minWidth: '25px', height: '0px', border: '0.1px solid grey', backgroundColor: 'grey' }} />
                            <DiagName onClick={(e: any) => handleActionClick(e, cardData.opdNo)}>Follow Up</DiagName>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '0px solid red', padding: '0px 0px 20px 0px' }}>
                        {
                            selectedModal === 'CC' && showModal && <CCModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} modalName={'Chief Complaint'} query={'Please enter the Chief Complaint'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'GPE' && showModal && <GPEModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'Syst Exam' && showModal && <SysExamModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'Prov.Diag' && showModal && <ProvDiag rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} provDiagOptions={provDiagOptions} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'TT Plan' && showModal && <CCModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} modalName={'T/T Plan'} query={'Please enter your treatment plan'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'Investigation' && showModal && <InvestigationModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, patientCategoryId: cardData.patientCategoryId, partnerId: cardData.partnerId, campId: cardData.campId, doctorId: cardData.doctorId, SpeclnId: cardData.SpeclnId, doctorName: cardData.doctorName, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} modalName={'Investigation'} query={'Search your desired Investigation detail here'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'Pharma' && showModal && <PharmaModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, doctorId: cardData.doctorId, doctorName: cardData.doctorName, deptId: cardData.deptId }} selectedOpdNo={selectedPatient} modalName={'Pharmacy'} query={'Search your desired Pharmacy detail here'} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                        {
                            selectedModal === 'Follow Up' && showModal && <FollowUpModal rowData={{ opdNo: selectedPatient, patientId: cardData.patientId, patientCategoryId: cardData.patientCategoryId, doctorId: cardData.doctorId, doctorName: cardData.doctorName, deptId: cardData.deptId, campId: cardData.campId, partnerId: cardData.partnerId }} selectedOpdNo={selectedPatient} showModal={showModal} setShowModal={(open: boolean) => setShowModal(open)} />
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
}