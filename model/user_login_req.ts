// To parse this data:
//
//   import { Convert, UserLoginPost } from "./file";
//
//   const userLoginPost = Convert.toUserLoginPost(json);

export interface UserLoginPost {
    email:    string;
    password: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUserLoginPost(json: string): UserLoginPost {
        return JSON.parse(json);
    }

    public static userLoginPostToJson(value: UserLoginPost): string {
        return JSON.stringify(value);
    }
}
