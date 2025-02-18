import { useState, useMemo } from 'react';
import { FilterData, Patient } from '../types';


export const useFilters = (data: Patient[]) => {
    const [filters, setFilters] = useState<FilterData>({ searchText: '', doctorName: '', fromDate: '', toDate: '' });

    const filteredData = useMemo(
        () =>
            data.filter((item) => {
                //filter by search text
                const matchesSearchText =
                    item.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
                    item.uhid.toLowerCase().includes(filters.searchText.toLowerCase()) ||
                    item.doctorName.toLowerCase().includes(filters.searchText.toLowerCase());


                //filter by date range
                const matchesDateRange =
                    filters.fromDate && filters.toDate
                        ? item.billingDateTime.split(' ')[0] >= filters.fromDate && 
                        item.billingDateTime.split(' ')[0] <= filters.toDate 
                        : true;
                //filter by doctor name
                const matchesDoctorName = filters.doctorName
                    ? item.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase())
                    : true;

                return matchesSearchText && matchesDoctorName && matchesDateRange;
            }),
        [filters, data]
    );

    const handleClearFilters = () => setFilters({ searchText: '', doctorName: '', fromDate: '', toDate: '' });

    return {
        filters,
        setFilters,
        filteredData,
        handleClearFilters
    };
};
