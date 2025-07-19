// app/redux/slices/prescriptionsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MedicineItem {
    title: string;
    duration: string;
    dosageNote?: string;
    method?: string;
    quantity?: number;
}

interface Prescription {
    id: string;
    code: string;
    createdAt: string;
    medicines: MedicineItem[];
}

interface PrescriptionsState {
    data: Prescription[];
}

const initialState: PrescriptionsState = {
    data: [],
};

const prescriptionsSlice = createSlice({
    name: 'prescriptions',
    initialState,
    reducers: {
        addPrescription: (state, action: PayloadAction<Prescription>) => {
            state.data.push(action.payload);
        },
        clearPrescriptions: (state) => {
            state.data = [];
        },
    },
});

export const { addPrescription, clearPrescriptions } = prescriptionsSlice.actions;

export default prescriptionsSlice.reducer;
