// app/actions/auth-utils.ts
"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function getCurrentSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    return session;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const session = await getCurrentSession();
    
    if (!session?.user) {
      return null;
    }
    
    return {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.name || '',
      image: session.user.image || '',
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function verifySession() {
  try {
    const session = await getCurrentSession();
    
    if (!session?.user) {
      return { 
        authenticated: false, 
        user: null 
      };
    }
    
    return { 
      authenticated: true, 
      user: {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.name || '',
        image: session.user.image || '',
      }
    };
  } catch (error) {
    console.error('Verify session error:', error);
    return { 
      authenticated: false, 
      user: null 
    };
  }
}