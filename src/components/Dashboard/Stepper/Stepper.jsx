import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Mesas from "./Steps/Mesas";
import Comida from "./Steps/Comida";
import { Form, Formik, Field } from "formik";
import { StepButton } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import "./Styles/Mesas.scss";
import { Alert } from '@mui/material';

const steps = [Mesas, Comida];

export default function StepperComponent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [errors, setErrors] = React.useState(false);
  const [MesaSeleccionada, setMesaSeleccionada] = React.useState();

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === steps.length;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFormSubmit = async (values, formikBag) => {
    console.log("values", values);
    setMesaSeleccionada(values);
    handleNext();
  };

  const initialValues = steps.reduce(
    (values, { initialValues }) => ({
      ...values,
      ...initialValues,
    }),
    {}
  );

  const ActiveStep = steps[activeStep];
  const validationSchema = ActiveStep.validationSchema;

  return (
    <Box sx={{ width: "100%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, touched, setFieldValue }) => (
          <Form>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((step, index) => (
                <Step key={step.label} completed={completed[index]}>
                  <StepButton color="inherit">{step.label}</StepButton>
                </Step>
              ))}
            </Stepper>

            <div>
              <div style={{ height: "100%", width: "100%" }}>
                <SwipeableViews index={activeStep} style={{ height: "100%" }}>
                  {steps.map((step, index) => {
                    const Component = steps[index];

                    return (
                      <Component
                        key={index}
                        setFieldValue={setFieldValue.bind(this)}
                        handleNext={handleNext}
                        MesaSeleccionada={MesaSeleccionada}
                      />
                    );
                  })}
                </SwipeableViews>
              </div>

              {errors && (
                <Alert severity="error">
                  Ese correo ya está dado de alta, intenta de nuevo con otro
                  correo{" "}
                </Alert>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  marginBottom: "2rem",
                }}
              >
                <button
                  type="button"
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  className="btn btn-secondary"
                >
                  Atrás
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button type="submit" className="btn btn-secondary">
                  {isLastStep() ? "Finalizar" : "Siguiente"}
                </button>
              </Box>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
