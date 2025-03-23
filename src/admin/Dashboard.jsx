import { Theme, Card} from "@radix-ui/themes";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

const Dashboard = () => {
  // Data for Chart 01 (Bar Chart)
  const chart01Data = [
    { name: "Data 01", value: 50 },
    { name: "Data 02", value: 30 },
    { name: "Data 03", value: 70 },
    { name: "Data 04", value: 20 },
    { name: "Data 05", value: 60 },
  ];

  // Data for Chart 02 (Donut Chart)
  const chart02Data = [
    { name: "Data 01", value: 63 },
    { name: "Data 02", value: 71 },
    { name: "Data 03", value: 57 },
  ];
  const COLORS = ["#6366f1", "#f472b6", "#a5b4fc"];

  // Data for Chart 03 (Horizontal Bar Chart)
  const chart03Data = [
    { name: "Data 01", value: 79 },
    { name: "Data 02", value: 35 },
    { name: "Data 03", value: 68 },
    { name: "Data 04", value: 52 },
  ];

  // Data for Statistics 01 (Line Chart)
  const stats01Data = [
    { month: "Jan", value1: 50, value2: 100 },
    { month: "Feb", value1: 200, value2: 150 },
    { month: "Mar", value1: 350, value2: 250 },
    { month: "Apr", value1: 150, value2: 200 },
    { month: "May", value1: 100, value2: 50 },
  ];

  // Data for Statistics 02 (Bar Chart)
  const stats02Data = [
    { name: "Q1", value1: 60, value2: 40 },
    { name: "Q2", value1: 30, value2: 50 },
    { name: "Q3", value1: 70, value2: 60 },
    { name: "Q4", value1: 40, value2: 30 },
    { name: "Q5", value1: 50, value2: 20 },
    { name: "Q6", value1: 30, value2: 40 },
  ];

  // Data for Analytics (Line Chart)
  const analyticsData = [
    { day: "Mon", value1: 20, value2: 30 },
    { day: "Tue", value1: 40, value2: 10 },
    { day: "Wed", value1: 30, value2: 50 },
    { day: "Thu", value1: 10, value2: 40 },
    { day: "Fri", value1: 50, value2: 20 },
    { day: "Sat", value1: 30, value2: 10 },
    { day: "Sun", value1: 20, value2: 40 },
  ];

  return (
    <Theme>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Chart 01 (Bar Chart) */}
          <Card className="p-4 bg-white rounded-lg shadow-sm relative">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={chart01Data}
                margin={{ top: 30, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
                />
                <Bar dataKey="value" fill="#f472b6" barSize={15}>
                  <Label
                    value="Chart 01"
                    position="top"
                    fill="#6b7280"
                    fontSize={14}
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 02 (Donut Chart) */}
          <Card className="p-4 bg-white rounded-lg shadow-sm relative">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={chart02Data}
                  dataKey="value"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                >
                  {chart02Data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label
                    value="Chart 02"
                    position="center"
                    fill="#6b7280"
                    fontSize={14}
                  />
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 03 (Horizontal Bar Chart) */}
          <Card className="p-4 bg-white rounded-lg shadow-sm relative">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={chart03Data}
                layout="vertical"
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
                />
                <Bar dataKey="value" fill="#6366f1" barSize={10}>
                  <Label
                    value="Chart 03"
                    position="top"
                    fill="#6b7280"
                    fontSize={14}
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Total Earnings (Main Focus) */}
          <Card className="p-6 bg-white rounded-lg shadow-sm flex items-center justify-center border border-indigo-200">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-gray-500 text-sm uppercase tracking-wide">
                  Earnings
                </p>
                <h2 className="text-3xl font-bold text-indigo-600">₹12,500</h2>
            </div>
          </Card>

          {/* Statistics 01 (Line Chart) */}
          <Card className="p-4 bg-white rounded-lg shadow-sm col-span-1 md:col-span-2 relative">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={stats01Data}
                margin={{ top: 30, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
                />
                <Line
                  type="monotone"
                  dataKey="value1"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#f472b6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Label
                  value="Statistics 01"
                  position="top"
                  fill="#6b7280"
                  fontSize={14}
                  offset={10}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Statistics 02 (Bar Chart) */}
          <Card className="p-4 bg-white rounded-lg shadow-sm col-span-1 md:col-span-2 relative">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={stats02Data}
                margin={{ top: 30, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
                />
                <Bar dataKey="value1" fill="#6366f1" barSize={15} />
                <Bar dataKey="value2" fill="#f472b6" barSize={15} />
                <Label
                  value="Statistics 02"
                  position="top"
                  fill="#6b7280"
                  fontSize={14}
                  offset={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Analytics (Line Chart) */}
          <Card className="p-4 bg-white rounded-lg shadow-sm col-span-1 md:col-span-2 lg:col-span-4 relative">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={analyticsData}
                margin={{ top: 30, right: 0, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
                />
                <Line
                  type="monotone"
                  dataKey="value1"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="value2"
                  stroke="#f472b6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Label
                  value="Analytics"
                  position="top"
                  fill="#6b7280"
                  fontSize={14}
                  offset={10}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </Theme>
  );
};

export default Dashboard;
