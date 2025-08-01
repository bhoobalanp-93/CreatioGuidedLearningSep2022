import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComposerComponent } from './message-composer/message-composer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MessageComposerComponent],
  template: `
    <div class="crt-container">
      <h1>Creatio Message Composer</h1>
      <p>Angular component compatible with Creatio Freedom UI</p>
      
      <div class="demo-section">
        <h2>Message Composer Component</h2>
        <crt-message-composer 
          [fromPhoneRequired]="true"
          [toPhoneRequired]="true"
          [messageRequired]="true"
          (messageSubmit)="onMessageSubmit($event)">
        </crt-message-composer>
      </div>
      
      <div class="demo-output" *ngIf="lastMessage">
        <h3>Last Submitted Message:</h3>
        <pre>{{ lastMessage | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    h1 {
      color: var(--crt-primary-600);
      margin-bottom: var(--crt-space-md);
      font-size: var(--crt-font-size-xl);
    }
    
    h2 {
      color: var(--crt-neutral-700);
      margin: var(--crt-space-xl) 0 var(--crt-space-md) 0;
      font-size: var(--crt-font-size-lg);
    }
    
    h3 {
      color: var(--crt-neutral-700);
      margin-bottom: var(--crt-space-sm);
      font-size: var(--crt-font-size-md);
    }
    
    p {
      color: var(--crt-neutral-600);
      margin-bottom: var(--crt-space-lg);
    }
    
    .demo-section {
      margin: var(--crt-space-xl) 0;
    }
    
    .demo-output {
      margin-top: var(--crt-space-xl);
      padding: var(--crt-space-md);
      background-color: var(--crt-neutral-50);
      border-radius: var(--crt-radius-md);
      border: 1px solid var(--crt-neutral-200);
    }
    
    pre {
      background-color: var(--crt-neutral-100);
      padding: var(--crt-space-md);
      border-radius: var(--crt-radius-sm);
      overflow-x: auto;
      font-size: var(--crt-font-size-xs);
    }
  `]
})
export class AppComponent {
  lastMessage: any = null;
  
  onMessageSubmit(messageData: any) {
    this.lastMessage = messageData;
    console.log('Message submitted:', messageData);
  }
}