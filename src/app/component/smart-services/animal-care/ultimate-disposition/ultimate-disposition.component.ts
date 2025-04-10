import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Beneficiary } from '../../../../models/interfaces/Beneficiary.model';
import { DocumentPrepareFor } from '../animal-care.component';
import { AddBeneficiaryComponent } from '../../utilities/add-beneficiary/add-beneficiary.component';
import { IRequests } from '../../../../models/interfaces/utilities/IRequests';

@Component({
  selector: 'app-ultimate-disposition',
  imports: [CommonModule, FormsModule, AddBeneficiaryComponent],
  templateUrl: './ultimate-disposition.component.html',
  styleUrl: './ultimate-disposition.component.css'
})
export class UltimateDispositionComponent {

  // List of available agents passed from the parent.
  @Input() beneficiaryList: Beneficiary[] = [];

  @Input() total_members: Beneficiary[] = [];
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
    if (this.DocumentPrepareFor && (this.DocumentPrepareFor as any).ultimateSuccessorType) {
      this.ultimateSuccessorType = (this.DocumentPrepareFor as any).ultimateSuccessorType;
    }

    // Optional: If dispositionFund exists, restore beneficiaries too
    if (this.DocumentPrepareFor?.ultimateDispositionFund?.length) {
      this.beneficiaries = this.DocumentPrepareFor.ultimateDispositionFund;
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
  onBeneficiariesChange(data: IRequests[]) {
    console.log("My Real estate beneficieries",data);

    if (this.DocumentPrepareFor) {
      this.DocumentPrepareFor.ultimateDispositionFund = (data as any[]).map(d => {
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
  validatePercentage(percentage: number | null): boolean {
    return percentage !== null && !Number.isInteger(percentage);
  }


  ultimateSuccessorType : string = 'equal';

  onSuccessorTypeChange(newVal: string): void {
    this. ultimateSuccessorType  = newVal;
    if (!this.DocumentPrepareFor) return;
    (this.DocumentPrepareFor as any).ultimateSuccessorType = newVal;
    // Clear beneficiaries if not using charities  
    if (newVal !== 'charities') {
      this.beneficiaries = [];
      this.DocumentPrepareFor.ultimateDispositionFund = [];
    }

  }



  // When Back is clicked.
  cancelSelection(): void {
    if (this.DocumentPrepareFor) {
      this.DocumentPrepareFor.ultimateDispositionFund = [...this.beneficiaries];
    }

    this.selectionCanceled.emit();
  }



  // When Next is clicked, emit the selected surrogates.
  confirmToNext(): void {
    if (!this.DocumentPrepareFor) return;
    this.DocumentPrepareFor.ultimateDispositionFund = this.beneficiaries;
    console.log("DocumentPrepareFor", this.DocumentPrepareFor.ultimateDispositionFund);
    this.selectionConfirmed.emit();

  }


}
