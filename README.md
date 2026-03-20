# Gym Management Dashboard 🚀

A clean, minimal dashboard demo for gym owners. Built with React + Tailwind (frontend) and Node.js + Express (backend).

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express (in-memory data)

## 🚀 Quick Start

### 1. Backend (Members API)
```bash
cd backend
npm install
npm start
```
*Server runs on `http://localhost:3001`*

### 2. Frontend (Dashboard)
```bash
cd frontend
npm install
npm run dev
```
*App runs on `http://localhost:3000`*

## 📱 Features
- ✅ Dashboard with 4 key stats cards + chart
- ✅ Members table (Active/Expired status)
- ✅ Add new members via modal
- ✅ Real-time status calculation
- ✅ Responsive design
- ✅ Clean, professional UI

## 🧪 Test Data
- 10 sample members (mixed active/expired)
- Backend auto-populates on startup

## 🎨 UI Design
- Modern sidebar navigation
- Professional color scheme
- Smooth hover effects
- Mobile responsive

## 🔄 Workflow
1. Dashboard ← shows stats (calls `/api/members`)
2. Members page ← full table + Add Member modal
3. Add Member → POST `/api/members` → instant UI update
4. Status auto-calculated (expiry date vs today)

## 📁 File Structure
```
gym_management/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── components/ (Sidebar, StatsCard, MemberTable, AddMemberModal)
│       ├── pages/ (Dashboard, Members)
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

## 🎯 Demo Flow
1. Open `http://localhost:3000`
2. See Dashboard stats
3. Click **Members** → see table with status colors
4. Click **Add Member** → fill form → see instant update!

---

**Built for quick client demos. Ready to impress gym owners! 💪**
