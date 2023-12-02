import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  private apiKey = 'YOUR_API_KEY';
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  constructor(private http: HttpClient) { }

  sendPromptRequest(message: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    const requestBody = {
      prompt: message,
      max_tokens: 300
      // Add any other parameters required by the API
    };

    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }
}
