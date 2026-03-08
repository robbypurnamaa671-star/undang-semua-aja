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
import { Eye, Trash2, Search, ToggleLeft, ToggleRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  author: string;
  published_at: string | null;
  created_at: string;
  tags: string[];
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, status, author, published_at, created_at, tags")
        .order("created_at", { ascending: false })
        .limit(100);

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          status: newStatus,
          published_at: newStatus === "published" ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: newStatus, published_at: newStatus === "published" ? new Date().toISOString() : null } : p
        )
      );
      toast({ title: `Artikel ${newStatus === "published" ? "dipublikasi" : "di-draft-kan"}` });
    } catch {
      toast({ title: "Gagal mengubah status", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Artikel dihapus" });
    } catch {
      toast({ title: "Gagal menghapus", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari artikel..."
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
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="w-[120px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Tidak ada artikel ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{post.author}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                      {post.tags?.slice(0, 2).join(", ")}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => toggleStatus(post.id, post.status)}
                          title={post.status === "published" ? "Jadikan draft" : "Publish"}
                        >
                          {post.status === "published" ? (
                            <ToggleRight className="w-4 h-4 text-green-600" />
                          ) : (
                            <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                        {post.status === "published" && (
                          <Button size="icon" variant="ghost" asChild>
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
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
                              <AlertDialogTitle>Hapus artikel?</AlertDialogTitle>
                              <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-destructive text-destructive-foreground">
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
