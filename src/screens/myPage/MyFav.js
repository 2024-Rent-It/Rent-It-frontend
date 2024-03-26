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

const MyFav = ({navigation}) => {
    return (
        <Container>
            <StyledText> 관심 상품 페이지 </StyledText>
        </Container>
    );
};

export default MyFav;