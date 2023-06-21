import React, { useState } from "react";
import * as yup from "yup";

function Mesas({ setFieldValue,handleNext  }) {
  const mesas = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
  ];

  const [selectedMesa, setSelectedMesa] = useState(null);

  const handleMesaClick = (id) => {
    setSelectedMesa(id);
    setFieldValue("mesaId", id);
    console.log(id);
    handleNext();
  };

  return (
    <div className="container-grid">
      <div className="grid-container">
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            className={`mesa-item ${
              selectedMesa === mesa.id ? "selected" : ""
            }`}
            onClick={() => handleMesaClick(mesa.id)}
          >
            Mesas {mesa.id}
          </div>
        ))}
      </div>
    </div>
  );
}
Mesas.initialValues = {
  mesaId: "",
};
Mesas.validationSchema = yup.object().shape({
});

Mesas.label = "Mesas";

export default Mesas;
