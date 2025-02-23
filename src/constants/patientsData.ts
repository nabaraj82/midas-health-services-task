import type { Patient } from '../types';
import { getRandomDateTime } from '../utils/getRandomDateTime';

let memoizedData: Patient[] | null = null;

export const getPatientData = (): Patient[] => {
    if (memoizedData === null) {
        memoizedData = Array.from({ length: 50 }, (_, index) => {
            const departments = ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'ENT', 'Ophthalmology', 'Psychiatry'];
            const doctors = [
                'Dr. Sarah Wilson', 'Dr. Michael Chen', 'Dr. Emily Brown', 'Dr. James Taylor',
                'Dr. Lisa Anderson', 'Dr. Robert Kim', 'Dr. Maria Garcia', 'Dr. David Lee'
            ];
            const statuses: Array<'New' | 'Follow-up' | 'Free'> = ['New', 'Follow-up', 'Free'];
            const genders: Array<'Male' | 'Female'> = ['Male', 'Female'];

            return {
                id: `${index + 1}`,
                sNo: index + 1,
                uhid: `${String(1000 + index).padStart(8, '0')}`,
                name: `Patient ${index + 1}`,
                age: 20 + Math.floor(Math.random() * 60),
                gender: genders[Math.floor(Math.random() * genders.length)],
                billingDateTime: getRandomDateTime(index),
                department: departments[Math.floor(Math.random() * departments.length)],
                doctorName: doctors[Math.floor(Math.random() * doctors.length)],
                queueNo: index + 1,
                previousRec: Math.floor(Math.random() * 50) + 1,
                status: statuses[Math.floor(Math.random() * statuses.length)],
            };
        });
    }

    return memoizedData;
};


