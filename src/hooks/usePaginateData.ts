import { useMemo } from "react";
import { Patient } from "../types";


export const usePaginateData = (filteredData: Patient[], currentPage: number, pageSize: number) => {
    return useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return filteredData.slice(start, end);
    }, [filteredData, currentPage, pageSize]);
}