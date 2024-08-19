// To parse this data:
//
//   import { Convert, UserMoneyPut } from "./file";
//
//   const userMoneyPut = Convert.toUserMoneyPut(json);

export interface UserMoneyPut {
    email: string;
    money: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUserMoneyPut(json: string): UserMoneyPut {
        return JSON.parse(json);
    }

    public static userMoneyPutToJson(value: UserMoneyPut): string {
        return JSON.stringify(value);
    }
}
