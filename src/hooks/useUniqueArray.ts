import { useState, useEffect } from 'react';
import { UniqueArrayProps } from '../types';

function useUniqueArray<T>({ data, key }: UniqueArrayProps<T>) {
    const [uniqueData, setUniqueData] = useState<T[]>([]);

    useEffect(() => {
        if (key) {
            const unique = Array.from(
                new Map(data.map((item) => [item[key], item])).values()
            );
            setUniqueData(unique);
        } else {
            const unique = Array.from(new Set(data.map((item) => JSON.stringify(item))))
                .map((json) => JSON.parse(json));
            setUniqueData(unique);
        }
    }, [data, key]);

    return uniqueData;
}

export default useUniqueArray;
