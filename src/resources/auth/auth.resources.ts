
export type LoginGetResources = {
    token: string;
    user: LoginUserGetResources
};


type LoginUserGetResources = {
    id: string;
    name: string;
    email: string;
    role: string;
};



export type RegisterPostResource = {
  name: string;
  email: string;
  password: string;
};

export type LoginPostResource = {
  email: string;
  password: string;
};

