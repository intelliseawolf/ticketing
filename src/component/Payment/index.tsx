import React from 'react';
import { Dialog, Grid, styled, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { payDescription, payTitle, termsOfUse } from "../../constants";
import { useState } from "react";
import CardForm from "../CardForm";
import { useAppContext } from '../../contexts/AppContext';
import Method from './Method';

const PaymentComponent = styled(Grid)(() => ({
  width: "100%",
  padding: "20px",
  border: "1px solid #d6d6d6",
  borderRadius: "3px",
}));

export const Payment = () => {
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [methodIdToEdit, setMethodIdToEdit] = useState(null);

  const { paymentMethods } = useAppContext();

  const handleClose = () => {
    setMethodIdToEdit(null);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <PaymentComponent>
      <Grid
        container
        justifyContent={"space-between"}
        sx={{ paddingBottom: "10px" }}
      >
        <Grid display={"flex"} alignItems={"center"}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, paddingBottom: "5px" }}
          >
            Payment
          </Typography>
          <img
            src={"/success.png"}
            alt={"success-icon"}
            loading="lazy"
            height={"30px"}
            width={"35px"}
            style={{ paddingBottom: "5px" }}
          />
        </Grid>
        <Grid>
          <img
            src={"/ticketmaster.png"}
            alt={"success-icon"}
            loading="lazy"
            height={"30px"}
            width={"150px"}
            style={{ paddingBottom: "5px" }}
          />
        </Grid>
      </Grid>
      <Typography sx={{ fontWeight: 600, padding: "0px 20px 20px" }}>
        Use Credit / Debit Card
      </Typography>

      {
        paymentMethods.map((method, index) => (
        <Method key={index} method={method} handleOpen={handleOpen} setMethodIdToEdit={setMethodIdToEdit} selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}/>
        ))
      }

      <Grid
        container
        sx={{
          padding: "20px 20px 20px",
          color: "#3975d9",
          fontSize: "30px",
          cursor: "pointer",
        }}
        display={"flex"}
      >
        <Grid item sx={{ paddingRight: "10px" }}>
          <AddIcon />
        </Grid>
        <Grid
          item
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ paddingRight: "10px" }}
        >
          <img
            src={"/card.png"}
            alt={"card-icon"}
            loading="lazy"
            height={"30px"}
            width={"35px"}
          />
        </Grid>
        <Typography
          sx={{
            color: "#3975d9",
            fontSize: "14px",
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleOpen}
        >
          Add New Card
        </Typography>
      </Grid>
      <hr />
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          paddingLeft: "20px",
          paddingTop: "20px",
        }}
      >
        {payTitle}
      </Typography>
      <Typography
        sx={{ fontSize: "12px", fontWeight: 600, paddingLeft: "20px" }}
      >
        {payDescription} <a style={{ color: "#3975d9" }}>{termsOfUse}</a>
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <CardForm closeModal={handleClose} id={methodIdToEdit}/>
        </div>
      </Dialog>
    </PaymentComponent>
  );
};
