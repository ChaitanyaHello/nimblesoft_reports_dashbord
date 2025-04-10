import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Beneficiary } from '../../../../models/interfaces/Beneficiary.model';
import { DocumentPrepareFor } from '../animal-care.component';
import { AddPetComponent } from "../../utilities/add-pet/add-pet.component";
import { Pet } from '../../../../models/interfaces/utilities/IPetDetails';

@Component({
  selector: 'app-pet-details',
  imports: [CommonModule, FormsModule, AddPetComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})

export class PetDetailsComponent {

  @Input() pets: Pet[] = [];

  @Input() DocumentPrepareFor: DocumentPrepareFor | null = null;
  // When Next is clicked, we emit the selected surrogates.
  @Output() selectionConfirmed = new EventEmitter<Beneficiary[]>();
  // When Back is clicked.
  @Output() selectionCanceled = new EventEmitter<void>();

  ngOnInit(): void {
    //this.pets = this.DocumentPrepareFor?.pets || [];

    if ((!this.pets || this.pets.length === 0) && this.DocumentPrepareFor?.pets) {
      this.pets = [...this.DocumentPrepareFor.pets];
    }

    //Add default empty pet if list is still empty
    if (!this.pets || this.pets.length === 0) {
      this.pets = [{ name: '', petType: '', otherPetType: '', breed: '', idNumber: '', expanded: false }];
    }
  }

  // When Back is clicked.
  cancelSelection(): void {
    this.selectionCanceled.emit();
  }

  //pets: Pet[] = [];

  handlePetsUpdate(updatedPets: Pet[]) {
    this.pets = updatedPets;
    console.log('Updated Pets List:', this.pets);
    if (this.DocumentPrepareFor) {
      this.DocumentPrepareFor.pets = updatedPets;
    }
  }

  // When Next is clicked, emit the selected surrogates.
  confirmToNext(): void {
    if (!this.DocumentPrepareFor) return;
    
    this.DocumentPrepareFor.pets = this.pets;

    this.selectionConfirmed.emit();

  }
}
