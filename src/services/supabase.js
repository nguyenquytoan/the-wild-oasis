import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fbmvbuexhtxcohssywfr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibXZidWV4aHR4Y29oc3N5d2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTQ2MzksImV4cCI6MjA0MTQ3MDYzOX0.jFqTTxnzgvoPyjQH7EHwLXXvub7YivUW0QMIgcu4i14";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
