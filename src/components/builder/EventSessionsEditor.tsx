import { EventSession } from "@/lib/invitation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, CalendarDays } from "lucide-react";

interface EventSessionsEditorProps {
  value: EventSession[];
  onChange: (sessions: EventSession[]) => void;
}

export function EventSessionsEditor({ value, onChange }: EventSessionsEditorProps) {
  const updateSession = (index: number, field: keyof EventSession, val: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const addSession = () => {
    onChange([...value, { name: '', date: '', time: '', endTime: '' }]);
  };

  const removeSession = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          Rangkaian Acara
        </Label>
        <Button type="button" variant="outline" size="sm" onClick={addSession}>
          <Plus className="w-3 h-3 mr-1" />
          Tambah
        </Button>
      </div>

      {value.map((session, index) => (
        <div key={index} className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Acara {index + 1}</Label>
            {value.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => removeSession(index)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

          <Input
            placeholder="Nama acara (misal: Akad Nikah, Resepsi)"
            value={session.name}
            onChange={(e) => updateSession(index, 'name', e.target.value)}
          />

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Tanggal</Label>
              <Input
                type="date"
                value={session.date}
                onChange={(e) => updateSession(index, 'date', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Mulai</Label>
              <Input
                type="time"
                value={session.time}
                onChange={(e) => updateSession(index, 'time', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Selesai</Label>
              <Input
                type="time"
                value={session.endTime || ''}
                onChange={(e) => updateSession(index, 'endTime', e.target.value)}
              />
            </div>
          </div>

          <Input
            placeholder="Lokasi acara (opsional)"
            value={session.location || ''}
            onChange={(e) => updateSession(index, 'location', e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
