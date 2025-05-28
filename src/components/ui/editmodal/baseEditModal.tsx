import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface BaseEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const BaseEditModal: React.FC<BaseEditModalProps> = ({
  open,
  onOpenChange,
  title,
  children,
}) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="right">
      <div className="mt-6" />
      <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
      {children}
    </SheetContent>
  </Sheet>
);

export default BaseEditModal;
