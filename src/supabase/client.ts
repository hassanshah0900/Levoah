import { useSession } from "@clerk/nextjs";
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

export function createClient() {
  const { session } = useSession();
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { accessToken: async () => (session ? await session.getToken() : null) }
  );
}
