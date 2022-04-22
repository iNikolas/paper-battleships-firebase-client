export interface SendType {
  type:
    | "create-game"
    | "cancel-game"
    | "join-game"
    | "ditch-game"
    | "ditch-game-request"
    | "get-user-photo-url";
  description?: string;
  host?: string;
  rivalName?: string;
  rivalUid?: string;
  authorUid?: string;
}
