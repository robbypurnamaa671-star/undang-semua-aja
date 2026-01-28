import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, Share2, LogOut } from "lucide-react";

// Mock data for demo
const mockInvitations = [
  {
    id: "1",
    slug: "ahmad-siti",
    title: "Pernikahan Ahmad & Siti",
    eventType: "wedding",
    status: "published",
    isPaid: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2", 
    slug: "khitan-rafi",
    title: "Khitanan Rafi",
    eventType: "khitanan",
    status: "draft",
    isPaid: false,
    createdAt: "2024-01-20",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const [invitations] = useState(mockInvitations);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "wedding": return "💒";
      case "khitanan": return "🎉";
      case "hajatan": return "🙏";
      case "birthday": return "🎂";
      case "family": return "👨‍👩‍👧‍👦";
      default: return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">💌</span>
            <span className="font-serif text-xl font-semibold text-gradient">UndanganKu</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Halo, User!</span>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <LogOut className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold">Undangan Saya</h1>
            <p className="text-muted-foreground mt-1">Kelola semua undangan digital Anda</p>
          </div>
          <Button asChild className="btn-hero">
            <Link to="/create">
              <Plus className="w-5 h-5 mr-2" />
              Buat Undangan Baru
            </Link>
          </Button>
        </div>
        
        {/* Invitations Grid */}
        {invitations.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {invitations.map((invitation) => (
              <motion.div
                key={invitation.id}
                variants={item}
                className="card-elevated bg-card overflow-hidden group"
              >
                {/* Preview */}
                <div className="aspect-[4/3] bg-muted relative flex items-center justify-center">
                  <span className="text-6xl">{getEventIcon(invitation.eventType)}</span>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button size="sm" variant="secondary" asChild>
                      <Link to={`/invite/${invitation.slug}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <Link to={`/edit/${invitation.id}`}>
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge 
                      variant={invitation.status === "published" ? "default" : "secondary"}
                      className={invitation.status === "published" ? "bg-hajatan" : ""}
                    >
                      {invitation.status === "published" ? "Dipublikasi" : "Draft"}
                    </Badge>
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold truncate">{invitation.title || "Untitled"}</h3>
                  <p className="text-sm text-muted-foreground capitalize mt-1">
                    {invitation.eventType} • {new Date(invitation.createdAt).toLocaleDateString("id-ID")}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    {invitation.status === "published" && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-1" />
                        Bagikan
                      </Button>
                    )}
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <Link to={`/edit/${invitation.id}`}>
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated bg-card p-12 text-center"
          >
            <span className="text-6xl mb-4 block">📭</span>
            <h3 className="font-serif text-xl font-semibold mb-2">Belum Ada Undangan</h3>
            <p className="text-muted-foreground mb-6">
              Anda belum membuat undangan. Mulai buat undangan pertama Anda!
            </p>
            <Button asChild className="btn-hero">
              <Link to="/create">
                <Plus className="w-5 h-5 mr-2" />
                Buat Undangan Pertama
              </Link>
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
