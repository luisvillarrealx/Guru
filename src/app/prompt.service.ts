import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  private apiKey = 'YOUR_API_KEY';
  private apiUrl = 'https://api.openai.com/v1/completions';

  constructor(private http: HttpClient) { }

  sendPromptRequest(message: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);

    const requestBody = {
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 2048,
      temperature: 0.2,
      top_p: 1,
      n: 1,
      stop: null
    };
    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }
}
