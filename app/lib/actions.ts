"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData): Promise<boolean> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  return !error;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
