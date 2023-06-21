import React from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';
import { Delete } from '@mui/icons-material';




const orders = [
  {
    id: 1,
    customer: 'Juan Pérez',
    items: ['Ceviche', 'Pescado frito'],
    total: 250,
  },
  {
    id: 2,
    customer: 'María Rodríguez',
    items: ['Coctel de camarones', 'Filete de pescado', 'Tacos de mariscos'],
    total: 450,
  },
];

function OrdersTable() {


  return (
    <TableContainer component={Paper}>
      <Table /* className={classes.table} */>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Productos</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.items.join(', ')}</TableCell>
              <TableCell>{`$${order.total}`}</TableCell>
              <TableCell>
                <Delete />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable;
