# PMS+ Post Designer v1.4

Brand-consistent social media post designer for PMS+ design system.

## Features
- 13 Platform Modes (LinkedIn, Instagram, Twitter/X, Facebook)
- 12 Brand Templates with gradient variations (Navy, Action, Frost, Diagonal Split, etc.)
- Layer System — add, reorder, show/hide shape and text layers
- 20 Abstract Shapes with opacity/size/rotation controls
- Image Upload with position controls + safe zone guides
- Dark / Light Mode (persistent via localStorage)
- Export: PNG (full resolution), PDF, Clipboard

## Deploy Options

### Vercel (1 minute)
1. Push folder to GitHub
2. Import on vercel.com → Deploy
3. Done — auto-detects static config

### Netlify Drag & Drop (30 seconds)
1. Go to app.netlify.com/drop
2. Drag this folder into browser
3. Get instant live URL

### Node.js Server
```bash
npm install
npm start
# Runs on http://localhost:3000
# PORT=8080 npm start  (custom port)
```

### Static Host (Apache / Nginx / S3)
Upload index.html only — it's 100% self-contained.

## PMS+ Brand Colors
- Navy   #003D7A
- Accent #0099FF
- Action #0052CC
- Grey   #666666
- Soft   #F5F7FA
- White  #FFFFFF
