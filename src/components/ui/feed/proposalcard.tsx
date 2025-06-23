import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProposalCardProps {
  title: string;
  author: string;
  timeAgo: string;
  price: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

export default function ProposalCard({
  title,
  author,
  timeAgo,
  price,
  description,
  imageUrl,
  imageAlt = 'Project image',
}: ProposalCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-600">
                {author} • {timeAgo}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-1">
              {price}
            </Badge>
            <Button variant="outline" size="sm">
              Tenho Interesse
            </Button>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{description}</p>

        {/* Only show image container if imageUrl is provided */}
        {imageUrl && (
          <div className="relative h-64 bg-black rounded-lg overflow-hidden">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
