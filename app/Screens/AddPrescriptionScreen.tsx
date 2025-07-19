import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    LogBox,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../Components/CustomButton';
import CustomDropdown from '../Components/CustomDropdown';
import CustomSearchInput from '../Components/CustomSearchInput';
import MedicineListBottomSheet from '../Components/MedicineListBottomSheet';
import ToastMessage from '../Components/ToastMessage';
import { addPrescription } from '../redux/slices/PrescriptionsSlice';
import { RootState } from '../redux/store';
import { fetchMedicinesFromApi } from '../Services/medicineService';

const methodOptions = ['Oral', 'Injection', 'Topical'];
const durationUnits = ['Days', 'Weeks', 'Months'];

const fallbackDrugs = [
    {
        "ControlledCategoryID": "0009",
        "IsControlled": false,
        "name": "Syscor MR 10 tablets"
    },
    {
        "ControlledCategoryID": "0009",
        "IsControlled": false,
        "name": "Starlix 180mg tablets"
    },
    {
        "ControlledCategoryID": "0001",
        "IsControlled": false,
        "name": "Syscor MR 30 tablets"
    }

];

interface Medicine {
    id: string;
    drugName: string;
    dosageNote: string;
    duration: string;
    quantity: string;
    method: string;
}

const AddPrescriptionScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const prescriptionsCount = useSelector(
        (state: RootState) => state.prescriptions.data.length
    );

    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['40%', '80%'], []);

    const [drugName, setDrugName] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [dosageNote, setDosageNote] = useState('');
    const [duration, setDuration] = useState('1');
    const [durationUnit, setDurationUnit] = useState('Days');
    const [method, setMethod] = useState('Oral');
    const [quantity, setQuantity] = useState('1');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'error' | 'success'>('success');
    const [shouldSearch, setShouldSearch] = useState(true);

    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [availableDrugs, setAvailableDrugs] = useState<string[]>(fallbackDrugs.map(d => d.name));
    const [isLoadingDrugs, setIsLoadingDrugs] = useState(true);

    const showToast = (message: string, type: 'error' | 'success') => {
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
    };

    useEffect(() => {
        LogBox.ignoreLogs([
            'VirtualizedLists should never be nested',
        ]);
    }, []);

    useEffect(() => {
        const getMedicines = async () => {
            const { success, response } = await fetchMedicinesFromApi();
            if (success && response) {
                setAvailableDrugs(response);
            }
            setIsLoadingDrugs(false);
        };
        getMedicines();
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!shouldSearch || !drugName || drugName.trim().length < 1) {
                setSearchResults([]);
                return;
            }

            const { success, response } = await fetchMedicinesFromApi(drugName);
            if (success && response) {
                setSearchResults(response);
            } else {
                const fallback = availableDrugs.filter((d) =>
                    d.toLowerCase().includes(drugName.toLowerCase())
                );
                setSearchResults(fallback);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [drugName, shouldSearch]);


    const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    const handleAddDrug = () => {
        if (!availableDrugs.includes(drugName)) {
            showToast('Drug not found. Please enter the drug details', 'error');
            return;
        }

        const newMedicine: Medicine = {
            id: generateId(),
            drugName,
            dosageNote,
            duration: `${duration} ${durationUnit}`,
            method,
            quantity,
        };

        setMedicines((prev) => [...prev, newMedicine]);

        setDrugName('');
        setDosageNote('');
        setDuration('1');
        setDurationUnit('Days');
        setMethod('Oral');
        setQuantity('1');
        setSearchResults([]);
        showToast('Drug added successfully', 'success');
    };

    const handleRemoveMedicine = (id: string) => {
        setMedicines((prev) => prev.filter((m) => m.id !== id));
    };

    const handlePreview = () => {
        sheetRef.current?.expand();
    };

    const handleSave = () => {
        if (medicines.length === 0) {
            showToast('Please add at least one drug', 'error');
            return;
        }
        const mappedMedicines = medicines.map((m) => ({
            title: m.drugName,
            duration: m.duration,
            dosageNote: m.dosageNote,
            method: m.method,
            quantity: Number(m.quantity),
        }));

        const newPrescription = {
            id: generateId(),
            code: `PRE-${String(prescriptionsCount + 1).padStart(5, '0')}`,
            createdAt: new Date().toISOString(),
            medicines: mappedMedicines,
        };

        dispatch(addPrescription(newPrescription));
        setMedicines([]);
        showToast('Prescription Saved!', 'success');
        setTimeout(() => {
            navigation.goBack();
        }, 1500);
    };

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Icon name="chevron-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Add Drugs</Text>
                </View>

                <Text style={styles.subText}>Please enter prescription details.</Text>

                {isLoadingDrugs ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0A2B52" />
                    </View>
                ) : (
                    <>
                        <CustomSearchInput
                            label="Drug to prescribe"
                            placeholder="Search drug name"
                            value={drugName}
                            onChangeText={(text) => {
                                setDrugName(text);
                                setShouldSearch(true);
                            }}
                            onClose={() => setSearchResults([])}
                            onSelect={(val) => {
                                setDrugName(val);
                                setShouldSearch(false);
                            }}
                            results={searchResults}
                            isSearchable
                        />


                        <CustomSearchInput
                            label="Dosage Note"
                            placeholder="Add dosage note"
                            value={dosageNote}
                            onChangeText={setDosageNote}
                            isSearchable={false}
                        />

                        <View style={styles.row}>
                            <CustomSearchInput
                                label="Duration"
                                placeholder="1"
                                value={duration}
                                onChangeText={setDuration}
                                isSearchable={false}
                                containerStyle={{ flex: 1, marginRight: 8 }}
                            />

                            <CustomDropdown
                                title="Duration Unit"
                                label={durationUnit}
                                options={durationUnits}
                                onSelect={setDurationUnit}
                                containerStyle={{ flex: 1 }}
                            />
                        </View>

                        <View style={styles.row}>
                            <CustomDropdown
                                title="Method"
                                label={method}
                                options={methodOptions}
                                onSelect={setMethod}
                                containerStyle={{ flex: 1, marginRight: 8 }}
                            />

                            <CustomSearchInput
                                label="Quantity"
                                placeholder="1"
                                value={quantity}
                                onChangeText={setQuantity}
                                isSearchable={false}
                                containerStyle={{ flex: 1 }}
                            />
                        </View>

                        {medicines.length > 0 ? (
                            <View style={styles.buttonRow}>
                                <CustomButton
                                    label="Add Drug"
                                    iconName="plus-circle"
                                    type="outlined"
                                    onPress={handleAddDrug}
                                    containerStyle={styles.buttonHalf}
                                />
                                <CustomButton
                                    label={`Preview Medicines (${medicines.length})`}
                                    type="light"
                                    onPress={handlePreview}
                                    containerStyle={{ ...styles.buttonHalf, marginLeft: 8 }}
                                />
                            </View>
                        ) : (
                            <CustomButton
                                label="Add Drug"
                                iconName="plus-circle"
                                type="outlined"
                                onPress={handleAddDrug}
                                containerStyle={{ marginBottom: 12 }}
                            />
                        )}

                        <CustomButton
                            label="Save & Continue"
                            type="filled"
                            onPress={handleSave}
                            disabled={medicines.length === 0}
                        />
                    </>
                )}
            </ScrollView>

            <MedicineListBottomSheet
                ref={sheetRef}
                medicines={medicines}
                onRemove={handleRemoveMedicine}
            />

            <ToastMessage
                visible={toastVisible}
                message={toastMessage}
                type={toastType}
                onHide={() => setToastVisible(false)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    content: {
        padding: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    subText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 16,
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    buttonHalf: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#0A2B52',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
});

export default AddPrescriptionScreen;
