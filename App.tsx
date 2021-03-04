import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RNScratchCard} from "./src/RNScratchCard";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={{flex: 1, height: '100%'}}><Text>Jo</Text></View>
            <RNScratchCard>
                <View style={{height: '100%'}}>
                    <Text>Hey</Text>
                </View>
            </RNScratchCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
