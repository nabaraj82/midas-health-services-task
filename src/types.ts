import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export interface Patient {
  id: string;
  sNo: number;
  uhid: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  billingDateTime: string;
  department: string;
  doctorName: string;
  queueNo: number;
  previousRec: number;
  status: 'New' | 'Follow-up' | 'Free'
}

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Available' | 'Busy' | 'Off Duty';
}

export interface StatisticProps {
  title: string;
  value: number | string;
  prefix?: ReactNode
}

export type UniqueArrayProps<T> = {
  data: T[];
  key?: keyof T;
};

export interface FilterInputData {
  searchText: string;
  doctorName: string | null;
  fromDate: string;
  toDate: string;
}

export interface TempFilterState{
  doctorName: string | null, 
  fromDate: string,
  fromDateObj: Dayjs | null,
  toDate: string,
  toDateObj: Dayjs | null
}