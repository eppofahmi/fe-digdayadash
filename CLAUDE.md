# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Vue 3 + Nuxt.js** frontend application for the **Dashboard Implementasi Persuratan NU** (PBNU Digital Correspondence Dashboard). It monitors and evaluates the implementation of digital correspondence systems across all NU organizational units.

**Stack**: Vue 3 + Nuxt 3.13 + TypeScript + Tailwind CSS + Pinia + ECharts

## Development Commands

### Essential Commands
```bash
npm install           # Install dependencies (use virtual environment)
npm run dev           # Start development server (http://localhost:3000)
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Check code quality with ESLint
npm run lint:fix      # Auto-fix ESLint issues
```

### Development Workflow
- **Always use virtual environment** to run scripts and local server (per user instructions)
- Dev server runs on port 3000 by default
- Hot module replacement (HMR) enabled for instant updates
- TypeScript type checking runs automatically

## Project Architecture

### Component Architecture (Vue School Best Practices)

**Base Components** (`components/Base/`)
- Reusable, presentational components with app-specific styling
- Prefix: `Base*` (e.g., `BaseButton`, `BaseCard`, `BaseSelect`)
- Used across the application for consistency
- Examples: `BaseButton.vue`, `BaseCard.vue`, `BasePagination.vue`, `BaseEChart.vue`, `BaseModal.vue`

**Layout Components** (`components/Layout/`)
- Define general page structure
- Prefix: `Layout*`
- Examples: `LayoutHeader.vue`, `LayoutFooter.vue`

**Feature Components** (`components/Dashboard/`)
- Dashboard-specific business logic and functionality
- Prefix: `Dashboard*`
- Examples: `DashboardStats.vue`, `DashboardActivationTable.vue`, `DashboardTrendChart.vue`, `DashboardFilters.vue`

### File-Based Routing (Nuxt)
Pages in `pages/` directory automatically become routes:
- `pages/index.vue` → `/` (homepage with hero section)
- `pages/dashboard-persuratan.vue` → `/dashboard-persuratan` (main dashboard)
- `pages/dashboard-kepengurusan.vue` → `/dashboard-kepengurusan`
- `pages/dashboard-kader.vue` → `/dashboard-kader`
- `pages/dashboard-pesantren.vue` → `/dashboard-pesantren`
- `pages/katalog-data.vue` → `/katalog-data`
- `pages/dataset.vue` → `/dataset`
- `pages/tutorial.vue` → `/tutorial`
- `pages/tentang.vue` → `/tentang`

### State Management (Pinia)

**Store Location**: `stores/dashboard.ts`

**Store Structure**:
- **State**: `loading`, `error`, `statistics`, `activationData`, `organizationStats`, `trendChartData`
- **Actions**: `fetchStatistics()`, `fetchActivationData()`, `fetchOrganizationStats()`, `fetchTrendData()`
- **Getters**: `totalOrganizations`, `activationRate`

**Usage Pattern**:
```typescript
const dashboardStore = useDashboardStore()
await dashboardStore.fetchStatistics()
const stats = dashboardStore.statistics
```

**Important**: All store actions currently use mock data with simulated delays. Replace with actual API calls when backend is ready.

### Type Definitions (`types/index.ts`)

Core types:
- `StatisticCard` - Dashboard KPI cards
- `OrganizationActivation` - Account activation data with ranking
- `OrganizationStatistics` - Letter statistics per organization
- `ChartData` - Time-series chart data
- `FilterOptions` - Filter parameters for tables
- `ApiResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - Paginated API responses

### Composables (`composables/`)

Reusable composition functions:
- `useToast.ts` - Toast notification management
- `useSharing.ts` - Data sharing functionality

### Auto-Imports (Nuxt Convention)

Nuxt automatically imports:
- **Components**: All `.vue` files in `components/` (use directly without import)
- **Composables**: All files in `composables/`
- **Utils**: Vue 3 reactivity APIs (`ref`, `computed`, `reactive`, etc.)

## Styling Architecture

### Tailwind CSS Configuration (`tailwind.config.js`)

**Custom Colors**:
```javascript
primary: { 500: '#257941', 600: '#1e6436' }  // NU Green
secondary: { 500: '#0c5461' }                 // Teal
footer: '#343d46'                             // Footer gray
```

**Custom Animations**:
- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up with fade
- `animate-scale-in` - Scale in with fade

**Responsive Breakpoints**:
- Mobile: `< 768px` (default)
- Tablet: `768px - 1024px` (md:)
- Desktop: `> 1024px` (lg:)

### Global Styles
- Main CSS: `assets/css/main.css`
- Tailwind directives + custom CSS variables
- Font: Inter (sans-serif)

## Key Features & Components

### Dashboard Components

**DashboardStats** (`components/Dashboard/DashboardStats.vue`)
- Displays 6 KPI cards: Total Kepengurusan, Pengurus Terhubung, Surat Terkirim, Surat Masuk, Log Disposisi, Memo
- Data source: Pinia store `statistics`

**DashboardActivationTable** (`components/Dashboard/DashboardActivationTable.vue`)
- Account activation ranking per organization
- Features: Filtering, pagination, progress bars, status indicators
- Data source: Pinia store `activationData`

**DashboardStatisticsTable** (`components/Dashboard/DashboardStatisticsTable.vue`)
- Letter statistics per organization (outgoing, incoming, dispositions, memos)
- Features: Filtering, pagination, export
- Data source: Pinia store `organizationStats`

**DashboardTrendChart** (`components/Dashboard/DashboardTrendChart.vue`)
- Interactive line chart using **ECharts** (not Chart.js)
- Time range selection: Daily, Weekly, Monthly
- Date range picker
- Data source: Pinia store `trendChartData`

**DashboardFilters** (`components/Dashboard/DashboardFilters.vue`)
- Multi-select filters: Kepengurusan, Wilayah, Cabang, Lembaga, Tingkat
- Used by tables for server-side filtering

### Base Components

**BaseEChart** (`components/Base/BaseEChart.vue`)
- Wrapper for Apache ECharts library
- Lazy-loaded for performance
- Handles responsive resizing

**BaseCard** (`components/Base/BaseCard.vue`)
- Reusable card container with header/footer slots
- Props: `hoverable`, `padding`

**BaseButton** (`components/Base/BaseButton.vue`)
- Button variants: `primary`, `secondary`, `ghost`
- Sizes: `sm`, `md`, `lg`

**BasePagination** (`components/Base/BasePagination.vue`)
- Pagination controls with page navigation

**BaseModal** (`components/Base/BaseModal.vue`)
- Modal dialog with overlay and transitions

### Special Modals

**DashboardShareModal** (`components/Dashboard/DashboardShareModal.vue`)
- Share dashboard via WhatsApp, email, link copy

**DashboardScheduleModal** (`components/Dashboard/DashboardScheduleModal.vue`)
- Schedule automated dashboard reports

## Nuxt Configuration (`nuxt.config.ts`)

**Modules**:
- `@nuxtjs/tailwindcss` - Tailwind CSS integration
- `@pinia/nuxt` - Pinia state management
- `@nuxt/image` - Image optimization

**Runtime Config**:
```typescript
runtimeConfig.public.apiBase = '/api'
```

**Image Optimization**:
- Quality: 80
- Formats: WebP, PNG
- Responsive sizes: xs (320px) to xxl (1536px)

## Development Guidelines

### Component Naming Conventions
- **PascalCase** for component files and names
- **Multi-word names** to avoid HTML element conflicts
- **Descriptive prefixes**: `Base`, `Layout`, `Dashboard`

### Component Development
- Single responsibility principle
- TypeScript for all props and emits
- Use `defineProps()` and `defineEmits()` with types
- Prefer `<script setup>` syntax
- Use composables for reusable logic

### State Management
- Keep component state local when possible
- Use Pinia store for cross-component shared state
- Actions should be async and handle errors
- Return readonly state from stores

### Styling Best Practices
- Prefer Tailwind utility classes over custom CSS
- Use Tailwind's responsive modifiers (`sm:`, `md:`, `lg:`)
- Component-scoped `<style>` only when necessary
- Follow mobile-first design approach

## API Integration (Future)

### Current Status
All API calls are **mocked** with simulated delays in Pinia store actions.

### Migration Plan
1. Replace mock data in store actions with actual `$fetch` calls
2. Use `runtimeConfig.public.apiBase` for API base URL
3. Handle loading states via `loading` ref in store
4. Handle errors via `error` ref in store
5. Follow PostgreSQL query patterns from parent CLAUDE.md

### Expected API Endpoints
```typescript
GET /api/dashboard/statistics           // KPI cards
GET /api/dashboard/activation           // Activation table
GET /api/dashboard/organization-stats   // Statistics table
GET /api/dashboard/trend                // Chart data
```

## Chart Library: Apache ECharts

**Important**: This project uses **ECharts**, not Chart.js (despite README mentioning Chart.js).

**Component**: `BaseEChart.vue`
**Library**: `echarts` npm package
**Usage Pattern**:
```vue
<BaseEChart :option="chartOptions" />
```

**Configuration**: Use ECharts option format with series, xAxis, yAxis, etc.

## Deployment (Netlify)

**Platform**: Netlify (auto-deploy configured)
**Build Command**: `npm run build`
**Publish Directory**: `.output/public`
**Node Version**: 18

**Auto-Deploy Branches**: `main`, `dev`

Environment variables can be set in Netlify dashboard:
```bash
NUXT_PUBLIC_API_BASE=https://api-endpoint.com
NODE_ENV=production
```

## Code Quality

**ESLint Config**: `eslint.config.js`
- Nuxt flat config format
- TypeScript + Vue enabled
- Run `npm run lint:fix` before commits

**TypeScript**:
- Strict mode enabled
- All components should have typed props/emits
- Use `types/index.ts` for shared types

## Performance Optimization

- Component lazy loading via Nuxt auto-imports
- Image optimization via `@nuxt/image` module
- ECharts lazy-loaded only when chart component is used
- Efficient re-renders with Vue 3 reactivity system
- Bundle splitting handled by Nuxt

## Important Notes

### Data Context
- **Mock Data**: All dashboard data is currently hardcoded in `stores/dashboard.ts`
- **Real Data**: Database queries are documented in parent repository's CLAUDE.md files
- **PostgreSQL Backend**: System connects to PostgreSQL database with tables: `managements`, `letters`, `dispositions`, `memo`, etc.

### Organizational Hierarchy
- **Tingkat**: Pusat (Central), Wilayah (Regional), Cabang (Branch)
- **Kepengurusan**: Pengurus (Officials), Lembaga (Institutions)
- Example organizations: PBNU, LAZISNU, LPBINU, PWNU Jawa Barat, etc.

### Key Metrics
- Total Kepengurusan: 10,621 connected officials
- Account Activation: 152/184 organizational units (50%)
- Outgoing Letters: 12,450+
- Incoming Letters: 9,156+
- Disposition Logs: 8,245+
- Memos: 3,245+

### Homepage Features (`pages/index.vue`)
- Hero section with search bar
- Katalog Dasbor (4 dashboard cards)
- Topik Katalog Data (15 topic tags with icons)
- Ekosistem Data dan Digital NU (Swiper carousel with 4 DIGDAYA apps)
- SATUDATA Access section

### External Libraries
- **lucide-vue-next**: Icon library (prefer over other icon sets)
- **swiper**: Carousel/slider for Ekosistem section
- **echarts**: Charting library (NOT Chart.js)

## Common Tasks

### Adding a New Dashboard Page
1. Create `pages/dashboard-name.vue`
2. Add route to navigation in `LayoutHeader.vue`
3. Create feature components in `components/Dashboard/`
4. Add store actions if needed in `stores/dashboard.ts`
5. Define types in `types/index.ts`

### Adding a New Filter
1. Update `FilterOptions` interface in `types/index.ts`
2. Add filter control in `DashboardFilters.vue`
3. Update store action to accept new filter parameter
4. Pass filter to API call (when implemented)

### Customizing Theme Colors
1. Update `tailwind.config.js` color palette
2. Update CSS variables in `assets/css/main.css` if needed
3. Run `npm run dev` to see changes

### Adding New Icons
- Import from `lucide-vue-next`
- Use as components: `<IconName />`
- See `pages/index.vue` for examples
