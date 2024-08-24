// To parse this data:
//
//   import { Convert, OrderPostReq } from "./file";
//
//   const orderPostReq = Convert.toOrderPostReq(json);

export interface OrderPostReq {
    list_uid: number;
    list_lid: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toOrderPostReq(json: string): OrderPostReq {
        return JSON.parse(json);
    }

    public static orderPostReqToJson(value: OrderPostReq): string {
        return JSON.stringify(value);
    }
}
