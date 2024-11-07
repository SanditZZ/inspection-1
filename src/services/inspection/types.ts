export interface StandardData {
  totalSample: number;
  conditions: Condition[];
  grainTypePercentages: Record<string, number>;
  standardTypePercentages: Record<string, number>;
}

export interface Condition {
  conditionMax: string;
  conditionMin: string;
  key: string;
  name: string;
  shape: string[];
  maxLength: number;
  minLength: number;
}

export interface InspectionResponse {
  name: string;
  createDate: string;
  inspectionID: string;
  standardID: string;
  note: string;
  standardName: string;
  samplingDateTime: Date;
  samplingPoints: string[];
  price: number;
  standardData?: StandardData;
}

export interface InspectionByIdResponse {
  name: string;
  createDate: string;
  inspectionID: string;
  standardID: string;
  note: string;
  standardName: string;
  samplingDateTime: Date;
  samplingPoints: string[];
  price: number;
  imageLink?: string;
  standardData?: StandardData;
}

export interface CreateInspectionRequest {
  name: string;
  standardID: string;
  standardName: string;
  note?: string;
  samplingDateTime?: Date;
  samplingPoints?: string[];
  price?: number;
  imageLink?: string;
  standardData?: StandardData;
}

export interface UpdateInspectionRequest {
  note?: string;
  price?: number;
  samplingDateTime?: Date | string;
  samplingPoints?: string[];
}
