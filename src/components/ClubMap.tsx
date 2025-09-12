import { Card, CardContent } from '@/components/ui/card';

interface ClubMapProps {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  className?: string;
  googleMapsEmbedUrl?: string;
}

export function ClubMap({ address, className, googleMapsEmbedUrl }: ClubMapProps) {
  return (
    <Card className={`${className} bg-gray`}>
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <iframe
          src={googleMapsEmbedUrl}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-96 rounded-lg"
        />
      </CardContent>
    </Card>
  );
}
