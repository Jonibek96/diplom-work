
export interface UserInfo {
  userId: number;
  type: string;
  time: string;
}

// export interface IAuth {
//   error: boolean;
//   data: {
//     hash: string
//   };
// }
export interface IAuth {
  error: boolean;
  data: {
    token?: string
    hash?: string
  };
}

export interface HjVorid {
  error: boolean;
  data: [NamHjVorid];
}
export interface NamHjVorid {
  id: number;
  name: string;
}

export interface DVor {
  error: boolean;
  data: [DVorid];
}

export interface DVorid {
  id: number;
  type: string;
  num: number;
  sanaVoridot: Date;
  azKujoVoridot: string;
  mazmunHujat: string;
  hujatiRavona: string;
  shaxsiMasul: string;
  sanaIjro: Date;
  javobiMak: string;
}
export interface DSod {
  error: boolean;
  data: [DSodir];
}

export interface DSodir {
  id: number;
  type: string;
  nomerSodir: string;
  sanaiSodir: Date;
  baKujoFirist: string;
  mazmun: string;
  ijrokunanda: string;
}

export interface UpdateResponse {
  error: boolean;
}

export interface IDocum {
  id: number;
  name: string;
}

export interface ResAddStandard {
  error: boolean;
  data: {
    id: number
  };
}

 export interface Filter {
   from: Date;
   to: Date;
   report: string;
   typeOfDocument: string;
 }

export interface SolonaVorid {
  month: number;
  count: number;
  type: number;
}
export interface VSolona {
  error: boolean;
  data: [SolonaVorid];
}

export interface SolonaSodir {
  month: number;
  count: number;
  type: number;
}
export interface SSolona {
  error: boolean;
  data: [SolonaSodir];
}
