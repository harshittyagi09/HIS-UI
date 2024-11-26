import { useState, useEffect } from 'react';
import { ActionBtns, Heading, LeftContainer, MainContainer, MainHeadingCont, RightContainer, RightSubContainer, SearchContainer, SearchIconWrapper, StyledInputBase } from './TransactionsHandling.styles';
import PaymentAcknowledge from '../transactions/paymentAcknowledge/PaymentAcknowledge';
import RefundApprovalMgr from '../transactions/refundApprovalManager/RefundApprovalMgr';
import OpdBillingRefund from '../transactions/opdBillingRefund/OpdBillingRefund';
import SelectDropdown from '../../../common/select/SelectDropdown';
import SearchIcon from '@mui/icons-material/Search';
import { GetBillsForRefund, GetSearchedBillsSer } from '../../../../services/opdServices/transactions/RefundApprovalManagerSer';
import { GetApprovedRefundBills } from '../../../../services/opdServices/transactions/OpdBillingRefundSer';

function SearchBar(props: any) {

    const placeholderMapping: any = {
        addRole: 'Search Role...',
        serviceAcknowledgement: 'OPD No...',
        userManagement: 'Serach by Username...',
        userIpManagement: 'Search by Employee...',
        gridTable: 'OPD No...',
        doctorDetails: 'Search Doctor...',
        paymentAck: 'Search by PatientId...'
    };

    const getPlaceholder = (pageName: any) => {
        return placeholderMapping[pageName] || 'Search...';
    };

    return (
        <SearchContainer page={props?.page}>
            {
                props?.page !== 'serviceAcknowledgement' &&
                <SearchIconWrapper>
                    <SearchIcon style={{ height: '20px' }} />
                </SearchIconWrapper>
            }
            <StyledInputBase
                placeholder={getPlaceholder(props?.page)}
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchValue}
                onChange={props.handleSearchChange}
            />
        </SearchContainer>
    );
}

interface Data {
    id: number;
    BillNo: string;
    BillDate: string;
    BiilingGroup: string;
    PatientId: string;
    PatientName: string;
}

function createData(
    id: number,
    BillNo: string,
    BillDate: string,
    BiilingGroup: string,
    PatientId: string,
    PatientName: string,
): Data {
    return {
        id,
        BillNo,
        BillDate,
        BiilingGroup,
        PatientId,
        PatientName,
    };
}

export default function TransactionsHandling() {
    const [currUserType, setCurrUserType] = useState<any>('Refund Approval Manager');
    const [searchValue, setSearchValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<any>([]);
    const [bills, setBills] = useState<any>([]);
    const [selectedDays, setSelectedDays] = useState<any>(2);
    const [reloadData, setReloadData] = useState<any>(false);

    const daysOptions: any = [
        { label: "Last 2 Days", value: 2 },
        { label: "Last 5 Days", value: 5 },
        { label: "Last 10 Days", value: 10 },
        { label: "Last 15 Days", value: 15 }
    ];

    useEffect(() => {
        const getData = async () => {
            try {
                let res;
                // Check if searchValue is not empty
                if (searchValue.trim() !== '') {
                    // Call the search API when searchValue is not empty
                    res = await GetSearchedBillsSer(searchValue);
                    setFilteredUsers(res?.data); // Show filtered data
                    setReloadData(false);
                } else {
                    // Call the appropriate function based on the user type when searchValue is empty
                    if (currUserType === "Refund Approval Manager") {
                        res = await GetBillsForRefund(selectedDays);
                    } else {
                        res = await GetApprovedRefundBills(selectedDays);
                    }

                    const mappedData = res?.data?.map((item: any, index: number) =>
                        createData(
                            index + 1,
                            item.BillNo,
                            item.BillDate,
                            item.BiilingGroup,
                            item.PatientId,
                            item.PatientName
                        )
                    );
                    setBills(mappedData);
                    setFilteredUsers(mappedData);
                    setReloadData(false);
                }
            } catch (err: any) {
                console.log("API error", err);
            }
        };


        getData();
    }, [selectedDays, currUserType, searchValue, reloadData])


    useEffect(() => {
        const getData = async () => {
            if (searchValue !== '') {
                try {
                    const res: any = await GetSearchedBillsSer(searchValue);
                    setBills(res?.data);
                } catch (err: any) {
                    console.log("GetUsersCountSer api err", err);
                }
            }
        }
        getData();

    }, [searchValue])

    const handleBtns = (activeTab: any) => {
        setCurrUserType(activeTab);
    }

    const handleDays = (e: any) => {
        const day: any = daysOptions.find((day: any) => day.label === e.target.value);
        if (day) {
            let dayCount: any = day?.value;
            setSelectedDays(dayCount);
        }
    }

    const handleSearchChange = async (e: any) => {
        const searchText = e?.target?.value;
        setSearchValue(searchText);
        if (searchText.trim() === '') {
            setFilteredUsers(bills); // Show all data when search is empty
        } else {
            try {
                const res: any = await GetSearchedBillsSer(searchValue);
                setFilteredUsers(res?.data); // Show filtered data
            } catch (err: any) {
                console.log("GetSearchedBillsSer api err", err);
            }
        }
    }

    return (
        <MainContainer>
            <LeftContainer>
                <div style={{ width: '100%', minWidth: '150px' }}>
                    <ActionBtns currUserType={currUserType} onClick={() => handleBtns('Payment Acknowledge')} style={{ backgroundColor: currUserType === 'Payment Acknowledge' ? '#40b4c1' : '#89828252', color: currUserType === 'Payment Acknowledge' ? 'white' : 'black' }}>Payment Acknowledge</ActionBtns>
                    <ActionBtns currUserType={currUserType} onClick={() => handleBtns('Refund Approval Manager')} style={{ backgroundColor: currUserType === 'Refund Approval Manager' ? '#40b4c1' : '#89828252', color: currUserType === 'Refund Approval Manager' ? 'white' : 'black' }}>Refund Approval Manager</ActionBtns>
                    <ActionBtns currUserType={currUserType} onClick={() => handleBtns('OPD Billing Refund')} style={{ backgroundColor: currUserType === 'OPD Billing Refund' ? '#40b4c1' : '#89828252', color: currUserType === 'OPD Billing Refund' ? 'white' : 'black' }}>OPD Billing Refund</ActionBtns>
                </div>
            </LeftContainer>
            <RightContainer>
                <MainHeadingCont>
                    <Heading>{currUserType}</Heading>
                    {
                        currUserType === 'Payment Acknowledge' &&
                        // <SearchContainerPrev>
                        <SearchBar page='extraa' searchValue={searchValue} handleSearchChange={handleSearchChange} />
                        // </SearchContainerPrev>
                    }
                </MainHeadingCont>
                {
                    (currUserType === 'Refund Approval Manager' || currUserType === 'OPD Billing Refund') &&
                    <div style={{ padding: '0px 10px', display: 'flex', alignItems: 'center' }}>
                        <SelectDropdown style={{ width: '120px' }} dropdownPage={'extra'} required={true} handleDays={(e: any) => handleDays(e)} dropdown='selectDaysBill' values={daysOptions} />
                        <SearchBar page='extra' searchValue={searchValue} handleSearchChange={handleSearchChange} />
                    </div>
                }
                {
                    currUserType === 'Payment Acknowledge' && <PaymentAcknowledge />
                }
                <RightSubContainer>
                    {
                        currUserType === 'Refund Approval Manager' && <RefundApprovalMgr rows={bills} filteredUsers={filteredUsers} setReloadData={setReloadData} />
                    }
                    {
                        currUserType === 'OPD Billing Refund' && <OpdBillingRefund rows={bills} filteredUsers={filteredUsers} setReloadData={setReloadData} />
                    }
                </RightSubContainer>
            </RightContainer>
        </MainContainer>
    );
}