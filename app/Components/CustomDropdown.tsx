import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface CustomDropdownProps {
    title?: string;
    label: string;
    options: string[];
    onSelect: (value: string) => void;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    iconColor?: string;
    iconSize?: number;
    disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    title,
    label,
    options,
    onSelect,
    containerStyle = {},
    textStyle = {},
    iconColor = '#888',
    iconSize = 20,
    disabled = false,
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (value: string) => {
        onSelect(value);
        setModalVisible(false);
    };

    return (
        <View style={[styles.wrapper, containerStyle]}>
            {title ? <Text style={styles.title}>{title}</Text> : null}

            <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
                disabled={disabled}
            >
                <Text style={[styles.labelText, textStyle]}>{label}</Text>
                <Feather name="chevron-down" size={iconSize} color={iconColor} />
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {options.map((option) => (
                            <Pressable
                                key={option}
                                onPress={() => handleSelect(option)}
                                style={styles.optionItem}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#222',
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 14,
        paddingVertical: 18,
        borderRadius: 24,
        minHeight: 36,
    },
    labelText: {
        fontSize: 15,
        color: '#555',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 32,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 8,
    },
    optionItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    optionText: {
        fontSize: 15,
        color: '#222',
    },
});

export default CustomDropdown;
