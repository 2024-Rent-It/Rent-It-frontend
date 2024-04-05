// import React, { useState } from 'react';
// import { View, Button, SafeAreaView } from 'react-native';
// import Postcode from '@actbase/react-daum-postcode';

// const getCityFromAddress = (address) => {
//     // 주소 문자열을 공백을 기준으로 분리하여 배열로 만듭니다.
//     const parts = address.split(" ");

//     // 두 번째 요소를 가져와서 반환합니다.
//     // 만약 두 번째 요소가 시/군/구가 아닌 경우, 주소가 잘못된 것으로 간주할 수 있습니다.
//     return parts[1];
// };

// const AddressScreen = () => {
//     const [openPostcode, setOpenPostcode] = useState(false);

//     const handleButtonClick = () => {
//         setOpenPostcode(true);
//     };

//     const handlePostcodeError = () => {
//         console.error('An error occurred while loading postcode service.');
//     };

//     const getAddressData = (data) => {
//         const city = getCityFromAddress(data.address);
//         console.log(`주소: ${data.address}, 우편번호: ${data.zonecode}, 동네: ${city}`);
//         setOpenPostcode(false);
//         navigation.navigate('SignUp', { city: city})
//     };

//     return (
//         <SafeAreaView
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 backgroundColor: 'gainsboro',
//             }}>
//             <View style={{ flex: 1 }}>
//                 <Button title="주소 검색하기" onPress={handleButtonClick} />
//                 {openPostcode && (
//                     <Postcode
//                         style={{ flex: 1, width: '100%', zIndex: 999 }}
//                         jsOptions={{ animation: true }}
//                         onSelected={(data) => getAddressData(data)}
//                         // onError={handlePostcodeError}
//                         onError={function (error) {
//                             throw new Error('Function not implemented.');
//                             }}
//                     />
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// };

// export default AddressScreen;
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const AddressScreen = ({ navigation }) => {
    const [openPostcode, setOpenPostcode] = useState(false);

    const getCityFromAddress = (address) => {
        const parts = address.split(" ");
        return parts[1];
    };

    const getAddressData = (data) => {
        const city = getCityFromAddress(data.address);
        console.log(`주소: ${data.address}, 우편번호: ${data.zonecode}, 동네: ${city}`);

        navigation.navigate('회원가입테스트', { city: city });
        setOpenPostcode(false);
    };

    const handlePostcodeError = (error) => {
        console.error('An error occurred while loading postcode service.', error);
    };

    useEffect(() => {
        setOpenPostcode(true); 
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {openPostcode && (
                <Postcode
                    style={{ flex: 1, width: '100%', zIndex: 999 }}
                    jsOptions={{ animation: true }}
                    onSelected={(data) => getAddressData(data)}
                    onError={handlePostcodeError}
                />
            )}
        </View>
    );
};

export default AddressScreen;