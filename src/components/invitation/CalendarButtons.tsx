import { Calendar } from "lucide-react";

interface CalendarButtonsProps {
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  timezone: string;
  location: string;
  primaryColor: string;
  backgroundColor: string;
  secondaryColor: string;
}

function formatTimezoneOffset(tz: string): string {
  switch (tz) {
    case 'WITA': return '+08:00';
    case 'WIT': return '+09:00';
    default: return '+07:00'; // WIB
  }
}

function formatGoogleDate(date: string, time: string, tz: string): string {
  // Google Calendar expects: 20261012T100000
  if (!date) return '';
  const d = date.replace(/-/g, '');
  const t = time ? time.replace(/:/g, '') + '00' : '000000';
  return d + 'T' + t;
}

function generateICSContent(props: CalendarButtonsProps): string {
  const tzOffset = formatTimezoneOffset(props.timezone);
  const startDate = props.date ? `${props.date.replace(/-/g, '')}T${(props.time || '00:00').replace(/:/g, '')}00` : '';
  const endDate = props.date 
    ? `${props.date.replace(/-/g, '')}T${(props.endTime || props.time || '23:59').replace(/:/g, '')}00` 
    : '';

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UndanganKu//ID
BEGIN:VEVENT
DTSTART;TZID=Asia/Jakarta:${startDate}
DTEND;TZID=Asia/Jakarta:${endDate}
SUMMARY:${props.title}
DESCRIPTION:${props.description}
LOCATION:${props.location}
END:VEVENT
END:VCALENDAR`;
}

export function CalendarButtons(props: CalendarButtonsProps) {
  const { title, description, date, time, endTime, timezone, location, primaryColor, backgroundColor, secondaryColor } = props;

  if (!date) return null;

  const handleGoogleCalendar = () => {
    const startFormatted = formatGoogleDate(date, time, timezone);
    const endFormatted = formatGoogleDate(date, endTime || time, timezone);
    
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', title);
    url.searchParams.set('dates', `${startFormatted}/${endFormatted}`);
    url.searchParams.set('details', description);
    url.searchParams.set('location', location);
    url.searchParams.set('ctz', timezone === 'WITA' ? 'Asia/Makassar' : timezone === 'WIT' ? 'Asia/Jayapura' : 'Asia/Jakarta');
    
    window.open(url.toString(), '_blank');
  };

  const handleAppleCalendar = () => {
    const icsContent = generateICSContent(props);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={handleGoogleCalendar}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-80"
        style={{ backgroundColor: primaryColor, color: backgroundColor }}
      >
        <Calendar className="w-4 h-4" />
        Google Calendar
      </button>
      <button
        onClick={handleAppleCalendar}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-80"
        style={{ backgroundColor: secondaryColor + 'cc', color: primaryColor, border: `1px solid ${primaryColor}30` }}
      >
        <Calendar className="w-4 h-4" />
        Apple Calendar
      </button>
    </div>
  );
}
