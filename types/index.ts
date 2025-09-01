// Dashboard Statistics Types
export interface StatisticCard {
  icon: string
  label: string
  value: string
  description: string
}

// Organization Data Types
export interface OrganizationActivation {
  ranking: number
  nama: string
  tingkat: string
  kepengurusan: string
  aktivasi: string
  status: 'Baik' | 'Sedang' | 'Buruk'
  percentage: number
}

export interface OrganizationStatistics {
  no: number
  nama: string
  tingkat: string
  kepengurusan: string
  tanggalMulai: string
  suratKeluar: number
  suratMasuk: number
  logDisposisi: number
  memo: number
}

// Chart Data Types
export interface ChartData {
  labels: string[]
  data: number[]
}

// Filter Types
export interface FilterOptions {
  kepengurusan: string
  wilayah: string
  cabang: string
  lembaga: string
  tingkat: string
  status?: string
}

// Navigation Types
export interface NavItem {
  label: string
  href: string
  active?: boolean
}

// Utility Types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

// API Response Types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}