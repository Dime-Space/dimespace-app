import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Navbar({ search, setSearch }: NavbarProps) {
  return (
    <header className="bg-gray-800 text-white px-4 sm:px-6 py-3 w-full fixed top-0 left-0 z-40 shadow">
      <div className="flex items-center justify-between w-full min-w-0">
        <div className="text-2xl font-bold flex-shrink-0">D</div>

        {/* Search - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar empresa por nome..."
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* ...restante do seu Navbar... */}
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-gray-700 p-2 hover:bg-gray-600">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}