import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneInputComponent } from '../phone-input/phone-input.component';

export interface MessageData {
  fromPhone: string;
  toPhone: string;
  message: string;
  timestamp: Date;
  isValid: boolean;
}

@Component({
  selector: 'crt-message-composer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneInputComponent],
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.scss']
})
export class MessageComposerComponent implements OnInit {
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

  @Output() messageSubmit = new EventEmitter<MessageData>();
  @Output() messageChange = new EventEmitter<string>();
  @Output() fromPhoneChange = new EventEmitter<string>();
  @Output() toPhoneChange = new EventEmitter<string>();

  messageForm!: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.messageForm = this.fb.group({
      fromPhone: ['', this.fromPhoneRequired ? [Validators.required, this.phoneValidator] : [this.phoneValidator]],
      toPhone: ['', this.toPhoneRequired ? [Validators.required, this.phoneValidator] : [this.phoneValidator]],
      message: ['', this.messageRequired ? [Validators.required, Validators.maxLength(this.maxMessageLength)] : [Validators.maxLength(this.maxMessageLength)]]
    });

    // Subscribe to form changes
    this.messageForm.get('message')?.valueChanges.subscribe(value => {
      this.messageChange.emit(value);
    });

    this.messageForm.get('fromPhone')?.valueChanges.subscribe(value => {
      this.fromPhoneChange.emit(value);
    });

    this.messageForm.get('toPhone')?.valueChanges.subscribe(value => {
      this.toPhoneChange.emit(value);
    });
  }

  private phoneValidator(control: any) {
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    if (control.value && !phonePattern.test(control.value)) {
      return { invalidPhone: true };
    }
    return null;
  }

  get remainingCharacters(): number {
    const messageLength = this.messageForm.get('message')?.value?.length || 0;
    return this.maxMessageLength - messageLength;
  }

  get isFormValid(): boolean {
    return this.messageForm.valid;
  }

  get fromPhone() {
    return this.messageForm.get('fromPhone');
  }

  get toPhone() {
    return this.messageForm.get('toPhone');
  }

  get message() {
    return this.messageForm.get('message');
  }

  onSubmit() {
    if (this.messageForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const messageData: MessageData = {
        fromPhone: this.messageForm.get('fromPhone')?.value || '',
        toPhone: this.messageForm.get('toPhone')?.value || '',
        message: this.messageForm.get('message')?.value || '',
        timestamp: new Date(),
        isValid: this.messageForm.valid
      };

      // Simulate async operation
      setTimeout(() => {
        this.messageSubmit.emit(messageData);
        this.isSubmitting = false;
        this.resetForm();
      }, 500);
    } else {
      // Mark all fields as touched to show validation errors
      this.messageForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.messageForm.reset();
    this.messageForm.markAsUntouched();
  }

  clearMessage() {
    this.messageForm.get('message')?.setValue('');
  }

  getFieldError(fieldName: string): string {
    const field = this.messageForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['invalidPhone']) {
        return 'Please enter a valid phone number';
      }
      if (field.errors['maxlength']) {
        return `Maximum ${this.maxMessageLength} characters allowed`;
      }
    }
    return '';
  }
}