import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  public host: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public getResource(url: string) {
    return this.http.get(this.host + url);
  }

  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest(
      'POST',
      this.host + '/uploadPhoto/' + idProduct,
      formdata,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );

    return this.http.request(req);
  }

  public patchResource(url, data) {
    return this.http.patch(url, data);
  }
}
