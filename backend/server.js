import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Member from './models/Member.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; 
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));


// GET all members
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// POST - Add new member
app.post('/api/members', async (req, res) => {
  try {
    const { name, phone, plan, joinDate, expiryDate } = req.body;
    
    const newMember = new Member({
      name,
      phone,
      plan,
      joinDate,
      expiryDate
    });
    
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// PUT - Update member
app.put('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, plan, joinDate, expiryDate } = req.body;
    
    const updated = await Member.findByIdAndUpdate(
      id,
      { name, phone, plan, joinDate, expiryDate },
      { new: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json(updated);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// DELETE - Remove member
app.delete('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await Member.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// ============= SEED DATA (Optional - only runs once) =============

// This will populate initial data if the collection is empty
const seedMembers = async () => {
  try {
    const count = await Member.countDocuments();
    if (count === 0) {
      const initialMembers = [
        {
          name: "Rahul Sharma",
          phone: "9876543210",
          plan: "Monthly",
          joinDate: new Date("2024-10-01"),
          expiryDate: new Date("2024-11-01")
        },
        {
          name: "Priya Patel",
          phone: "9876543211",
          plan: "Quarterly",
          joinDate: new Date("2024-09-01"),
          expiryDate: new Date("2024-12-01")
        },
        {
          name: "Amit Kumar",
          phone: "9876543212",
          plan: "Monthly",
          joinDate: new Date("2024-10-15"),
          expiryDate: new Date("2024-11-15")
        }
      ];
      await Member.insertMany(initialMembers);
      console.log('✅ Initial members seeded');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

seedMembers();

// ============= SERVER START =============

app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});

