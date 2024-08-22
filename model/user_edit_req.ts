// To parse this data:
//
//   import { Convert, UserEditPut } from "./file";
//
//   const userEditPut = Convert.toUserEditPut(json);

export interface UserEditPut {
    name:  string;
    nickname:  string;
    email: string;
    birth: string;
    phone: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUserEditPut(json: string): UserEditPut {
        return JSON.parse(json);
    }

    public static userEditPutToJson(value: UserEditPut): string {
        return JSON.stringify(value);
    }
}
