# Portfolio Güvenlik Özellikleri

## 🔒 Uygulanan Güvenlik Önlemleri

### 1. Firebase Hosting Güvenlik Başlıkları

#### HTTPS Yönlendirmesi
- Tüm HTTP istekleri otomatik olarak HTTPS'e yönlendirilir
- HSTS (HTTP Strict Transport Security) başlığı ile zorunlu HTTPS

#### Content Security Policy (CSP)
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

#### Ek Güvenlik Başlıkları
- **X-Content-Type-Options**: `nosniff` - MIME type sniffing'i engeller
- **X-Frame-Options**: `DENY` - Clickjacking saldırılarını engeller
- **X-XSS-Protection**: `1; mode=block` - XSS koruması
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Referrer bilgisi kontrolü
- **Permissions-Policy**: Kamera, mikrofon, konum erişimini engeller

### 2. Frontend Güvenlik

#### DOMPurify Entegrasyonu
- HTML içerik sanitization
- XSS saldırılarını engeller
- Sadece güvenli HTML taglarına izin verir

#### Güvenli HTML Render
```vue
<!-- Komponent ile güvenli render -->
<SafeHtml :content="userContent" />

<!-- Direktif ile güvenli render -->
<div v-sanitize="userContent"></div>
```

#### İzin Verilen HTML Tagları
- `b`, `i`, `em`, `strong` - Metin formatlama
- `a` - Linkler (href, target, rel attribute'ları ile)
- `br`, `p`, `span`, `div` - Yapısal elementler

### 3. Backend Güvenlik

#### Input Validation
- Tüm form verileri validate edilir
- Spam detection algoritması
- Rate limiting (15 dakikada 3 istek)

#### Firebase Security Rules
```javascript
// Firestore güvenlik kuralları
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow write: if request.auth == null; // Anonim yazma
      allow read: if false; // Okuma yok
    }
  }
}
```

## 🧪 Güvenlik Testleri

### XSS Test
```javascript
const maliciousContent = '<script>alert("XSS!")</script>'
const sanitized = sanitizeHtml(maliciousContent)
// Sonuç: '<p>XSS!</p>' (script tag'ı temizlendi)
```

### Sanitization Test
```javascript
const testContent = '<iframe src="http://evil.com"></iframe>'
const sanitized = sanitizeHtml(testContent)
// Sonuç: '' (iframe tag'ı temizlendi)
```

## 🚀 Deployment

### Production Build
```bash
cd frontend
npm run build
```

### Firebase Deploy
```bash
firebase deploy
```

### Güvenlik Kontrolü
1. HTTPS zorunluluğu kontrol edilir
2. CSP başlıkları doğrulanır
3. XSS testleri çalıştırılır
4. Güvenlik başlıkları kontrol edilir

## 📋 Güvenlik Checklist

- [x] HTTPS yönlendirmesi
- [x] Content Security Policy
- [x] XSS koruması (DOMPurify)
- [x] Clickjacking koruması
- [x] MIME type sniffing koruması
- [x] Input validation
- [x] Rate limiting
- [x] Spam detection
- [x] Firebase security rules
- [x] Güvenlik başlıkları
- [x] Cache kontrolü

## 🔧 Güvenlik Ayarları

### CSP Ayarları Değiştirme
`firebase.json` dosyasında `Content-Security-Policy` başlığını düzenleyin.

### DOMPurify Ayarları
`src/directives/sanitize.js` dosyasında izin verilen tag ve attribute'ları düzenleyin.

### Rate Limiting
`backend/server.js` dosyasında rate limiting ayarlarını değiştirin.

## 📞 Güvenlik Raporları

Güvenlik açığı bulursanız:
1. Detaylı açıklama ile rapor edin
2. Proof of concept ekleyin
3. Önerilen çözümü belirtin

## 🔄 Güvenlik Güncellemeleri

- Düzenli olarak bağımlılıkları güncelleyin
- Güvenlik başlıklarını kontrol edin
- Yeni güvenlik özelliklerini entegre edin 