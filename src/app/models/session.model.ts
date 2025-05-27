export interface Session {
  id: string;
  name: string;
  passphrase: string;
  createdAt: Date;
  active: boolean;
}
