'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/context/settings-context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

// Force dynamic rendering to prevent build-time prerendering
export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const { settings, isReady, updateSettings, uid } = useSettings();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const stop = onAuthStateChanged(getAuth(), (u) => setAuthed(!!u));
    return () => stop();
  }, []);

  return (
    <Card data-style-id="stylo-1123">
      <CardHeader data-style-id="stylo-1124">
        <CardTitle data-style-id="stylo-1125">Settings</CardTitle>
        <CardDescription data-style-id="stylo-1126">Configure Action Deck behavior. These settings are saved to your account.</CardDescription>
      </CardHeader>
      <CardContent data-style-id="stylo-1127" className="space-y-6">
        {!authed &&
        <div data-style-id="stylo-1128" id="el-338" className="text-sm text-muted-foreground">Sign in on the Login page to change settings.</div>
        }
        <div data-style-id="stylo-1129" id="el-339" className="flex items-center justify-between">
          <div data-style-id="stylo-1130" id="el-340">
            <Label data-style-id="stylo-1131" htmlFor="sync">Save to cloud</Label>
            <p data-style-id="stylo-1132" id="el-341" className="text-sm text-muted-foreground">When on, projects and tasks save to your Firestore under users/&lt;uid&gt;/apps/actionDeck/…</p>
          </div>
          <Switch data-style-id="stylo-1133" id="sync" checked={!!settings.enableSync} disabled={!authed || !isReady} onCheckedChange={(v) => updateSettings({ enableSync: !!v })} />
        </div>
        <div data-style-id="stylo-1134" id="el-342" className="flex items-center justify-between">
          <div data-style-id="stylo-1135" id="el-343">
            <Label data-style-id="stylo-1136" htmlFor="import">Import from briizOS</Label>
            <p data-style-id="stylo-1137" id="el-344" className="text-sm text-muted-foreground">Show briizOS organizer items in the Casual Task List (read-only).</p>
          </div>
          <Switch data-style-id="stylo-1138" id="import" checked={!!settings.importBriizOS} disabled={!authed || !isReady} onCheckedChange={(v) => updateSettings({ importBriizOS: !!v })} />
        </div>
      </CardContent>
    </Card>);

}