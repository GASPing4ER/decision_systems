"use server";

import { supabase } from "@/lib/supabase";

export const getCompanies = async () => {
  const { data, error } = await supabase.from("companies").select("*");

  return { data, error };
};
