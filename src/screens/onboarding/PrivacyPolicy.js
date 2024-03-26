import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 10px;
    margin-bottom:10px;
    backgroundColor: "#ECECEC"
`;


const TermsOfService = ({navigation}) => {
    return (
        <Container>
            <StyledText>어쩌구저쩌구 들어갈 곳</StyledText>
        </Container>
    );
};

export default TermsOfService;
