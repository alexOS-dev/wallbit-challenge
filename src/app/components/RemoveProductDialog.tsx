'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store/cart/cart-store';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export const RemoveProductDialog = ({ product }: { product: CartProduct }) => {
  const removeProduct = useCartStore((state) => state.removeProduct);
  const onDelete = () => {
    removeProduct(product);
    toast.success('Producto eliminado');
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          ¿Estás seguro de remover este producto?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Esto quitará el producto de tu carrito.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete} asChild>
          <Button
            variant='expandIcon'
            iconPlacement='right'
            Icon={Trash2}
            className='gap-2'
          >
            Eliminar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
