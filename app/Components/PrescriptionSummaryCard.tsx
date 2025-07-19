import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';

interface MedicineItem {
    title: string;
    duration: string;
}

interface PrescriptionSummaryCardProps {
    code: string;
    createdAt: string;
    medicines: MedicineItem[];
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

const PrescriptionSummaryCard: React.FC<PrescriptionSummaryCardProps> = ({
    code,
    createdAt,
    medicines,
    containerStyle,
}) => {
    return (
        <View style={[styles.cardContainer, containerStyle]}>
            <View style={styles.header}>
                <Text style={styles.code}>{code}</Text>
                <Text style={styles.date}>{createdAt}</Text>
            </View>

            {medicines.map((item, index) => (
                <View
                    key={`${item.title}-${index}`}
                    style={[
                        styles.row,
                        index % 2 === 1 && styles.altRow,
                        index === medicines.length - 1 && styles.lastRow,
                    ]}
                >
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.duration}>{item.duration}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        marginVertical: 10,
    },
    header: {
        backgroundColor: '#F0F6FF',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    code: {
        color: '#0B3975',
        fontWeight: 'bold',
        fontSize: 14,
    },
    date: {
        color: '#0B3975',
        fontSize: 12,
    },
    row: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    altRow: {
        backgroundColor: '#FAFAFA',
    },
    lastRow: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    title: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    duration: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10,
    },
});

export default PrescriptionSummaryCard;
