import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import 'react-native-url-polyfill/auto'

import { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY} from "@env";

 //fetch: (...args) => fetch(...args), => DEFAULT SUPABASE FETCH
  if (!NEXT_PUBLIC_SUPABASE_URL) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
  if (!NEXT_PUBLIC_SUPABASE_KEY) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_KEY')

const ExpoSecureStoreAdapter = {
  getItem: (key ) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key, value ) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key ) => {
    SecureStore.deleteItemAsync(key)
  },
}
export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter ,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})