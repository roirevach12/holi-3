import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6880c2c2ce20a11f8b059f91", 
  requiresAuth: true // Ensure authentication is required for all operations
});
