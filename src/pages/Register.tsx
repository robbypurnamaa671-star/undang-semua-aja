import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get("event");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration - will be replaced with Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Akun Berhasil Dibuat",
        description: "Selamat datang di UndanganKu!",
      });
      if (preselectedEvent) {
        navigate(`/create?event=${preselectedEvent}`);
      } else {
        navigate("/create");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-batik opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
        
        {/* Card */}
        <div className="card-elevated bg-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">💌</span>
              <span className="font-serif text-2xl font-semibold text-gradient">UndanganKu</span>
            </Link>
            <h1 className="font-serif text-2xl font-bold">Buat Akun Gratis</h1>
            <p className="text-muted-foreground mt-1">Mulai buat undangan digital yang cantik</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 btn-hero text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Daftar Sekarang"}
            </Button>
          </form>
          
          {/* Terms */}
          <p className="mt-4 text-xs text-center text-muted-foreground">
            Dengan mendaftar, Anda menyetujui{" "}
            <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a>
            {" "}dan{" "}
            <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a>
          </p>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
