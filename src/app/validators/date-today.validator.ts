import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateTodayValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        if (value < new Date()) {
            return {today: "La date doit être dans le futur"}
        }

        return null;

    }
}