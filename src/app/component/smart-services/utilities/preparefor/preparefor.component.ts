import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IPrepareFor } from '../../../../models/interfaces/utilities/ipreparefor';
import { CommonModule } from '@angular/common';
import { Beneficiary } from '../../../../models/interfaces/Beneficiary.model';

@Component({
  selector: 'app-preparefor',
  imports: [CommonModule],
  templateUrl: './preparefor.component.html',
  styleUrls: ['./preparefor.component.css']
})
export class PrepareforComponent implements OnChanges {
  @Input() preparer_for?: IPrepareFor | null;
  @Input() defaultSelectedBeneficiary?: Beneficiary;
  @Output() editClicked = new EventEmitter<void>(); 
  @Output() assembleClicked = new EventEmitter<void>(); 
  @Output() selectedBeneficiary = new EventEmitter<Beneficiary>(); 

  selectedBeneficiaryItem?: Beneficiary;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultSelectedBeneficiary'] && this.defaultSelectedBeneficiary && !this.selectedBeneficiaryItem) {
      this.selectedBeneficiaryItem = this.defaultSelectedBeneficiary;
    }
  }

  proceedToNextStep() {
    this.editClicked.emit(); 
  }

  Assemble() {
    this.assembleClicked.emit(); 
  }
  getUserColor(user: { firstName: string; lastName: string }): string {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = (user.firstName.charCodeAt(0) + user.lastName.charCodeAt(0)) % colors.length;
    return colors[index];
  }

  selectUser(data: Beneficiary) {
    this.selectedBeneficiaryItem = data;
    this.selectedBeneficiary.emit(data);
  }
}
