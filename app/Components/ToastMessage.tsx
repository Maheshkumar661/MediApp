
import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface ToastProps {
    visible: boolean;
    message: string;
    type: 'error' | 'success';
    onHide: () => void;
}

const ToastMessage: React.FC<ToastProps> = ({ visible, message, type, onHide }) => {
    const translateY = new Animated.Value(100);

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => onHide());
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.toastContainer, { transform: [{ translateY }] }]}>
            <View style={[styles.toast, type === 'error' ? styles.error : styles.success]}>
                <Text style={styles.toastText}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        zIndex: 9999,
        alignItems: 'center',
    },
    toast: {
        borderRadius: 8,
        padding: 14,
        paddingHorizontal: 20,
    },
    toastText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    error: {
        backgroundColor: '#F8D7DA',
    },
    success: {
        backgroundColor: '#D1ECF1',
    },
});

export default ToastMessage;
