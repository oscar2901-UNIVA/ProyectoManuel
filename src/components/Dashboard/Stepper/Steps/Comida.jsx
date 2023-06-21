import React, { useState, useEffect } from "react";
import * as yup from "yup";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";

function Comida({ initialPlatillosCount, setFieldValue, MesaSeleccionada }) {
  const [platillos, setPlatillos] = useState([]);
  const [selectedPlatillos, setSelectedPlatillos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedPlatilloIndex, setSelectedPlatilloIndex] = useState(null);
  const [selectedPlatilloQuantity, setSelectedPlatilloQuantity] = useState(1);

  useEffect(() => {
    obtenerListaPlatillos();
  }, []);

  const handlePlatilloChange = (event, index) => {
    const updatedSelectedPlatillos = [...selectedPlatillos];
    updatedSelectedPlatillos[index] = event.target.value;
    setSelectedPlatillos(updatedSelectedPlatillos);

    
    const platilloValue = event.target.value;
    setFieldValue(`platillo${index + 1}`, platilloValue);

    
    setSelectedOptions([]);
    setSelectedPlatilloIndex(index);
    setSelectedPlatilloQuantity(1);

    openModal(); 
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handlePlatilloQuantityChange = (event) => {
    setSelectedPlatilloQuantity(event.target.value);
  };

  const handleAgregarPlatillo = () => {
    setSelectedPlatillos([...selectedPlatillos, ""]);
  };

  const obtenerListaPlatillos = () => {
    setTimeout(() => {
      const platillos = [
        { id: 1, nombre: "Platillo 1" },
        { id: 2, nombre: "Platillo 2" },
        { id: 3, nombre: "Platillo 3" },
        { id: 4, nombre: "Platillo 4" },
      ];
      setPlatillos(platillos);
     
      const initialSelectedPlatillos = new Array(initialPlatillosCount).fill("");
      setSelectedPlatillos(initialSelectedPlatillos);
    }, 1000);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGuardarPlatillo = () => {
    const updatedSelectedPlatillos = [...selectedPlatillos];
    updatedSelectedPlatillos[selectedPlatilloIndex] = {
      platillo: selectedPlatillos[selectedPlatilloIndex],
      options: selectedOptions,
      quantity: selectedPlatilloQuantity,
    };
    setSelectedPlatillos(updatedSelectedPlatillos);
    closeModal();
  };

  console.log("MesaSeleccionada", MesaSeleccionada);

  return (
    <div>
      <h1>Mesa {MesaSeleccionada}</h1>
      <h2>Selecciona tus platillos</h2>
      {selectedPlatillos.map((selectedPlatillo, index) => {
        const platillo = platillos.find((p) => p.id === selectedPlatillo);
        return (
          <div key={index}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={`platillo-label-${index}`}>
                Platillo {index + 1}
              </InputLabel>
              <Select
                labelId={`platillo-label-${index}`}
                value={selectedPlatillo}
                onChange={(event) => handlePlatilloChange(event, index)}
                label={`Platillo ${index + 1}`}
              >
                {platillos.map((platillo) => (
                  <MenuItem key={platillo.id} value={platillo.id}>
                    {platillo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedPlatillo !== "" && (
              <div>
                {/* <h4>{platillo.nombre}</h4> */}
                <p>Cantidad:</p>
                <TextField
                  type="number"
                  value={selectedPlatilloQuantity}
                  onChange={handlePlatilloQuantityChange}
                />
                <p>Opciones:</p>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id={`options-label-${index}`}>
                    Opciones
                  </InputLabel>
                  <Select
                    labelId={`options-label-${index}`}
                    multiple
                    value={selectedOptions}
                    onChange={handleOptionChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
        );
      })}
      <Button onClick={handleAgregarPlatillo} variant="contained" sx={{ mt: 2 }}>
        Agregar Platillo
      </Button>
      <div>
        <h3>Platillos seleccionados:</h3>
        {selectedPlatillos.map((selectedPlatillo, index) =>
          selectedPlatillo !== "" ? (
            <div key={index}>
              {/* <h4>{platillos[selectedPlatillo - 1].nombre}</h4> */}
              <p>Cantidad:</p>
              <TextField
                type="number"
                value={selectedPlatilloQuantity}
                onChange={handlePlatilloQuantityChange}
              />
              <p>Opciones:</p>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`options-label-${index}`}>Opciones</InputLabel>
                <Select
                  labelId={`options-label-${index}`}
                  multiple
                  value={selectedOptions}
                  onChange={handleOptionChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                  <MenuItem value="Option 3">Option 3</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : null
        )}
      </div>
      <Modal open={isModalOpen} onClose={closeModal} style={{backgroundColor:"white"}}>
        <div>
        <h2>Seleccionar Opciones</h2>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="options-label">Opciones</InputLabel>
            <Select
              labelId="options-label"
              multiple
              value={selectedOptions}
              onChange={handleOptionChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
              <MenuItem value="Option 3">Option 3</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleGuardarPlatillo}>Guardar</Button>
        </div>
      </Modal>
    </div>
  );
  
}

Comida.initialValues = {
  comida: "",
};

Comida.validationSchema = yup.object().shape({
  /* mesaId: yup.number().required("requerido").typeError('Debes ingresar un numero'), */
});

Comida.label = "Comida";

export default Comida;
