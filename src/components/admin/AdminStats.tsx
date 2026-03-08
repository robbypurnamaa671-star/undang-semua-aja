import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Users, Mail, CreditCard } from "lucide-react";

interface Stats {
  totalInvitations: number;
  publishedInvitations: number;
  totalBlogPosts: number;
  totalUsers: number;
  totalRsvp: number;
  activeSubscriptions: number;
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [invRes, pubInvRes, blogRes, rsvpRes, subRes] = await Promise.all([
          supabase.from("invitations").select("id", { count: "exact", head: true }),
          supabase.from("invitations").select("id", { count: "exact", head: true }).eq("status", "published"),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("rsvp_responses").select("id", { count: "exact", head: true }),
          supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
        ]);

        setStats({
          totalInvitations: invRes.count || 0,
          publishedInvitations: pubInvRes.count || 0,
          totalBlogPosts: blogRes.count || 0,
          totalUsers: 0, // Can't query auth.users from client
          totalRsvp: rsvpRes.count || 0,
          activeSubscriptions: subRes.count || 0,
        });
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    { label: "Total Undangan", value: stats?.totalInvitations || 0, sub: `${stats?.publishedInvitations || 0} dipublikasi`, icon: Mail, color: "text-primary" },
    { label: "Artikel Blog", value: stats?.totalBlogPosts || 0, sub: "published", icon: FileText, color: "text-hajatan" },
    { label: "Total RSVP", value: stats?.totalRsvp || 0, sub: "respon tamu", icon: Users, color: "text-accent-foreground" },
    { label: "Subscriber Aktif", value: stats?.activeSubscriptions || 0, sub: "premium", icon: CreditCard, color: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
