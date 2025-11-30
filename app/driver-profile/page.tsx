"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DriverProfilePage() {
  const router = useRouter();

  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Protect Route
    const role = localStorage.getItem("userRole");
    if (role !== "driver") {
      router.push("/login");
      return;
    }

    loadDriverData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadDriverData() {
    setLoading(true);

    const currentEmail = localStorage.getItem("userEmail");

    // If driverProfile exists, only use it if it belongs to the current user
    const saved = localStorage.getItem("driverProfile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email && currentEmail && parsed.email === currentEmail) {
          setDriver(parsed);
          setForm(parsed);
          setAvatarPreview(parsed.avatarUrl || null);
          setLoading(false);
          return;
        }
        // If parsed doesn't have email but driverId matches stored driverId, accept it
        const storedDriverId = localStorage.getItem("driverId");
        if (parsed && storedDriverId && parsed.id && parsed.id === storedDriverId) {
          setDriver(parsed);
          setForm(parsed);
          setAvatarPreview(parsed.avatarUrl || null);
          setLoading(false);
          return;
        }

        // Otherwise ignore stale profile
        // console.info("Ignored stale driverProfile (belongs to a different user).");
      } catch (err) {
        // parsing failed — ignore and fallback
        // console.warn("Failed to parse driverProfile, ignoring.", err);
      }
    }

    // Fallback: assemble from signup/onboarding localStorage keys
    const data = {
      id: localStorage.getItem("driverId") || `local_${Date.now()}`,
      name: localStorage.getItem("userName") || "Driver",
      email: currentEmail || localStorage.getItem("userEmail") || "unknown@example.com",
      phone: localStorage.getItem("userPhone") || "",
      vehicle: localStorage.getItem("userVehicle") || "Not provided",
      bio: localStorage.getItem("userBio") || "",
      rating: Number(localStorage.getItem("userRating") ?? 4.8),
      totalRides: Number(localStorage.getItem("userTotalRides") ?? 0),
      totalEarnings: Number(localStorage.getItem("userTotalEarnings") ?? 0),
      avatarUrl: localStorage.getItem("userAvatarUrl") || null,
    };

    setDriver(data);
    setForm(data);
    setAvatarPreview(data.avatarUrl);
    setLoading(false);
  }

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, [name]: value }));
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setAvatarPreview(dataUrl);
      setForm((f: any) => ({ ...f, avatarUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    const updated = { ...driver, ...form };

    // Persist profile for current user only
    localStorage.setItem("driverProfile", JSON.stringify(updated));

    // Mirror individual keys for other pages (dashboard, etc.)
    localStorage.setItem("userName", updated.name);
    localStorage.setItem("userEmail", updated.email);
    if (updated.phone) localStorage.setItem("userPhone", updated.phone);
    if (updated.vehicle) localStorage.setItem("userVehicle", updated.vehicle);
    if (updated.avatarUrl) localStorage.setItem("userAvatarUrl", updated.avatarUrl);

    setDriver(updated);
    setEditing(false);

    // small confirmation
    alert("Profile updated!");
  }

  function handleLogout() {
    // Clear auth/profile keys so next login sees a clean state
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("driverProfile");
    localStorage.removeItem("userAvatarUrl");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userVehicle");
    router.push("/login");
  }

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/driver">
              <div className="w-8 h-8 bg-primary rounded-lg text-white flex items-center justify-center font-bold">
                A
              </div>
            </Link>

            <div>
              <h1 className="font-bold">Driver Profile</h1>
              <p className="text-sm text-muted-foreground">{driver?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleLogout} className="h-8">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Profile */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gray-200 rounded-xl overflow-hidden">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Photo
              </div>
            )}
          </div>

          {/* Main Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{driver?.name}</h2>
            <p className="text-gray-500">{driver?.email}</p>
            <p className="text-gray-500">{driver?.phone}</p>
            <p className="mt-3">{driver?.bio}</p>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => {
                  // always initialize form from current driver when editing
                  setForm(driver);
                  setAvatarPreview(driver?.avatarUrl || null);
                  setEditing((s) => !s);
                }}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {editing && (
          <Card className="p-6 mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Edit Profile</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm block mb-1">Name</label>
                <input
                  name="name"
                  className="w-full border p-2 rounded"
                  value={form.name || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Email</label>
                <input
                  name="email"
                  className="w-full border p-2 rounded"
                  value={form.email || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Phone</label>
                <input
                  name="phone"
                  className="w-full border p-2 rounded"
                  value={form.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Vehicle</label>
                <input
                  name="vehicle"
                  className="w-full border p-2 rounded"
                  value={form.vehicle || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm block mb-1">Bio</label>
                <textarea
                  name="bio"
                  className="w-full border p-2 rounded"
                  value={form.bio || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm block mb-1">Profile Image</label>
                <input type="file" accept="image/*" onChange={handleFile} />
                <p className="text-xs text-gray-500 mt-1">Preview shown above and saved to localStorage.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Discard
              </Button>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Rides</p>
            <p className="text-xl font-semibold">{driver?.totalRides ?? 0}</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-gray-500">Earnings</p>
            <p className="text-xl font-semibold">€{driver?.totalEarnings ?? 0}</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-gray-500">Rating</p>
            <p className="text-xl font-semibold">⭐ {driver?.rating ?? 0}</p>
          </Card>
        </div>
      </div>
    </main>
  );
}

