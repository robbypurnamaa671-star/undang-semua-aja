import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

interface UserSubscription {
  id: string;
  user_id: string;
  status: string;
  amount: number;
  paid_at: string | null;
  expires_at: string | null;
  invoice_number: string;
  created_at: string;
}

export function AdminUsers() {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("id, user_id, status, amount, paid_at, expires_at, invoice_number, created_at")
          .order("created_at", { ascending: false })
          .limit(100);

        if (error) throw error;
        setSubscriptions(data || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const filtered = search
    ? subscriptions.filter(
        (s) =>
          s.user_id.toLowerCase().includes(search.toLowerCase()) ||
          s.invoice_number.toLowerCase().includes(search.toLowerCase())
      )
    : subscriptions;

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return true;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari berdasarkan user ID atau invoice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Dibayar</TableHead>
                <TableHead>Berakhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Tidak ada data subscription
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-mono text-xs max-w-[120px] truncate">{sub.user_id}</TableCell>
                    <TableCell className="text-sm">{sub.invoice_number}</TableCell>
                    <TableCell>
                      <Badge
                        variant={sub.status === "active" ? "default" : "secondary"}
                        className={sub.status === "active" && !isExpired(sub.expires_at) ? "bg-green-600" : ""}
                      >
                        {sub.status === "active" && !isExpired(sub.expires_at) ? "Active" : sub.status === "active" ? "Expired" : sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">Rp {sub.amount.toLocaleString("id-ID")}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.paid_at ? new Date(sub.paid_at).toLocaleDateString("id-ID") : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString("id-ID") : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
