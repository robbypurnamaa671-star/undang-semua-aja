import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Undanganlink" className="h-8 w-8" />
          <span className="font-serif text-xl font-semibold text-gradient">Undanganlink</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#fitur" className="text-muted-foreground hover:text-foreground transition-colors">
            Fitur
          </a>
          <a href="#template" className="text-muted-foreground hover:text-foreground transition-colors">
            Template
          </a>
          <a href="#harga" className="text-muted-foreground hover:text-foreground transition-colors">
            Harga
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/login">Masuk</Link>
          </Button>
          <Button asChild className="btn-hero">
            <Link to="/register">Buat Undangan</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
