<template>
  <BaseModal v-model="isOpen" :close-on-outside="true">
    <template #title>
      <div class="flex items-center gap-2">
        <Calendar class="w-5 h-5 text-[var(--primary-green)]" />
        Schedule Reports
      </div>
    </template>

    <div class="space-y-3">
      <!-- Report Type & Frequency -->
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Report Type</label>
          <select
            v-model="scheduleForm.reportType"
            class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
          >
            <option value="overview">Overview</option>
            <option value="activation">Activation</option>
            <option value="statistics">Statistics</option>
            <option value="trends">Trends</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Frequency</label>
          <select
            v-model="scheduleForm.frequency"
            class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <!-- Timing -->
      <div v-if="scheduleForm.frequency === 'weekly'" class="grid grid-cols-2 gap-2">
        <select
          v-model="scheduleForm.dayOfWeek"
          class="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
        >
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
        </select>
        <input
          v-model="scheduleForm.time"
          type="time"
          class="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
        />
      </div>

      <div v-if="scheduleForm.frequency === 'monthly'" class="grid grid-cols-2 gap-2">
        <select
          v-model="scheduleForm.dayOfMonth"
          class="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
        >
          <option v-for="day in 31" :key="day" :value="day">Day {{ day }}</option>
          <option value="last">Last day</option>
        </select>
        <input
          v-model="scheduleForm.time"
          type="time"
          class="px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
        />
      </div>

      <div v-if="scheduleForm.frequency === 'daily'">
        <input
          v-model="scheduleForm.time"
          type="time"
          class="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
        />
      </div>

      <!-- Recipients -->
      <div>
        <label class="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Recipients</label>
        <div class="space-y-1.5">
          <div
            v-for="(email, index) in scheduleForm.recipients"
            :key="index"
            class="flex gap-1.5"
          >
            <input
              v-model="scheduleForm.recipients[index]"
              type="email"
              placeholder="email@example.com"
              class="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent"
            />
            <button
              @click="removeRecipient(index)"
              class="p-1.5 text-red-500 hover:text-red-700 transition-colors"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            @click="addRecipient"
            class="w-full p-1.5 text-sm text-gray-600 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            + Add Email
          </button>
        </div>
      </div>

      <!-- Format Options -->
      <div>
        <label class="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Formats</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              v-model="scheduleForm.formats"
              type="checkbox"
              value="pdf"
              class="text-[var(--primary-green)] focus:ring-[var(--primary-green)]"
            />
            <FileText class="w-3.5 h-3.5 text-red-600" />
            <span class="text-xs">PDF</span>
          </label>
          <label class="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              v-model="scheduleForm.formats"
              type="checkbox"
              value="excel"
              class="text-[var(--primary-green)] focus:ring-[var(--primary-green)]"
            />
            <FileSpreadsheet class="w-3.5 h-3.5 text-green-600" />
            <span class="text-xs">Excel</span>
          </label>
        </div>
      </div>

      <!-- Advanced Options -->
      <details class="group">
        <summary class="text-xs font-medium text-gray-600 uppercase tracking-wide cursor-pointer list-none flex items-center gap-2">
          <ChevronRight class="w-3.5 h-3.5 transition-transform group-open:rotate-90" />
          Options
        </summary>
        <div class="mt-2 space-y-2 pl-5 border-l-2 border-gray-100">
          <label class="flex items-center gap-2">
            <input
              v-model="scheduleForm.includeCurrentFilters"
              type="checkbox"
              class="text-[var(--primary-green)] focus:ring-[var(--primary-green)]"
            />
            <span class="text-xs text-gray-700">Include current filters</span>
          </label>
          
          <textarea
            v-model="scheduleForm.customMessage"
            placeholder="Custom message (optional)..."
            rows="2"
            class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--primary-green)] focus:border-transparent resize-none"
          ></textarea>
        </div>
      </details>

      <!-- Preview -->
      <div class="p-2 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start gap-2">
          <Info class="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div class="text-xs text-blue-800">
            <div class="font-medium mb-1">{{ schedulePreview }}</div>
            <div class="text-blue-600">Next: {{ nextReportDate }}</div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <BaseButton variant="ghost" size="sm" @click="closeModal">
          Cancel
        </BaseButton>
        <BaseButton 
          variant="primary" 
          size="sm"
          @click="createSchedule"
          :loading="creating"
          :disabled="!isFormValid"
        >
          <Calendar class="w-3.5 h-3.5 mr-2" />
          Create
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { 
  Calendar, 
  X, 
  FileText, 
  FileSpreadsheet, 
  ChevronRight,
  Info
} from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  currentFilters?: Record<string, any>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'scheduled': [schedule: any]
}>()

// State
const creating = ref(false)

const scheduleForm = ref({
  reportType: 'overview',
  frequency: 'weekly',
  dayOfWeek: 1, // Monday
  dayOfMonth: 1,
  time: '09:00',
  recipients: [''],
  formats: ['pdf'],
  includeCurrentFilters: true,
  customMessage: ''
})

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const isFormValid = computed(() => {
  return scheduleForm.value.recipients.some(email => 
    email && email.includes('@')
  ) && scheduleForm.value.formats.length > 0
})

const schedulePreview = computed(() => {
  const { frequency, dayOfWeek, dayOfMonth, time, reportType } = scheduleForm.value
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  let preview = `${reportType} report will be sent `
  
  if (frequency === 'daily') {
    preview += `daily at ${time}`
  } else if (frequency === 'weekly') {
    preview += `every ${days[dayOfWeek]} at ${time}`
  } else if (frequency === 'monthly') {
    if (dayOfMonth === 'last') {
      preview += `on the last day of each month at ${time}`
    } else {
      preview += `on the ${dayOfMonth}${getOrdinalSuffix(Number(dayOfMonth))} of each month at ${time}`
    }
  }
  
  const validEmails = scheduleForm.value.recipients.filter(email => email && email.includes('@'))
  preview += ` to ${validEmails.length} recipient${validEmails.length !== 1 ? 's' : ''}`
  
  return preview
})

const nextReportDate = computed(() => {
  const now = new Date()
  const { frequency, dayOfWeek, dayOfMonth, time } = scheduleForm.value
  const [hours, minutes] = time.split(':').map(Number)
  
  let nextDate = new Date(now)
  
  if (frequency === 'daily') {
    nextDate.setDate(nextDate.getDate() + 1)
  } else if (frequency === 'weekly') {
    const daysUntilNext = (dayOfWeek - now.getDay() + 7) % 7 || 7
    nextDate.setDate(nextDate.getDate() + daysUntilNext)
  } else if (frequency === 'monthly') {
    nextDate.setMonth(nextDate.getMonth() + 1)
    if (dayOfMonth === 'last') {
      nextDate.setDate(0) // Last day of month
    } else {
      nextDate.setDate(Number(dayOfMonth))
    }
  }
  
  nextDate.setHours(hours, minutes, 0, 0)
  
  return nextDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Methods
const closeModal = () => {
  emit('update:modelValue', false)
}

const addRecipient = () => {
  scheduleForm.value.recipients.push('')
}

const removeRecipient = (index: number) => {
  if (scheduleForm.value.recipients.length > 1) {
    scheduleForm.value.recipients.splice(index, 1)
  }
}

const getOrdinalSuffix = (num: number) => {
  if (num >= 11 && num <= 13) return 'th'
  switch (num % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

const createSchedule = async () => {
  creating.value = true
  
  try {
    const scheduleData = {
      ...scheduleForm.value,
      recipients: scheduleForm.value.recipients.filter(email => email && email.includes('@')),
      filters: scheduleForm.value.includeCurrentFilters ? props.currentFilters : {},
      createdAt: new Date().toISOString()
    }
    
    // In real implementation:
    // const response = await $fetch('/api/dashboard/schedule-report', {
    //   method: 'POST',
    //   body: scheduleData
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    emit('scheduled', scheduleData)
    closeModal()
    
    // Show success message
    const { success } = useToast()
    success(`${scheduleForm.value.frequency} report scheduled successfully!`)
    
  } catch (error) {
    const { error: showError } = useToast()
    showError('Failed to create schedule')
    console.error('Schedule creation failed:', error)
  } finally {
    creating.value = false
  }
}

// Reset form when modal opens
watch(isOpen, (newValue) => {
  if (newValue) {
    // Reset to defaults but keep current filters
    scheduleForm.value = {
      reportType: 'overview',
      frequency: 'weekly',
      dayOfWeek: 1,
      dayOfMonth: 1,
      time: '09:00',
      recipients: [''],
      formats: ['pdf'],
      includeCurrentFilters: true,
      customMessage: ''
    }
  }
})
</script>