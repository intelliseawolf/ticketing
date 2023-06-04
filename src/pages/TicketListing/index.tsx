/** @format */

import { Button, List, ListItem, ListItemButton, ListItemText, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTickets } from '../../apis/tickets';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const ListItemCustom = styled(ListItem)(() => ({
  cursor: 'pointer',
  padding: '10px 10px',
}));

const ProceedBtn = styled(Button)<any>(() => ({
  float: "right", marginTop: "20px"
}));

const TicketListing = () => {
  const [tickets, setTickets] = useState<any>();

  const navigate = useNavigate();

  const { selectedTickets, updateSelectedTickets } = useAppContext();

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const goToPaymentPage = () => {
    navigate("/checkout");
  };

  return (
    <React.Fragment>
      <h1>Tickets</h1>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {tickets &&
          tickets.map((ticket: any, index: number) => {
            return (
              (
                <React.Fragment key={index}>
                  {(index !== 0 && <hr></hr>) || null}

                  <ListItem
                    {
                    ...(selectedTickets[ticket.id] && {
                      secondaryAction: (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px"
                          }}
                        >
                          <Button variant="outlined" onClick={() => updateSelectedTickets({ id: ticket.id, type: "INCREMENT", ticket })}>
                            +
                          </Button>
                          <Typography variant="body1">{selectedTickets[ticket.id].quantity}</Typography>
                          <Button variant="outlined" onClick={() => updateSelectedTickets({ id: ticket.id, type: "DECREMENT", ticket })}>
                            -
                          </Button>
                        </div>
                      ),
                    })
                    }
                    disablePadding
                  >

                    <ListItemButton
                      selected={!!selectedTickets[ticket.id]}
                      {...(!selectedTickets[ticket.id] ? {
                        onClick: () => updateSelectedTickets({ id: ticket.id, type: "INCREMENT", ticket })
                      } : {})}
                    >
                      <ListItemCustom key={index} disableGutters>
                        <ListItemText
                          primary={ticket.name}
                          secondary={ticket.price}
                        />
                      </ListItemCustom>
                    </ListItemButton>
                  </ListItem>
                </React.Fragment>
              ) || <h2>Loading</h2>
            );
          })}
      </List>
      {
        Object.keys(selectedTickets).length > 0 && <ProceedBtn variant="outlined" onClick={goToPaymentPage}>Proceed To Checkout</ProceedBtn>
      }
    </React.Fragment>
  );
};

export default TicketListing;
