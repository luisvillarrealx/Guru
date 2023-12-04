import { Component, HostListener, OnInit } from '@angular/core';
import { PromptService } from '../prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
  messages: { type: string, text: string }[] = [];
  message: string = '';
  isLoading: boolean = false;
  showPopup: boolean = false;

  constructor(private promptService: PromptService) {}

  suggestedQuestions: string[] = [
    'Dame consejos para mi entrevista',
    'Qué debo incluir mi curriculum',
    'Cómo debo prepararme para una entrevista de trabajo',
  ];

  insertSuggestedQuestion(question: string): void {
    this.message = question;
    this.sendMessage();
  }

  isInterviewQuestion(question: string): boolean {
    const interviewRegex = /(entrevista|interview|prepare|job|work|trabajo|career|hire|role|position|resume|curriculum|cv)/gi;
    return interviewRegex.test(question);
  }

  dismissPopup(): void {
    this.showPopup = false;
    this.message = '';
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.isLoading = true;
      const messageToSend = this.message.trim();

      if (!this.isInterviewQuestion(messageToSend)) {
        this.showPopup = true;
        this.isLoading = false;
        return;
      }

      this.messages.push({ type: 'request', text: messageToSend });

      this.promptService.sendPromptRequest(messageToSend).subscribe(
        (response) => {
          this.messages.push({ type: 'response', text: response.choices[0].text });
          this.isLoading = false;
        },
        (error) => {
          this.messages.push({ type: 'error', text: 'Error. No se logró establecer conexión' });
          console.log(error);
          this.isLoading = false;
        }
      );
      this.message = '';
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.sendMessage();
    }
  }
}
