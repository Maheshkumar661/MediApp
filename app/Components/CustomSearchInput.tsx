import React from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface CustomSearchInputProps {
    label?: string;
    placeholder?: string;
    isSearchable?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    onClose?: () => void;
    onSelect?: (value: string) => void;
    results?: string[];
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    iconColor?: string;
    iconSize?: number;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
    label = '',
    placeholder = 'Search',
    isSearchable = true,
    value = '',
    onChangeText = () => { },
    onClose = () => { },
    onSelect = () => { },
    results = [],
    containerStyle = {},
    labelStyle = {},
    inputStyle = {},
    iconColor = '#666',
    iconSize = 20,
}) => {
    const showClearButton = isSearchable && value;

    const onClear = () => {
        onChangeText('');
        onClose();
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

            <View style={styles.searchContainer}>
                {isSearchable && (
                    <Feather
                        name="search"
                        size={iconSize}
                        color={iconColor}
                        style={styles.icon}
                    />
                )}

                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    value={value}
                    onChangeText={onChangeText}
                />

                {showClearButton && (
                    <TouchableOpacity
                        onPress={() => onClear()}
                        style={styles.clearButton}
                    >
                        <Feather name="x" size={18} color="#333" />
                    </TouchableOpacity>
                )}
            </View>

            {value && results.length > 0 && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={results}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        nestedScrollEnabled
                        style={{ maxHeight: 150 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.resultItem}
                                onPress={() => {
                                    onSelect(item);
                                    onClose();
                                }}
                            >
                                <Text style={styles.resultText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        zIndex: Platform.OS === 'android' ? 1 : 100,
        overflow: 'visible',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        color: '#222',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 24,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    clearButton: {
        padding: 4,
        marginLeft: 4,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 6,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        zIndex: 9999,
    },
    resultItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    resultText: {
        fontSize: 15,
        color: '#333',
    },
});

export default CustomSearchInput;
