import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://torthiwfsqwzbcveiimx.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvcnRoaXdmc3F3emJjdmVpaW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5MDkxODUsImV4cCI6MjAxMTQ4NTE4NX0.9FnyfQPJQ5puR_MQnK7RvwiBeuYy7DNjBZcVH1y3eOI'
)
