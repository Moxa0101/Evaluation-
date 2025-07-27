import React from 'react';
import {
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,  Tooltip, ResponsiveContainer
} from 'recharts';

export default function Charts() {
  // Piechart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a29bfe'];
  const duration_wise_subscriptions = [
    { plan_label: "Free Demo", duration: "free_demo", days: 7, price: 3, total_brokers: 27 },
    { plan_label: "Monthly ($8)", duration: "monthly", days: 30, price: 8, total_brokers: 58 },
    { plan_label: "Quarterly ($23)", duration: "quarterly", days: 91, price: 23, total_brokers: 6 },
    { plan_label: "Half Yearly ($45)", duration: "half_yearly", days: 182, price: 45, total_brokers: 0 },
    { plan_label: "Yearly ($84)", duration: "yearly", days: 365, price: 84, total_brokers: 0 }
  ];

  // Linechart
  const monthly_registered_users = [
    { month: "2024-08", total_users: 0 }, { month: "2024-09", total_users: 0 },
    { month: "2024-10", total_users: 0 }, { month: "2024-11", total_users: 0 },
    { month: "2024-12", total_users: 0 }, { month: "2025-01", total_users: 0 },
    { month: "2025-02", total_users: 0 }, { month: "2025-03", total_users: 0 },
    { month: "2025-04", total_users: 1 }, { month: "2025-05", total_users: 35 },
    { month: "2025-06", total_users: 73 }, { month: "2025-07", total_users: 29 }
  ];

  //barchart
  const monthly_users_ledger_amount = [
    { month: "2024-08", total_amount: 0 }, { month: "2024-09", total_amount: 0 },
    { month: "2024-10", total_amount: 0 }, { month: "2024-11", total_amount: 0 },
    { month: "2024-12", total_amount: 0 }, { month: "2025-01", total_amount: 0 },
    { month: "2025-02", total_amount: 0 }, { month: "2025-03", total_amount: 0 },
    { month: "2025-04", total_amount: 0 }, { month: "2025-05", total_amount: 0 },
    { month: "2025-06", total_amount: 648 }, { month: "2025-07", total_amount: 192.4117 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Pie Chart */}
      <h3>Subscription Plans (Pie Chart)</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={duration_wise_subscriptions}
          dataKey="total_brokers"
          nameKey="plan_label"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {duration_wise_subscriptions.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>

      {/* Line Chart */}
      <h3>Monthly Registered Users (Line Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthly_registered_users}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total_users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <h3>Monthly Ledger Amount (Bar Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthly_users_ledger_amount}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
