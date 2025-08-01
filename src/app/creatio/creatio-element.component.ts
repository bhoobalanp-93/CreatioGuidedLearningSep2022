import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComposerComponent, MessageData } from '../message-composer/message-composer.component';

@Component({
  selector: 'creatio-message-composer-element',
  standalone: true,
  imports: [CommonModule, MessageComposerComponent],
  template: `
    <crt-message-composer
      [fromPhoneRequired]="fromPhoneRequired"
      [toPhoneRequired]="toPhoneRequired"
      [messageRequired]="messageRequired"
      [maxMessageLength]="maxMessageLength"
      [placeholder]="placeholder"
      [fromPhoneLabel]="fromPhoneLabel"
      [toPhoneLabel]="toPhoneLabel"
      [messageLabel]="messageLabel"
      [submitButtonText]="submitButtonText"
      [disabled]="disabled"
      (messageSubmit)="onMessageSubmit($event)"
      (messageChange)="onMessageChange($event)"
      (fromPhoneChange)="onFromPhoneChange($event)"
      (toPhoneChange)="onToPhoneChange($event)">
    </crt-message-composer>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom // Use Shadow DOM for isolation
})
export class CreatioElementComponent {
  // Input properties that can be set from Creatio
  @Input() fromPhoneRequired: boolean = false;
  @Input() toPhoneRequired: boolean = false;
  @Input() messageRequired: boolean = false;
  @Input() maxMessageLength: number = 1000;
  @Input() placeholder: string = 'Type your message here...';
  @Input() fromPhoneLabel: string = 'From';
  @Input() toPhoneLabel: string = 'To';
  @Input() messageLabel: string = 'Message';
  @Input() submitButtonText: string = 'Send Message';
  @Input() disabled: boolean = false;

  // Output events that Creatio can listen to
  @Output() messageSubmit = new EventEmitter<MessageData>();
  @Output() messageChange = new EventEmitter<string>();
  @Output() fromPhoneChange = new EventEmitter<string>();
  @Output() toPhoneChange = new EventEmitter<string>();

  onMessageSubmit(messageData: MessageData) {
    // Emit the event for Creatio to handle
    this.messageSubmit.emit(messageData);
    
    // Also emit a custom event for direct DOM event listening
    const customEvent = new CustomEvent('crt-message-submit', {
      detail: messageData,
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  }

  onMessageChange(message: string) {
    this.messageChange.emit(message);
    
    const customEvent = new CustomEvent('crt-message-change', {
      detail: { message },
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  }

  onFromPhoneChange(phone: string) {
    this.fromPhoneChange.emit(phone);
    
    const customEvent = new CustomEvent('crt-from-phone-change', {
      detail: { phone },
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  }

  onToPhoneChange(phone: string) {
    this.toPhoneChange.emit(phone);
    
    const customEvent = new CustomEvent('crt-to-phone-change', {
      detail: { phone },
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  }
}