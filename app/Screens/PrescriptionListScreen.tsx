import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import CustomSearchInput from '../Components/CustomSearchInput';
import PrescriptionSummaryCard from '../Components/PrescriptionSummaryCard';
import { RootState } from '../redux/store';

const PrescriptionListScreen = ({ navigation }: any) => {
    const prescriptions = useSelector((state: RootState) => state.prescriptions.data);
    const [searchMode, setSearchMode] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredPrescriptions, setFilteredPrescriptions] = useState(prescriptions);

    useEffect(() => {
        setFilteredPrescriptions(prescriptions);
    }, [prescriptions]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const query = searchText.trim().toLowerCase();
            if (query === '') {
                setFilteredPrescriptions(prescriptions);
            } else {
                const filtered = prescriptions.filter((p) =>
                    p.code.toLowerCase().includes(query)
                );
                setFilteredPrescriptions(filtered);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchText, prescriptions]);

    const handleClearSearch = () => {
        setSearchText('');
        setFilteredPrescriptions(prescriptions);
        setSearchMode(false);
    };

    const handleAddPrescription = () => {
        navigation.navigate('AddPrescription');
    };

    return (
        <View style={styles.container}>
            {!searchMode ? (
                <View style={styles.header}>
                    <Text style={styles.title}>My Prescriptions</Text>
                    <View style={styles.headerIcons}>
                        {prescriptions.length > 1 && (
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => setSearchMode(true)}
                            >
                                <Feather name="search" size={20} color="#fff" />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.iconButton, prescriptions.length > 1 && styles.addButton]}
                            onPress={handleAddPrescription}
                        >
                            <Feather name="plus" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.searchHeader}>
                    <CustomSearchInput
                        placeholder="Search prescriptions..."
                        value={searchText}
                        onChangeText={setSearchText}
                        isSearchable={true}
                        iconColor="#333"
                        iconSize={18}
                        containerStyle={{ marginBottom: 0, flex: 1 }}
                        onClose={handleClearSearch}
                    />
                </View>
            )}

            {filteredPrescriptions.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No Prescriptions</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredPrescriptions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}>
                            <PrescriptionSummaryCard
                                code={item.code}
                                createdAt={item.createdAt}
                                medicines={item.medicines}
                            />
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}

        </View>
    );
};

export default PrescriptionListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#002D62',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#002D62',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    addButton: {
        marginLeft: 12,
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
    cardContainer: {
        marginBottom: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#555',
    },
    fabClose: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#002D62',
        borderRadius: 24,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
