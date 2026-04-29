// import { createClient } from '@supabase/supabase-js';
// import { NextResponse } from 'next/server';
// import type { HubSpotPayload } from '@/types';

// // Initialize Supabase with Service Role Key to allow writes
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
// );

// export async function POST(req: Request) {
//     console.log(supabase)
//   try {
//     const body: HubSpotPayload = await req.json();
//     const { type, email, ...rest } = body;

//     // Insert into Supabase 'submissions' table
//     const { data, error } = await supabase
//       .from('submissions')
//       .insert([
//         {
//           email: email,
//           form_type: type,
//           payload: rest, // Storing extra dynamic fields in a JSONB column
//           submitted_at: new Date().toISOString(),
//         },
//       ])
//       .select();

//     if (error) throw error;

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error: any) {
//     console.error("Supabase Error:", error);
//     return NextResponse.json(
//       { error: error },
//       { status: 500 }
//     );
//   }
// }


import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Client
// Note: Using the Anon Key requires the RLS policy to be set in your dashboard
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request body
    const body = await req.json();

    // 2. Destructure the data to match your requested format
    // These names match the keys being sent from your useHubspotForm hook
    const { 
      type, 
      category, 
      name, 
      email, 
      contact, 
      fileName 
    } = body;

    // 3. Insert into Supabase 'submissions' table
    // We map the camelCase names from the frontend to the underscore_names in the DB
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          type: type,
          category: category,
          name: name,
          email: email,
          contact: contact,
          file_name: fileName, // Maps 'fileName' from frontend to 'file_name' column
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    // 4. Handle database errors (like RLS violations or missing columns)
    if (error) {
        console.error("Supabase Database Error:", error);
        throw error;
    }

    // 5. Return success response
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Internal Server Error",
        details: error 
      },
      { status: 500 }
    );
  }
}