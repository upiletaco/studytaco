import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../util/database.types';

class SupabaseClientSingleton {
  private static instance: SupabaseClientSingleton | null = null;
  private client: SupabaseClient<Database> | null = null;

  private constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  public static getInstance(): SupabaseClientSingleton {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = new SupabaseClientSingleton();
    }

    return SupabaseClientSingleton.instance;
  }

  public getClient(): SupabaseClient<Database> {
    if (!this.client) {
      throw new Error('Supabase client is not initialized');
    }
    return this.client;
  }

   // Helper method to get current session
   public async getSession() {
    return await this.getClient().auth.getSession();
  }

  // Helper method to get current user
  public async getUser() {
    const { data: { user } } = await this.getClient().auth.getUser();
    return user;
  }
}

export const getSupabase = () => SupabaseClientSingleton.getInstance().getClient();

export const getSupabaseSession = async () => {
  return await SupabaseClientSingleton.getInstance().getSession();
};

export const getSupabaseUser = async () => {
  return await SupabaseClientSingleton.getInstance().getUser();
};