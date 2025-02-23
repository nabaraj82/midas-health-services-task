import { useMemo } from 'react';
import { FilterInputData, Patient } from '../types';
import { safeString } from '../utils/safeString';

export const useFilters = (data: Patient[], filterInputData: FilterInputData) => {
    const filteredData = useMemo(
        () => {
            const searchTextLower = safeString(filterInputData.searchText);
            const doctorNameLower = safeString(filterInputData.doctorName);
            const fromData = filterInputData.fromDate;
            const toDate = filterInputData.toDate;
            return data.filter(item => {
                const name = safeString(item.name);
                const uhid = safeString(item.uhid);
                const doctorName = safeString(item.doctorName);
                const itemDate = item.billingDateTime.split(' ')[0];
                return (
                    //Search Filter
                    (
                        name.includes(searchTextLower) ||
                        uhid.includes(searchTextLower) ||
                        doctorName.includes(searchTextLower)
                    )
                    &&
                    //Date Filter
                    (
                        !fromData || itemDate >= fromData
                    )
                    &&
                    (!toDate || itemDate <= toDate)
                    &&
                    //Filter by Docter
                    (!doctorNameLower || doctorName.includes(doctorNameLower))

                )
            })
        },
        [filterInputData, data]
    );
    return {
        filteredData,
    };
};
