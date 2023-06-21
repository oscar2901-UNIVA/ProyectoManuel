import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Button } from "@mui/material";

function Tickets() {
  const [rows, setRows] = useState([
    {
      id: 1,
      mesa: 1,
      fechaApertura: "2023-05-19 10:30:00",
      fechaCierre: "2023-05-19 11:45:00",
    },
    {
      id: 2,
      mesa: 2,
      fechaApertura: "2023-05-19 12:15:00",
      fechaCierre: "2023-05-19 13:30:00",
    },
  ]);

  const handlePrintClick = (id) => {
    console.log("Imprimir ticket:", id);
  };

  const columns = [
    { field: "mesa", headerName: "Mesa", width: 100 },
    { field: "fechaApertura", headerName: "Apertura", width: 180 },
    { field: "fechaCierre", headerName: "Cierre", width: 180 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePrintClick(params.row.id)}
        >
          Imprimir
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#1976d2" }}>Tickets</h1>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default Tickets;
