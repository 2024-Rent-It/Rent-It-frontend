import { View, Text, TouchableOpacity,Platform } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';



export default function EditInfo({ navigation }) {
    return (
        <View
            style={{ backgroundColor: '#ECECEC' }}>
            <Text style={{ fontSize: 20, margin: 10, marginBottom: 10, fontWeight: 'bold',marginTop:15 }}>회원 설정</Text>
            <View style={styles.edit}>
                <TouchableOpacity onPress={() => navigation.navigate('내 정보')}>
                    <View style={styles.button}>
                        <Ionicons name="person-circle" size={60} color="black" />
                        <Text style={styles.buttonText}>내 정보</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('지역 설정')}>
                    <View style={styles.button}>
                        <Entypo name="location" size={60} color="black" />
                        <Text style={styles.buttonText}>지역 설정</Text>
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    edit: {
        backgroundColor: 'white',
        // borderRadius: '20',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#DDEAF6',
        borderRadius: 17,
        borderWidth: 2,
        borderColor: '#DDEAF6',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        height: 130,
        width: 120,
        margin: 20,
        ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 0.2,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    buttonText:{
        fontSize:20,
        margin:10,
    },
});