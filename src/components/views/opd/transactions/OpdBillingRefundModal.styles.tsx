import styled from "styled-components";
import TextField from '@mui/material/TextField';

export const MainHeading = styled.div`
    padding: 10px;
    color: black;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    border-bottom: 1px solid grey;
    border-radius: 3px;
`

export const SubHeadings = styled.div`
    padding: 5px 10px;
`

export const PatientDetailsContainer = styled.div`
    margin-bottom: 5px;
    background-color: #d9d9d95e;
    padding: 0px 10px 5px 10px;
`

export const DataContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const StyledLabel = styled.div`
    color: black;
    font-weight: 600;
    font-size: 15px;
    padding-right: 10px; 
`

export const StyledLabelValue = styled.div`
    padding: 5px;
    font-size: 14px;
`

export const StyledTextArea = styled(TextField)`
    width: 70%;
    padding: 5px 5px 5px 20px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0px !important;
    }

    .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root  {
        padding: 5px !important;
        margin-left: 5px;
    }
`

export const MgrApprovedSerContainer = styled.div`
    padding: 10px 0px;
    background-color: #d9d9d95e;
`

export const SubContainer = styled.div`
    height: 300px; 
    overflow-y: auto;
    max-height: 45vh;
`

export const ApprovedSerCont = styled.div`
    background-color: #fff;
    padding: 5px;
    margin: 5px 10px;
`

export const SerDataRaw = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 0px;
    justify-content: space-between;
`

export const ServiceName = styled.div`
    color: #C14D40;
    font-size: 15px;
    font-weight: 500;
    padding-left: 20px;
`

export const ServiceQuantity = styled.div`
    border-radius: 70%;
    background-color: #40b4c1;
    padding: 2px 7px;
    color: white;
`

export const SmallStyledLabel = styled.div`
    font-size: 13px;
    padding: 5px;
`

export const StyledTextField = styled(TextField)`
    width: 80px;
    padding: 3px;

    .MuiTextField-root .MuiInputBase-root:hover:not(.Mui-disabled):before {
        // border: 1px solid rgba(0, 0, 0, 0.42) !important;
    }

    & .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 3px 10px !important;
        font-size: 13px;
    }

    & .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
        border-radius: 0px !important;
    }
`

export const ApprovedBtn = styled.div`
    background-color: #40b4c1;
    padding: 8px;
    color: white;
    cursor: pointer;
    width: 15%;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 13px;
    margin-left: 10px;
`