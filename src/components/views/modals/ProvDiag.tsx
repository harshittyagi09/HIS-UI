
// import { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { MainHeading, StyledLabel, StyledTextField, LoginBtn, LinkDiv } from './ProvDiag.styles';
// import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { ProvDiagGetData, ProvDiagData, GetPrevProvDiagSer } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
// import { connect } from 'react-redux';
// import { setDignosisDetail } from '../../../redux/actions/EopdAction';

// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     minWidth: 350,
//     bgcolor: 'background.paper',
//     boxShadow: 0,
//     p: 4,
//     padding: '10px 30px',
//     borderRadius: '3px'
// };

// function ProvDiag(props: any) {

//     const { showModal, setShowModal, rowData } = props;
//     const [selectedOptions, setSelectedOptions] = useState<any>([]);
//     const [options, setOptions] = useState<any>([]);

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 let res: any = await ProvDiagGetData(rowData.opdNo);
//                 if (res?.status === 200) {
//                     setSelectedOptions(res?.data?.observations);
//                 } else {
//                     console.error('Error fetching in ProvDiagGetData:', res?.status);
//                 }
//             } catch (error) {
//                 console.error('Error fetching in ProvDiagGetData:', error);
//             }

//             try {
//                 let res: any = await ProvDiagData();;
//                 if (res?.status === 200) {
//                     setOptions(res?.data);
//                 } else {
//                     console.error('Error fetching in ProvDiagData:', res?.status);
//                 }
//             } catch (error) {
//                 console.error('Error fetching in ProvDiagData:', error);
//             }
//         }
//         if (rowData.opdNo === props.selectedOpdNo) {
//             getData();
//         }
//     }, [])

//     const filterOptions = (options: any, { inputValue }: any) => {
//         const searchTerms = inputValue?.toLowerCase().split(" ");

//         return options.filter((option: any) => {
//             const label = option?.label?.toLowerCase();
//             return searchTerms.every((term: any) => label?.includes(term));
//         });
//     };

//     const top100Films = [
//         { label: 'The Shawshank Redemption', year: 1994 },
//         { label: 'The Godfather', year: 1972 },
//         { label: 'The Godfather: Part II', year: 1974 },
//         { label: 'The Dark Knight', year: 2008 },
//         { label: '12 Angry Men', year: 1957 },
//         { label: "Schindler's List", year: 1993 },
//         { label: 'Pulp Fiction', year: 1994 },
//         { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
//         { label: 'The Good, the Bad and the Ugly', year: 1966 },
//         { label: 'Fight Club', year: 1999 },
//         { label: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
//         { label: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
//         { label: 'Forrest Gump', year: 1994 },
//         { label: 'Inception', year: 2010 },
//         { label: 'The Lord of the Rings: The Two Towers', year: 2002 },
//         { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
//         { label: 'Goodfellas', year: 1990 },
//         { label: 'The Matrix', year: 1999 },
//         { label: 'Seven Samurai', year: 1954 },
//         { label: 'Star Wars: Episode IV - A New Hope', year: 1977 },
//         { label: 'City of God', year: 2002 },
//         { label: 'Se7en', year: 1995 },
//         { label: 'The Silence of the Lambs', year: 1991 },
//         { label: "It's a Wonderful Life", year: 1946 },
//         { label: 'Life Is Beautiful', year: 1997 },
//         { label: 'The Usual Suspects', year: 1995 },
//         { label: 'Léon: The Professional', year: 1994 },
//         { label: 'Spirited Away', year: 2001 },
//         { label: 'Saving Private Ryan', year: 1998 },
//         { label: 'Once Upon a Time in the West', year: 1968 },
//         { label: 'American History X', year: 1998 },
//         { label: 'Interstellar', year: 2014 },
//         { label: 'Casablanca', year: 1942 },
//         { label: 'City Lights', year: 1931 },
//         { label: 'Psycho', year: 1960 },
//         { label: 'The Green Mile', year: 1999 },
//         { label: 'The Intouchables', year: 2011 },
//         { label: 'Modern Times', year: 1936 },
//         { label: 'Raiders of the Lost Ark', year: 1981 },
//         { label: 'Rear Window', year: 1954 },
//         { label: 'The Pianist', year: 2002 },
//         { label: 'The Departed', year: 2006 },
//         { label: 'Terminator 2: Judgment Day', year: 1991 },
//         { label: 'Back to the Future', year: 1985 },
//         { label: 'Whiplash', year: 2014 },
//         { label: 'Gladiator', year: 2000 },
//         { label: 'Memento', year: 2000 },
//         { label: 'The Prestige', year: 2006 },
//         { label: 'The Lion King', year: 1994 },
//         { label: 'Apocalypse Now', year: 1979 },
//         { label: 'Alien', year: 1979 },
//         { label: 'Sunset Boulevard', year: 1950 },
//         { label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
//         { label: 'The Great Dictator', year: 1940 },
//         { label: 'Cinema Paradiso', year: 1988 },
//         { label: 'The Lives of Others', year: 2006 },
//         { label: 'Grave of the Fireflies', year: 1988 },
//         { label: 'Paths of Glory', year: 1957 },
//         { label: 'Django Unchained', year: 2012 },
//         { label: 'The Shining', year: 1980 },
//         { label: 'WALL·E', year: 2008 },
//         { label: 'American Beauty', year: 1999 },
//         { label: 'The Dark Knight Rises', year: 2012 },
//         { label: 'Princess Mononoke', year: 1997 },
//         { label: 'Aliens', year: 1986 },
//         { label: 'Oldboy', year: 2003 },
//         { label: 'Once Upon a Time in America', year: 1984 },
//         { label: 'Witness for the Prosecution', year: 1957 },
//         { label: 'Das Boot', year: 1981 },
//         { label: 'Citizen Kane', year: 1941 },
//         { label: 'North by Northwest', year: 1959 },
//         { label: 'Vertigo', year: 1958 },
//         { label: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
//         { label: 'Reservoir Dogs', year: 1992 },
//         { label: 'Braveheart', year: 1995 },
//         { label: 'M', year: 1931 },
//         { label: 'Requiem for a Dream', year: 2000 },
//         { label: 'Amélie', year: 2001 },
//         { label: 'A Clockwork Orange', year: 1971 },
//         { label: 'Like Stars on Earth', year: 2007 },
//         { label: 'Taxi Driver', year: 1976 },
//         { label: 'Lawrence of Arabia', year: 1962 },
//         { label: 'Double Indemnity', year: 1944 },
//         { label: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
//         { label: 'Amadeus', year: 1984 },
//         { label: 'To Kill a Mockingbird', year: 1962 },
//         { label: 'Toy Story 3', year: 2010 },
//         { label: 'Logan', year: 2017 },
//         { label: 'Full Metal Jacket', year: 1987 },
//         { label: 'Dangal', year: 2016 },
//         { label: 'The Sting', year: 1973 },
//         { label: '2001: A Space Odyssey', year: 1968 },
//         { label: "Singin' in the Rain", year: 1952 },
//         { label: 'Toy Story', year: 1995 },
//         { label: 'Bicycle Thieves', year: 1948 },
//         { label: 'The Kid', year: 1921 },
//         { label: 'Inglourious Basterds', year: 2009 },
//         { label: 'Snatch', year: 2000 },
//         { label: '3 Idiots', year: 2009 },
//         { label: 'Monty Python and the Holy Grail', year: 1975 },
//     ];

//     const handleClose = (e: any) => {
//         e.stopPropagation();
//         setShowModal(false);
//     };

//     const handleSubmitClick = async (e: any) => {
//         e.stopPropagation();
//         if (selectedOptions.length > 0 && selectedOptions !== undefined && selectedOptions != '') {
//             let res: any = await DiagnosisInsertionService2({
//                 stageId: 4,
//                 opdNo: rowData.opdNo,
//                 PatientId: rowData.patientId,
//                 Observations: selectedOptions.join(",")
//             });
//             if (res?.status === 200) {
//                 props.setDignosisDetail(rowData.opdNo, { 'Prov.Diag': true });
//                 setShowModal(false);
//                 window.alert("Data Inserted Successfully :)");
//             } else {
//                 window.alert("Some problem in Insertion!");
//             }
//         } else {
//             window.alert(`please select any provisional diagnosis`);
//         }
//     }

//     const handleInputChange = (e: any) => {
//         if (selectedOptions !== '' && selectedOptions !== undefined) {
//             setSelectedOptions((prevOptions: any) => [...prevOptions, e?.target?.innerText]);
//         }
//     };

//     const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { value } = e.target;
//         setSelectedOptions(value.split(',').map(option => option.trim()));
//     };

//     const handleKeyPress = (e: any) => {
//         if (e.key === 'Enter') {
//             handleSubmitClick(e);
//         }
//     };

//     const handlePrevDiagClick = async (e: any, deptId: any, patientId: any) => {
//         try {
//             const res: any = await GetPrevProvDiagSer(deptId, patientId);
//             if (res?.status === 200) {
//                 setSelectedOptions(res?.data?.observations);
//             }
//         } catch (err: any) {
//             console.log("GetPrevProvDiagSer api err", err);
//         }
//     }

//     if (rowData.opdNo !== props.selectedOpdNo) return null;

//     console.log("options", options);

//     return (
//         <>
//             {/* <Modal
//                 open={showModal}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//                 sx={{
//                     "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
//                         backgroundColor: "#00000080"
//                     },
//                     "& > .css-roqh9h": {
//                         border: '2px solid transparent'
//                     }
//                 }}
//             >
//                 <Box sx={style}> */}
//             <div style={{ border: '0px solid green', padding: '10px 20px', minWidth: '70%', backgroundColor: '#f5f5f5', boxShadow: '0px 1px 5px 0.25px #80808057' }}>
//                 <MainHeading>Provisional Diagnosis</MainHeading>
//                 <StyledLabel>Search your desired Provisional Diagnosis here</StyledLabel>
//                 <div>
//                     <Autocomplete
//                         disablePortal
//                         disableClearable
//                         id="combo-box-demo"
//                         options={top100Films}
//                         onInputChange={handleInputChange}
//                         filterOptions={filterOptions}
//                         sx={{ width: 300 }}
//                         renderInput={(params) => <TextField {...params} label="Search Here...." />}
//                     />
//                 </div>
//                 <StyledTextField
//                     type="text"
//                     name="username"
//                     multiline
//                     rows={5}
//                     value={selectedOptions}
//                     onChange={handleTextChange}
//                     fullWidth
//                     placeholder='If no option matches, please type here...'
//                     style={{ margin: '20px 0px' }}
//                     onKeyPress={(e: any) => handleKeyPress(e)}
//                 />
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <LoginBtn onClick={handleSubmitClick}>Submit</LoginBtn>
//                     {/* <LoginBtn onClick={(e: any) => handlePrevDiagClick(e, rowData.deptId, rowData.patientId)}>Previous Diagnosis</LoginBtn> */}
//                     <LinkDiv style={{ display: 'flex' }}>Want to see Previous OPD Diagnosis?<div onClick={(e: any) => handlePrevDiagClick(e, rowData.deptId, rowData.patientId)} style={{ color: '#4074c1', cursor: 'pointer', paddingLeft: '5px' }}>Click here</div></LinkDiv>
//                 </div>
//             </div>
//             {/* </Box>
//             </Modal> */}
//         </>
//     );
// }

// const mapStateToProps = (state: any) => ({
//     // isUserAuthenticate: state?.AuthenticationInfo?.isUserAuthenticate
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     setDignosisDetail: (opdNo: any, updates: any) => dispatch(setDignosisDetail(opdNo, updates)),

// });

// export default connect(mapStateToProps, mapDispatchToProps)(ProvDiag);



import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainHeading, StyledLabel, StyledTextField, LoginBtn, LinkDiv } from './ProvDiag.styles';
import { DiagnosisInsertionService2 } from '../../../services/eOpdServices/DiagnosisInsertionService';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ProvDiagGetData, ProvDiagData, GetPrevProvDiagSer } from '../../../services/dropdownService/eOpdModalServices/getModalDataServices/GetModalDataServices';
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
    padding: '10px 30px',
    borderRadius: '3px'
};

function ProvDiag(props: any) {

    const { showModal, setShowModal, rowData } = props;
    const [selectedOptions, setSelectedOptions] = useState<any>('');
    const [options, setOptions] = useState<any>([]);
    const [newOption, setNewOption] = useState<any>('');

    useEffect(() => {
        const getData = async () => {
            try {
                let res: any = await ProvDiagGetData(rowData.opdNo);
                if (res?.status === 200) {
                    setSelectedOptions(res?.data?.observations);
                } else {
                    console.error('Error fetching in ProvDiagGetData:', res?.status);
                }
            } catch (error) {
                console.error('Error fetching in ProvDiagGetData:', error);
            }

            try {
                let res: any = await ProvDiagData();;
                if (res?.status === 200) {
                    setOptions(res?.data);
                } else {
                    console.error('Error fetching in ProvDiagData:', res?.status);
                }
            } catch (error) {
                console.error('Error fetching in ProvDiagData:', error);
            }
        }
        if (rowData.opdNo === props.selectedOpdNo) {
            getData();
        }
    }, [])

    const filterOptions = (options: any, { inputValue }: any) => {
        const searchTerms = inputValue?.toLowerCase().split(" ");

        return options.filter((option: any) => {
            const label = option?.label?.toLowerCase();
            return searchTerms.every((term: any) => label?.includes(term));
        });
    };

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
        { label: 'The Good, the Bad and the Ugly', year: 1966 },
        { label: 'Fight Club', year: 1999 },
        { label: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
        { label: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
        { label: 'Forrest Gump', year: 1994 },
        { label: 'Inception', year: 2010 },
        { label: 'The Lord of the Rings: The Two Towers', year: 2002 },
        { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { label: 'Goodfellas', year: 1990 },
        { label: 'The Matrix', year: 1999 },
        { label: 'Seven Samurai', year: 1954 },
        { label: 'Star Wars: Episode IV - A New Hope', year: 1977 },
        { label: 'City of God', year: 2002 },
        { label: 'Se7en', year: 1995 },
        { label: 'The Silence of the Lambs', year: 1991 },
        { label: "It's a Wonderful Life", year: 1946 },
        { label: 'Life Is Beautiful', year: 1997 },
        { label: 'The Usual Suspects', year: 1995 },
        { label: 'Léon: The Professional', year: 1994 },
        { label: 'Spirited Away', year: 2001 },
        { label: 'Saving Private Ryan', year: 1998 },
        { label: 'Once Upon a Time in the West', year: 1968 },
        { label: 'American History X', year: 1998 },
        { label: 'Interstellar', year: 2014 },
        { label: 'Casablanca', year: 1942 },
        { label: 'City Lights', year: 1931 },
        { label: 'Psycho', year: 1960 },
        { label: 'The Green Mile', year: 1999 },
        { label: 'The Intouchables', year: 2011 },
        { label: 'Modern Times', year: 1936 },
        { label: 'Raiders of the Lost Ark', year: 1981 },
        { label: 'Rear Window', year: 1954 },
        { label: 'The Pianist', year: 2002 },
        { label: 'The Departed', year: 2006 },
        { label: 'Terminator 2: Judgment Day', year: 1991 },
        { label: 'Back to the Future', year: 1985 },
        { label: 'Whiplash', year: 2014 },
        { label: 'Gladiator', year: 2000 },
        { label: 'Memento', year: 2000 },
        { label: 'The Prestige', year: 2006 },
        { label: 'The Lion King', year: 1994 },
        { label: 'Apocalypse Now', year: 1979 },
        { label: 'Alien', year: 1979 },
        { label: 'Sunset Boulevard', year: 1950 },
        { label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
        { label: 'The Great Dictator', year: 1940 },
        { label: 'Cinema Paradiso', year: 1988 },
        { label: 'The Lives of Others', year: 2006 },
        { label: 'Grave of the Fireflies', year: 1988 },
        { label: 'Paths of Glory', year: 1957 },
        { label: 'Django Unchained', year: 2012 },
        { label: 'The Shining', year: 1980 },
        { label: 'WALL·E', year: 2008 },
        { label: 'American Beauty', year: 1999 },
        { label: 'The Dark Knight Rises', year: 2012 },
        { label: 'Princess Mononoke', year: 1997 },
        { label: 'Aliens', year: 1986 },
        { label: 'Oldboy', year: 2003 },
        { label: 'Once Upon a Time in America', year: 1984 },
        { label: 'Witness for the Prosecution', year: 1957 },
        { label: 'Das Boot', year: 1981 },
        { label: 'Citizen Kane', year: 1941 },
        { label: 'North by Northwest', year: 1959 },
        { label: 'Vertigo', year: 1958 },
        { label: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
        { label: 'Reservoir Dogs', year: 1992 },
        { label: 'Braveheart', year: 1995 },
        { label: 'M', year: 1931 },
        { label: 'Requiem for a Dream', year: 2000 },
        { label: 'Amélie', year: 2001 },
        { label: 'A Clockwork Orange', year: 1971 },
        { label: 'Like Stars on Earth', year: 2007 },
        { label: 'Taxi Driver', year: 1976 },
        { label: 'Lawrence of Arabia', year: 1962 },
        { label: 'Double Indemnity', year: 1944 },
        { label: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
        { label: 'Amadeus', year: 1984 },
        { label: 'To Kill a Mockingbird', year: 1962 },
        { label: 'Toy Story 3', year: 2010 },
        { label: 'Logan', year: 2017 },
        { label: 'Full Metal Jacket', year: 1987 },
        { label: 'Dangal', year: 2016 },
        { label: 'The Sting', year: 1973 },
        { label: '2001: A Space Odyssey', year: 1968 },
        { label: "Singin' in the Rain", year: 1952 },
        { label: 'Toy Story', year: 1995 },
        { label: 'Bicycle Thieves', year: 1948 },
        { label: 'The Kid', year: 1921 },
        { label: 'Inglourious Basterds', year: 2009 },
        { label: 'Snatch', year: 2000 },
        { label: '3 Idiots', year: 2009 },
        { label: 'Monty Python and the Holy Grail', year: 1975 },
    ];

    const handleClose = (e: any) => {
        e.stopPropagation();
        setShowModal(false);
    };

    const handleSubmitClick = async (e: any) => {
        e.stopPropagation();
        if (selectedOptions.length > 0 && selectedOptions !== undefined && selectedOptions != '') {
            let res: any = await DiagnosisInsertionService2({
                stageId: 4,
                opdNo: rowData.opdNo,
                PatientId: rowData.patientId,
                // Observations: selectedOptions.join(",")
                Observations: selectedOptions
            });
            if (res?.status === 200) {
                props.setDignosisDetail(rowData.opdNo, { 'Prov.Diag': true });
                setShowModal(false);
                window.alert("Data Inserted Successfully :)");
            } else {
                window.alert("Some problem in Insertion!");
            }
        } else {
            window.alert(`please select any provisional diagnosis`);
        }
    };

    // const handleInputChange = (e: any) => {
    //     console.log("handleInputChange calleddd");
    //     if (selectedOptions !== '' && selectedOptions !== undefined) {
    //         setSelectedOptions((prevOptions: any) => [...prevOptions, e?.target?.innerText]);
    //     }
    // };

    const handleInputChange = (e: any) => {
        const selectedDiag = e?.target?.innerText;
        setNewOption(selectedDiag);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log("value", value);
        // setSelectedOptions(value.split(',').map(option => option.trim()));
        setSelectedOptions(value);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmitClick(e);
        }
    };

    const handleAddClick = () => {
        if (newOption && newOption.trim() !== '') {
            setSelectedOptions((prevOptions: string) => {
                return prevOptions ? `${prevOptions}, ${newOption}` : newOption;
            });
        }
    }

    const handlePrevDiagClick = async (e: any, deptId: any, patientId: any) => {
        try {
            const res: any = await GetPrevProvDiagSer(deptId, patientId);
            if (res?.status === 200) {
                setSelectedOptions(res?.data?.observations);
            }
        } catch (err: any) {
            console.log("GetPrevProvDiagSer api err", err);
        }
    }

    if (rowData.opdNo !== props.selectedOpdNo) return null;

    // console.log("options", options);

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
            >
                <Box sx={style}> */}
            <div style={{ border: '0px solid green', padding: '10px 20px', minWidth: '70%', backgroundColor: '#f5f5f5', boxShadow: '0px 1px 5px 0.25px #80808057' }}>
                <MainHeading>Provisional Diagnosis</MainHeading>
                <StyledLabel>Search your desired Provisional Diagnosis here</StyledLabel>
                <Autocomplete
                    disablePortal
                    disableClearable
                    id="combo-box-demo"
                    options={top100Films}
                    onInputChange={handleInputChange}
                    filterOptions={filterOptions}
                    sx={{
                        width: 300,
                        '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                            fontSize: '13px',
                            transform: 'translate(14px, 10px) scale(1)'
                        }
                    }}
                    // renderInput={(params) => <TextField {...params} label="Search Here...." />}
                    renderInput={(params) => <TextField {...params} label="Search Here...."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                padding: '2px',
                                '& .MuiAutocomplete-input': {
                                    padding: '4px',
                                },
                                '& .css-1ovvzo2-MuiAutocomplete-root .MuiOutlinedInput-root': {
                                    padding: '0px'
                                },
                                '& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper': {
                                    fontSize: '13px'
                                }
                            }
                        }} />}
                />
                <LoginBtn onClick={handleAddClick}>Add</LoginBtn>
                <StyledTextField
                    type="text"
                    name="username"
                    multiline
                    rows={5}
                    value={selectedOptions}
                    onChange={handleTextChange}
                    fullWidth
                    placeholder='If no option matches, please type here...'
                    style={{ margin: ' 10px 0px 20px 0px', fontSize: '13px' }}
                    sx={{
                        '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputMultiline.css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input': {
                            fontSize: '13px'
                        }
                    }}
                    onKeyPress={(e: any) => handleKeyPress(e)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <LoginBtn onClick={handleSubmitClick}>Submit</LoginBtn>
                    {/* <LoginBtn onClick={(e: any) => handlePrevDiagClick(e, rowData.deptId, rowData.patientId)}>Previous Diagnosis</LoginBtn> */}
                    <LinkDiv style={{ display: 'flex' }}>Want to see Previous OPD Diagnosis?<div onClick={(e: any) => handlePrevDiagClick(e, rowData.deptId, rowData.patientId)} style={{ color: '#4074c1', cursor: 'pointer', paddingLeft: '5px' }}>Click here</div></LinkDiv>
                </div>
            </div>
            {/* </Box>
            </Modal> */}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    // isUserAuthenticate: state?.AuthenticationInfo?.isUserAuthenticate
});

const mapDispatchToProps = (dispatch: any) => ({
    setDignosisDetail: (opdNo: any, updates: any) => dispatch(setDignosisDetail(opdNo, updates)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ProvDiag);