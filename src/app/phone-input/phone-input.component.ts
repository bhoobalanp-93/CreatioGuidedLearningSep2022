import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'crt-phone-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ],
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss']
})
export class PhoneInputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = 'Enter phone number';
  @Input() disabled: boolean = false;
  @Input() hasError: boolean = false;
  @Input() showCountryCode: boolean = true;
  @Input() defaultCountryCode: string = '+1';

  value: string = '';
  formattedValue: string = '';
  selectedCountryCode: string = '+1';
  isDropdownOpen: boolean = false;
  isFocused: boolean = false;

  // Common country codes
  countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
    { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' }
  ];

  filteredCountryCodes = [...this.countryCodes];
  searchTerm: string = '';

  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit() {
    this.selectedCountryCode = this.defaultCountryCode;
  }

  writeValue(value: string): void {
    if (value) {
      this.setValue(value);
    } else {
      this.value = '';
      this.formattedValue = '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: any) {
    const inputValue = event.target.value;
    this.setPhoneNumber(inputValue);
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }

  private setPhoneNumber(phoneNumber: string) {
    // Remove all non-numeric characters except +
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    // If it starts with country code, extract it
    if (cleanNumber.startsWith('+')) {
      const match = this.countryCodes.find(cc => cleanNumber.startsWith(cc.code));
      if (match) {
        this.selectedCountryCode = match.code;
        const nationalNumber = cleanNumber.substring(match.code.length);
        this.value = nationalNumber;
        this.formattedValue = this.formatPhoneNumber(nationalNumber);
      } else {
        this.value = cleanNumber;
        this.formattedValue = cleanNumber;
      }
    } else {
      this.value = cleanNumber;
      this.formattedValue = this.formatPhoneNumber(cleanNumber);
    }

    const fullNumber = this.selectedCountryCode + this.value;
    this.onChange(fullNumber);
  }

  private setValue(fullNumber: string) {
    if (fullNumber.startsWith('+')) {
      const match = this.countryCodes.find(cc => fullNumber.startsWith(cc.code));
      if (match) {
        this.selectedCountryCode = match.code;
        this.value = fullNumber.substring(match.code.length);
        this.formattedValue = this.formatPhoneNumber(this.value);
      } else {
        this.value = fullNumber;
        this.formattedValue = fullNumber;
      }
    } else {
      this.value = fullNumber;
      this.formattedValue = this.formatPhoneNumber(fullNumber);
    }
  }

  private formatPhoneNumber(phoneNumber: string): string {
    // Basic formatting for US/CA numbers
    if (this.selectedCountryCode === '+1' && phoneNumber.length === 10) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    }
    
    // Basic formatting for other numbers
    if (phoneNumber.length > 6) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
    } else if (phoneNumber.length > 3) {
      return phoneNumber.replace(/(\d{3})(\d+)/, '$1 $2');
    }
    
    return phoneNumber;
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        this.filteredCountryCodes = [...this.countryCodes];
        this.searchTerm = '';
      }
    }
  }

  selectCountryCode(countryCode: any) {
    this.selectedCountryCode = countryCode.code;
    this.isDropdownOpen = false;
    this.formattedValue = this.formatPhoneNumber(this.value);
    const fullNumber = this.selectedCountryCode + this.value;
    this.onChange(fullNumber);
  }

  onCountrySearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredCountryCodes = this.countryCodes.filter(cc => 
      cc.name.toLowerCase().includes(this.searchTerm) ||
      cc.code.includes(this.searchTerm) ||
      cc.country.toLowerCase().includes(this.searchTerm)
    );
  }

  getSelectedCountry() {
    return this.countryCodes.find(cc => cc.code === this.selectedCountryCode) || this.countryCodes[0];
  }

  // Close dropdown when clicking outside
  onDocumentClick(event: any) {
    if (!event.target.closest('.phone-input-container')) {
      this.isDropdownOpen = false;
    }
  }

  trackByCountry(index: number, country: any): string {
    return country.code + country.country;
  }
}