import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function MessageBubble({ message, isOwnMessage, isMessageTop, isMessageBottom }) {
    return (
        <View
            style={[
                styles.chatBubbleContainer,
                isOwnMessage
                    ? styles.sentBubbleContainer
                    : styles.receivedBubbleContainer,
                isMessageTop && styles.topBubbleContainer,
                isMessageBottom && styles.bottomBubbleContainer,
            ]}
        >
            <Text
                style={[
                    isOwnMessage
                        ? styles.sentBubbleText
                        : styles.receivedBubbleText,
                ]}
            >
                {message.data.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chatBubbleContainer: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 10,
        justifyContent: 'center',
    },
    sentBubbleContainer: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignSelf: 'flex-end',
        backgroundColor: '#DDEAF6',
    },
    receivedBubbleContainer: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        alignSelf: 'flex-start',
        backgroundColor: '#e6e6e6',
    },
    topBubbleContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomBubbleContainer: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    sentBubbleText: {
        color: 'black',
        fontSize: 16,
    },
    receivedBubbleText: {
        color: 'black',
        fontSize: 16,
    },
});

export default MessageBubble;
