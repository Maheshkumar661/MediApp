import axios from 'axios';

const BASE_URL = 'https://dev.api.doctorondial.com/prescriptions/demo-get-medication-list';

export const fetchMedicinesFromApi = async (searchKey: string = 's') => {
    try {
        const response = await axios.get(`${BASE_URL}?key=${encodeURIComponent(searchKey)}`);

        if (response?.data?.data?.length > 0) {
            const medicines: string[] = response?.data?.data.map((item: any) => item.name);

            return {
                success: true,
                response: medicines,
            };
        } else {
            return {
                success: true,
                response: [],
            };
        }
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            response: null,
        };
    }
};
