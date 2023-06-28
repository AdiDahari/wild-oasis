import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qjaxywqcbrycwycxabnf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqYXh5d3FjYnJ5Y3d5Y3hhYm5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3ODg1MDUsImV4cCI6MjAwMzM2NDUwNX0.gsg5BR5EED9GXwUVu74yavAIEDnFjspwBYyaWzFrnF8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
