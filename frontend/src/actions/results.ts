"use server";

import { supabase } from "@/lib/supabase";
import { ResultProps } from "@/types";

export const getResults = async () => {
  const { data, error } = await supabase
    .from("results")
    .select()
    .order("created_at", { ascending: false });
  return { data, error };
};

export const getResult = async (resultId: string) => {
  const { data, error } = await supabase
    .from("results")
    .select()
    .eq("id", resultId)
    .single();

  return { data, error };
};

export const addResult = async (
  name: string,
  results: { results: ResultProps[] }
) => {
  const { data, error } = await supabase
    .from("results")
    .insert({ name, results });

  return { data, error };
};
