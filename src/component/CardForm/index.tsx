import React, { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import styled from "styled-components";
import { cardTypeUnion, useAppContext } from "../../contexts/AppContext";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
`;

const CardForm = ({ id, closeModal }: any) => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cardType, setCardType] = useState<cardTypeUnion>("visa");
    const [cardNumberError, setCardNumberError] = useState(false);
    const [expiryDateError, setExpiryDateError] = useState(false);
    // const [cvcError, setCvcError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const { paymentMethods, addOrUpdatePaymentMethod } = useAppContext();

    const handleNameChange = (event: any) => {
        const inputName = event.target.value;
        setName(inputName);

        setNameError(inputName.trim() === "");
    };

    const handleCardNumberChange = (event: any) => {
        const inputNumber = event.target.value.replace(/\D/g, "");
        setCardNumber(inputNumber);

        setCardNumberError(inputNumber.length !== 16);
    };

    const handleExpiryDateChange = (event: any) => {
        const inputDate = event.target.value;
        const formattedDate = inputDate
            .replace(/\D/g, "")
            .slice(0, 4)
            .replace(/(\d{2})(\d)/, "$1/$2");
        setExpiryDate(formattedDate);

        setExpiryDateError(formattedDate.length !== 5);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Perform form validation
        const isNameValid = name.trim() !== "";
        const isCardNumberValid = cardNumber.length === 16;
        const isExpiryDateValid = expiryDate.length === 5;
        // const isCvcValid = cvc.length === 3;

        // Set error state variables based on validation results
        setNameError(!isNameValid);
        setCardNumberError(!isCardNumberValid);
        setExpiryDateError(!isExpiryDateValid);
        // setCvcError(!isCvcValid);

        // Submit the form only if all fields are valid
        if (isCardNumberValid && isExpiryDateValid) {
            addOrUpdatePaymentMethod({
                name,
                cardNumber,
                expiryDate,
                cardType,
                id: id || Math.random()
            });

            setCardNumber("");
            setExpiryDate("");
            //   setCvc("");

            closeModal();
        }
    };

    useEffect(() => {
        if (id) {
            const methodToUpdate: any = paymentMethods.find((m) => m.id === id);
            const { 
                name,
                cardNumber,
                expiryDate,
                cardType 
            } = methodToUpdate;
            setName(name);
            setCardNumber(cardNumber)
            setExpiryDate(expiryDate)
            // setCvc(cvc)
            setCardType(cardType)

        }

    }, []);

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                fullWidth
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
            />
            <TextField
                label="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                fullWidth
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 16,
                }}
                error={cardNumberError}
                helperText={cardNumberError ? "Please enter a valid card number" : ""}
            />
            <TextField
                label="Expiry Date"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                fullWidth
                inputProps={{
                    maxLength: 5,
                }}
                error={expiryDateError}
                helperText={expiryDateError ? "Please enter a valid expiry date" : ""}
            />
            {/* <TextField
        label="CVC"
        value={cvc}
        onChange={handleCvcChange}
        fullWidth
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 3,
        }}
        error={cvcError}
        helperText={cvcError ? "Please enter a valid CVC" : ""}
      /> */}
            <FormControl component="fieldset">
                <FormLabel component="legend">Card Type</FormLabel>
                <RadioGroup
                    aria-label="card-type"
                    name="card-type"
                    value={cardType}
                    onChange={(event: any) => setCardType(event.target.value)}
                    row
                >
                    <FormControlLabel value="visa" control={<Radio />} label="Visa" />
                    <FormControlLabel
                        value="mastercard"
                        control={<Radio />}
                        label="Mastercard"
                    />
                </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Add
            </Button>
        </StyledForm>
    );
};

export default CardForm;