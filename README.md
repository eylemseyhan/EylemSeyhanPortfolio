# Eylem'in Portfolyo Sitesi

Modern ve responsive bir portfolyo sitesi. Vue 3, Node.js, Firebase ve Redis kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- Vue 3 Composition API
- Tailwind CSS ile modern UI
- Firebase Firestore entegrasyonu
- Redis ile ziyaretçi sayacı
- Responsive tasarım
- Dark/Light mode
- SEO optimizasyonu

## 🛠️ Teknolojiler

### Frontend
- Vue 3
- Tailwind CSS
- Vue Router
- Firebase SDK
- Headless UI
- Heroicons

### Backend
- Node.js
- Express
- Firebase Admin SDK
- Redis
- Google Cloud Functions (opsiyonel)

## 📦 Kurulum

### Frontend

```bash
cd frontend
npm install
```

`.env` dosyası oluşturun:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend

```bash
cd backend
npm install
```

`.env` dosyası oluşturun:
```
PORT=3000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
REDIS_URL=your_redis_url
```

## 🚀 Geliştirme

### Frontend
```bash
cd frontend
npm run dev
```

### Backend
```bash
cd backend
npm run dev
```

## 📦 Deployment

### Frontend (Netlify)
1. Netlify hesabı oluşturun
2. GitHub reponuzu bağlayın
3. Build komutunu ayarlayın: `cd frontend && npm install && npm run build`
4. Publish directory: `frontend/dist`

### Backend (Google App Engine)
1. Google Cloud hesabı oluşturun
2. App Engine'i etkinleştirin
3. `app.yaml` dosyası oluşturun
4. Deploy edin: `gcloud app deploy`

## 📝 Lisans

MIT 