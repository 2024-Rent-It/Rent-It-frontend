import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const LocationSetting = ({ navigation }) => {
    return (
        <View>
            <View
                style={{ backgroundColor: '#ECECEC'}}>
                <Text style={styles.t1}>지역 검색</Text>

                <View style={styles.input_field}>
                    <View style={styles.horizon} width={"100%"}>
                        <Pressable style={styles._button2} width={'47%'}>
                            <Text style={styles.buttonText}>🔎 내 위치로 검색</Text>
                        </Pressable>
                        <Pressable style={styles._button2} width={'47%'}>
                            <Text style={styles.buttonText}>🧭 지역 검색</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <View
            style={{ backgroundColor: '#ECECEC'}}>
            <Text style={styles.t1}>선택된 지역</Text>

            <View style={styles.input_field}>
                <View style={styles.horizon} width={"100%"}>
                    <Pressable style={styles._button2} width={'47%'}>
                        <Text style={styles.buttonText}>🔎 내 위치로 검색</Text>
                    </Pressable>
                    <Pressable style={styles._button2} width={'47%'}>
                        <Text style={styles.buttonText}>🧭 지역 검색</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        </View>







    );
};

export default LocationSetting;

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    t1: {
        fontSize: 20,
        margin: '2%',
        marginBottom: '2%',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        marginTop: "10%",
        marginHorizontal: "5%",
    },
    input_field: {
        paddingTop: '5%',
        paddingBottom: '5%',
        marginBottom: "5%",
        backgroundColor: 'white',
    },
    container_title: {
        marginBottom: "5%",
    },
    h1: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: "5%",
    },
    h2: {
        fontSize: 18,
    },
    h3: {
        fontSize: 14,
    },
    error: {
        color: "red",
    },
    horizon: {
        flexDirection: "row",
        margin: '2%',
    },
    input: {
        height: 60,
        borderRadius: 16,
        borderColor: "#ffffff",
        borderWidth: 1,
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 18,
        marginBottom: 10,
        backgroundColor: "#ffffff",
        marginRight: "6%",
    },
    _button: {
        backgroundColor: "#CDCDCD",
        alignItems: "center",
        padding: "5%",
        borderRadius: 16,
        height: 60,
    },
    _button2: {
        backgroundColor: "#A7C8E7",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        borderRadius: 16,
        marginRight: "6%",
        width: '45%',
    },

});
