export type DialogNode = {
  text: string;
  options: {
    label: string;
    nextNode: string;
  }[];
};

export type ChatMessage = {
  id: number;
  sender: "arona" | "plana" | "user";
  text: string;
  time: string;
};
