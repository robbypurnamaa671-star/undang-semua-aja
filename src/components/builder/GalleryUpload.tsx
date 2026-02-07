import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Plus, X, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryUploadProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function GalleryUpload({
  label,
  value,
  onChange,
  maxImages = 6,
  className,
}: GalleryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, deleteImage, isUploading } = useImageUpload();

  const handleFileSelect = async (file: File) => {
    const url = await uploadImage(file, "gallery");
    if (url) {
      onChange([...value, url]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (value.length < maxImages) {
          handleFileSelect(file);
        }
      });
    }
    // Reset input
    e.target.value = "";
  };

  const handleRemove = async (index: number) => {
    const urlToRemove = value[index];
    await deleteImage(urlToRemove);
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const canAddMore = value.length < maxImages;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.length}/{maxImages} gambar
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={isUploading}
        multiple
      />

      <div className="grid grid-cols-3 gap-2">
        {/* Existing images */}
        {value.map((url, index) => (
          <div
            key={url}
            className="aspect-square relative rounded-lg overflow-hidden border border-border group"
          >
            <img
              src={url}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Add button */}
        {canAddMore && (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className={cn(
              "aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 transition-colors",
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-primary/50 hover:bg-muted/50 cursor-pointer"
            )}
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Tambah</span>
              </>
            )}
          </button>
        )}

        {/* Empty state placeholder */}
        {value.length === 0 && !canAddMore && (
          <div className="col-span-3 aspect-video rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-2 p-4">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              Belum ada gambar di galeri
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Unggah hingga {maxImages} gambar • Ukuran ideal: 1080 × 1080 px (1:1)
      </p>
    </div>
  );
}
