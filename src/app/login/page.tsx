'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{uid: string;email: string | null;} | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? { uid: u.uid, email: u.email } : null);
    });
    return () => unsub();
  }, [auth]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div data-style-id="stylo-1152" id="el-352" className="flex items-center justify-center min-h-[60vh] p-4">
      <Card data-style-id="stylo-1153" className="w-full max-w-md">
        <CardHeader data-style-id="stylo-1154">
          <CardTitle data-style-id="stylo-1155">{user ? 'Account' : mode === 'login' ? 'Log in' : 'Create account'}</CardTitle>
          <CardDescription data-style-id="stylo-1156">
            {user ? 'You are signed in. Use the app routes now.' : 'Use email + password to authenticate.'}
          </CardDescription>
        </CardHeader>
        <CardContent data-style-id="stylo-1157">
          {user ?
          <div data-style-id="stylo-1158" id="el-353" className="space-y-4">
              <div data-style-id="stylo-1159" id="el-354" className="text-sm text-muted-foreground">UID: {user.uid}</div>
              <div data-style-id="stylo-1160" id="el-355" className="text-sm text-muted-foreground">Email: {user.email || '—'}</div>
              <Button data-style-id="stylo-1161" onClick={() => signOut(auth)}>Sign out</Button>
            </div> :

          <form data-style-id="stylo-1162" id="el-356" onSubmit={handleSubmit} className="space-y-4">
              <div data-style-id="stylo-1163" id="el-357" className="grid gap-2">
                <label data-style-id="stylo-1164" id="el-358" className="text-sm">Email</label>
                <Input data-style-id="stylo-1165" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div data-style-id="stylo-1166" id="el-359" className="grid gap-2">
                <label data-style-id="stylo-1167" id="el-360" className="text-sm">Password</label>
                <Input data-style-id="stylo-1168" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <div data-style-id="stylo-1169" id="el-361" className="text-sm text-destructive">{error}</div>}
              <div data-style-id="stylo-1170" id="el-362" className="flex items-center gap-2">
                <Button data-style-id="stylo-1171" type="submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Sign up'}</Button>
                <Button data-style-id="stylo-1172" type="button" variant="outline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                  {mode === 'login' ? 'Need an account?' : 'Have an account?'}
                </Button>
              </div>
            </form>
          }
        </CardContent>
      </Card>
    </div>);

}