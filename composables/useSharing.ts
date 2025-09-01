interface ShareOptions {
  includeFilters?: boolean
  includeCharts?: boolean
  format?: 'pdf' | 'excel' | 'csv'
  expiration?: string
}

export const useSharing = () => {
  const { success, error } = useToast()
  const route = useRoute()
  const _router = useRouter()

  // Copy current link with all applied filters
  const copyCurrentLink = async (currentFilters?: Record<string, unknown>) => {
    try {
      const baseUrl = window.location.origin + window.location.pathname
      
      // Build query parameters from current filters
      const params = new URLSearchParams()
      
      // Add current route query params
      Object.entries(route.query).forEach(([key, value]) => {
        if (value) params.set(key, String(value))
      })
      
      // Add current filters if provided
      if (currentFilters && Object.keys(currentFilters).length > 0) {
        params.set('filters', JSON.stringify(currentFilters))
      }
      
      // Add timestamp for tracking
      params.set('shared', new Date().toISOString())
      
      const shareableUrl = params.toString() 
        ? `${baseUrl}?${params.toString()}`
        : baseUrl
      
      await navigator.clipboard.writeText(shareableUrl)
      success('Link copied to clipboard!')
      
      return shareableUrl
    } catch (err) {
      error('Failed to copy link')
      console.error('Copy link error:', err)
      throw err
    }
  }

  // Generate shareable link with expiration
  const generateShareableLink = async (
    filters?: Record<string, unknown>, 
    expiration = '7d'
  ): Promise<string> => {
    try {
      // In real implementation, call API to generate secure shareable link
      // const response = await $fetch('/api/dashboard/generate-link', {
      //   method: 'POST',
      //   body: { filters, expiration }
      // })
      
      // For demo, generate a link with share token
      const shareToken = Math.random().toString(36).substring(2, 15)
      const baseUrl = window.location.origin + window.location.pathname
      const params = new URLSearchParams({
        share: shareToken,
        expires: expiration
      })
      
      if (filters && Object.keys(filters).length > 0) {
        params.set('filters', JSON.stringify(filters))
      }
      
      return `${baseUrl}?${params.toString()}`
    } catch (err) {
      error('Failed to generate shareable link')
      throw err
    }
  }

  // Export data functionality
  const exportData = async (
    type: 'activation' | 'statistics' | 'trends',
    _options: ShareOptions = {}
  ) => {
    try {
      // In real implementation, call export API
      // const response = await $fetch('/api/dashboard/export', {
      //   method: 'POST',
      //   body: {
      //     type,
      //     format: options.format || 'pdf',
      //     filters: options.includeFilters ? getCurrentFilters() : {},
      //     includeCharts: options.includeCharts || false
      //   }
      // })
      
      // For demo, simulate download
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const filename = `dashboard-${type}-${new Date().toISOString().split('T')[0]}.${_options.format || 'pdf'}`
      success(`${filename} exported successfully!`)
      
      // Simulate download trigger
      // window.location.href = response.downloadUrl
      
    } catch (err) {
      error(`Failed to export ${type} data`)
      throw err
    }
  }

  // Email sharing
  const shareViaEmail = async (
    subject = 'Dashboard Persuratan PBNU',
    _options: ShareOptions = {}
  ) => {
    try {
      const shareableLink = await copyCurrentLink()
      const body = `Lihat dashboard Persuratan PBNU:\n\n${shareableLink}\n\nDikirim pada: ${new Date().toLocaleString('id-ID')}`
      
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoLink
      
      success('Email draft opened!')
    } catch (err) {
      error('Failed to open email')
      throw err
    }
  }

  // WhatsApp sharing
  const shareViaWhatsApp = async (message?: string) => {
    try {
      const shareableLink = await copyCurrentLink()
      const defaultMessage = `Dashboard Persuratan PBNU - ${new Date().toLocaleDateString('id-ID')}`
      const text = message || defaultMessage
      
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${shareableLink}`)}`
      window.open(whatsappUrl, '_blank')
      
      success('WhatsApp opened for sharing!')
    } catch (err) {
      error('Failed to share via WhatsApp')
      throw err
    }
  }

  // Social media sharing
  const shareToSocialMedia = async (platform: 'facebook' | 'twitter' | 'linkedin') => {
    try {
      const shareableLink = await copyCurrentLink()
      const title = 'Dashboard Persuratan PBNU'
      const _description = 'Monitoring implementasi persuratan digital di lingkungan PBNU'
      
      let shareUrl = ''
      
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}&text=${encodeURIComponent(title)}`
          break
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`
          break
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400')
        success(`Shared to ${platform}!`)
      }
    } catch (err) {
      error(`Failed to share to ${platform}`)
      throw err
    }
  }

  // Parse shared link parameters when loading dashboard
  const parseSharedLink = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const sharedFilters = urlParams.get('filters')
    const shareToken = urlParams.get('share')
    const expiration = urlParams.get('expires')
    
    let filters = {}
    if (sharedFilters) {
      try {
        filters = JSON.parse(sharedFilters)
      } catch (err) {
        console.warn('Failed to parse shared filters:', err)
      }
    }
    
    return {
      isSharedLink: !!shareToken,
      filters,
      shareToken,
      expiration
    }
  }

  return {
    copyCurrentLink,
    generateShareableLink,
    exportData,
    shareViaEmail,
    shareViaWhatsApp,
    shareToSocialMedia,
    parseSharedLink
  }
}