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
  randomQuestions: string[] = [];

  constructor(private promptService: PromptService) {}
  ngOnInit(): void {
    this.randomQuestions = this.getMultipleRandom(this.suggestedQuestions, 3);
  }

  getMultipleRandom(suggestedQuestions: string[], num: number) {
    const shuffled = [...suggestedQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  suggestedQuestions: string[] = [
    'Dame consejos para mi entrevista',
    'Qué debe incluir mi curriculum',
    'Cómo debo prepararme para una entrevista de trabajo',
    'Cómo puedo destacar mis habilidades y experiencia en mi currículum',
    'Qué tipos de preguntas debo esperar durante una entrevista',
    'Ejemplos de preguntas que puedo hacerle al entrevistador',
    'Cómo puedo abordar y explicar las brechas en mi historial laboral',
    'Cómo puedo mejorar mi presencia y marca personal durante la entrevista',
    'Qué estrategias puedo utilizar para negociar el salario en una entrevista'
  ];

  insertSuggestedQuestion(question: string): void {
    this.message = question;
    this.sendMessage();
  }

  isInterviewQuestion(question: string): boolean {
    const interviewRegex = /(entrevista|entrevistador|laboral|interview|prepare|job|work|trabajo|career|hire|role|position|resume|curriculum|cv)/gi;
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
