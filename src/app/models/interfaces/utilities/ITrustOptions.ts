import { Beneficiary } from "../Beneficiary.model";

export interface ITrustOptions {
      user?: Beneficiary,
      title?: string;
      title2?: string;
      sub_title?: string;
      sub_title_description?: string;
      input_label?: string; 
      input_value?: string; 
      bottomDescription?: string; 
      back : string;
      next: string;
}