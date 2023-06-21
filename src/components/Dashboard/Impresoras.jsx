import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, TextField, Button } from "@mui/material";
import './Style/Impresoras.scss'
function Impresoras() {
  const [impresoras, setImpresoras] = useState([
    {
      id: 1,
      nombre: "Impresora 1",
      direccionIP: "192.168.0.1",
      puerto: "8080",
    },
    {
      id: 2,
      nombre: "Impresora 2",
      direccionIP: "192.168.0.2",
      puerto: "8080",
    },
    {
      id: 3,
      nombre: "Impresora 3",
      direccionIP: "192.168.0.3",
      puerto: "8080",
    },
  ]);

  const [selectedImpresora, setSelectedImpresora] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedImpresora, setEditedImpresora] = useState({});

  const handleAddImpresora = () => {
    const newImpresora = {
      id: impresoras.length + 1,
      nombre: "",
      direccionIP: "",
      puerto: "",
    };
    setImpresoras([...impresoras, newImpresora]);
  };

  const handleDeleteImpresora = (id) => {
    const updatedImpresoras = impresoras.filter(
      (impresora) => impresora.id !== id
    );
    setImpresoras(updatedImpresoras);
  };

  const handleEditCellChange = (params) => {
    const updatedImpresoras = impresoras.map((impresora) => {
      if (impresora.id === params.id) {
        return { ...impresora, [params.field]: params.value };
      }
      return impresora;
    });
    setImpresoras(updatedImpresoras);
  };

  const handleEditClick = (impresora) => {
    setSelectedImpresora(impresora);
    setEditedImpresora(impresora);
    setEditMode(true);
  };

  const handleModalClose = () => {
    setEditMode(false);
  };

  const handleSaveChanges = () => {
    const updatedImpresoras = impresoras.map((impresora) => {
      if (impresora.id === editedImpresora.id) {
        return editedImpresora;
      }
      return impresora;
    });

    setImpresoras(updatedImpresoras);
    setEditMode(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedImpresora((prevImpresora) => ({
      ...prevImpresora,
      [name]: value,
    }));
  };

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200, editable: true },
    {
      field: "direccionIP",
      headerName: "Dirección IP",
      width: 200,
      editable: true,
    },
    { field: "puerto", headerName: "Puerto", width: 150, editable: true },
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
            onClick={() => handleDeleteImpresora(params.row.id)}
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
        <h1 style={{ color: "#1976d2" }}>Impresoras</h1>
      </div>
      <DataGrid
        rows={impresoras}
        columns={columns}
        pageSize={5}
        onCellEditCommit={handleEditCellChange}
      />
      <button className="button-agregar" onClick={handleAddImpresora}>Agregar</button>
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
            <h2>Editar Impresora</h2>
          </div>
          {selectedImpresora && (
            <form>
              <TextField
                name="nombre"
                label="Nombre"
                margin="dense"
                value={editedImpresora.nombre}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                name="direccionIP"
                label="Dirección IP"
                margin="dense"
                value={editedImpresora.direccionIP}
                onChange={handleFieldChange}
                fullWidth
              />
              <TextField
                name="puerto"
                label="Puerto"
                margin="dense"
                value={editedImpresora.puerto}
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

export default Impresoras;
