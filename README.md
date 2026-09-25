# SolarGrid OS (Titan #17)
### 50 MWp Floating Solar PV SCADA, Inverter Telemetry & BESS Energy Storage ERP

![SolarGrid OS Architecture](https://img.shields.io/badge/Architecture-Client--Side%20Local--First-amber?style=for-the-badge)
![Compliance](https://img.shields.io/badge/Compliance-PLN%20PPA%20%26%20SRN--PPI%20REC-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)

---

## 🌐 Live Production Deployments
- **SCADA Inverter Grid Command:** [https://olyxmintabansos-byte.github.io/solargrid-os/](https://olyxmintabansos-byte.github.io/solargrid-os/)
- **Battery Energy Storage Desk (BESS):** [https://olyxmintabansos-byte.github.io/solargrid-os/bess/](https://olyxmintabansos-byte.github.io/solargrid-os/bess/)
- **PLN PPA Billing & REC A4 Studio:** [https://olyxmintabansos-byte.github.io/solargrid-os/billing/](https://olyxmintabansos-byte.github.io/solargrid-os/billing/)
- **PV Cell Degradation & LCOE Modeling:** [https://olyxmintabansos-byte.github.io/solargrid-os/degradation/](https://olyxmintabansos-byte.github.io/solargrid-os/degradation/)

---

## 📐 Arsitektur & Fitur Utama

1. **SCADA Inverter Grid Command (`/`)**:
   - Pemantauan real-time 8 unit *Central String Inverters* (total 50 MWp) dengan telemetri tegangan string DC (1.380 V), efisiensi konversi AC (98.8%), dan suhu *heatsink*.
   - Visualisasi kurva radiasi matahari (*Solar Irradiance Bell Curve*) dan sinkronisasi gelombang AC inverter di-render pada **60 FPS** menggunakan HTML5 Canvas.
   - Throttle *grid curtailment* interaktif untuk merespons instruksi pemangkasan daya dari PLN Dispatcher.

2. **BESS Energy Storage Desk (`/bess/`)**:
   - Sistem kendali 4 kontainer baterai *Lithium Iron Phosphate* (LiFePO4) berkapasitas 20 MWh.
   - Manajemen mode operasional: *Charging Solar Excess*, *Discharging Peak Shaving* (pelepasan beban puncak), dan *Grid Frequency Regulation*.
   - Pengawasan kesehatan baterai (*State of Health* - SoH), suhu sel, dan siklus pengisian.

3. **Faktur PLN PPA & Sertifikat Karbon REC A4 (`/billing/`)**:
   - Format cetak A4 resmi rekonsiliasi penyaluran energi bulanan sesuai Perjanjian Jual Beli Listrik (PJBL / PPA) PT PLN (Persero).
   - Perhitungan otomatis ekspor bersih (*Net Billed MWh*), pemakaian sendiri (*Station Aux*), tarif Rp 1.450 / kWh, dan PPN 11%.
   - Sertifikat *Renewable Energy Certificate* (REC) & SPE-GRK yang terakreditasi oleh Sistem Registrasi Nasional (SRN-PPI) Kementerian LHK.

4. **Simulator Degradasi Panel PV 25 Tahun & LCOE (`/degradation/`)**:
   - Model penurunan efisiensi modul surya 25 tahun standar garansi linear Tier-1 BloombergNEF (2.0% LID di tahun pertama, 0.50%/tahun selanjutnya).
   - Kalkulasi finansial *Levelized Cost of Electricity* (LCOE Rp/kWh), Internal Rate of Return (IRR 12.8%), dan *payback period* 7.2 tahun.
   - Slider faktor kerugian debu (*Soiling Loss Factor*) untuk floating solar farm.

---

## 🛠️ Stack Teknologi
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`)
- **State & Storage:** React Context + LocalStorage Persistence
- **Iconography:** Lucide React
- **Static Export:** GitHub Pages (`output: 'export'`, `trailingSlash: true`, `.nojekyll`)
