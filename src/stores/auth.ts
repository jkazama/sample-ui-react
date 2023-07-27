import { ActorRoleType, LoginAccount } from "@/features/common/types";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

export type User = {
  id: string;
  name: string;
  roleType: ActorRoleType;
  authorityIds: string[];
};

const authState = atom({
  key: "auth",
  default: {
    logined: false as boolean,
    user: {
      id: "anonymous",
      name: "Anonymous",
      roleType: ActorRoleType.ANONYMOUS,
      authorityIds: [],
    } as User,
  },
});

const isAdmin = (): boolean => {
  const [auth] = useRecoilState(authState);
  switch (auth.user.roleType) {
    case ActorRoleType.INTERNAL:
    case ActorRoleType.ADMINISTRATOR:
      return true;
    default:
      return false;
  }
};

const login = (user: LoginAccount): void => {
  const setAuthState = useSetRecoilState(authState);
  setAuthState(() => {
    return {
      logined: true,
      user,
    };
  });
};
const logout = (): void => {
  const setAuthState = useSetRecoilState(authState);
  setAuthState(() => {
    return {
      logined: false,
      user: {
        id: "unknown",
        name: "Anonymous",
        roleType: ActorRoleType.ANONYMOUS,
        authorityIds: [],
      },
    };
  });
};
export { authState, login, logout, isAdmin };
