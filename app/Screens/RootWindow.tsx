// app/Screens/RootWindow.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AddPrescriptionScreen from './AddPrescriptionScreen';
import PrescriptionListScreen from './PrescriptionListScreen';

const Stack = createNativeStackNavigator();

const RootWindow = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="PrescriptionList"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen
                            name="PrescriptionList"
                            component={PrescriptionListScreen}
                        />
                        <Stack.Screen
                            name="AddPrescription"
                            component={AddPrescriptionScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    );
};

export default RootWindow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
