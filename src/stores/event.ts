import { Level, Log } from "@/libs/log";
import { LoginAccount } from "@/features/common/types";
import { atom, useRecoilState } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type AppEventKey<T> = {
  key: string;
};
export const LoginedKey: AppEventKey<LoginAccount> = { key: "logined" };
export const LogoutKey: AppEventKey<void> = { key: "logout" };

type EventListener<T> = (payload: T) => void;

class EventEmitter {
  listeners = new Map<AppEventKey<any>, EventListener<any>[]>();
  on<T>(key: AppEventKey<T>, listener: EventListener<T>): EventListener<T> {
    const actions = this.listeners.get(key);
    if (actions) {
      actions.push(listener);
    } else {
      this.listeners.set(key, [listener]);
    }
    return listener;
  }
  off<T>(key: AppEventKey<T>, listener: EventListener<T>) {
    const actions = this.listeners.get(key);
    if (actions) {
      this.listeners.set(
        key,
        actions.filter((fn) => fn !== listener)
      );
    }
  }
  emit<T>(key: AppEventKey<T>, payload: T) {
    const actions = this.listeners.get(key);
    if (actions) {
      actions.forEach((fn) => fn(payload));
    }
  }
}

const eventState = atom({
  key: "event",
  default: new EventEmitter(),
});

const useEventEmitter = () => {
  const [event] = useRecoilState(eventState);
  return event;
};

// Messages
export type Messages = {
  global: string;
  level: Level;
  columns: Record<string, string[]>;
};

const messageState = atom({
  key: "message",
  default: {
    global: "",
    level: Level.INFO,
    columns: {},
  } as Messages,
});

const notify = (
  globalMessage: string,
  level: Level = Level.INFO,
  columnMessages: Record<string, string[]> = {} as Record<string, string[]>
): void => {
  const [_, setMessages] = useRecoilState(messageState);
  const messages = {
    global: globalMessage || "",
    level: level,
    columns: columnMessages,
  } as Messages;
  setMessages(messages);
  if (globalMessage) {
    Log.debug(messages);
  }
};

export { eventState, useEventEmitter, messageState, notify };
