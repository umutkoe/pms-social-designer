const express = require('express')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

// Serve static files from current directory
app.use(express.static(path.join(__dirname)))

// All routes serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`\n✅ PMS+ Post Designer v1.4 running`)
  console.log(`   → http://localhost:${PORT}\n`)
})
