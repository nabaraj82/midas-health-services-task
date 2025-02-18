import type { StatisticProps } from "../types";
import { Users, Clock, Bed, BookMinus, Ambulance } from "lucide-react";

export const data: StatisticProps[] = [
  {
    title: "New Patients",
    value: 10,
    prefix: <Users className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Average Wait Time",
    value: "25 min",
    prefix: <Clock className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Patient in Queue",
    value: 10,
    prefix: <Bed className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Cancellations",
    value: 2,
    prefix: <BookMinus className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Urgent Cases",
    value: 10,
    prefix: <Ambulance className="w-5 h-5 text-blue-500" />,
  },
];
