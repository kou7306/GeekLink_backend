import { supabase } from "../config/db";

export const exchangeCodeForSessionService = async (
  code: string,
  next: string = "/",
  origin: string
): Promise<string> => {
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  return `${origin}${next}`;
};
