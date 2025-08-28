# STANY UNBURN TOOL

## Setup

1. Clone repo:
   git clone https://github.com/yourusername/stany-unburn-tool.git
2. cd stany-unburn-tool
3. Copy `.env.example` → `.env` and fill SMTP credentials
4. Install dependencies:
   npm install
5. Start server:
   npm start
6. Open browser:
   http://localhost:3000

## Deploy

### Backend
- Use free hosting (Render.com / Railway.app)
- Add Environment Variables (.env)
- Get free Render URL

### Frontend
- Use GitHub Pages (branch: /public)
- Update fetch URL in index.html to point to backend URL

### Optional Free Domain
- Freenom + Cloudflare → point domain to frontend/backend URL
