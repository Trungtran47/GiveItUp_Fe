import { EventEmitter } from "events";
export const POPUP_TEXT_TYPE = "POPUP_TEXT_TYPE";
export const POPUP_CONFIRM = "POPUP_CONFIRM";
export const EVENT_SHOW_POPUP = "EVENT_SHOW_POPUP";
export const EVENT_SHOW_POPUP2 = "EVENT_SHOW_POPUP2";
export const EVENT_SHOW_POPUP3 = "EVENT_SHOW_POPUP3";
export const FIRST_POPUP = 1;
export const SECOND_POPUP = 2;
export const POPUP_CREATE_CATEGORY = "POPUP_CREATE_CATEGORY";
export const POPUP_CREATE_AUTHOR = "POPUP_CREATE_AUTHOR";
export const POPUP_CREATE_POST = "POPUP_CREATE_POST";
export const POPUP_REQUEST_PAYOUT = "POPUP_REQUEST_PAYOUT";
export const POPUP_CREATE_DONATE = "POPUP_CREATE_DONATE";
export const POPUP_CONFIRM_PAYOUT = "POPUP_CONFIRM_PAYOUT";
export const POPUP_CREATE_POST_UPDATE = "POPUP_CREATE_POST_UPDATE";
export const POPUP_SHOW_ALL_DONATORS = "POPUP_SHOW_ALL_DONATORS";
export const POPUP_BANK_ACCOUNT = "POPUP_BANK_ACCOUNT";
export const POPUP_CREATE_BANK_ACCOUNT = "POPUP_CREATE_BANK_ACCOUNT";
export const POPUP_DETAIL_ACCOUNT_AUTHOR = "POPUP_DETAIL_ACCOUNT_AUTHOR";
export const POPUP_REQUEST_CHANGE_PASSWORD = "POPUP_REQUEST_CHANGE_PASSWORD";
// Dùng singleton instance
const emitter = new EventEmitter();

const EventRegister = {
  on: (eventName, callback) => {
    emitter.on(eventName, callback);
    return () => emitter.removeListener(eventName, callback);
  },
  off: (eventName, callback) => {
    emitter.removeListener(eventName, callback);
  },
  emit: (eventName, data) => {
    emitter.emit(eventName, data);
  },
  removeAll: () => {
    emitter.removeAllListeners();
  },
};

export default EventRegister;
