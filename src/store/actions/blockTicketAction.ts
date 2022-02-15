import { ClientBookTicketResponse, ClientQRScannerTicketResponse } from "../../response/clientBookTicketResponse";
import { initialBlockTicketResponse, initialQrScannerTicketResponse } from "../reducers/reducer";

export const enum BOOK_TICKET_ACTION { 
  BOOK_TICKET = "BOOK_TICKET",
  QR_SCANNER_TICKET = "QR_SCANNER_TICKET",
  CLEAR_BLOCK_TICKET_RESPONSE = "CLEAR_BLOCK_TICKET_RESPONSE",
  CLEAR_QR_SCANNER_TICKET_RESPONSE = "CLEAR_QR_SCANNER_TICKET_RESPONSE"
}

export interface BlockTicketAction {
  type: BOOK_TICKET_ACTION,
  payload: ClientBookTicketResponse
} 

export interface BlockScannerTicketAction {
  type: BOOK_TICKET_ACTION,
  payload: ClientQRScannerTicketResponse
} 

export const setBookTicket = (payload: ClientBookTicketResponse): BlockTicketAction => {
  return { type: BOOK_TICKET_ACTION.BOOK_TICKET, payload };
};

export const clearBlockTicketResponse = (): BlockTicketAction => {
  return { type: BOOK_TICKET_ACTION.CLEAR_BLOCK_TICKET_RESPONSE, payload: initialBlockTicketResponse };
};

export const setQRScannerTicket = (payload: ClientQRScannerTicketResponse): BlockScannerTicketAction => {
  return { type: BOOK_TICKET_ACTION.QR_SCANNER_TICKET, payload };
};

export const clearTicketResponse = (): BlockScannerTicketAction => {
  return { type: BOOK_TICKET_ACTION.CLEAR_QR_SCANNER_TICKET_RESPONSE, payload: initialQrScannerTicketResponse };
};