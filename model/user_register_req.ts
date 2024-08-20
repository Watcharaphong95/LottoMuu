// To parse this data:
//
//   import { Convert, UserRegisterPost } from "./file";
//
//   const userRegisterPost = Convert.toUserRegisterPost(json);

    export interface UserRegisterPost {
        uid:      number;
        name:     string;
        email:    string;
        password: string;
        money:    number;
    }

// Converts JSON strings to/from your types
export class Convert {
    public static toUserRegisterPost(json: string): UserRegisterPost {
        return JSON.parse(json);
    }

    public static userRegisterPostToJson(value: UserRegisterPost): string {
        return JSON.stringify(value);
    }
}
