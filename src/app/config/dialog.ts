import { DialogNode } from "../types";
import dialogData from "./dialog.json";

export const DIALOG_TREE: Record<string, DialogNode> = {};

(dialogData.nodes || []).forEach((node: any) => {
  DIALOG_TREE[node.id] = {
    text: node.text,
    options: node.options
  };
});

export const ARONA_CHAT_SETTINGS = dialogData.aronaChat || {
  header: "A.R.O.N.A OS CONNECTED",
  title: "Arona",
  status: "Hỗ Trợ Đắc Lực",
  sub: "Hệ điều hành Schale OS v1.5"
};
