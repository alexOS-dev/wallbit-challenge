'use client';

import { useEffect, useState } from 'react';

import { ShoppingCart } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTablePagination } from '../data-table/DataTablePagination';
import { Title } from '../Title';
import { ClearCartDialog } from './ClearCartDialog';
import { useCartStore } from '@/store/cart/cart-store';
import { Separator } from '../ui/separator';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProductsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const getSummary = useCartStore((state) => state.getSummary);
  const [cartDate, setCartDate] = useState<string | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const cartCreationDate = useCartStore.getState().getCartDate();
    setCartDate(
      new Date(cartCreationDate).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, []);
  if (!cartDate) return null;

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-start'>
        <Title title='Carrito de compras' />
        <Separator orientation='vertical' className='h-10 mx-4' />
        <div className='flex gap-2 line-clamp-1	'>
          <p className='text-xl font-bold'>Iniciado:</p>
          <span className='text-xl uppercase font-semibold line-clamp-2'>
            {cartDate}
          </span>
        </div>
      </div>
      <div className='flex items center mb-4'>
        <Input
          placeholder='Filtrar productos... (título, precio)'
          className='max-w-sm'
        />

        <ClearCartDialog
          className='ml-2'
          isCartEmpty={table.getRowModel().rows.length === 0}
        />
      </div>

      {/* Tabla */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  <div className='flex items-center justify-center gap-2'>
                    <ShoppingCart className='h-7 w-7 text-gray-500' />
                    <span className='text-xl text-muted-foreground'>
                      No hay productos en el carrito.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {/* Total Cost Row */}
            <TableRow>
              <TableCell className='font-bold'>Total:</TableCell>
              <TableCell className='font-bold'>
                ${getSummary().totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className='py-3'>
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
