import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beneficiary } from '../../../../models/interfaces/Beneficiary.model';
import { DocumentPrepareFor } from '../animal-care.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monitoring',
  imports: [CommonModule, FormsModule],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.css'
})
export class MonitoringComponent {
  monitoring = {
    trusteeVisitsRequired: '',
    visitFrequency: ''
  };

  @Input() DocumentPrepareFor: DocumentPrepareFor | null = null;

  // Emit the selected (and ordered) agents when Next is clicked.
  @Output() selectionConfirmed = new EventEmitter<Beneficiary[]>();
  // Emit an event when Back is clicked.
  @Output() selectionCanceled = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.DocumentPrepareFor) {

      // Ensure monitoring object exists
      if(!this.DocumentPrepareFor.monitoring) {
      this.DocumentPrepareFor.monitoring = {
        trusteeVisitsRequired: '',
        visitFrequency: '', 
      };
    }

    // Sync existing values into local monitoring object
    this.monitoring = {
      trusteeVisitsRequired: this.DocumentPrepareFor.monitoring.trusteeVisitsRequired|| '',
      visitFrequency: this.DocumentPrepareFor.monitoring.visitFrequency|| ''
    }
      console.log(this.DocumentPrepareFor);
    }
  }
  
    // When Back is clicked.
    cancelSelection(): void {

      if(this.DocumentPrepareFor) {
        // Sync local values into DocumentPrepareFor.monitoring before emitting
        this.DocumentPrepareFor.monitoring = 
        {
          trusteeVisitsRequired: this.monitoring.trusteeVisitsRequired as "",
          visitFrequency: this.monitoring.visitFrequency as ""
        };
      }

      this.selectionCanceled.emit();
    }
  
   

    // When Next is clicked, emit the selected surrogates.
  confirmToNext(): void {
    if (!this.DocumentPrepareFor) return;
    this.DocumentPrepareFor.monitoring = { trusteeVisitsRequired: this.monitoring.trusteeVisitsRequired as "", 
      visitFrequency: this.monitoring.visitFrequency as ""};

      console.log("selcted monotrying:",this.DocumentPrepareFor.monitoring); 
        
    this.selectionConfirmed.emit();
 
  }
}
