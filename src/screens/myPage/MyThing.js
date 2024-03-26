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

const MyThing = ({route}) => {
    return (
        <Container>
            <StyledText> 내 상품 관리 페이지 </StyledText>
        </Container>
    );
};

export default MyThing;