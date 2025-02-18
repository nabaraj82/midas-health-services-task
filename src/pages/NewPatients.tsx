import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Input,
  Select,
  Button,
  Tag,
  TableProps,
  DatePicker,
  Form,
  DatePickerProps,
} from "antd";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { utils, writeFile } from "xlsx";
import {
  Search,
  Stethoscope,
  Filter,
  RotateCcw,
  Eye,
  FileSpreadsheet,
  EyeOff,
} from "lucide-react";
import type { Patient } from "../types";
import { getPatientData } from "../constants/patientsData";
import { data as statistics } from "../constants/statisticData";
import useUniqueArray from "../hooks/useUniqueArray";
import { useFilters } from "../hooks/useFilters";

const Overview: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showFilter, setShowFilter] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const uniqueDataByName = useUniqueArray({
    data: patients,
    key: "doctorName",
  });

  useEffect(() => {
    const patientData = getPatientData();
    setPatients(patientData);
  }, []);

  const { filters, setFilters, filteredData, handleClearFilters } =
    useFilters(patients);
  console.log(filters);

  const queueNumbers = Array.from({ length: 50 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  const columns: TableProps<Patient>["columns"] = [
    {
      title: "S.No",
      dataIndex: "sNo",
      key: "sNo",
      width: 70,
    },
    {
      title: "UHID",
      dataIndex: "uhid",
      key: "uhid",
      width: 120,
    },
    {
      title: "Patient Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Age/Gender",
      key: "ageGender",
      width: 100,
      render: (_, record) => (
        <span>
          {record.age} Yrs/{record.gender.charAt(0)}
        </span>
      ),
    },
    {
      title: "Billing Date & Time",
      dataIndex: "billingDateTime",
      key: "billingDateTime",
      width: 160,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Queue No.",
      dataIndex: "queueNo",
      key: "queueNo",
      sorter: (a, b) => a.queueNo - b.queueNo,
    },
    {
      title: "Previous Rec..",
      dataIndex: "previousRec",
      key: "previousRec",
      width: 120,
      render: (previousRec: number) => (
        <Select
          defaultValue={previousRec}
          style={{ width: 70 }}
          options={queueNumbers}
          size="small"
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          New: "green",
          "Follow-up": "blue",
          Regular: "purple",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => (
        <Button
          type="text"
          icon={<Eye className="w-4 h-4 text-blue-600" />}
          className="px-2"
        />
      ),
    },
  ];

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, "patients_list.xlsx");
  }, [filteredData]);

  const handleFromDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    setFilters({
      ...filters,
      fromDate: dateString.toString(),
    });
  };
  const handleToDateChange: DatePickerProps["onChange"] = (_, dateString) => {
    setFilters({
      ...filters,
      toDate: dateString.toString(),
    });
  };

  return (
    <LayoutGroup>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-5 h-5" />
              <span className="font-medium">OPD Department</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Button type="default" icon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
              <Button
                type="default"
                onClick={handleClearFilters}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              type="default"
              onClick={() => setShowFilter(!showFilter)}
              icon={showFilter ? <EyeOff /> : <Eye className="w-4 h-4" />}
            >
              { showFilter? 'Hide Filters' : "Show Filters"}
            </Button>

            <Button
              onClick={exportFile}
              icon={<FileSpreadsheet color="#16700f" strokeWidth={1.25} />}
            >
              Download Excel
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {showFilter && (
            <motion.div
              exit={{
                opacity: 0,
              }}
              className="flex flex-col space-y-3"
            >
              <p className="text-lg font-medium">Filter</p>
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                <Form layout="vertical" className="w-full md:w-auto">
                  <Form.Item label="Period">
                    <DatePicker
                      placeholder="Select start date"
                      onChange={handleFromDateChange}
                      className="w-full"
                    />
                  </Form.Item>
                </Form>
                <Form layout="vertical" className="w-full md:w-auto">
                  <Form.Item>
                    <DatePicker
                      placeholder="Select to date"
                      onChange={handleToDateChange}
                      className="w-full"
                    />
                  </Form.Item>
                </Form>
                <Form layout="vertical" className="w-full md:w-auto">
                  <Form.Item label="Filter Via Doctor Name">
                    <Select
                      onChange={(value) =>
                        setFilters({ ...filters, doctorName: value })
                      }
                      placeholder="Select Doctor Name"
                      options={uniqueDataByName.map((item) => ({
                        value: item.doctorName,
                        label: item.doctorName,
                      }))}
                      className="w-full"
                    />
                  </Form.Item>
                </Form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout>
          <Row gutter={[16, 16]}>
            {statistics.map((item, index) => (
              <Col xs={24} sm={12} lg={4} key={index}>
                <Card className="shadow-sm" size="small">
                  <Statistic
                    title={item.title}
                    value={item.value}
                    prefix={item.prefix}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Card className="shadow-sm mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div className="w-full sm:w-auto">
                <Input
                  placeholder="Search by UHID, name or doctor..."
                  prefix={<Search className="w-4 h-4 text-gray-400" />}
                  value={filters.searchText}
                  onChange={(e) =>
                    setFilters({ ...filters, searchText: e.target.value })
                  }
                  className="w-full sm:w-80"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-gray-600 whitespace-nowrap">Show:</span>
                <Select
                  value={pageSize}
                  onChange={setPageSize}
                  options={[
                    { value: 10, label: "10 rows" },
                    { value: 20, label: "20 rows" },
                    { value: 50, label: "50 rows" },
                    { value: 100, label: "100 rows" },
                  ]}
                  className="w-full sm:w-40"
                />
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              pagination={{
                pageSize,
                showSizeChanger: false,
              }}
              className="border rounded-lg"
              scroll={{ x: 1200 }}
            />
          </Card>
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

export default Overview;
