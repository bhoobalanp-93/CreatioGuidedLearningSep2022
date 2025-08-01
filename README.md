# Creatio Message Composer - Angular Component

A complete Angular application featuring a message composer component designed for Creatio Freedom UI integration. This component provides phone number inputs with international formatting and a message text area, all styled according to Creatio's design system.

## 🚀 Features

- **Two Phone Input Fields**: From/To phone numbers with international formatting
- **Country Code Selection**: Dropdown with search functionality for country codes
- **Message Text Area**: Rich text input with character counting
- **Creatio Freedom UI Styling**: Complete design system implementation
- **Form Validation**: Comprehensive validation with error handling
- **Custom Angular Element**: Ready for Creatio platform integration
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: ARIA labels and keyboard navigation
- **TypeScript**: Fully typed for better development experience

## 📋 Requirements

- Node.js 18+ 
- Angular 17+
- Modern browser with Custom Elements support

## 🛠️ Installation & Setup

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Development server**:
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`

4. **Build for production**:
   ```bash
   npm run build:prod
   ```

5. **Build as Creatio Custom Element**:
   ```bash
   npm run build:element:prod
   ```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── message-composer/          # Main message composer component
│   ├── phone-input/               # Reusable phone input component
│   ├── creatio/                   # Creatio integration files
│   │   ├── creatio-element.component.ts
│   │   └── element-main.ts
│   └── app.component.ts           # Demo application
├── styles.scss                   # Creatio Freedom UI design system
└── index.html
```

## 🎨 Creatio Freedom UI Design System

The component implements a complete Creatio-compatible design system:

- **Design Tokens**: CSS custom properties for consistent theming
- **Component Classes**: `.crt-*` prefixed classes
- **Responsive Grid**: Mobile-first approach
- **Color Palette**: Primary, neutral, and semantic colors
- **Typography**: Consistent font sizing and weights
- **Spacing System**: Standardized spacing values
- **Accessibility**: High contrast and reduced motion support

## 📱 Component Features

### Message Composer Component (`crt-message-composer`)

**Inputs:**
- `fromPhoneRequired: boolean` - Make from phone field required
- `toPhoneRequired: boolean` - Make to phone field required  
- `messageRequired: boolean` - Make message field required
- `maxMessageLength: number` - Maximum message length (default: 1000)
- `placeholder: string` - Message textarea placeholder
- `fromPhoneLabel: string` - Label for from phone field
- `toPhoneLabel: string` - Label for to phone field
- `messageLabel: string` - Label for message field
- `submitButtonText: string` - Submit button text
- `disabled: boolean` - Disable the entire form

**Outputs:**
- `messageSubmit: EventEmitter<MessageData>` - Fired when form is submitted
- `messageChange: EventEmitter<string>` - Message text changes
- `fromPhoneChange: EventEmitter<string>` - From phone changes
- `toPhoneChange: EventEmitter<string>` - To phone changes

### Phone Input Component (`crt-phone-input`)

**Features:**
- International phone number formatting
- Country code selection with flags
- Search functionality for countries
- Automatic phone number validation
- Clear button for easy reset

## 🔧 Creatio Integration

### Installation in Creatio

1. **Build the component**:
   ```bash
   npm run build:element:prod
   ```

2. **Copy the built file** (`dist/creatio-message-composer/creatio-message-composer.js`) to your Creatio package:
   ```
   YourPackageName/Files/src/js/creatio-message-composer.js
   ```

3. **Configure bootstrap.js**:
   ```javascript
   (function() {
       require.config({
           paths: {
               "creatio-message-composer": Terrasoft.getFileContentUrl(
                   "YourPackageName",
                   "src/js/creatio-message-composer.js"
               ),
           },
       });
   })();
   ```

4. **Create descriptor.json**:
   ```json
   {
       "bootstraps": [
           "src/js/bootstrap.js"
       ]
   }
   ```

### Usage in Creatio Module

```javascript
define("YourModuleName", ["creatio-message-composer"], function() {
    return {
        render: function(renderTo) {
            this.callParent(arguments);
            
            const component = document.createElement("creatio-message-composer");
            
            // Configure component
            component.setAttribute("from-phone-required", "true");
            component.setAttribute("to-phone-required", "true");
            component.setAttribute("message-required", "true");
            component.setAttribute("placeholder", "Enter your message...");
            
            // Handle events
            component.addEventListener('crt-message-submit', (event) => {
                const messageData = event.detail;
                console.log('Message submitted:', messageData);
                
                // Send message via Creatio services
                this.sendMessage(messageData);
            });
            
            renderTo.appendChild(component);
        },
        
        sendMessage: function(messageData) {
            // Implement your Creatio message sending logic here
            // Example: Call Creatio web service or use message channel
        }
    };
});
```

## 🎯 Usage Examples

### Basic Usage
```html
<crt-message-composer
  [fromPhoneRequired]="true"
  [toPhoneRequired]="true"
  [messageRequired]="true"
  (messageSubmit)="onMessageSubmit($event)">
</crt-message-composer>
```

### Advanced Configuration
```html
<crt-message-composer
  [fromPhoneRequired]="true"
  [toPhoneRequired]="true"
  [messageRequired]="true"
  [maxMessageLength]="500"
  [placeholder]="'Type your SMS message here...'"
  [fromPhoneLabel]="'Sender'"
  [toPhoneLabel]="'Recipient'"
  [messageLabel]="'SMS Content'"
  [submitButtonText]="'Send SMS'"
  (messageSubmit)="handleMessageSubmit($event)"
  (messageChange)="onMessageChange($event)"
  (fromPhoneChange)="onFromPhoneChange($event)"
  (toPhoneChange)="onToPhoneChange($event)">
</crt-message-composer>
```

## 🔍 Development

### Running Tests
```bash
npm test
```

### Code Style
The project follows Angular style guide and uses:
- TypeScript strict mode
- SCSS for styling
- Reactive Forms for form handling
- Standalone components architecture

### Building for Different Environments

- **Development**: `npm start`
- **Production**: `npm run build:prod`
- **Creatio Element**: `npm run build:element:prod`

## 🌐 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 📄 License

MIT License - Feel free to use this component in your Creatio projects.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For questions about Creatio integration, refer to the [Creatio Documentation](https://academy.creatio.com/docs/8.x/dev/development-on-creatio-platform/development-tools/packages/file-content/create-an-angular-component) or contact the development team.

---

**Built with ❤️ for Creatio Freedom UI**