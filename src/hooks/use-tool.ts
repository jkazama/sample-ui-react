import { useMessage } from "./use-message";

export const useTool = () => {
  const { notifySimple } = useMessage();
  const copyClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    notifySimple("Copied to clipboard.");
  };
  return { copyClipboard };
};
