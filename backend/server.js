const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let members = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    plan: "Monthly",
    joinDate: "2024-10-01",
    expiryDate: "2024-11-01"
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "9876543211",
    plan: "Quarterly",
    joinDate: "2024-09-01",
    expiryDate: "2024-12-01"
  },
  {
    id: 3,
    name: "Amit Kumar",
    phone: "9876543212",
    plan: "Monthly",
    joinDate: "2024-10-15",
    expiryDate: "2024-11-15"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    phone: "9876543213",
    plan: "Monthly",
    joinDate: "2024-09-15",
    expiryDate: "2024-10-15"
  },
  {
    id: 5,
    name: "Vikram Singh",
    phone: "9876543214",
    plan: "Quarterly",
    joinDate: "2024-08-01",
    expiryDate: "2024-11-01"
  },
  {
    id: 6,
    name: "Neha Desai",
    phone: "9876543215",
    plan: "Monthly",
    joinDate: "2024-11-01",
    expiryDate: "2024-12-01"
  },
  {
    id: 7,
    name: "Rohit Verma",
    phone: "9876543216",
    plan: "Monthly",
    joinDate: "2024-10-20",
    expiryDate: "2024-11-20"
  },
  {
    id: 8,
    name: "Anita Joshi",
    phone: "9876543217",
    plan: "Quarterly",
    joinDate: "2024-07-01",
    expiryDate: "2024-10-01"
  },
  {
    id: 9,
    name: "Karan Mehta",
    phone: "9876543218",
    plan: "Monthly",
    joinDate: "2024-11-05",
    expiryDate: "2025-12-05"
  },
  {
    id: 10,
    name: "Divya Reddy",
    phone: "9876543219",
    plan: "Quarterly",
    joinDate: "2024-10-01",
    expiryDate: "2025-01-01"
  }
];

app.get('/members', (req, res) => {
  res.json(members);
});

app.post('/members', (req, res) => {
  const newMember = {
    id: members.length + 1,
    ...req.body
  };
  members.push(newMember);
  res.status(201).json(newMember);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
