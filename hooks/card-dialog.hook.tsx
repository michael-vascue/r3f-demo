import { useContext } from "react";
import { DialogContext } from "../contexts/dialog.context";

export const useCardDialog = () => useContext(DialogContext)
  