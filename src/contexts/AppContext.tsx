import React, { createContext, useState, useContext } from 'react';


export interface ticketInterface {
    id: number;
    name: string;
    price: number;
    currencyType: string;
    currencySymbol: string;
    quantity?: number
}

interface updateSelectionInterface {
    type: string;
    id: string;
    ticket: ticketInterface;
}

export interface selectedTicketsInterface {
    [id: string]: ticketInterface
}

export type cardTypeUnion = 'visa' | 'mastercard'

export interface paymentMethodInterface {
    id: number;
    name: string;
    cardNumber: string;
    expiryDate: string;
    cvc?: string;
    cardType: cardTypeUnion
}

interface AppContextValue {
    selectedTickets: selectedTicketsInterface;
    updateSelectedTickets: (data: updateSelectionInterface) => void;
    paymentMethods: paymentMethodInterface[];
    addOrUpdatePaymentMethod: (method: paymentMethodInterface) => void;
    deletePaymentMethod: (number: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
};

interface AppContextProviderProps {
    children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
}) => {
    const [selectedTickets, setSelectedTickets] = useState<selectedTicketsInterface>({});
    const [paymentMethods, setPaymentMethods] = useState<paymentMethodInterface[]>([]);

    const updateSelectedTickets = ({
        type,
        id,
        ticket
    }: updateSelectionInterface) => {
        setSelectedTickets((prevSelectedTickets: any) => {
            const updatedTickets = { ...prevSelectedTickets };
            const currentTicket = updatedTickets[id] || ticket;

            if (type === "INCREMENT") {
                currentTicket.quantity = (currentTicket.quantity || 0) + 1;
            } else {
                currentTicket.quantity = Math.max((currentTicket.quantity || 0) - 1, 0);
            }

            if (currentTicket.quantity === 0) {
                delete updatedTickets[id];
            } else {
                updatedTickets[id] = currentTicket;
            }

            return updatedTickets;
        });
    };

    const addOrUpdatePaymentMethod = (method: paymentMethodInterface) => {
        const { id } = method;

        const methodToUpdateIndex = paymentMethods.findIndex((m) => m.id === id);
        if (methodToUpdateIndex < 0) {
            setPaymentMethods([...paymentMethods, method]);
        } else {
            setPaymentMethods((prevMethods) => {
                return prevMethods.map((m, index) => {
                    if (index === methodToUpdateIndex) {
                        return method;
                    }
                    return m;
                });
            });
        }

    };

    const deletePaymentMethod = (cardNumber: string) => {
        setPaymentMethods(paymentMethods.filter(m => m.cardNumber !== cardNumber));
    }

    const contextValue: AppContextValue = {
        paymentMethods,
        selectedTickets,
        addOrUpdatePaymentMethod,
        updateSelectedTickets,
        deletePaymentMethod
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};
