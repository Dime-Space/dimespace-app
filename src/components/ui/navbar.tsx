'use client';

import { useState } from 'react';
import { Search, User, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

interface NavbarProps {
  balance?: string;
  cartCount?: number;
  userName?: string;
  userEmail?: string;
}

export default function Navbar({
  balance = 'R$ 100,00',
  cartCount = 6,
  userName = 'Usuário da silva',
  userEmail = 'user@gmail.com',
}: NavbarProps) {
  const [showProfileSheet, setShowProfileSheet] = useState(false);

  return (
    <header className="bg-gray-800 text-white px-4 sm:px-6 py-3 w-full">
      <div className="flex items-center justify-between w-full min-w-0">
        <div className="text-2xl font-bold flex-shrink-0">D</div>

        {/* Search - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar"
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Balance - Hidden on very small screens */}
          <div className="hidden sm:block bg-gray-700 px-2 sm:px-3 py-1 rounded text-sm">
            {balance}
          </div>

          <div className="relative">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center p-0">
                {cartCount}
              </Badge>
            )}
          </div>

          <Sheet open={showProfileSheet} onOpenChange={setShowProfileSheet}>
            <SheetTrigger asChild>
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Perfil do Usuário</SheetTitle>
                <SheetDescription>
                  Gerencie seu perfil e configurações
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 ml-8">
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{userName}</h4>
                      <p className="text-sm text-gray-600">{userEmail}</p>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left">
                    <Plus className="w-5 h-5" />
                    <span>Quero fazer propostas</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left">
                    <User className="w-5 h-5" />
                    <span>Atualizar perfil</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer w-full text-left">
                    <span>Sair</span>
                  </button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search - Shown only on small screens */}
      <div className="lg:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pesquisar"
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>
    </header>
  );
}
