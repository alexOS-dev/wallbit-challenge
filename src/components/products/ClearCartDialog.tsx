'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart/cart-store';
import { ListRestart } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  className?: string;
  isCartEmpty: boolean;
}

export function ClearCartDialog({ className, isCartEmpty }: Props) {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          className={`gap-2 ${className}`}
          disabled={isCartEmpty}
          onClick={() => {
            if (cart.length === 0) {
              toast.warning('El carrito esta vacio');
            }
          }}
        >
          <ListRestart className='h-4 w-4' />
          Limpiar carrito
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de limpiar el carrito?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción va a descartar todos los productos del carrito.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearCart}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
