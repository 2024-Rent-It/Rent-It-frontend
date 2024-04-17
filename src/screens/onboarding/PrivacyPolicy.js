import React from 'react';
import { ScrollView, Text } from 'react-native';

const PrivacyPolicy = () => {
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                개인정보 처리 방침
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                1. 수집하는 개인정보의 항목 및 수집방법
            </Text>
            <Text style={{ marginBottom: 20 }}>
                가. ChatGPT 서비스는 서비스 이용 과정에서 다음과 같은
                개인정보를 수집할 수 있습니다:
                - 이메일 주소, 로그인 정보, 사용 기기 정보 등
                나. 개인정보는 다음과 같은 방법으로 수집될 수 있습니다:
                - 회원가입, 이용 기록 및 이벤트 응모, 서비스 이용 과정에서
                수집되는 경우
            </Text>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                2. 개인정보의 수집 및 이용목적
            </Text>
            <Text style={{ marginBottom: 20 }}>
                가. ChatGPT 서비스는 다음과 같은 목적을 위해 개인정보를
                처리합니다:
                - 회원제 서비스 제공, 고객상담 및 서비스 개선, 마케팅 및
                광고 등
            </Text>
            {/* 추가 개인정보 처리 방침 내용 계속... */}
        </ScrollView>
    );
};

export default PrivacyPolicy;