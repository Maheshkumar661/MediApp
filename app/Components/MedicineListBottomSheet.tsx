import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import MedicineCard from './MedicineCard';

interface Medicine {
    id: string;
    drugName: string;
    dosageNote: string;
    duration: string;
    quantity: string;
    method: string;
}

interface MedicineListBottomSheetProps {
    medicines: Medicine[];
    onRemove: (id: string) => void;
    containerStyle?: ViewStyle;
}

const MedicineListBottomSheet = forwardRef<BottomSheet, MedicineListBottomSheetProps>(
    ({ medicines, onRemove, containerStyle = {} }, ref) => {
        const snapPoints = useMemo(() => ['50%'], []); 

        const renderBackdrop = (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.4} 
                pressBehavior="close"
            />
        );

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                backgroundStyle={styles.sheetBackground}
            >
                <View style={[styles.sheetContent, containerStyle]}>
                    <Text style={styles.title}>
                        List of medicines ({medicines.length})
                    </Text>

                    <FlatList
                        data={medicines}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <MedicineCard
                                drugName={item.drugName}
                                dosageNote={item.dosageNote}
                                duration={item.duration}
                                quantity={item.quantity}
                                method={item.method}
                                onRemove={() => onRemove(item.id)}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </BottomSheet>
        );
    }
);

const styles = StyleSheet.create({
    sheetContent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    sheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A2B52',
        marginBottom: 12,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 40,
    },
});

export default MedicineListBottomSheet;
