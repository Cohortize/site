import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();
    
    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }
    
    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword
    });
    
    if (updateError) {
      console.error('Password update error:', updateError);
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'Password updated successfully' });
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}