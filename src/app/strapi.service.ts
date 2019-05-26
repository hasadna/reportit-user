import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  CREATE_REPORT_URL = 'https://reportit-cms.obudget.org/reports';
  UPDATE_REPORT_URL = 'https://reportit-cms.obudget.org/reports/:report_id';
  FILE_UPLOAD = 'https://reportit-cms.obudget.org/upload/';
  report_id: any = null;

  constructor(private http: HttpClient) { }

  createReport(data: any) {
    return new Promise((resolve, _) => {
      this.http.post(this.CREATE_REPORT_URL, data)
          .subscribe((response: any) => {
            console.log('create user got', response);
            this.report_id = response.id;
            resolve(this.report_id);
          });
    });
  }

  updateReport(data: any) {
    console.log('update', data);
    return new Promise((resolve, _) => {
      this.http.put(this.UPDATE_REPORT_URL.replace(':report_id', this.report_id), data)
          .subscribe(() => {
            console.log('updated user');
            resolve();
          });
    });
  }

  uploadFile(file: File, path, progress, success) {
    return new Promise((resolve, _) => {
      const formData: FormData = new FormData();
      formData.append('files', file, file.name);
      formData.append('path', path);
      formData.append('refId', this.report_id);
      formData.append('ref', 'report');
      formData.append('field', 'evidence_files');

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.FILE_UPLOAD, formData, {
        reportProgress: true
      });


      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          success(true);
          console.log(event.body);
          resolve(event.body);
        }
      });
    });
  }
}
