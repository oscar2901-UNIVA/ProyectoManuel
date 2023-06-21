import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, TextField, Button } from "@mui/material";

function Categorias() {
  const [categorias, setCategorias] = useState([
    { id: 1, nombre: "Categoría 1" },
    { id: 2, nombre: "Categoría 2" },
    { id: 3, nombre: "Categoría 3" },
  ]);

  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCategoria, setEditedCategoria] = useState({});

  const handleAddCategoria = () => {
    const newCategoria = { id: categorias.length + 1, nombre: "" };
    setCategorias([...categorias, newCategoria]);
  };

  const handleDeleteCategoria = (id) => {
    const updatedCategorias = categorias.filter(
      (categoria) => categoria.id !== id
    );
    setCategorias(updatedCategorias);
  };

  const handleEditCellChange = (params) => {
    const updatedCategorias = categorias.map((categoria) => {
      if (categoria.id === params.id) {
        return { ...categoria, [params.field]: params.value };
      }
      return categoria;
    });
    setCategorias(updatedCategorias);
  };

  const handleEditClick = (categoria) => {
    setSelectedCategoria(categoria);
    setEditedCategoria(categoria);
    setEditMode(true);
  };

  const handleModalClose = () => {
    setEditMode(false);
  };

  const handleSaveChanges = () => {
    const updatedCategorias = categorias.map((categoria) => {
      if (categoria.id === editedCategoria.id) {
        return editedCategoria;
      }
      return categoria;
    });

    setCategorias(updatedCategorias);
    setEditMode(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedCategoria((prevCategoria) => ({
      ...prevCategoria,
      [name]: value,
    }));
  };

  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200, editable: true },
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
            onClick={() => handleDeleteCategoria(params.row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={categorias}
        columns={columns}
        pageSize={5}
        
        onCellEditCommit={handleEditCellChange}
      />
      <button className="button-agregar" onClick={handleAddCategoria}>Agregar</button>

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
            <h2>Editar Categoría</h2>
          </div>
          {selectedCategoria && (
            <form>
              <TextField
                margin="dense"
                name="nombre"
                label="Nombre"
                value={editedCategoria.nombre}
                onChange={handleFieldChange}
                fullWidth
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop:"1rem"
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

export default Categorias;
