// To parse this data:
//
//   import { Convert, LottoPostReq } from "./file";
//
//   const lottoPostReq = Convert.toLottoPostReq(json);

export interface LottoPostReq {
    number: string;
    owner:  null;
    sell:   number;
    win:    number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLottoPostReq(json: string): LottoPostReq {
        return JSON.parse(json);
    }

    public static lottoPostReqToJson(value: LottoPostReq): string {
        return JSON.stringify(value);
    }
}
