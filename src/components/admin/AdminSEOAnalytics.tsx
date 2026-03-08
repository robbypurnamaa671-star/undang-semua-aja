import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Eye, TrendingUp, Monitor, Globe, MapPin, Palette, Calendar as CalendarIcon } from "lucide-react";

const COLORS = [
  "#c8956c",
  "#d4a574",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
];

interface AnalyticsData {
  total_views: number;
  views_today: number;
  views_yesterday: number;
  top_pages: { slug: string; title: string; h1: string; views: number }[] | null;
  top_cities: { city: string; views: number }[] | null;
  top_events: { event_type: string; views: number }[] | null;
  top_styles: { style: string; views: number }[] | null;
  device_breakdown: { device_type: string; views: number }[] | null;
  top_referrers: { referrer: string; views: number }[] | null;
  daily_views: { date: string; views: number }[] | null;
}

export function AdminSEOAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [daysBack, setDaysBack] = useState("30");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const { data: result, error } = await supabase.rpc("get_seo_analytics", {
          days_back: parseInt(daysBack),
        });
        if (error) throw error;
        setData(result as unknown as AnalyticsData);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [daysBack]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return <p className="text-muted-foreground">Tidak ada data analytics.</p>;

  const growthPercent =
    data.views_yesterday > 0
      ? Math.round(((data.views_today - data.views_yesterday) / data.views_yesterday) * 100)
      : data.views_today > 0
      ? 100
      : 0;

  // Avoid Recharts prop collision: `style` key in data can be treated as SVG style prop
  const topStylesChartData = (data.top_styles ?? []).map((item) => ({
    style_name: item.style,
    views: item.views,
  }));

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold">SEO Page Analytics</h2>
        <Select value={daysBack} onValueChange={setDaysBack}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 hari terakhir</SelectItem>
            <SelectItem value="30">30 hari terakhir</SelectItem>
            <SelectItem value="90">90 hari terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{daysBack} hari terakhir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Views Hari Ini</CardTitle>
            <CalendarIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.views_today.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Kemarin: {data.views_yesterday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${growthPercent >= 0 ? "text-green-600" : "text-destructive"}`}>
              {growthPercent >= 0 ? "+" : ""}{growthPercent}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs kemarin</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily views chart */}
      {data.daily_views && data.daily_views.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Views Harian</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.daily_views}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  labelFormatter={(d) => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                />
                <Line type="monotone" dataKey="views" stroke="#c8956c" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top cities */}
        {data.top_cities && data.top_cities.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Top Kota</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.top_cities.slice(0, 10)} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis dataKey="city" type="category" width={90} stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#c8956c" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Top event types */}
        {data.top_events && data.top_events.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Top Jenis Acara</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data.top_events} dataKey="views" nameKey="event_type" cx="50%" cy="50%" outerRadius={90} isAnimationActive={false} label={({ event_type, percent }) => `${event_type} ${(percent * 100).toFixed(0)}%`}>
                    {data.top_events.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Top styles */}
        {topStylesChartData.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Palette className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Top Gaya Desain</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topStylesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="style_name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#d4a574" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Device breakdown */}
        {data.device_breakdown && data.device_breakdown.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Monitor className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">Perangkat</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={data.device_breakdown} dataKey="views" nameKey="device_type" cx="50%" cy="50%" outerRadius={90} isAnimationActive={false} label={({ device_type, percent }) => `${device_type} ${(percent * 100).toFixed(0)}%`}>
                    {data.device_breakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Top referrers */}
      {data.top_referrers && data.top_referrers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Top Referrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.top_referrers.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate max-w-[200px]">{r.referrer}</span>
                  <span className="text-sm font-semibold">{r.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top pages table */}
      {data.top_pages && data.top_pages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Top 20 Halaman SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 font-medium text-muted-foreground">#</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Halaman</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_pages.map((page, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 text-muted-foreground">{i + 1}</td>
                      <td className="py-2">
                        <a
                          href={`/p/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate block max-w-md"
                        >
                          {page.h1 || page.title}
                        </a>
                        <span className="text-xs text-muted-foreground">/p/{page.slug}</span>
                      </td>
                      <td className="py-2 text-right font-semibold">{page.views.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
