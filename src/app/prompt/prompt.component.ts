import { Component, HostListener } from '@angular/core';
import { PromptService } from '../prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
  messages: { type: string, text: string }[] = [];
  message: string = '';

  constructor(private promptService: PromptService) {}

  sendMessage(): void {
    if (this.message.trim()) {
      const messageToSend = this.message.trim();
      this.messages.push({ type: 'request', text: messageToSend }); // Store user's question

      this.promptService.sendPromptRequest(messageToSend).subscribe(
        (response) => {
          // Handle the response from OpenAI here
          console.log(response);
          this.messages.push({ type: 'response', text: response.choices[0].text }); // Store model's response
        },
        (error) => {
          // Handle error responses
          console.error('Error:', error);
        }
      );
      this.message = ''; // Clear the input field after sending
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.target instanceof HTMLInputElement) {
      this.sendMessage(); // Trigger sendMessage() on pressing Enter in the input field
    }
  }
}
