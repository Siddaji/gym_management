import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage (temporary - will add MongoDB later)
let members = [
  {
    _id: '1',
    name: "Rahul Sharma",
    phone: "9876543210",
    plan: "Monthly",
    joinDate: "2024-10-01",
    expiryDate: "2024-11-01"
  },
  {
    _id: '2',
    name: "Priya Patel",
    phone: "9876543211",
    plan: "Quarterly",
    joinDate: "2024-09-01",
    expiryDate: "2024-12-01"
  },
  {
    _id: '3',
    name: "Amit Kumar",
    phone: "9876543212",
    plan: "Monthly",
    joinDate: "2024-10-15",
    expiryDate: "2024-11-15"
  }
];

let nextId = 4;

// ============= API ROUTES =============

// GET all members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// POST - Add new member
app.post('/api/members', (req, res) => {
  try {
    const { name, phone, plan, joinDate, expiryDate } = req.body;
    
    if (!name || !phone || !plan || !joinDate || !expiryDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newMember = {
      _id: String(nextId++),
      name,
      phone,
      plan,
      joinDate,
      expiryDate
    };
    
    members.push(newMember);
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// PUT - Update member
app.put('/api/members/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, plan, joinDate, expiryDate } = req.body;
    
    const member = members.find(m => m._id === id);
    
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    if (name) member.name = name;
    if (phone) member.phone = phone;
    if (plan) member.plan = plan;
    if (joinDate) member.joinDate = joinDate;
    if (expiryDate) member.expiryDate = expiryDate;
    
    res.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// DELETE - Remove member
app.delete('/api/members/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = members.findIndex(m => m._id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    const deleted = members.splice(index, 1);
    res.json({ message: 'Member deleted successfully', member: deleted[0] });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// ============= SERVER START =============

app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/members`);
});

