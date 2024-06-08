import { View, Text, Button } from "react-native";

export default function VersionInfo({ navigation }) {
    return (
        <View>
            <Text style={{margin:10, fontWeight:'900', marginBottom:2}}>버전 정보</Text>
            <Text style={{margin:10}}>v.1.0.0</Text>
        </View>
    );
}
