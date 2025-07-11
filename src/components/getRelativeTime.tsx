import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getRelativeTime(dateString: string) {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: ptBR,
  });
}
