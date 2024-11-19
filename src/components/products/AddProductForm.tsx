'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Plus } from 'lucide-react';

import { useCartStore } from '@/store/cart/cart-store';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
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

const FormSchema = z.object({
  id: z.coerce.number().min(1, {
    message: 'El id debe ser mayor a 0',
  }),
  quantity: z.coerce.number().min(1, {
    message: 'La cantidad debe ser mayor a 0',
  }),
});

export const AddProductForm = () => {
  const addProductToCart = useCartStore((state) => state.addProduct);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: 1,
      quantity: 1,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Validate ID range
    if (data.id <= 0 || data.id > 20) {
      toast.error('El id del producto debe estar entre 1 y 20', {
        richColors: true,
        position: 'top-right',
      });
      return;
    }

    const fetchProductPromise = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${data.id}`
      );

      if (!response.ok) {
        throw new Error(`Producto con ID: ${data.id} no encontrado`);
      }

      const productData = await response.json();

      const cartProduct: CartProduct = {
        id: productData.id,
        title: productData.title,
        image: productData.image,
        price: productData.price,
        quantity: data.quantity,
      };

      addProductToCart(cartProduct);

      return productData;
    };

    toast.promise(fetchProductPromise(), {
      loading: 'Agregando producto...',
      success: (productData) =>
        `Producto "${productData.title}" agregado al carrito`,
      error: (error) =>
        error.message || 'Ocurrió un error al intentar agregar el producto',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar producto</CardTitle>
        <CardDescription>
          Puedes agregar un producto a tu carrito
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-[1fr_1fr_auto] gap-4 items-center'
          >
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Cantidad'
                      {...field}
                      className='w-24'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='id'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='ID'
                      className='w-[70px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='flex items-center mt-5'>
              <Plus className='h-4 w-4' />
              Agregar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
