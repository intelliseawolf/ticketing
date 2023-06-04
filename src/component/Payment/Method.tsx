
import React, { useState } from "react";
import { FaCcMastercard } from 'react-icons/fa';
import { SiVisa } from 'react-icons/si';
import styled from "styled-components";
import { useAppContext } from "../../contexts/AppContext";
import { FormControlLabel, Grid, InputAdornment, Radio, TextField, Typography } from "@mui/material";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Btn = styled('span')(() => ({
    cursor: 'pointer'
}));

const Method = ({ method, handleOpen, setMethodIdToEdit, selectedMethod, setSelectedMethod }: any) => {
    const {
        id, name,
        cardNumber,
        expiryDate,
        cardType
    } = method;

    const [cvc, setCvc] = useState<any>();
    const [cvcVisible, setCvcVisible] = useState(false);

    const { deletePaymentMethod } = useAppContext();

         const handleCVCChange = (event: any) => {
            const inputCvc = event.target.value.replace(/\D/g, '').slice(0, 3);
            setCvc(inputCvc);

        // setCvcError(inputCvc.length !== 3);
      };


  const handleCvcBlur = () => {
    setCvcVisible(false);
    if(cvc.length < 3) setCvc('');
  };

  const handleCvcFocus = () => {
    setCvcVisible(true);
  };

    const handleEditClick = () => {
        setMethodIdToEdit(id);
        handleOpen();
    }

    return (
        <Grid
            container
            sx={{
                backgroundColor: "#f3f7fb",
                border: "1px solid #d6d6d6",
                padding: "10px",
            }}
            key={cardNumber}
        >
            <Grid item xs={1} sm={1} lg={1} xl={1} paddingLeft={"10px"}>
                <FormControlLabel
                    value="female"
                    control={<Radio checked={selectedMethod?.id === id} onChange={() => setSelectedMethod(method)}/>}
                    label=""
                />
            </Grid>
            <Grid
                container
                item
                xs={11}
                sm={11}
                lg={11}
                xl={11}
                display={"flex"}
                paddingLeft={"5px"}
            >
                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    sx={{ paddingBottom: "20px" }}
                >
                    <Grid item sx={{ paddingRight: "20px" }}>
                        {
                            cardType === "visa" ? <SiVisa size={40} /> : <FaCcMastercard size={40} />
                        }
                    </Grid>
                    <Grid item display={"flex"} flexDirection={"column"}>
                        <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                            {cardType} - {cardNumber}
                        </Typography>
                        <Typography sx={{ color: "#6f7c88", fontSize: "12px" }}>
                            {name} | exp. {expiryDate}
                        </Typography>
                        <a style={{ color: "#3975d9", fontSize: "12px" }}>
                            <Btn onClick={handleEditClick}>Edit</Btn> | <Btn onClick={() => deletePaymentMethod(cardNumber)}>Delete</Btn>
                        </a>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    xl={12}
                    display={"flex"}
                    flexDirection={"row"}
                >
                    <Grid item>
                        <Typography sx={{ fontSize: "12px", paddingBottom: "5px" }}>
                            Security Code
                        </Typography>
                        <TextField
                            type={cvcVisible ? 'text' : 'password'}
                            id="security-code"
                            value={cvc}
                            placeholder={'---'}
                            onChange={handleCVCChange}
                            onFocus={handleCvcFocus}
                            onBlur={handleCvcBlur}
                            sx={{ backgroundColor: "white", width: "150px" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {
                                            cvc?.length === 3 && <img
                                            src={"/success.png"}
                                            alt={"success-icon"}
                                            loading="lazy"
                                            height={"30px"}
                                            width={"35px"}
                                            style={{ paddingBottom: "5px" }}
                                        /> 
                                        }
                                        {
                                            cvc && cvc.length < 3 && <AiOutlineCloseCircle color="red" size={24} />
                                        }
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                maxLength: 3,
                              }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        display={"flex"}
                        alignItems={"center"}
                        sx={{ paddingTop: "20px" }}
                    >
                        <img
                            src={"/three-digit.png"}
                            alt={"three-digit-icon"}
                            loading="lazy"
                            height={"30px"}
                            width={"35px"}
                            style={{ paddingBottom: "5px" }}
                        />
                        <Typography sx={{ fontSize: "12px" }}>
                            3-digits on back of card
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Method;