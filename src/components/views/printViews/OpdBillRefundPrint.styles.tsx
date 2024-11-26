import styled from 'styled-components';

export const A4Page = styled.div`
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media print {
    box-shadow: none;
  }
`

export const Content = styled.div`
  padding: 5mm 10mm;
`

export const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const BillFromContainer = styled.div`

`

export const BillToContainer = styled.div`
    
`

export const StyledLabel = styled.div`
  font-size: 15px;
  color: grey;
  font-weight: 500;
  padding: 5px;
`
export const StyledLabelValue = styled.div`
  font-size: 15px;
  color: black;
  padding: 5px;
`

export const MidContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`

export const SubHeadings = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 5px;
  color: black;
`

export const HospitalName = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 5px;
`

export const HospitalDetail = styled.div`
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  padding: 3px 5px;
`

export const HospitalAddress = styled.div`
  font-size: 13px;
  font-weight: 400;
  padding: 5px;
`

export const Column = styled.div`
  width: 50%;
  padding: 2.5px 10px;
  border: 1px solid black;
`

export const TableHeader = styled.th`
  padding: 5px;
  font-size: 15px;
`
export const TableData = styled.td`
  padding: 5px;
  font-size: 15px;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
`

export const PrintButton = styled.div`
  background-color: #4074c1;
  padding: 10px;
  color: white;
  cursor: pointer;
  width: 10%;
  text-align: center;
  border-radius: 5px;
  margin: 20px 0px;

  @media print {
    display: none;
  }
`