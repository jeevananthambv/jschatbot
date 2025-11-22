# 🚀 Jeesuva - Quick Start Guide

Get Jeesuva running in **5 minutes**!

---

## ⚡ Prerequisites
- **Node.js** installed ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

---

## 🎯 Quick Start Steps

### Step 1: Open PowerShell
Press `Win + R` and type `powershell`, then Enter.

### Step 2: Navigate to Backend
```powershell
cd D:\menstrual-health-startup\backend
```

### Step 3: Install Dependencies (One-time only)
```powershell
npm install
```

Wait for the installation to complete. You'll see:
```
✅ Firebase configuration validated
✅ Firebase Admin SDK initialized
```

### Step 4: Start the Server
```powershell
npm start
```

You should see:
```
======================================================================
🚀 JEESUVA FIREBASE SERVER - PRODUCTION READY
======================================================================
✅ Server running on http://localhost:5000
📡 Firebase Project: jeesuva-cb878
⚡ Powered by: Express + ChatbotService + Firebase
🔒 Security: Headers + Input Sanitization
======================================================================
```

### Step 5: Open in Browser
Open your browser and go to:
```
http://localhost:5000
```

---

## 🎮 What to Try

1. **Click the Chat Section** - Scroll down to "Ask Our Menstrual Health Assistant"
2. **Try Quick Questions** - Click buttons like "Heating pad", "Herbal ingredients", etc.
3. **Ask Custom Questions** - Type your own questions:
   - "How does the heating pad work?"
   - "What's in the herbal sachets?"
   - "How to manage menstrual cramps?"
   - "Tell me myths vs facts about menstruation"

---

## 🛑 How to Stop the Server
In PowerShell, press:
```
Ctrl + C
```

You'll see:
```
🛑 Server shutting down gracefully...
```

---

## ✅ Testing the API

### Test with Browser (Easiest)
Visit these URLs in your browser:

**Health Check**:
```
http://localhost:5000/api/test
```

**API Info**:
```
http://localhost:5000/api/info
```

### Test with PowerShell (Advanced)
```powershell
# Test endpoint
curl http://localhost:5000/api/test

# Chat with message
$body = @{message="How does the heating pad work?"} | ConvertTo-Json
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/chat" `
  -Method Post -Body $body -ContentType "application/json"
$response.Content | ConvertFrom-Json
```

---

## 📂 Project Structure

```
menstrual-health-startup/
├── frontend/              ← Website files (HTML, CSS, JS)
├── backend/               ← Server & API
│   ├── firebase-server.js ← Main server file
│   ├── chatbot-service.js ← AI/NLP engine
│   ├── security-service.js← Security & sanitization
│   └── package.json       ← Dependencies
└── README.md              ← Full documentation
```

---

## 🤔 Troubleshooting

### Issue: "Port 5000 already in use"
**Solution**: Either port 5000 is occupied or server didn't shut down properly.

```powershell
# Find and kill process on port 5000
Get-Process node | Stop-Process -Force
```

Then try `npm start` again.

### Issue: "Cannot find module 'express'"
**Solution**: Dependencies not installed.

```powershell
npm install
```

### Issue: Server shuts down immediately
**Solution**: Check for errors in the logs. Reinstall dependencies:

```powershell
rm -r node_modules package-lock.json
npm install
npm start
```

### Issue: Chatbot not responding
**Solution**: Make sure server is running (check PowerShell window shows the startup message).

---

## 📚 Learn More
- **Full Documentation**: See `README.md`
- **API Documentation**: See README.md → API Documentation
- **Frontend Code**: `frontend/js/script.js`
- **Backend Code**: `backend/firebase-server.js`

---

## 🎓 What's Running?

| Component | Purpose | Technology |
|-----------|---------|-----------|
| **Frontend** | Website UI | HTML5, CSS3, Bootstrap, JavaScript |
| **Backend Server** | API endpoint | Node.js + Express |
| **Chatbot AI** | Smart responses | NLP + Emotion detection |
| **Database** | Data storage | Firebase |

---

## 💬 Chat Examples

### Example 1: Health Question
**You**: "Is menstrual pain normal?"
**Bot**: "Mild cramping is normal, but severe pain should be discussed with a doctor. Jeesuva helps manage discomfort..."

### Example 2: Product Question
**You**: "How does the heating pad work?"
**Bot**: "The heating pad uses sodium acetate crystals that activate when clicked, providing 4-6 hours of therapeutic heat without electricity..."

### Example 3: Emotion Detection
**You**: "I'm so scared and alone"
**Bot**: *[Detects anxiety/fear]* "I'm here to support you. You're not alone. Many girls experience these feelings..."

---

## 🎉 Success Checklist

- [ ] Node.js and npm installed
- [ ] Navigated to `backend` folder
- [ ] Ran `npm install` (dependencies installed)
- [ ] Started server with `npm start` (see startup message)
- [ ] Opened `http://localhost:5000` in browser
- [ ] Tried the chatbot widget
- [ ] Tested quick questions and custom questions

**✨ Congratulations! Jeesuva is now running!**

---

## 🆘 Need Help?

1. Check **Troubleshooting** section above
2. Read **README.md** for detailed documentation
3. Look at `backend/firebase-server.js` for code
4. Check console logs in PowerShell for error messages

---

## 🚀 Next Steps

After confirming everything works:

1. **Explore the Website** - Navigate through all pages (Home, About, Product, Resources)
2. **Test All Features** - Use all quick questions and ask custom ones
3. **Read Documentation** - Open `README.md` for full details
4. **Customize** - Modify responses in `backend/chatbot-service.js`
5. **Deploy** - Follow deployment guide in README.md for production

---

**Happy health empowering! 💙**
