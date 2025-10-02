/**
 * Global error handling composable
 * Provides consistent error handling across the application
 */

export const useErrorHandler = () => {
  const { show: showToast } = useToast()

  /**
   * Handle async errors gracefully
   */
  const handleAsyncError = async <T>(
    promise: Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      return await promise
    } catch (error) {
      console.error('Async error:', error)

      const message = errorMessage || 'Terjadi kesalahan. Silakan coba lagi.'
      showToast(message, 'error')

      return null
    }
  }

  /**
   * Handle fetch errors with user-friendly messages
   */
  const handleFetchError = (error: unknown, customMessage?: string) => {
    console.error('Fetch error:', error)

    let message = customMessage || 'Gagal memuat data. Silakan coba lagi.'

    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch')) {
        message = 'Koneksi gagal. Periksa koneksi internet Anda.'
      }
      // Timeout errors
      else if (error.message.includes('timeout')) {
        message = 'Permintaan timeout. Silakan coba lagi.'
      }
    }

    showToast(message, 'error')
  }

  /**
   * Handle API errors based on status code
   */
  const handleApiError = (statusCode: number, customMessage?: string) => {
    const messages: Record<number, string> = {
      400: 'Permintaan tidak valid.',
      401: 'Anda tidak memiliki akses. Silakan login kembali.',
      403: 'Akses ditolak.',
      404: 'Data tidak ditemukan.',
      408: 'Permintaan timeout.',
      429: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
      500: 'Server error. Silakan coba lagi.',
      502: 'Gateway error. Silakan coba lagi.',
      503: 'Layanan tidak tersedia. Silakan coba lagi.',
      504: 'Gateway timeout. Silakan coba lagi.'
    }

    const message = customMessage || messages[statusCode] || 'Terjadi kesalahan.'
    showToast(message, 'error')
  }

  /**
   * Log error for monitoring (can integrate with Sentry, etc.)
   */
  const logError = (error: Error, context?: Record<string, unknown>) => {
    console.error('Error logged:', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    })

    // TODO: Send to error monitoring service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: context })
  }

  /**
   * Create error boundary for component
   */
  const createErrorBoundary = (componentName: string) => {
    return {
      onErrorCaptured: (error: Error) => {
        console.error(`Error in ${componentName}:`, error)
        logError(error, { component: componentName })
        showToast(`Error di ${componentName}. Silakan refresh halaman.`, 'error')
        return false // Prevent error propagation
      }
    }
  }

  return {
    handleAsyncError,
    handleFetchError,
    handleApiError,
    logError,
    createErrorBoundary
  }
}
