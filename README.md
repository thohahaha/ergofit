# ErgoFit - Posture Monitoring App 🏃‍♂️

Aplikasi monitoring postur ergonomis untuk produktivitas yang lebih sehat. Dibuat menggunakan Ionic Angular dengan design system yang konsisten dan responsive.

![ErgoFit Logo](https://img.shields.io/badge/ErgoFit-Posture%20Monitoring-6C63FF?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![Ionic](https://img.shields.io/badge/Ionic-7-blue?style=for-the-badge&logo=ionic)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 📊 Dashboard
- **Real-time Posture Scoring**: Monitoring skor postur secara real-time
- **Active Warnings**: Peringatan postur yang perlu diperbaiki
- **Daily Progress**: Progress tracking dengan visual progress bars
- **Session Statistics**: Statistik waktu aktif dan istirahat

### 🎯 Monitoring
- **Body Part Analysis**: Analisis detail bagian tubuh (leher, punggung, bahu, pinggul)
- **SVG Body Visualization**: Visualisasi tubuh dengan color-coded status
- **Real-time Scoring**: Skor 1-10 untuk setiap bagian tubuh
- **Status Indicators**: Chip status dengan indikator warna

### 📈 Analytics
- **Weekly Posture Trends**: Tren postur mingguan dengan chart
- **Problem Areas**: Identifikasi area yang perlu diperbaiki
- **Improvement Tracking**: Tracking peningkatan performa
- **Custom Chart Fallback**: Chart canvas custom tanpa dependency eksternal

### 💡 Recommendations
- **Exercise Guide**: Panduan latihan peregangan step-by-step
- **Active Break Tips**: Tips istirahat aktif dengan emoji
- **Workstation Setup**: Panduan setup workstation ergonomis
- **Daily Routine**: Timeline rutinitas harian yang ergonomis

### ⚙️ Settings
- **App Preferences**: Pengaturan notifikasi, suara, dan sensitivitas
- **User Profile**: Profil pengguna dengan data antropometri
- **Privacy Controls**: Kontrol data dan privasi
- **Data Export**: Export data dalam format JSON

## 🎨 Design System

### Color Palette
```scss
--ergofit-primary: #6C63FF;      // Primary purple
--ergofit-secondary: #764ba2;    // Secondary purple
--ergofit-accent: #9c88ff;       // Accent purple
--ergofit-success: #10dc60;      // Success green
--ergofit-warning: #ffce00;      // Warning yellow
--ergofit-danger: #f04141;       // Danger red
```

### Typography Scale
- **Display**: 2.5rem (40px)
- **XXL**: 2rem (32px)
- **XL**: 1.5rem (24px)
- **LG**: 1.2rem (19px)
- **MD**: 1rem (16px)
- **SM**: 0.85rem (14px)
- **XS**: 0.75rem (12px)

### Spacing System
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

## 🏗️ Architecture

### Component Structure
```
src/
├── app/
│   ├── pages/
│   │   ├── dashboard/          # Dashboard dengan metrics
│   │   ├── monitoring/         # Body monitoring dengan SVG
│   │   ├── analytics/          # Charts dan analytics
│   │   ├── recommendations/    # Exercise recommendations
│   │   └── settings/          # User settings
│   ├── shared/
│   │   └── components/
│   │       └── navbar.component.ts  # Fixed navigation
│   ├── tabs/
│   │   └── tabs.routes.ts     # Routing configuration
│   └── app.component.ts       # Main app dengan router-outlet
├── global.scss               # Global styles dan design system
└── theme/
    └── variables.scss        # Ionic theme variables
```

### Routing
- `/dashboard` - Dashboard utama
- `/monitoring` - Monitoring postur
- `/analytics` - Analytics dan laporan
- `/recommendations` - Rekomendasi exercise
- `/settings` - Pengaturan aplikasi

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Angular CLI 17+
- Ionic CLI 7+

### Installation
```bash
# Clone repository
git clone https://github.com/thohahaha/ergofit.git
cd ergofit

# Install dependencies
npm install

# Start development server
ionic serve
```

### Build untuk Production
```bash
# Build web app
ionic build --prod

# Build untuk Android
ionic capacitor add android
ionic capacitor run android

# Build untuk iOS
ionic capacitor add ios
ionic capacitor run ios
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 769px

### Grid System
- **Auto Grid**: `ergofit-grid-auto` - Responsive auto-fit columns
- **2 Columns**: `ergofit-grid-2` - Fixed 2 columns
- **3 Columns**: `ergofit-grid-3` - Fixed 3 columns
- **4 Columns**: `ergofit-grid-4` - Fixed 4 columns

## 🔧 Technologies Used

- **Framework**: Angular 17 + Ionic 7
- **Language**: TypeScript 5
- **Styling**: SCSS dengan CSS Custom Properties
- **Icons**: Ionicons
- **Charts**: Custom Canvas API (fallback dari Chart.js)
- **Mobile**: Capacitor untuk native builds

## 🎯 Key Features Implemented

### ✅ Layout & Design
- Consistent design system dengan CSS variables
- Responsive grid system
- Glassmorphism UI dengan backdrop filters
- Gradient backgrounds dan shadows
- Mobile-first responsive design

### ✅ Navigation
- Fixed header dan tab bar
- Angular Router dengan lazy loading
- Proper z-index layering
- Smooth page transitions

### ✅ Data Visualization
- Custom canvas charts (tanpa dependency)
- SVG body visualization dengan color coding
- Real-time data updates
- Progress bars dan metrics

### ✅ User Experience
- Intuitive navigation
- Consistent interaction patterns
- Accessibility considerations
- Performance optimizations

## 🤖 AI-Generated Code

Project ini dikembangkan dengan bantuan **Claude Code** dari Anthropic untuk:
- Architecture planning dan best practices
- Component development dan styling
- Responsive design implementation
- Code optimization dan debugging

## 📄 License

MIT License - bebas digunakan untuk tujuan pembelajaran dan pengembangan.

## 🔗 Links

- **Repository**: https://github.com/thohahaha/ergofit
- **Demo**: [Live Demo] (jika ada)
- **Documentation**: [Docs] (jika ada)

---

Dibuat dengan ❤️ menggunakan Angular + Ionic + Claude Code