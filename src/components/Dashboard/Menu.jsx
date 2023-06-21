import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, TextField, Button } from "@mui/material";
import "./Style/Menu.scss";
function Menu() {
  const [rows, setRows] = useState([
    {
      id: 1,
      nombre: "Platillo 1",
      precio: 10,
      impresora: "Impresora fría",
      nombreCorto: "Plat 1",
      categoria: "Categoría 1",
    },
    {
      id: 2,
      nombre: "Platillo 2",
      precio: 15,
      impresora: "Impresora barra",
      nombreCorto: "Plat 2",
      categoria: "Categoría 2",
    },
    {
      id: 3,
      nombre: "Platillo 3",
      precio: 12,
      impresora: "Impresora fría",
      nombreCorto: "Plat 3",
      categoria: "Categoría 1",
    },
    {
      id: 4,
      nombre: "Platillo 4",
      precio: 8,
      impresora: "Impresora barra",
      nombreCorto: "Plat 4",
      categoria: "Categoría 2",
    },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      nombre: "",
      precio: "",
      impresora: "",
      nombreCorto: "",
      categoria: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleEditCellChange = (params) => {
    const updatedRows = rows.map((row) => {
      if (row.id === params.id) {
        return { ...row, [params.field]: params.value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditedData(row);
    setEditMode(true);
  };

  const handleModalClose = () => {
    setEditMode(false);
  };

  const handleSaveChanges = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === editedData.id) {
        return editedData;
      }
      return row;
    });

    setRows(updatedRows);
    setEditMode(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200, editable: true },
    { field: "precio", headerName: "Precio", width: 150, editable: true },
    { field: "impresora", headerName: "Impresora", width: 200, editable: true },
    {
      field: "nombreCorto",
      headerName: "Nombre Corto",
      width: 200,
      editable: true,
    },
    { field: "categoria", headerName: "Categoría", width: 200, editable: true },
    {
      field: "actions",
      headerName: "Acciones",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div>
          <EditIcon
            color="primary"
            onClick={() => handleEditClick(params.row)}
          />
          <DeleteIcon
            color="error"
            onClick={() => handleDeleteRow(params.row.id)}
          />
        </div>
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
        <h1 style={{ color: "#1976d2" }}>Menú</h1>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        /* checkboxSelection
        disableSelectionOnClick */
        onCellEditCommit={handleEditCellChange}
      />
      <button className="button-agregar" onClick={handleAddRow}>
        Agregar
      </button>

      <Modal open={editMode} onClose={handleModalClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            outline: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Editar Datos</h2>
          </div>
          {selectedRow && (
            <form>
              <TextField
                name="nombre"
                label="Nombre"
                margin="dense"
                value={editedData.nombre}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                name="precio"
                label="Precio"
                margin="dense"
                value={editedData.precio}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                name="impresora"
                margin="dense"
                label="Impresora"
                value={editedData.impresora}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                name="nombreCorto"
                margin="dense"
                label="Nombre Corto"
                value={editedData.nombreCorto}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                name="categoria"
                margin="dense"
                label="Categoría"
                value={editedData.categoria}
                onChange={handleFieldChange}
                fullWidth
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Menu;
