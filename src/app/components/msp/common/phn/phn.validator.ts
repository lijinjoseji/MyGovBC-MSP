import {Directive, forwardRef, Input} from '@angular/core';
import {Validator, NG_VALIDATORS, FormControl} from '@angular/forms';
import CompletenessCheckService from '../../service/completeness-check.service';

@Directive({
  selector: '[mod11Check][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => Mod11CheckValidator), multi: true
    }
  ],
  host: {'[attr.mod11Check]': 'mod11Check ? mod11Check : null'}
})

export class Mod11CheckValidator implements Validator {

  @Input('mod11Check') bcPhn: boolean;

  constructor(private completenessCheck: CompletenessCheckService){

  }

  validate(control: FormControl): {[key:string]:boolean;}  {

    // Get value out of control
    let phn = control.value;

    // pre req checks
    if (phn == null ||
      phn.length < 1) return null;

    if (this.completenessCheck.validatePHN(phn, this.bcPhn)) {
      // return null for no errors
      return null;
    }
    else {
      // return "true" if we have errors
      return {"mod11Check": true}
    }
  }

}
