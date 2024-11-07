export interface InspectionData {
  name: string;
  standard: string;
  note?: string;
  price?: number;
  samplingPoints?: string[];
  samplingDateTime?: Date;
  upload?: File;
}
