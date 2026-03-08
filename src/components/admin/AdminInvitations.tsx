import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invitation {
  id: string;
  title: string;
  slug: string;
  event_type: string;
  status: string;
  is_paid: boolean;
  created_at: string;
  user_id: string;
}

export function AdminInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("invitations")
        .select("id, title, slug, event_type, status, is_paid, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(100);

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setInvitations(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [search]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("invitations").delete().eq("id", id);
      if (error) throw error;
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      toast({ title: "Undangan dihapus" });
    } catch (err) {
      toast({ title: "Gagal menghapus", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari undangan..."
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
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bayar</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Tidak ada undangan ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                invitations.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{inv.title || "Untitled"}</TableCell>
                    <TableCell className="capitalize">{inv.event_type}</TableCell>
                    <TableCell>
                      <Badge variant={inv.status === "published" ? "default" : "secondary"}>
                        {inv.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={inv.is_paid ? "default" : "outline"} className={inv.is_paid ? "bg-green-600" : ""}>
                        {inv.is_paid ? "Lunas" : "Belum"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(inv.created_at).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {inv.status === "published" && (
                          <Button size="icon" variant="ghost" asChild>
                            <a href={`/invite/${inv.slug}`} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus undangan?</AlertDialogTitle>
                              <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(inv.id)} className="bg-destructive text-destructive-foreground">
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
