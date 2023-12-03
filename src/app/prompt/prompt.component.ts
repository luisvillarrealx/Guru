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


  constructor(private promptService: PromptService) {}

  sendMessage(): void {
    if (this.message.trim()) {
      console.log(this.message)
      this.isLoading = true;
      const messageToSend = this.message.trim();
      this.messages.push({ type: 'request', text: messageToSend });

      this.promptService.sendPromptRequest(messageToSend).subscribe(
        (response) => {
          this.messages.push({ type: 'response', text: response.choices[0].text });
          this.isLoading = false;
        },
        (error) => {
          console.error('Error:', error);
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
