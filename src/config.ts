// ============================================================
// BEM KEMAKOM 2026/2027 — Global Configuration
// ============================================================
// Ubah nilai-nilai di bawah ini untuk mengontrol kedua fase
// pengumuman tanpa perlu mengubah kode komponen.
// ============================================================

export const CONFIG = {
  // === Fase 1: Countdown → Input NIM ===
  // Tanggal target: saat countdown mencapai 0, input NIM muncul
  PHASE_1_TARGET_DATE: "2026-04-21T15:30:00+07:00",
  isPhase1Active: true,

  // === Fase 2: Penempatan Divisi ===
  // Set isPhase2Active = true dan isi tanggal saat siap
  PHASE_2_TARGET_DATE: "2026-04-26T15:30:00+07:00", // Placeholder
  isPhase2Active: false,

  // === Metadata Organisasi ===
  ORG_NAME: "BEM KEMAKOM",
  ORG_FULL_NAME: "Keluarga Mahasiswa Komputer",
  UNIVERSITY: "Universitas Pendidikan Indonesia",
  PERIOD: "2026/2027",

  // === Kontak ===
  CONTACT_EMAIL: "kemakomconnect@gmail.com",
  CONTACT_PHONE: "+62 851-6149-9326",
  CONTACT_ADDRESS: "Lt.3 Gedung Gegeut Winda",
} as const;

export type StudentData = {
  nim: string;
  nama: string;
  program_studi: string;
  angkatan: string;
  status_diterima: boolean;
  penempatan_divisi_biro: string | null;
};
