import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Options } from '../../models/options/options';
import { SexualRating, ViolenceRating } from '../../models/vn/visual-novel';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private optionsSubject: BehaviorSubject<Options>;

  constructor() {
    console.log("Construct");
    const savedOptions = JSON.parse(localStorage.getItem('options')!);
    if (savedOptions != null) {
      this.optionsSubject = new BehaviorSubject<Options>(savedOptions);
    }
    else {
      this.optionsSubject = new BehaviorSubject<Options>({
        imageSexualSensitivity: SexualRating.SAFE,
        imageViolenceSensitivity: ViolenceRating.TAME
      });
      this.updateOptions(this.optionsSubject.value);
    }
  }

  getOptions(): Observable<Options> {
    return this.optionsSubject.asObservable();
  }

  updateOptions(newOptions: Options): void {
    localStorage.setItem('options', JSON.stringify(newOptions));
    this.optionsSubject.next(newOptions);
  }
}
