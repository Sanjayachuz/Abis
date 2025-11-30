// pages/profile.tsx  OR  app/profile/page.tsx
"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  joinedAt?: string;
  avatarUrl?: string;
  totalRides?: number;
  totalSpent?: number;
};

export default function UserProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<UserProfile>>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const role = localStorage.getItem("userRole");
    if (!role || role !== "rider") {
      router.push("/login");
      return;
    }

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadProfile() {
    setLoading(true);
    const currentEmail = localStorage.getItem("userEmail") || "";

    // prefer userProfile if it belongs to the currently logged-in email
    const raw = localStorage.getItem("userProfile");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as UserProfile;
        if (parsed && parsed.email && parsed.email === currentEmail) {
          useLoaded(parsed);
          return;
        }
        // If parsed has no email but ids match, accept it
        const storedId = localStorage.getItem("userId");
        if (parsed && storedId && parsed.id && parsed.id === storedId) {
          useLoaded(parsed);
          return;
        }
        // otherwise ignore stale userProfile
      } catch (err) {
        // parsing failed – ignore
      }
    }

    // fallback: assemble from individual keys saved at signup
    const fallback: UserProfile = {
      id: localStorage.getItem("userId") || `local_${Date.now()}`,
      name: localStorage.getItem("userName") || "Rider",
      email: currentEmail || localStorage.getItem("userEmail") || "unknown@example.com",
      phone: localStorage.getItem("userPhone") || "",
      bio: localStorage.getItem("userBio") || "",
      joinedAt: localStorage.getItem("userJoinedAt") || new Date().toISOString(),
      avatarUrl: localStorage.getItem("userAvatarUrl") || "",
      totalRides: Number(localStorage.getItem("userTotalRides") ?? 0),
      totalSpent: Number(localStorage.getItem("userTotalSpent") ?? 0)
    };

    useLoaded(fallback);
  }

  function useLoaded(data: UserProfile) {
    setProfile(data);
    setForm(data);
    setAvatarPreview(data.avatarUrl || null);
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setAvatarPreview(dataUrl);
      setForm((f) => ({ ...f, avatarUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const merged: UserProfile = {
        ...(profile ?? { id: `local_${Date.now()}` } as UserProfile),
        ...(form as UserProfile)
      };

      // store full profile and mirror commonly used keys
      localStorage.setItem("userProfile", JSON.stringify(merged));
      localStorage.setItem("userName", merged.name);
      localStorage.setItem("userEmail", merged.email);
      if (merged.phone) localStorage.setItem("userPhone", merged.phone);
      if (merged.bio) localStorage.setItem("userBio", merged.bio);
      if (merged.avatarUrl) localStorage.setItem("userAvatarUrl", merged.avatarUrl);
      if (merged.joinedAt) localStorage.setItem("userJoinedAt", merged.joinedAt);

      setProfile(merged);
      setForm(merged);
      setEditing(false);
      alert("Profile saved");
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed — check console");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    // clear user keys (leave other app data alone if you prefer)
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userAvatarUrl");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userBio");
    router.push("/login");
  }

  if (loading) {
    return <div className="p-6 text-center">Loading profile…</div>;
  }

  if (!profile) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <p>No profile found.</p>
          <Button asChild>
            <Link href="/signup">Create account</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/rider">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">A</div>
            </Link>
            <div>
              <h1 className="font-bold">Profile</h1>
              <p className="text-sm text-muted-foreground">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleLogout} className="h-8">Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-36 h-36 rounded-2xl bg-gray-50 overflow-hidden">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Photo</div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <p className="text-sm text-gray-500">{profile.phone}</p>
            <p className="mt-3 text-sm text-gray-600">{profile.bio}</p>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => {
                  setForm(profile);
                  setAvatarPreview(profile.avatarUrl || null);
                  setEditing((s) => !s);
                }}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
              <Button asChild>
                <Link href="/dashboard/rider">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {editing && (
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <div className="text-sm text-gray-600 mb-1">Full name</div>
                <input name="name" value={String(form.name ?? "")} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </label>

              <label className="block">
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <input name="email" value={String(form.email ?? "")} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </label>

              <label className="block">
                <div className="text-sm text-gray-600 mb-1">Phone</div>
                <input name="phone" value={String(form.phone ?? "")} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </label>

              <label className="sm:col-span-2 block">
                <div className="text-sm text-gray-600 mb-1">Bio</div>
                <textarea name="bio" value={String(form.bio ?? "")} onChange={handleChange} className="w-full border rounded px-3 py-2 h-28" />
              </label>

              <label className="sm:col-span-2 block">
                <div className="text-sm text-gray-600 mb-1">Profile picture</div>
                <input type="file" accept="image/*" onChange={handleFile} className="block" />
                <p className="text-xs text-gray-500 mt-1">Preview will be saved to localStorage (browser only).</p>
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Discard</Button>
            </div>
          </Card>
        )}

        {/* stats */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <Card className="p-4">
            <div className="text-xs text-gray-500">Total Rides</div>
            <div className="text-2xl font-bold">{profile.totalRides ?? 0}</div>
          </Card>

          <Card className="p-4">
            <div className="text-xs text-gray-500">Total Spent</div>
            <div className="text-2xl font-bold">€{profile.totalSpent ?? 0}</div>
          </Card>

          <Card className="p-4">
            <div className="text-xs text-gray-500">Member since</div>
            <div className="text-2xl font-bold">{profile.joinedAt ? new Date(profile.joinedAt).toLocaleDateString() : "-"}</div>
          </Card>
        </div>
      </main>
    </main>
  );
}
