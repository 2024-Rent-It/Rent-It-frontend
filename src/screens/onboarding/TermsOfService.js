import React from 'react';
import { ScrollView, Text } from 'react-native';

const TermsOfService = () => {
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                이용약관
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                제1조(목적)
            </Text>
            <Text style={{ marginBottom: 20 }}>
                이 약관은 RentIt 서비스(이하 '서비스')의 이용 조건 및
                절차, 회원과 사이트 운영자의 권리, 의무 및 책임 사항
                기타 필요한 사항을 규정함을 목적으로 합니다.
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                제2조(정의)
            </Text>
            <Text style={{ marginBottom: 20 }}>
                1. "사이트"라 함은 서비스를 제공하는 단체 또는 개인을
                말합니다.
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                제3조(약관의 효력과 변경)
            </Text>
            <Text style={{ marginBottom: 20 }}>
                1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에게
                효력이 있으며, 이용자가 본 서비스의 회원가입 시
                이 약관에 동의하는 것으로 간주됩니다.
            </Text>
            {/* 추가 약관 내용 계속... */}
        </ScrollView>
    );
};

export default TermsOfService;