// To parse this data:
//
//   import { Convert, MoneyPostReq } from "./file";
//
//   const moneyPostReq = Convert.toMoneyPostReq(json);

export interface MoneyPostReq {
    m_uid: number;
    money: number;
    type: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMoneyPostReq(json: string): MoneyPostReq {
        return JSON.parse(json);
    }

    public static moneyPostReqToJson(value: MoneyPostReq): string {
        return JSON.stringify(value);
    }
}
