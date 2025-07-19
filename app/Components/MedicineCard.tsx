import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface MedicineCardProps {
    drugName: string;
    dosageNote: string;
    duration: string;
    quantity: string;
    method: string;
    onRemove?: () => void;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
    drugName,
    dosageNote,
    duration,
    quantity,
    method,
    onRemove,
    containerStyle = {},
    labelStyle = {},
}) => {
    return (
        <View style={[styles.card, containerStyle]}>
            <View style={styles.headerRow}>
                <Text style={[styles.drugName, labelStyle]}>{drugName}</Text>
                <TouchableOpacity onPress={onRemove}>
                    <View style={styles.closeButton}>
                        <Feather name="x" size={18} color="#0A2B52" />
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.dosageNote}>{dosageNote}</Text>

            <View style={styles.infoRow}>
                <View style={[styles.pill, styles.pillSpacing]}>
                    <Text style={styles.pillText}>{duration}</Text>
                </View>
                <View style={[styles.pill, styles.pillSpacing]}>
                    <Text style={styles.pillText}>Qty: {quantity}</Text>
                </View>
                <View style={styles.pill}>
                    <Text style={styles.pillText}>{method}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    drugName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0A2B52',
        flex: 1,
        paddingRight: 8,
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: 999,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dosageNote: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    pill: {
        backgroundColor: '#DFF6E2',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    pillSpacing: {
        marginRight: 10,
        marginBottom: 8,
    },
    pillText: {
        fontSize: 14,
        color: '#0A2B52',
        fontWeight: '500',
    },
});

export default MedicineCard;
