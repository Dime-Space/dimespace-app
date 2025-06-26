import { User } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProposalCardProps {
  title: string;
  author: string;
  timeAgo: string;
  price: string;
  description: string;
  skills?: string; // Ex: "Node.js, React, PostgreSQL"
  status?: string; // Ex: "aberta"
  finalDate?: string; // ISO string
  imageUrl?: string;
  imageAlt?: string;
}

export default function ProposalCard({
  title,
  author,
  timeAgo,
  price,
  description,
  skills,
  status,
  finalDate,
  imageUrl,
  imageAlt = 'Project image',
}: ProposalCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 space-y-4">
        {/* Top Section */}
        <div className="flex items-start justify-between">
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

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {status && (
              <Badge className="bg-yellow-100 text-yellow-800 capitalize">
                {status}
              </Badge>
            )}
            <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-1">
              {price}
            </Badge>
            <Button variant="outline" size="sm">
              Tenho Interesse
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700">{description}</p>

        {/* Skills */}
        {skills && (
          <div className="flex flex-wrap gap-2">
            {skills.split(',').map((skill) => (
              <Badge
                key={skill.trim()}
                className="bg-blue-100 text-blue-800 capitalize"
              >
                {skill.trim()}
              </Badge>
            ))}
          </div>
        )}

        {/* Deadline */}
        {finalDate && (
          <p className="text-sm text-gray-500">
            Prazo final: {format(parseISO(finalDate), 'dd/MM/yyyy')}
          </p>
        )}

        {/* Optional image */}
        {imageUrl && (
          <div className="relative h-64 bg-black rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
