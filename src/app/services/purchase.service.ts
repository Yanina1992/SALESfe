import { Injectable } from '@angular/core';
import { SvcService } from './svc.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { RequestPurchaseDto } from '../models/DTOs/request-purchase-dto';
import { ResponsePurchaseDto } from '../models/DTOs/response-purchase-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private svc: SvcService) { }

    purchasetUrl: string = environment.purchaseEndPoint;

    getPurchase(): Observable<ResponsePurchaseDto[]>{
        let response = this.svc.get<ResponsePurchaseDto[]>(`${this.purchasetUrl}/GetPurchases`)
        return response;
    }

    insertPurchase(request: RequestPurchaseDto): Observable<ResponsePurchaseDto>{
        let response = this.svc.post<RequestPurchaseDto, ResponsePurchaseDto>(`${this.purchasetUrl}/InsertPurchase`, request)
        return response;
    }

}
