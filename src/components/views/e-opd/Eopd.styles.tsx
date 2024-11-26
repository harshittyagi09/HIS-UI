import styled from "styled-components";

interface CardContainerProps {
    patientType: String,
    filledDiagOpds: any,
    opdNo: Number
}

export const CardContainer = styled.div<CardContainerProps>`
    // background-color: ${(props) => (props.patientType === 'R' ? '#f3c57e6b' : 'transparent')} ;
    // background-color: ${(props) => (props?.filledDiagOpds?.includes(props?.opdNo) ? '#f3c57e6b' : 'transparent')} ;
    border-radius: 5px;
    padding: 0px 10px 10px 10px;
    justify-content: space-between;
`

export const Reffered = styled.div`
    font-size: 13px;
    color: black;
    font-weight: 500;
    padding: 5px 10px;
    background-color: pink;
    text-align: center;
    border-radius: 0px 0px 5px 5px;
`

export const UserDataRaw = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`

export const PageHeader = styled.div`
    border: 1px solid transparent;
    background-color: #55c79c;
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

export const SideBar = styled.div`
    border: 1px solid transparent;
    width: 4.5vw;
    min-width: 60px;
    height: calc(100vh - 30vh);
    background-color: #55c79c;
    padding: 10px 0px;
    text-align: center;

    @media screen and (max-width: 600px) {
        display: none;
    }
`

export const Container = styled.div`
    padding: 10px 20px;
`

export const SubContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #edededd1;
  max-height: 60vh;
  overflow-y: auto;

  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 830px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const PatientName = styled.div`
    font-size: 15px;
    font-weight: 700;
    padding: 5px;
    color: #40b4c1;
`

export const PatientId = styled.div`
    font-size: 13px;
    font-weight: 500;
    padding: 5px;
    color: black
`

export const OpdNo = styled.div`
    font-size: 13px;
    padding: 5px;
    color: #40b4c1;
`

export const DoctorName = styled.div`
    font-size: 13px;
    text-align: right;
    padding: 5px 5px 5px 5px;
    color: black;
    font-weight: 700;
`

export const BtnsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`

export const Btns = styled.div`
    font-weight: 500;
    font-size: 13px;
    cursor: pointer;
    padding: 5px 10px;
    min-width: 50px;
    background-color: #40b4c1;
    border-radius: 5px;
    color: white;
`