import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  folder?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function ImageUpload({
  label,
  value,
  onChange,
  folder = "covers",
  className,
  aspectRatio = "landscape",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, deleteImage, isUploading } = useImageUpload();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = async (file: File) => {
    const url = await uploadImage(file, folder);
    if (url) {
      onChange(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleRemove = async () => {
    if (value) {
      await deleteImage(value);
      onChange(undefined);
    }
  };

  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-video",
  }[aspectRatio];

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={isUploading}
      />

      {value ? (
        <div className={cn("relative rounded-lg overflow-hidden border border-border", aspectClass)}>
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span className="ml-1">Ganti</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="w-4 h-4" />
              <span className="ml-1">Hapus</span>
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "border-2 border-dashed rounded-lg cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 p-6",
            aspectClass,
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Mengunggah...</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">Klik untuk unggah</p>
                <p className="text-xs text-muted-foreground">atau drag & drop gambar</p>
                <p className="text-xs text-muted-foreground mt-1">Maks. 5MB</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
