import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  user_id: string;
  email: string;
  created_at: string;
  active_subscription: {
    id: string;
    status: string;
    expires_at: string | null;
    paid_at: string | null;
    invoice_number: string;
    amount: number;
  } | null;
}

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [togglingUser, setTogglingUser] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_all_users_admin");
      if (error) throw error;
      setUsers((data as unknown as AdminUser[]) || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isPremiumActive = (user: AdminUser) => {
    if (!user.active_subscription) return false;
    if (!user.active_subscription.expires_at) return false;
    return new Date(user.active_subscription.expires_at) > new Date();
  };

  const handleTogglePremium = async (userId: string, enable: boolean) => {
    setTogglingUser(userId);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) throw new Error("Not authenticated");

      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/admin-toggle-premium`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id: userId, enable }),
        }
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to toggle premium");
      }

      toast({
        title: enable ? "Premium Diaktifkan" : "Premium Dinonaktifkan",
        description: enable
          ? "User sekarang memiliki akses premium selama 1 bulan."
          : "Akses premium user telah dicabut.",
      });

      await fetchUsers();
    } catch (err: any) {
      console.error("Toggle premium error:", err);
      toast({
        title: "Error",
        description: err.message || "Gagal mengubah status premium",
        variant: "destructive",
      });
    } finally {
      setTogglingUser(null);
    }
  };

  const filtered = search
    ? users.filter(
        (u) =>
          u.email?.toLowerCase().includes(search.toLowerCase()) ||
          u.user_id.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari berdasarkan email atau user ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Berakhir</TableHead>
                <TableHead>Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    Tidak ada data user
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => {
                  const premium = isPremiumActive(user);
                  const isToggling = togglingUser === user.user_id;

                  return (
                    <TableRow key={user.user_id}>
                      <TableCell className="text-sm font-medium">
                        {user.email || (
                          <span className="text-muted-foreground font-mono text-xs">
                            {user.user_id.slice(0, 8)}...
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={premium ? "default" : "secondary"}
                          className={premium ? "bg-green-600 text-white" : ""}
                        >
                          {premium ? "Premium" : "Free"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.active_subscription?.expires_at
                          ? new Date(
                              user.active_subscription.expires_at
                            ).toLocaleDateString("id-ID")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {isToggling ? (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        ) : (
                          <Switch
                            checked={premium}
                            onCheckedChange={(checked) =>
                              handleTogglePremium(user.user_id, checked)
                            }
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
