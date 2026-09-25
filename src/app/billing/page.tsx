"use client";

import React from "react";
import { useSolar } from "@/context/SolarContext";
import { formatIDR } from "@/lib/utils";
import { Printer, Sun, CheckCircle2, Leaf } from "lucide-react";

export default function PpaBillingPage() {
  const { ppaInvoice, carbonRec } = useSolar();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Top Controls Toolbar (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#060c20] border border-slate-800 shadow-xl print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
              OFFICIAL PLN PPA TARIFF BILLING
            </span>
            <span className="text-xs text-slate-400">PJBL PT PLN (Persero) Standard A4</span>
          </div>
          <h1 className="text-xl font-black text-white">Faktur Penjualan Listrik &amp; Sertifikat REC A4</h1>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 hover:opacity-90 shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Cetak Faktur PDF / A4
        </button>
      </div>

      {/* A4 PAPER CONTAINER */}
      <div className="flex justify-center">
        <div className="w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-12 bg-white text-slate-900 shadow-2xl rounded-sm print:rounded-none print:shadow-none print:m-0 print:p-8 border border-slate-300 font-sans text-xs relative overflow-hidden">
          
          {/* Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[110px] font-black uppercase tracking-widest text-slate-900 rotate-[-30deg]">
              SOLARGRID
            </span>
          </div>

          {/* Official Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black">
                <Sun className="w-7 h-7 text-amber-400 fill-current" />
              </div>
              <div>
                <h2 className="text-base font-black tracking-wide text-slate-900 uppercase">
                  PT CIRATA SOLAR ENERGY TBK
                </h2>
                <p className="text-[11px] text-slate-600 font-bold uppercase">
                  Pembangkit Listrik Tenaga Surya Terapung 50 MWp Cirata
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Izin Usaha Penyediaan Tenaga Listrik (IUPTL) No: 541/28/ESDM/2024
                </p>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="inline-block px-2.5 py-0.5 bg-slate-100 border border-slate-300 text-[10px] font-bold text-slate-800 rounded">
                TAGIHAN BULANAN ENERGI (PPA INVOICE)
              </span>
              <p className="text-[11px] font-bold text-slate-900 mt-1">{ppaInvoice.billingNumber}</p>
              <p className="text-[10px] text-slate-500">Periode: {ppaInvoice.billingPeriodMonthYear}</p>
            </div>
          </div>

          {/* Customer & Offtaker Details */}
          <div className="border border-slate-300 rounded p-3 mb-4 bg-slate-50/70 font-mono text-[11px]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Pihak Pembeli Tenaga Listrik (Offtaker):</span>
                <strong className="text-slate-900 text-xs block">{ppaInvoice.plnOfftakerEntity}</strong>
                <span className="text-slate-700 text-[10px]">Titik Interkoneksi: {ppaInvoice.plnSubstationName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase">Status Kontrak PJBL (PPA):</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <strong className="text-emerald-800 text-xs">AVAILABILITY FACTOR {ppaInvoice.availabilityFactorPercent}% (BONUS COMPLIANT)</strong>
                </div>
                <span className="text-slate-600 text-[10px]">Jatuh Tempo Pembayaran: {ppaInvoice.invoiceDueDate}</span>
              </div>
            </div>
          </div>

          {/* Metering Settlement Schedule */}
          <div className="border border-slate-300 rounded p-3 mb-4">
            <h4 className="text-[10px] font-bold text-slate-900 uppercase border-b border-slate-200 pb-1 mb-2">
              REKAPITULASI PENYALURAN ENERGI LISTRIK BULANAN (MONTHLY ENERGY RECONCILIATION)
            </h4>
            <table className="w-full text-left font-mono text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[10px]">
                  <th className="py-1">Uraian Transaksi</th>
                  <th className="py-1">Titik Pengukuran</th>
                  <th className="py-1 text-right">Volume Energi (MWh)</th>
                  <th className="py-1 text-right">Tarif PPA (IDR/kWh)</th>
                  <th className="py-1 text-right">Jumlah Tagihan (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 font-bold text-slate-900">Total Produksi Kotor PLTS (Gross Generation)</td>
                  <td className="py-2 text-slate-600">Sisi 33 kV Trafo Utama</td>
                  <td className="py-2 text-right">{ppaInvoice.grossExportMwh.toFixed(1)}</td>
                  <td className="py-2 text-right">-</td>
                  <td className="py-2 text-right">-</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-700">Pemakaian Sendiri &amp; Susut Trafo (Station Aux)</td>
                  <td className="py-2 text-slate-600">Sistem Internal Inverter/HVAC</td>
                  <td className="py-2 text-right text-rose-700">({ppaInvoice.stationAuxiliaryLossMwh.toFixed(1)})</td>
                  <td className="py-2 text-right">-</td>
                  <td className="py-2 text-right">-</td>
                </tr>
                <tr className="bg-amber-50/50 font-bold">
                  <td className="py-2 text-amber-950">Ekspor Bersih ke Gardu PLN (Net Energy Export)</td>
                  <td className="py-2 text-slate-800">Meter Transaksi 150 kV GI Cirata</td>
                  <td className="py-2 text-right text-amber-900 font-black">{ppaInvoice.netBilledMwh.toFixed(1)} MWh</td>
                  <td className="py-2 text-right text-slate-900">Rp {ppaInvoice.ppaTariffPerKwhIDR.toLocaleString("id-ID")}</td>
                  <td className="py-2 text-right text-slate-950 font-black">{formatIDR(ppaInvoice.grossEnergyChargeIDR)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tax & Total Payable Calculation */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border border-slate-300 rounded p-3 bg-slate-50/70 font-mono text-[10px]">
              <h5 className="font-bold text-slate-900 uppercase mb-1">DATA REKENING PEMBAYARAN ESCROW:</h5>
              <div className="space-y-0.5 text-slate-700">
                <p>Bank Penampung: <strong>PT Bank Mandiri (Persero) Tbk</strong></p>
                <p>Nomor Rekening: <strong className="text-slate-900">122-00-8849201-9</strong></p>
                <p>Nama Rekening: <strong>PT Cirata Solar Energy (PPA Escrow Account)</strong></p>
              </div>
            </div>

            <div className="border border-slate-300 rounded p-3 font-mono text-[11px]">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Tagihan Energi:</span>
                  <span className="font-medium text-slate-900">{formatIDR(ppaInvoice.grossEnergyChargeIDR)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pajak Pertambahan Nilai (PPN 11%):</span>
                  <span className="text-slate-800">{formatIDR(ppaInvoice.ppn11PercentIDR)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-300 pt-1 font-bold text-xs text-slate-950">
                  <span>TOTAL TAGIHAN BERSIH:</span>
                  <span className="font-black text-amber-900">{formatIDR(ppaInvoice.totalPayableIDR)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Renewable Energy Certificate (REC / SPE-GRK) */}
          <div className="border border-emerald-300 rounded p-3 mb-6 bg-emerald-50/40">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-1 mb-2">
              <h4 className="text-[10px] font-bold text-emerald-950 uppercase flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" /> SERTIFIKAT ATRIBUSI PENGURANGAN EMISI (REC &amp; SPE-GRK ATTESTATION)
              </h4>
              <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                TERVERIFIKASI SRN-PPI KLHK
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 font-mono text-[10px]">
              <div>
                <span className="text-slate-500 block text-[9px]">Sertifikat Serial No:</span>
                <strong className="text-slate-900">{carbonRec.certificateSerialNo}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">Volume Energi Hijau Terbit:</span>
                <strong className="text-emerald-800">{carbonRec.totalMwhIssued.toFixed(1)} MWh</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px]">Pengurangan Emisi CO₂:</span>
                <strong className="text-emerald-900 font-bold">{carbonRec.totalTonsCO2Offset} Ton CO₂e</strong>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-3 border-t border-slate-300 grid grid-cols-2 gap-8 text-[10px]">
            <div className="text-center">
              <p className="text-slate-500 mb-1">Diterbitkan oleh Pengembang (IPB/PPA Operator):</p>
              <div className="h-12 flex items-center justify-center my-1 relative">
                <div className="w-24 h-8 border border-amber-600 rounded flex items-center justify-center text-amber-900 font-mono text-[9px] uppercase font-bold tracking-widest rotate-[-2deg]">
                  [ SIGNED PPA ]
                </div>
              </div>
              <p className="font-bold text-slate-900 underline">Ir. Doni Satria, M.Sc., IPM.</p>
              <p className="text-[9px] text-slate-500">General Manager Plant Cirata 50 MWp</p>
            </div>

            <div className="text-center">
              <p className="text-slate-500 mb-1">Disetujui oleh PT PLN (Persero) Pengatur Beban:</p>
              <div className="h-12 flex items-center justify-center my-1 relative">
                <div className="w-24 h-8 border border-slate-600 rounded flex items-center justify-center text-slate-800 font-mono text-[9px] uppercase font-bold tracking-widest">
                  [ VERIFIED PLN ]
                </div>
              </div>
              <p className="font-bold text-slate-900 underline">Agus Hermanto, S.T., M.T.</p>
              <p className="text-[9px] text-slate-500">Senior Manager Distribusi Jawa Barat</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
