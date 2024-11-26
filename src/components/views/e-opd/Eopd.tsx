import { useState, useEffect } from 'react';
import UserRoleMgmtImg from '../../images/ManageUsersIcon.png';
import SearchBar from '../../common/search/SearchBar';
import { GetFilledDiagosisOpd, GetPatientOpds, PfrService } from '../../../services/eOpdServices/PfrService';
import Paper from '@mui/material/Paper';
import { Btns, BtnsContainer, CardContainer, PageHeader, SideBar, Container, PatientId, PatientName, DoctorName, SubContainer, UserDataRaw, OpdNo, Reffered } from './Eopd.styles';
import DiagnosisInsertionModal from '../modals/e-opd/DiagnosisInsertionModal';
import { connect } from 'react-redux';
import { Link } from '@mui/material';

const Eopd = (props: any) => {

    const [opdPatients, setOpdPatients] = useState<any>([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [showDiagInsertion, setShowDiagInsertion] = useState<any>(false);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [filledDiagOpds, setFilledDiagOpds] = useState<any>([]);
    const [searchValue, setSearchValue] = useState('');
    const [isDataChange, setIsDataChange] = useState<any>(false);
    const [showPrevOpds, setShowPrevOpds] = useState<any>(false);
    const [patientOpds, setPatientOpds] = useState<any>([]);
    const [selectedOpdNo, setSelectedOpdNo] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pfrServiceRes = await PfrService();
                setOpdPatients(pfrServiceRes);
                setIsDataChange(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const res: any = await GetFilledDiagosisOpd();
                setFilledDiagOpds(res?.data);
            } catch (error) {
                console.error('Error fetching filled diagnosis opds:', error);
            }
        };
        fetchData();
    }, [isDataChange])

    useEffect(() => {
        // Filtering rows based on search value
        const filteredData = opdPatients?.filter((row: any) =>
            row.opdRegistrationNo.toString().includes(searchValue)
        );
        setTimeout(() => {
            setFilteredRows(filteredData);
        }, 300)
    }, [searchValue, opdPatients]);

    const handleSearchChange = (event: any) => {
        setSearchValue(event.target.value);
    }

    const handleMoreInfo = (opdRegistrationNo: any) => {
        setSelectedPatient(opdRegistrationNo)
        setShowDiagInsertion(true);
    }

    const handleShowOps = async (patientId: any, opdNo: any) => {
        setSelectedOpdNo(opdNo);
        try {
            const res: any = await GetPatientOpds(patientId);
            if (res?.status === 200) {
                setPatientOpds(res?.data);
                setShowPrevOpds(true);
            }
        } catch (error) {
            console.error('Error fetching GetPatientOpds', error);
        }
    }

    const handlePrintt = (opdNo: any, doctor_name: any, opd_type: any) => {
        const windowFeatures = "left=100,top=100,width=620,height=580";
        const url = `/opdPrint?opdNo=${encodeURIComponent(opdNo)}&doctor_name=${encodeURIComponent(doctor_name)}&opd_type=${encodeURIComponent(opd_type)}`;
        window.open(url, "popup", windowFeatures);
    }

    return (
        <div style={{ padding: '10px', backgroundColor: '#e0e0e05e' }}>
            <PageHeader >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={UserRoleMgmtImg} height='40px' />
                    <div style={{ fontSize: '25px', fontWeight: '700', color: 'white', padding: '0px 10px' }}>Doctor Prescription (e-OPD)</div>
                </div>
                <SearchBar page='e-opd' searchValue={searchValue} handleSearchChange={handleSearchChange} />
            </PageHeader>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
                <SideBar>
                </SideBar>
                <div style={{ marginLeft: '2%', flexGrow: 1, paddingTop: '5px' }}>
                    <Container>
                        <SubContainer>
                            {(searchValue === '' ? opdPatients : filteredRows)?.map((item: any, index: any) => (
                                <Paper style={{ backgroundColor: filledDiagOpds?.includes(item.opdRegistrationNo) ? '#f3c57e6b' : 'transparent' }} elevation={5}>
                                    <CardContainer opdNo={item.opdRegistrationNo} filledDiagOpds={filledDiagOpds} patientType={item.opdType} key={index}>
                                        {item.opdType === 'R' && <UserDataRaw style={{ justifyContent: 'center' }}>
                                            <Reffered>Reffered</Reffered>
                                        </UserDataRaw>}
                                        <UserDataRaw>
                                            <PatientName>{item.patientName}</PatientName>
                                            <PatientId>{item.patientId}</PatientId>
                                        </UserDataRaw>
                                        <UserDataRaw>
                                            <OpdNo>{item.opdRegistrationNo}</OpdNo>
                                            <DoctorName>{item.doctorName}</DoctorName>
                                        </UserDataRaw>
                                        <div>
                                            <BtnsContainer>
                                                <DoctorName style={{ color: 'black' }}>JR: {item.jrName}</DoctorName>
                                            </BtnsContainer>
                                            {showDiagInsertion && <DiagnosisInsertionModal isDataChange={isDataChange} setIsDataChange={setIsDataChange} dignosisData={props?.dignosisData} cardData={{ opdNo: item.opdRegistrationNo, patientId: item.patientId, patientCategoryId: item.patientCategoryId, doctorId: item.doctor_id, doctorName: item.doctorName, deptId: item.dept_id, campId: item?.campId, partnerId: item?.partnerId, SpeclnId: item.specialization_id }} opdRegistrationNo={item.opdRegistrationNo} selectedPatient={selectedPatient} showDiagInsertion={showDiagInsertion} setShowDiagInsertion={setShowDiagInsertion} />}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {
                                                (selectedOpdNo === item.opdRegistrationNo && showPrevOpds) ? (
                                                    <div style={{ display: 'flex' }}>
                                                        {(patientOpds?.diagnoses).map((opd: any, index: any) => (
                                                            <Link
                                                                key={index}
                                                                style={{ padding: '0px 10px', cursor: 'pointer', fontSize: '13px' }}
                                                                onClick={() => handlePrintt(opd.opdNo, item.doctor_name, item.opdType)}
                                                            >
                                                                {/* {index + 1} */}
                                                                {3 - index}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <Btns onClick={() => handleShowOps(item.patientId, item.opdRegistrationNo)}>Previous OPD's</Btns>
                                                )
                                            }
                                            <Btns onClick={() => handleMoreInfo(item.opdRegistrationNo)}>More Info</Btns>
                                        </div>
                                    </CardContainer>
                                </Paper>
                            ))}
                        </SubContainer>
                    </Container>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    dignosisData: state?.EOPD?.dignosisData
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Eopd);