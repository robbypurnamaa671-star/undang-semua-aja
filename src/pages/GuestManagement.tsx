import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Link as LinkIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useInvitations } from "@/hooks/use-invitations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RSVPResponse {
  id: string;
  guest_name: string;
  attendance: string;
  guest_count: number;
  message: string | null;
  created_at: string;
}

export default function GuestManagement() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const { invitations, isLoading: invLoading } = useInvitations();

  const [selectedInvitationId, setSelectedInvitationId] = useState<string>("");
  const [rsvpData, setRsvpData] = useState<RSVPResponse[]>([]);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  // Set initial invitation from query params
  useEffect(() => {
    const invId = searchParams.get("invitation");
    if (invId) setSelectedInvitationId(invId);
    else if (invitations.length > 0 && !selectedInvitationId) {
      setSelectedInvitationId(invitations[0].id || "");
    }
  }, [invitations, searchParams]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  // Fetch RSVP data when invitation changes
  useEffect(() => {
    if (!selectedInvitationId) return;
    const fetchRSVP = async () => {
      setRsvpLoading(true);
      const { data, error } = await supabase
        .from("rsvp_responses")
        .select("*")
        .eq("invitation_id", selectedInvitationId)
        .order("created_at", { ascending: false });
      if (!error && data) setRsvpData(data);
      setRsvpLoading(false);
    };
    fetchRSVP();
  }, [selectedInvitationId]);

  const selectedInvitation = invitations.find((i) => i.id === selectedInvitationId);
  const guestList: string[] = selectedInvitation?.guestList || [];
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const getGuestLink = (name: string) => {
    if (!selectedInvitation?.slug) return "";
    return `${baseUrl}/invite/${selectedInvitation.slug}?to=${encodeURIComponent(name)}`;
  };

  const copyLink = (name: string) => {
    navigator.clipboard.writeText(getGuestLink(name));
    toast({ title: "Link disalin!", description: `Link untuk ${name} berhasil disalin.` });
  };

  const copyAllLinks = () => {
    if (guestList.length === 0) return;
    const all = guestList.map((n) => `${n}: ${getGuestLink(n)}`).join("\n");
    navigator.clipboard.writeText(all);
    toast({ title: "Semua link disalin!", description: `${guestList.length} link berhasil disalin.` });
  };

  // Match RSVP to guest list
  const getGuestRSVP = (name: string) => {
    return rsvpData.find(
      (r) => r.guest_name.toLowerCase() === name.toLowerCase()
    );
  };

  const attendanceIcon = (attendance: string) => {
    switch (attendance) {
      case "hadir":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "tidak_hadir":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <HelpCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const attendanceLabel = (attendance: string) => {
    switch (attendance) {
      case "hadir": return "Hadir";
      case "tidak_hadir": return "Tidak Hadir";
      case "ragu": return "Ragu-ragu";
      default: return attendance;
    }
  };

  // Stats
  const totalGuests = guestList.length;
  const respondedGuests = guestList.filter((n) => getGuestRSVP(n)).length;
  const attendingGuests = rsvpData.filter((r) => r.attendance === "hadir").reduce((sum, r) => sum + r.guest_count, 0);
  const notAttending = rsvpData.filter((r) => r.attendance === "tidak_hadir").length;

  // Uninvited RSVPs (people who RSVP'd but aren't on guest list)
  const uninvitedRSVPs = rsvpData.filter(
    (r) => !guestList.some((g) => g.toLowerCase() === r.guest_name.toLowerCase())
  );

  if (authLoading || invLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg font-semibold">Manajemen Tamu</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Invitation Selector */}
        <div className="card-elevated bg-card p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Pilih Undangan</label>
              <Select value={selectedInvitationId} onValueChange={setSelectedInvitationId}>
                <SelectTrigger className="w-full sm:w-80">
                  <SelectValue placeholder="Pilih undangan..." />
                </SelectTrigger>
                <SelectContent>
                  {invitations.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id || ""}>
                      {inv.title || "Untitled"} ({inv.eventType})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedInvitation?.slug && selectedInvitation.status === "published" && (
              <Button variant="outline" size="sm" asChild>
                <Link to={`/invite/${selectedInvitation.slug}`} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Lihat Undangan
                </Link>
              </Button>
            )}
          </div>
        </div>

        {selectedInvitationId && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="card-elevated bg-card p-4 text-center">
                <p className="text-2xl font-bold">{totalGuests}</p>
                <p className="text-xs text-muted-foreground">Total Tamu</p>
              </div>
              <div className="card-elevated bg-card p-4 text-center">
                <p className="text-2xl font-bold">{respondedGuests}</p>
                <p className="text-xs text-muted-foreground">Sudah RSVP</p>
              </div>
              <div className="card-elevated bg-card p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{attendingGuests}</p>
                <p className="text-xs text-muted-foreground">Akan Hadir</p>
              </div>
              <div className="card-elevated bg-card p-4 text-center">
                <p className="text-2xl font-bold text-destructive">{notAttending}</p>
                <p className="text-xs text-muted-foreground">Tidak Hadir</p>
              </div>
            </div>

            {/* Guest List Table */}
            <div className="card-elevated bg-card overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Daftar Tamu ({guestList.length})
                </h2>
                {guestList.length > 0 && selectedInvitation?.slug && (
                  <Button variant="outline" size="sm" onClick={copyAllLinks}>
                    <Copy className="w-4 h-4 mr-1" />
                    Salin Semua Link
                  </Button>
                )}
              </div>

              {guestList.length === 0 ? (
                <div className="p-8 text-center">
                  <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Belum ada tamu. Tambahkan tamu di halaman edit undangan.</p>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link to={`/create?edit=${selectedInvitationId}`}>Edit Undangan</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-8">#</TableHead>
                        <TableHead>Nama Tamu</TableHead>
                        <TableHead>Status RSVP</TableHead>
                        <TableHead className="hidden sm:table-cell">Jumlah</TableHead>
                        <TableHead className="hidden md:table-cell">Pesan</TableHead>
                        <TableHead className="text-right">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {guestList.map((name, idx) => {
                        const rsvp = getGuestRSVP(name);
                        return (
                          <TableRow key={idx}>
                            <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                            <TableCell className="font-medium">{name}</TableCell>
                            <TableCell>
                              {rsvp ? (
                                <div className="flex items-center gap-1.5">
                                  {attendanceIcon(rsvp.attendance)}
                                  <span className="text-sm">{attendanceLabel(rsvp.attendance)}</span>
                                </div>
                              ) : (
                                <Badge variant="secondary" className="text-xs">Belum RSVP</Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {rsvp ? rsvp.guest_count : "-"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                              {rsvp?.message || "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              {selectedInvitation?.slug && (
                                <Button variant="ghost" size="sm" onClick={() => copyLink(name)}>
                                  <LinkIcon className="w-4 h-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Uninvited RSVPs */}
            {uninvitedRSVPs.length > 0 && (
              <div className="card-elevated bg-card overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-serif text-lg font-semibold">
                    RSVP Tanpa Undangan ({uninvitedRSVPs.length})
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tamu yang RSVP tapi tidak ada di daftar tamu Anda
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Jumlah</TableHead>
                        <TableHead className="hidden md:table-cell">Pesan</TableHead>
                        <TableHead>Waktu</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uninvitedRSVPs.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell className="font-medium">{r.guest_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {attendanceIcon(r.attendance)}
                              <span className="text-sm">{attendanceLabel(r.attendance)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{r.guest_count}</TableCell>
                          <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                            {r.message || "-"}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(r.created_at).toLocaleDateString("id-ID")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
