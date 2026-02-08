import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Template } from "@/lib/templates";
import { InvitationData } from "@/lib/invitation";
import { getEventTypeConfig } from "@/lib/event-types";
import { InvitationPreview } from "./InvitationPreview";
import { ImageUpload } from "./ImageUpload";
import { GalleryUpload } from "./GalleryUpload";
import { EventSessionsEditor } from "./EventSessionsEditor";
import { BankAccountsEditor } from "./BankAccountsEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit, Share2, Smartphone, Clock, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvitationBuilderProps {
  template: Template;
  invitation: InvitationData;
  onInvitationChange: (invitation: InvitationData) => void;
  onSaveDraft?: () => Promise<void>;
  onPublish?: () => Promise<void>;
  isSaving?: boolean;
}

export function InvitationBuilder({ 
  template, 
  invitation, 
  onInvitationChange,
  onSaveDraft,
  onPublish,
  isSaving = false,
}: InvitationBuilderProps) {
  const [activeTab, setActiveTab] = useState("edit");
  const eventConfig = getEventTypeConfig(invitation.eventType);
  const isWedding = invitation.eventType === "wedding";
  const isLamaran = invitation.eventType === "lamaran";
  const hasTwoNames = isWedding || isLamaran;
  const features = eventConfig.features;
  
  const updateField = <K extends keyof InvitationData>(field: K, value: InvitationData[K]) => {
    onInvitationChange({ ...invitation, [field]: value });
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
          Buat <span className="text-gradient">Undangan Anda</span>
        </h1>
        <p className="text-muted-foreground">
          Template: {template.name} • {eventConfig.nameIndonesian}
        </p>
      </div>
      
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className={`${activeTab === "preview" ? "hidden lg:block" : ""}`}>
          <div className="card-elevated bg-card p-6 space-y-6">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Detail Undangan
            </h2>
            
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">{eventConfig.defaultLabels.title}</Label>
              <Input
                id="title"
                placeholder={`Contoh: ${eventConfig.defaultLabels.title}`}
                value={invitation.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
            </div>
            
            {/* Names */}
            <div className="space-y-2">
              <Label>{eventConfig.defaultLabels.names}</Label>
              {hasTwoNames ? (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder={isWedding ? "Nama Mempelai Pria" : "Nama Pria"}
                    value={invitation.names[0] || ""}
                    onChange={(e) => updateField("names", [e.target.value, invitation.names[1] || ""])}
                  />
                  <Input
                    placeholder={isWedding ? "Nama Mempelai Wanita" : "Nama Wanita"}
                    value={invitation.names[1] || ""}
                    onChange={(e) => updateField("names", [invitation.names[0] || "", e.target.value])}
                  />
                </div>
              ) : (
                <Input
                  placeholder="Nama"
                  value={invitation.names[0] || ""}
                  onChange={(e) => updateField("names", [e.target.value])}
                />
              )}
            </div>
            
            {/* Date, Time & Timezone */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date">{eventConfig.defaultLabels.dateLabel}</Label>
                <Input
                  id="date"
                  type="date"
                  value={invitation.eventDate}
                  onChange={(e) => updateField("eventDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Input
                  id="time"
                  type="time"
                  value={invitation.eventTime}
                  onChange={(e) => updateField("eventTime", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Zona Waktu
                </Label>
                <Select value={invitation.timezone} onValueChange={(v) => updateField("timezone", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WIB">WIB</SelectItem>
                    <SelectItem value="WITA">WITA</SelectItem>
                    <SelectItem value="WIT">WIT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Event Sessions */}
            {features.hasEventSessions && (
              <EventSessionsEditor
                value={invitation.events}
                onChange={(events) => updateField("events", events)}
              />
            )}
            
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="locationName">{eventConfig.defaultLabels.locationLabel}</Label>
              <Input
                id="locationName"
                placeholder="Nama Tempat"
                value={invitation.locationName}
                onChange={(e) => updateField("locationName", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="locationAddress">Alamat Lengkap</Label>
              <Textarea
                id="locationAddress"
                placeholder="Alamat lengkap lokasi acara"
                value={invitation.locationAddress}
                onChange={(e) => updateField("locationAddress", e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mapUrl">Link Google Maps (opsional)</Label>
              <Input
                id="mapUrl"
                placeholder="https://maps.google.com/..."
                value={invitation.locationMapUrl || ""}
                onChange={(e) => updateField("locationMapUrl", e.target.value)}
              />
            </div>
            
            {/* Cover Image */}
            {features.hasGallery && (
              <ImageUpload
                label="Foto Cover (1080 × 1440 px)"
                value={invitation.coverImage}
                onChange={(url) => updateField("coverImage", url)}
                folder="covers"
                aspectRatio="portrait"
              />
            )}
            
            {/* Gallery Images */}
            {features.hasGallery && (
              <GalleryUpload
                label="Galeri Foto (1080 × 1080 px)"
                value={invitation.galleryImages}
                onChange={(urls) => updateField("galleryImages", urls)}
                maxImages={6}
              />
            )}
            
            {/* Message / Sambutan */}
            <div className="space-y-2">
              <Label htmlFor="message">Kata Sambutan / Pesan Pembuka</Label>
              <Textarea
                id="message"
                placeholder="Tulis pesan atau kata sambutan untuk tamu undangan Anda..."
                value={invitation.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
              />
            </div>

            {/* Bank Accounts / Digital Envelope */}
            {features.hasDigitalEnvelope && (
              <BankAccountsEditor
                value={invitation.bankAccounts}
                onChange={(accounts) => updateField("bankAccounts", accounts)}
              />
            )}

            {/* Closing Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-serif text-lg font-semibold">Penutup</h3>
              
              <div className="space-y-2">
                <Label htmlFor="closingMessage">Ucapan Penutup</Label>
                <Textarea
                  id="closingMessage"
                  placeholder="Merupakan suatu kehormatan bagi kami..."
                  value={invitation.closingMessage || ""}
                  onChange={(e) => updateField("closingMessage", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingPrayer">Doa / Kutipan (opsional)</Label>
                <Textarea
                  id="closingPrayer"
                  placeholder="Kutipan ayat, doa, atau kata-kata..."
                  value={invitation.closingPrayer || ""}
                  onChange={(e) => updateField("closingPrayer", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">Nomor WhatsApp (opsional)</Label>
              <Input
                id="whatsappNumber"
                placeholder="Contoh: 6281234567890"
                value={invitation.whatsappNumber || ""}
                onChange={(e) => updateField("whatsappNumber", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Tombol WhatsApp melayang di undangan akan mengarah ke nomor ini. Gunakan format internasional tanpa + (contoh: 6281234567890).
              </p>
            </div>

            {/* Music URL */}
            {features.hasMusic && (
              <div className="space-y-2">
                <Label htmlFor="musicUrl">Musik Latar (opsional)</Label>
                <Input
                  id="musicUrl"
                  placeholder="URL file musik (mp3) atau link langsung"
                  value={invitation.musicUrl || ""}
                  onChange={(e) => updateField("musicUrl", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Musik tidak akan autoplay. Tamu dapat mengaktifkannya secara manual.
                </p>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onSaveDraft}
                disabled={isSaving}
              >
                {isSaving ? "Menyimpan..." : "Simpan Draft"}
              </Button>
              <Button 
                className="flex-1 btn-hero" 
                onClick={onPublish}
                disabled={isSaving}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {isSaving ? "Memproses..." : "Publikasikan"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className={`${activeTab === "edit" ? "hidden lg:block" : ""}`}>
          <div className="sticky top-24">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-primary" />
              <span className="font-medium">Preview Mobile</span>
            </div>
            
            <div className="mobile-frame mx-auto overflow-y-auto">
              <InvitationPreview template={template} invitation={invitation} />
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Ini adalah tampilan undangan di smartphone tamu Anda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
