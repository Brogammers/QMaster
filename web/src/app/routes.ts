export const privateRoutes = [
	'/qmaster/counter',
	'/qmaster/admin/customer-feedback',
	'/qmaster/admin/details',
	'/qmaster/admin/queues',
	'/qmaster/admin/sharing-info',
  '/qmaster/booking-app',
  '/qmaster/display',
]

export const authRoutes = [
	'/login',
	'/api/auth/signin'
]


// When user is not logged in and tries to access protected routes redirect to login page
export const DEFAULT_REDIRECT_LOGIN_URL = '/login'

// When user is logged in and tries to access login page redirect to dashboard
export const DEFAULT_REDIRECT_HOME_URL = '/qmaster/counter'