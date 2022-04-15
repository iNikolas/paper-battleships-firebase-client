export interface SendType {
  type:
    | "create-game"
    | "cancel-game"
    | "join-game"
    | "ditch-game"
    | "ditch-game-request";
  description?: string;
  host?: string;
  rivalName?: string;
  rivalUid?: string;
}
