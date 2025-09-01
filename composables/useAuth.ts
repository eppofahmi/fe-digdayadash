export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// Hardcoded users for demo
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Administrator PBNU',
    email: 'admin@pbnu.org',
    role: 'admin'
  },
  {
    id: '2', 
    name: 'User PBNU',
    email: 'user@pbnu.org',
    role: 'user'
  },
  {
    id: '3',
    name: 'Guest PBNU',
    email: 'guest@pbnu.org', 
    role: 'guest'
  }
]

const DEMO_PASSWORD = 'password'

export const useAuth = () => {
  // Use Nuxt's built-in state management
  const user = useState<User | null>('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)

  // Check if user is stored in localStorage on app init
  const initAuth = () => {
    if (import.meta.client) {
      const storedUser = localStorage.getItem('auth.user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch {
          localStorage.removeItem('auth.user')
        }
      }
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Find user by email
    const foundUser = DEMO_USERS.find(u => u.email === email)
    
    if (!foundUser || password !== DEMO_PASSWORD) {
      throw new Error('Email atau password salah')
    }

    // Set user state
    user.value = foundUser

    // Persist to localStorage
    if (import.meta.client) {
      localStorage.setItem('auth.user', JSON.stringify(foundUser))
    }
  }

  const logout = async (): Promise<void> => {
    user.value = null
    
    if (import.meta.client) {
      localStorage.removeItem('auth.user')
    }

    // Redirect to login page
    await navigateTo('/login')
  }

  const hasRole = (role: User['role']): boolean => {
    return user.value?.role === role
  }

  const hasAnyRole = (roles: User['role'][]): boolean => {
    return roles.includes(user.value?.role as User['role'])
  }

  // Initialize auth state
  if (import.meta.client) {
    initAuth()
  }

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout,
    hasRole,
    hasAnyRole,
    initAuth
  }
}