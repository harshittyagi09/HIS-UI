import { useEffect, useState } from 'react'
import { MainContainer, Container, Heading, SubContainer, Btns, CardContainer, TimeSlot, UserDataRaw, DeptName, BtnsContainer } from './Department.styles'
import Paper from '@mui/material/Paper';
import { GetDepartmentsInfo } from '../../../../../services/generalSetUpServices/departmentServices/DepartmentServices';
import EditDepartmentModal from '../../../modals/generalSetUp/department/EditDepartmentModal';
import AddIcon from '@mui/icons-material/Add';
import AddDepartment from '../../../modals/generalSetUp/department/AddDepartment';
import SwitchButton from '../../../../common/switch/Switch';

export default function Department() {

    const [departments, setDepartments] = useState<any>([]);
    const [showEditDept, setShowEditDept] = useState<any>(false);
    const [showAddDept, setShowAddDept] = useState<any>(false);
    const [selectedDept, setSelectedDept] = useState<any>(null);
    const [reloadData, setReloadData] = useState<any>(false);
    const [deptStatus, setDeptStatus] = useState<any>("Active");

    useEffect(() => {
        const getData = async () => {
            try {
                const res: any = await GetDepartmentsInfo(deptStatus === "Active" ? "A" : "I");
                setDepartments(res?.data);
                setReloadData(false);
            } catch (err: any) {
                console.log("GetDepartmentsInfo api err", err);
            }
        }
        getData();
    }, [reloadData, deptStatus])

    const handleEditClick = (dept_id: any) => {
        setShowEditDept(true);
        setSelectedDept(dept_id);
    }

    const handleAddNewDept = () => {
        setShowAddDept(true);
    }

    const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeptStatus(e?.target?.checked ? 'Active' : 'InActive');
    }

    return (
        <MainContainer>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Heading>Manage Department</Heading>
                    <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
                        <SwitchButton page="departments" checked={deptStatus} handleSwitch={handleSwitch} />
                        <div style={{ position: 'relative', float: 'right', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '5px 10px', minWidth: '130px', fontSize: '13px', borderRadius: '20px', cursor: 'pointer', backgroundColor: '#566f82', color: 'white', width: 'fit-content', margin: '15px 10px' }} onClick={() => handleAddNewDept()}>
                            <AddIcon fontSize='small' sx={{ width: '15px', height: '15px', padding: '5px' }} /> Add Department
                        </div>
                    </div>
                </div>
                {
                    showAddDept && <AddDepartment showAddDept={showAddDept} setShowAddDept={setShowAddDept} />
                }
                <SubContainer>
                    {departments?.map((item: any, index: any) => (
                        <Paper elevation={5}>
                            <CardContainer key={index}>
                                <UserDataRaw>
                                    <DeptName>{item.dept_name}</DeptName>
                                    <TimeSlot>{item.appointment_time_slot}</TimeSlot>
                                </UserDataRaw>
                                <div>
                                    <BtnsContainer>
                                        <Btns style={{ color: '#40b4c1', margin: '0px 10px' }} onClick={() => handleEditClick(item.dept_id)}>Edit</Btns>
                                    </BtnsContainer>
                                    {
                                        showEditDept && <EditDepartmentModal deptdata={{ deptName: item.dept_name, timeSlot: item.appointment_time_slot, status: item.status, deptId: item.dept_id }} selectedDept={selectedDept} selectedCard={item.dept_id} showEditDept={showEditDept} setShowEditDept={setShowEditDept} setReloadData={setReloadData} />
                                    }
                                </div>
                            </CardContainer>
                        </Paper>
                    ))}
                </SubContainer>
            </Container>
        </MainContainer>
    )
}