import styled from "styled-components";

export const ModuleDropdownContainer = styled.div`
    background-color: #fff;
    box-shadow: 0px 1px 1px 0.25px #80808057;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    z-index: 1000;
    color: black;
    display: flex;
    min-height: 320px;
`

export const DropdownData = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

interface ModuleProps {
    selectedModule: boolean;
}

export const Module = styled.div<ModuleProps>`
    padding: 7px 10px;
    cursor: pointer;
    color: black;
    box-shadow: 0px 1px 1px 0.25px #80808057;
    border-radius: 3px;
    margin: 0px 5px;
    background-color: ${(props) => (props.selectedModule ? '#40c18e' : 'transparent')};
    font-size: 13px;
    margin: 3px;
`

export const RoleContainer = styled.div`
    padding: 0px 3%;
    width: 20%;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
`

interface UserRoleProps {
    hoveredRole: boolean;
}

export const UserRole = styled.div<UserRoleProps>`
    padding: 7px;
    text-align: center;
    color: white;
    font-size: 13px;
    font-weight: 500px;
    border-bottom: 2px solid transparent;
    background-color: ${(props) => (props.hoveredRole ? '#40c18e' : '#4074d1')};
    border-radius: 5px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RoleValuesContainer = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 300px;
`

export const RoleValues = styled.div`
    background-color: #a972a39e;
    padding: 5px 10px;
    font-size: 13px;
    margin: 10px;
    box-shadow: 0px 1px 1px 0.25px #80808057;
    cursor: pointer;
`