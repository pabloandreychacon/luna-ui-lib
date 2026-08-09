export interface AppUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: unknown;
}

export interface AppState {
  theme: "light" | "dark";
  currentRoute: string;
  token: string | null;
  user: AppUser | null;
  userName: string | null;
}

export interface Setting {
  Id?: number | string;
  Email: string;
  Phone?: string | null;
  Address?: string | null;
  MapLocation?: string | null;
  BusinessName?: string | null;
  PaypalClientId?: string | null;
  OnlinePassword?: string | null;
  ExchangeRate?: number | string;
  CurrencyCode?: string;
  LanguageFormat?: string | null;
  Active?: boolean;
  FinalUrl?: string | null;
  LegalId?: string | null;
  BillsFooter?: string | null;
  LogoRoute?: string | null;
  GlobalConsecutive?: number | string;
  SendToEmail?: boolean | null;
  SendToPrinter?: boolean;
  UseElectronicBill?: boolean | null;
  ElectronicBillIsProduction?: boolean | null;
  Paid?: boolean;
}

export interface Profile {
  Id?: number | string;
  Email: string;
  FullName?: string | null;
  Phone?: string | null;
  Address?: string | null;
  CreatedAt?: string | null;
  UpdatedAt?: string | null;
  PasswordHash: string;
}

export type FormPayload = Record<string, string | number | boolean | null | undefined>;
