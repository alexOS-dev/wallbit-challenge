'use client';
import { AddProductForm, Title } from '@/components';
import { columns } from './components/columns';
import { ProductsTable } from '@/components/products/ProductsTable';
import { useCartStore } from '@/store/cart/cart-store';

export default function Home() {
  const productsInCart = useCartStore((state) => state.cart);

  return (
    <main className='w-full flex min-h-screen flex-col items-center justify-between'>
      <Title title='Tienda - El Topo' />
      <AddProductForm />
      <div className='w-full px-32'>
        <ProductsTable columns={columns} data={productsInCart} />
      </div>
    </main>
  );
}
