'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Diff, MoreHorizontal, Trash2 } from 'lucide-react';

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EditQuantityDialog } from './EditQuantityDialog';
import { Label } from '@/components/ui/label';
import { RemoveProductDialog } from './RemoveProductDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { ColumnDef } from '@tanstack/react-table';
import type { CartProduct } from '@/interfaces';
export const columns: ColumnDef<CartProduct>[] = [
  {
    accessorKey: 'quantity',
    meta: 'Cantidad',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Cantidad' />
    ),
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return <div className='font-medium'>{quantity}</div>;
    },
  },
  {
    accessorKey: 'title',
    meta: 'Título',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Titulo' />
    ),
  },
  {
    accessorKey: 'price',
    meta: 'Precio unitario',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Precio Unitario' />
    ),
    cell: ({ row }) => <div className='font-medium'>${row.original.price}</div>,
  },
  {
    accessorKey: 'totalPrice',
    meta: 'Precio Total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Precio Total' />
    ),
    cell: ({ row }) => {
      const totalPrice = row.original.quantity * row.original.price;

      return <span className='font-medium'>${totalPrice.toFixed(2)}</span>;
    },
  },

  {
    accessorKey: 'image',
    meta: 'Imagen',

    header: () => (
      <span className='inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs -ml-3 h-8 data-[state=open]:bg-accent'>
        Imagen
      </span>
    ),
    cell: ({ row }) => {
      const image = row.original.image;

      return (
        <Image
          alt='Product Image'
          className='rounded-md object-cover'
          height={64}
          src={image}
          style={{
            aspectRatio: '64/64',
            objectFit: 'cover',
          }}
          width={64}
        />
      );
    },
  },
  {
    id: 'acciones',
    cell: function ActionsRow({ row }) {
      const [openEditDialog, setOpenEditDialog] = useState(false);
      const [open, setOpen] = useState(false);

      return (
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='h-8 w-8 p-0'>
                  <span className='sr-only'>Abrir menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>

                  <DialogTrigger className='flex items-center gap-2' asChild>
                    <DropdownMenuItem>
                      <Diff className='h-3 w-3' />
                      <Label>Actualizar cantidad</Label>
                    </DropdownMenuItem>
                  </DialogTrigger>

                  <DropdownMenuSeparator />

                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className='flex items-center gap-2'>
                      <Trash2 className='h-3 w-3' />
                      <Label>Remover producto</Label>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenuTrigger>

              <EditQuantityDialog
                product={row.original}
                setOpenEditDialog={setOpenEditDialog}
              />

              <RemoveProductDialog product={row.original} />
            </DropdownMenu>
          </AlertDialog>
        </Dialog>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
