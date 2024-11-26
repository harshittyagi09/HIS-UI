import styled from "styled-components";
import InputBase from '@mui/material/InputBase';

export const MainContainer = styled.div`
    display: flex;
    height: calc(100vh - 10vh);
`

export const LeftContainer = styled.div`
    width: 15%;
    background-color: #d5d3d380;
    display: flex;
    align-items: center;
    min-width: 180px;
`

interface ActionBtnsrProps {
    currUserType: String
}

export const ActionBtns = styled.div<ActionBtnsrProps>`
    // background-color: ${(props) => (props.currUserType === 'P' ? '#e0f7f3' : '#89828252')} ;
    border-radius: 5px;
    color: black;
    padding: 10px;
    cursor: pointer;
    margin: 15% 10px;
    text-align: center;
`

export const RightContainer = styled.div`
    width: 85%;
    padding: 2% 5%;
`

export const MainHeadingCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Heading = styled.div` //style={{ fontSize: '30px', fontWeight: '700', padding: '10px' }}
    font-size: 30px;
    font-weight: 700;
    padding: 10px;
`

// export const SearchContainerPrev = styled.div`
//   padding: 0px 15px;
//   justify-content: space-between;
//   border-radius: 5px;
//   border: 1px solid red;
// `

export const RightSubContainer = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: #edededd1;
`

// *******************************************************************************************************************

interface SearchContainerrProps {
    page: string;
}

const isStyledPage = (page: any) => ['gridTable', 'addRole', 'userIpManagement', 'doctorDetails', 'e-opd', 'paymentAck', 'serviceAcknowledgement', 'extra'].includes(page);

export const SearchContainer = styled.div<SearchContainerrProps>`
  padding: ${(props) => isStyledPage(props.page) ? "1px 5px" : "0px"};
  display: flex;
  justify-content: space-between;
  border-radius: ${(props) => isStyledPage(props.page) ? "5px" : "0px"};
  background-color: ${(props) => isStyledPage(props.page) ? "#fff" : "transparent"};
  border: ${(props) => isStyledPage(props.page) ? '1px solid #8f8b8b99' : 'transparent'};
  border-bottom: ${(props) => !isStyledPage(props.page) ? '1px solid black' : '1px solid #8f8b8b99'};
  float: right;
  min-width: 180px;
`

export const SearchIconWrapper = styled('div')`
  pointer-events: none;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`

export const StyledInputBase = styled(InputBase)`
  paddingLeft: 5px;
  color: inherit;
  font-size: 13px !important;

  & .MuiInputBase-input {
    // @media (min-width: 50px) {
    //   width: 20ch;
    // }
  }
`