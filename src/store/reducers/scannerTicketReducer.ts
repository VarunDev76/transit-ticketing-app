import { ClientQRScannerTicketResponse } from "../../response/clientBookTicketResponse";
import { BlockScannerTicketAction, BOOK_TICKET_ACTION } from "../actions/blockTicketAction";
import { initialState } from "./reducer";

export const scannerTicketReducer =(
  state = initialState.clientScannerTicketResponse, 
  action: BlockScannerTicketAction
): ClientQRScannerTicketResponse => {
  switch(action.type) {
    case BOOK_TICKET_ACTION.QR_SCANNER_TICKET:
      return action.payload ;
    case BOOK_TICKET_ACTION.CLEAR_QR_SCANNER_TICKET_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};