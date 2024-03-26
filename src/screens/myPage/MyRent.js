import React from "react";
import styled from "styled-components";

const Container = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const StyledText=styled.Text`
    font-size:30px;
    margin-bottom:10px;
`;

const MyRent = ({route}) => {
    return (
        <Container>
            <StyledText> 대여 내역 페이지 </StyledText>
        </Container>
    );
};

export default MyRent;