import { Injectable } from '@angular/core';

import {VNDBService} from '../../services/vndb/v-n-d-b.service';

@Injectable({ providedIn: 'root' })
export class LoginHelper {
  constructor(private vndbService: VNDBService) {
  }


}
