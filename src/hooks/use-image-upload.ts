import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BUCKET_NAME = "invitation-images";

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, folder: string = "covers"): Promise<string | null> => {
    try {
      setIsUploading(true);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "File harus berupa gambar",
          variant: "destructive",
        });
        return null;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return null;
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        toast({
          title: "Gagal mengunggah",
          description: "Terjadi kesalahan saat mengunggah gambar. Pastikan Anda sudah login.",
          variant: "destructive",
        });
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(data.path);

      toast({
        title: "Berhasil!",
        description: "Gambar berhasil diunggah",
      });

      return urlData.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Gagal mengunggah",
        description: "Terjadi kesalahan yang tidak diketahui",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      // Extract path from URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split(`${BUCKET_NAME}/`);
      if (pathParts.length < 2) return false;
      
      const filePath = pathParts[1];

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.error("Delete error:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Delete error:", error);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
  };
}
