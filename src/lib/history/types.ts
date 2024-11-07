export interface RawData {
  requestID: string;
  imageURL: string;
  grains: Grain[];
}

export interface Grain {
  length: number;
  weight: number;
  shape: string;
  type: string;
}

export interface Standard {
  id: string;
  name: string;
  createDate: string;
  standardData: StandardData[];
}

export interface StandardData {
  conditionMax: string;
  conditionMin: string;
  key: string;
  name: string;
  shape: string[];
  maxLength: number;
  minLength: number;
}
