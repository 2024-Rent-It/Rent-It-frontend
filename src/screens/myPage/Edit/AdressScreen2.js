import React, { useState } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const AddressScreen2 = ({navigation}) => {
    const [openPostcode, setOpenPostcode] = useState(false);

    const getCityFromAddress = (address) => {
    // 주소 문자열을 공백을 기준으로 분리하여 배열로 만듭니다.
    const parts = address.split(" ");

    // 두 번째 요소를 가져와서 반환합니다.
    // 만약 두 번째 요소가 시/군/구가 아닌 경우, 주소가 잘못된 것으로 간주할 수 있습니다.
    return parts[1];
};

    const getAddressData = (data) => {
        // 주소 선택 후 필요한 작업 수행
        const city = getCityFromAddress(data.address);
        console.log(`주소: ${data.address}, 우편번호: ${data.zonecode}, 동네: ${city}`);

        navigation.navigate('지역 설정', { city: city})

        setOpenPostcode(false);
    };

    const handlePostcodeError = (error) => {
        console.error('An error occurred while loading postcode service.', error);
    };

    return (
        <View style={{ flex: 1 }}>
                <Postcode
                    style={{ 
                        
                        flex: 1, width: '100%', zIndex: 999 }}
                    jsOptions={{ animation: true }}
                    onSelected={(data) => getAddressData(data)}
                    onError={handlePostcodeError}
                />
        </View>
    );
};

export default AddressScreen2;