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

const Chating = ({route}) => {
    return (
        <Container>
            <StyledText> 이곳은 채팅방 </StyledText>
        </Container>
    );
};

export default Chating;