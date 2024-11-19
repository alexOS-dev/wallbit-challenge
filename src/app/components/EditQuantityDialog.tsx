'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCartStore } from '@/store/cart/cart-store';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { CartProduct } from '@/interfaces';

interface Props {
  product: CartProduct;
  setOpenEditDialog: (open: boolean) => void;
}

const formSchema = z.object({
  stock: z.coerce
    .number()
    .nonnegative('La cantidad del producto no puede ser negativa.'),
});

export function EditQuantityDialog({ product, setOpenEditDialog }: Props) {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stock: product.quantity,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.stock === product.quantity) {
      toast.info('Ingresa una cantidad diferente a la actual.');
      return;
    }

    if (data.stock <= 0) {
      toast.error('La cantidad debe ser mayor a 0', {
        richColors: true,
        description:
          'Si desea eliminar el producto, utilice la opción de eliminar.',
      });
      return;
    }

    updateProductQuantity(product, data.stock);

    toast.success('Cantidad actualizada');
    setOpenEditDialog(false);
  };

  return (
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle>{product.title}</DialogTitle>
        <DialogDescription>
          Actualiza la cantidad en stock del producto que deseas llevar
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Stock disponible'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <DialogFooter className='sm:justify-start lg:justify-between'>
        <DialogClose asChild>
          <Button type='button' variant='secondary'>
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type='button' onClick={form.handleSubmit(onSubmit)}>
            Actualizar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
