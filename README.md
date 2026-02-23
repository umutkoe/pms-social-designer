# PMS+ Social Media Post Designer

AI destekli sosyal medya post tasarım sistemi. Next.js + Claude AI + html2canvas kullanır.

---

## 🚀 Kurulum (Adım Adım)

### 1. Gereksinimler
- [Node.js 18+](https://nodejs.org) kurulu olmalı
- [Git](https://git-scm.com) kurulu olmalı
- [Anthropic API Key](https://console.anthropic.com) (AI özelliği için)

---

### 2. Projeyi Bilgisayarınıza Kurun

```bash
# Proje klasörüne girin
cd pms-social-designer

# Paketleri yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.local.example .env.local
```

### 3. API Key Ekleyin

`.env.local` dosyasını bir metin editörüyle açın ve şu satırı düzenleyin:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
```

API key'i [console.anthropic.com](https://console.anthropic.com) → API Keys bölümünden alabilirsiniz.

### 4. Yerel Olarak Çalıştırın

```bash
npm run dev
```

Tarayıcıda açın: **http://localhost:3000**

---

## ☁️ Vercel'e Deploy (Ücretsiz)

### Yol A: GitHub üzerinden (Tavsiye Edilen)

1. [github.com](https://github.com) → New Repository → `pms-social-designer`
2. Terminalde:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/KULLANICI_ADINIZ/pms-social-designer.git
   git push -u origin main
   ```
3. [vercel.com](https://vercel.com) → Sign Up (GitHub ile)
4. **"Add New Project"** → GitHub reponuzu seçin → **Import**
5. **Environment Variables** bölümüne ekleyin:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...`
6. **Deploy** tıklayın → 2-3 dakikada canlı!

### Yol B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
# Soruları cevaplayın, env var ekleyin
```

---

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── page.tsx          # Ana uygulama
│   ├── page.module.css   # Sayfa stilleri
│   ├── layout.tsx        # HTML wrapper
│   ├── globals.css       # Global stiller (PMS+ design tokens)
│   └── api/
│       └── generate/
│           └── route.ts  # Claude AI API endpoint
├── components/
│   ├── Canvas.tsx        # Post önizleme bileşeni
│   └── Canvas.module.css # Canvas stilleri
└── lib/
    └── export.ts         # PNG/PDF dışa aktarma
```

---

## ✨ Özellikler

| Özellik | Durum |
|---------|-------|
| 4 şablon (Navy, White, Grey, Dark) | ✅ |
| 4 format (Square, Landscape, Story, Banner) | ✅ |
| Gerçek PNG export (2x çözünürlük) | ✅ |
| Gerçek PDF export | ✅ |
| Claude AI ile içerik üretimi | ✅ |
| Tıklayarak metin düzenleme | ✅ |
| 4 platform (LinkedIn, Instagram, Twitter, Facebook) | ✅ |

---

## 💡 Yeni Şablon Eklemek

1. `src/components/Canvas.tsx` içine yeni template bileşeni ekleyin
2. `src/components/Canvas.module.css` içine stilleri ekleyin  
3. `src/app/page.tsx` içindeki `TEMPLATES` dizisine ekleyin

---

## 💰 Maliyet

- **Vercel**: Ücretsiz (Hobby planı, aylık 100GB bant genişliği)
- **Anthropic API**: ~$0.0001 / her AI üretim isteği (Claude Haiku)
- **Toplam**: Ayda birkaç dolar bile etmez

---

## 🔧 Sorun Giderme

**"API key not configured" hatası:**
→ `.env.local` dosyasının doğru dizinde olduğunu kontrol edin

**Export çalışmıyor:**
→ Tarayıcı konsolunu açın (F12), hata mesajına bakın

**Vercel deploy sonrası AI çalışmıyor:**
→ Vercel Dashboard → Settings → Environment Variables → ANTHROPIC_API_KEY eklendi mi kontrol edin
