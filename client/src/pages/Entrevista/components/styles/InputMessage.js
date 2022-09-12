import styled from "styled-components";

export const InputMessage = styled.input`
    //border-color: 1px white !important;
    border: 1px solid lightgray;
    color: rgb(120, 120, 120) !important;
    font-size: 0.8rem !important;
    transition: 400ms !important;
    margin-right: 0.25rem;
    padding: 0.3rem;
    width: 100%;

    &:focus {
        background-color: #f7f7f7 !important;
        border-color: #acacac !important;
        outline: 0 !important;
        box-shadow: 0 0 0 0.15rem #ededed !important;
    }
`;
