import { auth } from "@clerk/nextjs/server";
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export async function createClient() {
  const { getToken } = await auth();
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { accessToken: async () => await getToken() }
  );
}
