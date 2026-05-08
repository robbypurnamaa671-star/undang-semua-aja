import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches runtime render errors inside the public invitation tree so visitors
 * see a friendly fallback instead of a blank white screen (silent failure).
 */
export class InvitationErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("[InvitationErrorBoundary] Render error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
          <span className="text-6xl mb-4">😔</span>
          <h1 className="font-serif text-2xl font-bold mb-2">Undangan Gagal Dimuat</h1>
          <p className="text-muted-foreground mb-4 max-w-md">
            Terjadi kesalahan saat menampilkan undangan. Silakan muat ulang halaman.
            Jika masalah berlanjut, hubungi pemilik undangan.
          </p>
          <Button onClick={this.handleReload}>Muat Ulang</Button>
        </div>
      );
    }
    return this.props.children;
  }
}