import TicketListing from '../pages/TicketListing';
import Checkout from '../pages/Checkout';

export const publicRoutes = [
  {
    path: '/',
    element: TicketListing,
  },
  {
    path: '/checkout',
    element: Checkout,
  },
];
