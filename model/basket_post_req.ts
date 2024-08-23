// To parse this data:
//
//   import { Convert, BasketPostReq } from "./file";
//
//   const basketPostReq = Convert.toBasketPostReq(json);

export interface BasketPostReq {
    b_uid: number;
    b_lid: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBasketPostReq(json: string): BasketPostReq {
        return JSON.parse(json);
    }

    public static basketPostReqToJson(value: BasketPostReq): string {
        return JSON.stringify(value);
    }
}
