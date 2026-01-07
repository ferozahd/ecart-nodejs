
export type LoginGetResources = {
    token: string;
    user: LoginUserGetResources
};


export type LoginUserGetResources = {
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


export type CustomerRegisterPostResource={
  name: string;
  email: string;
  password: string;
}

export type LoginPostResource = {
  email: string;
  password: string;
};


export type CustomerLoginPostResource = {
  email: string;
  password: string;
};

