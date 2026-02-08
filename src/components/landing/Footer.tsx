import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 bg-foreground text-primary-foreground">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💌</span>
              <span className="font-serif text-xl font-semibold">Undanganlink</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-sm">
              Platform undangan digital Indonesia untuk semua momen spesial Anda. 
              Buat undangan cantik dalam hitungan menit.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produk</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#template" className="hover:text-primary-foreground transition-colors">Template</a></li>
              <li><a href="#harga" className="hover:text-primary-foreground transition-colors">Harga</a></li>
              <li><a href="#fitur" className="hover:text-primary-foreground transition-colors">Fitur</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cara Pakai</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 Undanganlink. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
