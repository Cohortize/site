import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { email, newPassword } = req.body;
  
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  try {
    //fetching from supabase
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }

    //filtering out the user we want out of the data from supabase
    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user.id;
    
    //main update thing
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });
    
    if (updateError) {
      console.error('Password update error:', updateError);
      throw new Error('Failed to update password');
    }
    
    return res.status(200).json({ success: true, message: 'Password updated successfully' });
    
  } catch (err) {
    console.error('Password reset error:', err);
    return res.status(500).json({ 
      error: err instanceof Error ? err.message : 'Internal server error' 
    });
  }
}