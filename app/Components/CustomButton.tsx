import React from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type ButtonType = 'outlined' | 'filled' | 'light';

interface CustomButtonProps {
    label: string;
    type?: ButtonType;
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
    onPress?: (event: GestureResponderEvent) => void;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    type = 'filled',
    iconName,
    iconSize = 16,
    iconColor = '#000',
    onPress,
    containerStyle,
    textStyle,
    disabled = false,
}) => {
    const getButtonStyle = (): ViewStyle => {
        switch (type) {
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: '#143C6D',
                };
            case 'light':
                return {
                    backgroundColor: '#EAF3FF',
                };
            case 'filled':
            default:
                return {
                    backgroundColor: '#143C6D',
                };
        }
    };

    const getTextColor = (): string => {
        switch (type) {
            case 'outlined':
                return '#143C6D';
            case 'light':
                return '#143C6D';
            case 'filled':
            default:
                return '#FFFFFF';
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                containerStyle,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <View style={styles.contentWrapper}>
                {iconName && (
                    <Feather
                        name={iconName}
                        size={iconSize}
                        color={iconColor || getTextColor()}
                        style={styles.icon}
                    />
                )}
                <Text style={[styles.label, { color: getTextColor() }, textStyle]}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 28,
        minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 6,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.6,
    },
});

export default CustomButton;
