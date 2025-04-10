import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Beneficiary } from '../../../../models/interfaces/Beneficiary.model';
import { DocumentPrepareFor } from '../animal-care.component';
import { AddBeneficiaryComponent } from '../../utilities/add-beneficiary/add-beneficiary.component';
import { IRequests } from '../../../../models/interfaces/utilities/IRequests';

@Component({
  selector: 'app-trust-monitoring',
  imports: [CommonModule, FormsModule, AddBeneficiaryComponent],
  templateUrl: './trust-monitoring.component.html',
  styleUrl: './trust-monitoring.component.css'
})
export class TrustMonitoringComponent {
  onBeneficiariesChange(data: IRequests[]) {
    console.log("My Real estate beneficiaries",data);

    if (this.DocumentPrepareFor) {
      this.DocumentPrepareFor.dispositionFund = (data as any[]).map(d => {
        const isCharity = !!d.charityName;
        return {
          type: isCharity ? 'charity' : 'individual',
          name: isCharity ? d.charityName ?? '' : d.individualName ?? '',
          percentage: d.percentage ?? null,
          charityDetails: {
            name: d.charityName ?? '',
            city: d.charityCity ?? '',
            state: d.charityState ?? ''
          }
        };
      });
    }
  }

  @Input() DispositionAgent: Beneficiary[] = [];
  // The DocumentPrepareFor object holding the beneficiary and selected agents.
  @Input() DocumentPrepareFor: DocumentPrepareFor | null = null;
  // Emit the selected (and ordered) agents when Next is clicked.
  @Output() selectionConfirmed = new EventEmitter<Beneficiary[]>();
  // Emit an event when Back is clicked.
  @Output() selectionCanceled = new EventEmitter<void>();


  beneficiaries = [
    { type: 'individual', name: '', percentage: null, charityDetails: { name: '', city: '', state: '' } }
  ];

  ngOnInit(): void {
    // Get previously selected successorType if present
    if (this.DocumentPrepareFor && (this.DocumentPrepareFor as any).successorType) {
      this.successorType = (this.DocumentPrepareFor as any).successorType;
    }else {
      this.successorType = 'equal';
    }

    this.successorType = (this.DocumentPrepareFor as any).successorType || 'equal';

    console.log("data:",this.DocumentPrepareFor?.dispositionFund)

    // Restore beneficiaries from dispositionFund
    if (this.DocumentPrepareFor?.dispositionFund?.length) {
      this.beneficiaries = [...this.DocumentPrepareFor.dispositionFund];
      console.log("restoreddata:", this.beneficiaries);
    } else {
      this.beneficiaries = [{
      type: 'individual',
      name: '',
      percentage: null,
      charityDetails: { name: '', city: '', state: '' }
    }];
  }
} 


  addBeneficiary() {
    this.beneficiaries.push({
      type: 'individual',
      name: '',
      percentage: null,
      charityDetails: { name: '', city: '', state: '' }
    });
  }

  removeBeneficiary(index: number) {
    this.beneficiaries.splice(index, 1);
  }

  validatePercentage(percentage: number | null): boolean {
    return percentage !== null && !Number.isInteger(percentage);
  }


  successorType: string = 'equal';

  onSuccessorTypeChange(newVal: string): void {
    if (!this.DocumentPrepareFor) return;
    this.successorType = newVal;
     // Save Selected successor type temporarily
     (this.DocumentPrepareFor as any).successorType = newVal;

    console.log("seccessor Type:" ,(this.DocumentPrepareFor as any).successorType = newVal);


   // Update dispositionFund to reflect the newly switched list
   this.DocumentPrepareFor.dispositionFund = [...this.beneficiaries];

    if(newVal !== 'charities') {
      this.beneficiaries = [];
      this.DocumentPrepareFor.dispositionFund = [];
    }

  }



  // When Back is clicked.
  cancelSelection(): void {
    if (this.DocumentPrepareFor) {
      this.DocumentPrepareFor.dispositionFund = [...this.beneficiaries];
    }

    console.log("call back:",this.DocumentPrepareFor?.dispositionFund)
    this.selectionCanceled.emit();
  }



  // When Next is clicked, emit the selected surrogates.
  confirmToNext(): void {
    if (!this.DocumentPrepareFor) return;
    this.DocumentPrepareFor.dispositionFund = this.beneficiaries;
    (this.DocumentPrepareFor as any).successorType = this.successorType;

      console.log("SAVING to session:", JSON.stringify(this.DocumentPrepareFor))

      //sessionStorage.setItem('animalCareData', JSON.stringify(this.DocumentPrepareFor)); 

    this.selectionConfirmed.emit();
    this.selectionConfirmed.emit();

  }

}
