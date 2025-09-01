<template>
  <BaseModal v-model="isOpen" :close-on-outside="true">
    <template #title>
      <div class="flex items-center gap-2">
        <Share2 class="w-5 h-5 text-[var(--primary-green)]" />
        Share Dashboard
      </div>
    </template>

    <div class="space-y-4">
      <!-- Share Options -->
      <div class="space-y-2">
        <h4 class="text-xs font-medium text-gray-600 uppercase tracking-wide">Share Options</h4>
        
        <div class="grid grid-cols-2 gap-2">
          <!-- Email Share -->
          <button
            class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-[var(--primary-green)] hover:bg-green-50 transition-all group"
            @click="shareViaEmail"
          >
            <div class="w-7 h-7 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
              <Mail class="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div class="text-left">
              <div class="text-xs font-medium text-gray-900">Email</div>
              <div class="text-xs text-gray-500">With attachment</div>
            </div>
          </button>

          <!-- WhatsApp Share -->
          <button
            class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-[var(--primary-green)] hover:bg-green-50 transition-all group"
            @click="shareViaWhatsApp"
          >
            <div class="w-7 h-7 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
              <MessageCircle class="w-3.5 h-3.5 text-green-600" />
            </div>
            <div class="text-left">
              <div class="text-xs font-medium text-gray-900">WhatsApp</div>
              <div class="text-xs text-gray-500">With preview</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Export Options -->
      <div class="space-y-2">
        <h4 class="text-xs font-medium text-gray-600 uppercase tracking-wide">Export As</h4>
        
        <div class="grid grid-cols-2 gap-2">
          <button
            class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-[var(--primary-green)] hover:bg-green-50 transition-all group"
            @click="exportAsPDF"
          >
            <div class="w-7 h-7 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center">
              <FileText class="w-3.5 h-3.5 text-red-600" />
            </div>
            <div class="text-left">
              <div class="text-xs font-medium text-gray-900">PDF</div>
              <div class="text-xs text-gray-500">With charts</div>
            </div>
          </button>

          <button
            class="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-[var(--primary-green)] hover:bg-green-50 transition-all group"
            @click="exportAsExcel"
          >
            <div class="w-7 h-7 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
              <FileSpreadsheet class="w-3.5 h-3.5 text-green-600" />
            </div>
            <div class="text-left">
              <div class="text-xs font-medium text-gray-900">Excel</div>
              <div class="text-xs text-gray-500">Data only</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Generate Shareable Link -->
      <div class="space-y-2">
        <h4 class="text-xs font-medium text-gray-600 uppercase tracking-wide">Generate Link</h4>
        
        <div class="space-y-2">
          <!-- Link Expiration -->
          <select
            v-model="linkExpiration"
            class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
          >
            <option value="24h">Expires in 24 hours</option>
            <option value="7d">Expires in 7 days</option>
            <option value="30d">Expires in 30 days</option>
            <option value="never">Never expires</option>
          </select>

          <!-- Generate Button -->
          <BaseButton
            :loading="generatingLink"
            variant="primary"
            size="sm"
            class="w-full"
            @click="generateShareableLink"
          >
            <Link2 class="w-3.5 h-3.5 mr-2" />
            Generate Link
          </BaseButton>

          <!-- Generated Link Display -->
          <div
            v-if="shareableLink"
            class="p-2 bg-gray-50 rounded-lg border"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-700 truncate">{{ shareableLink }}</p>
              </div>
              <button
                class="p-1 text-gray-500 hover:text-[var(--primary-green)] transition-colors"
                title="Copy Link"
                @click="copyShareableLink"
              >
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
            <div class="flex items-center justify-between mt-1 pt-1 border-t border-gray-200">
              <span class="text-xs text-gray-500">Expires: {{ linkExpirationDate }}</span>
              <span class="text-xs text-green-600">{{ linkCopied ? 'Copied!' : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule Reports -->
      <div class="space-y-2">
        <h4 class="text-xs font-medium text-gray-600 uppercase tracking-wide">Automation</h4>
        
        <button
          class="w-full flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-[var(--primary-green)] hover:bg-green-50 transition-all group"
          @click="scheduleReport"
        >
          <div class="w-7 h-7 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center">
            <Calendar class="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div class="text-left">
            <div class="text-xs font-medium text-gray-900">Schedule Reports</div>
            <div class="text-xs text-gray-500">Weekly or monthly email</div>
          </div>
        </button>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton variant="ghost" @click="closeModal">
          Cancel
        </BaseButton>
      </div>
    </template>
  </BaseModal>

  <!-- Schedule Modal -->
  <DashboardScheduleModal
    v-model="showScheduleModal"
    :current-filters="currentFilters"
    @scheduled="handleScheduleCreated"
  />
</template>

<script setup lang="ts">
import { 
  Share2, 
  Mail, 
  MessageCircle, 
  FileText, 
  FileSpreadsheet,
  Link2,
  Copy,
  Calendar
} from 'lucide-vue-next'

interface ScheduleData {
  reportType: string
  frequency: string
  dayOfWeek: number
  dayOfMonth: number | 'last'
  time: string
  recipients: string[]
  formats: string[]
  includeCurrentFilters: boolean
  customMessage: string
}

interface Props {
  modelValue: boolean
  currentFilters?: Record<string, unknown>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'share': [type: string, options?: Record<string, unknown>]
}>()

// Reactive data
const linkExpiration = ref('7d')
const shareableLink = ref('')
const generatingLink = ref(false)
const linkCopied = ref(false)

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const linkExpirationDate = computed(() => {
  if (!shareableLink.value) return ''
  
  const now = new Date()
  switch (linkExpiration.value) {
    case '24h':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString()
    case '7d':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    case '30d':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    default:
      return 'Never'
  }
})

// Methods
const closeModal = () => {
  emit('update:modelValue', false)
}

const shareViaEmail = () => {
  emit('share', 'email', { 
    includeAttachment: true,
    filters: props.currentFilters 
  })
  closeModal()
}

const shareViaWhatsApp = () => {
  const text = `Dashboard Persuratan PBNU - ${new Date().toLocaleDateString()}`
  const url = window.location.href
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`
  window.open(whatsappUrl, '_blank')
  closeModal()
}

const exportAsPDF = () => {
  emit('share', 'export', { 
    format: 'pdf', 
    includeCharts: true,
    filters: props.currentFilters 
  })
  closeModal()
}

const exportAsExcel = () => {
  emit('share', 'export', { 
    format: 'excel',
    filters: props.currentFilters 
  })
  closeModal()
}

const generateShareableLink = async () => {
  generatingLink.value = true
  
  try {
    // Simulate API call to generate shareable link
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const baseUrl = window.location.origin + window.location.pathname
    const linkId = Math.random().toString(36).substring(2, 15)
    const filtersParam = props.currentFilters ? 
      `&filters=${encodeURIComponent(JSON.stringify(props.currentFilters))}` : ''
    
    shareableLink.value = `${baseUrl}?share=${linkId}&expires=${linkExpiration.value}${filtersParam}`
    
    // In real implementation, call API:
    // const response = await $fetch('/api/dashboard/generate-link', {
    //   method: 'POST',
    //   body: {
    //     expiration: linkExpiration.value,
    //     filters: props.currentFilters
    //   }
    // })
    // shareableLink.value = response.shareableUrl
    
  } catch (error) {
    console.error('Failed to generate shareable link:', error)
  } finally {
    generatingLink.value = false
  }
}

const copyShareableLink = async () => {
  try {
    await navigator.clipboard.writeText(shareableLink.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy link:', error)
  }
}

const showScheduleModal = ref(false)

const scheduleReport = () => {
  showScheduleModal.value = true
}

const handleScheduleCreated = (scheduleData: ScheduleData) => {
  console.log('Schedule created:', scheduleData)
  // Close the main share modal as well
  closeModal()
}

// Reset state when modal closes
watch(isOpen, (newValue) => {
  if (!newValue) {
    shareableLink.value = ''
    linkCopied.value = false
    generatingLink.value = false
  }
})
</script>