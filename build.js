const fs = require('fs-extra');
const concat = require('concat');
const path = require('path');

const componentPath = './dist/creatio-message-composer/creatio-message-composer.js';
const distDir = './dist/creatio-message-composer';

(async function build() {
  try {
    console.log('Building Creatio Message Composer component...');

    // Ensure dist directory exists
    await fs.ensureDir(distDir);

    // Get all built files
    const files = [
      './dist/creatio-message-composer/runtime.js',
      './dist/creatio-message-composer/polyfills.js',
      './dist/creatio-message-composer/main.js'
    ].filter((file) => fs.pathExistsSync(file));

    if (files.length === 0) {
      console.error('No build files found. Please run "ng build" first.');
      process.exit(1);
    }

    console.log('Concatenating files:', files);

    // Concatenate all files into a single file
    await concat(files, componentPath);

    console.log(`✅ Component built successfully: ${componentPath}`);
    
    // Copy any assets if they exist
    const assetsDir = './dist/creatio-message-composer/assets';
    if (fs.pathExistsSync(assetsDir)) {
      await fs.copy(assetsDir, './dist/assets');
      console.log('✅ Assets copied successfully');
    }

    // Create package info
    const packageInfo = {
      name: 'creatio-message-composer',
      version: '1.0.0',
      description: 'Creatio Freedom UI compatible message composer component',
      main: 'creatio-message-composer.js',
      files: ['creatio-message-composer.js'],
      keywords: ['creatio', 'angular', 'message', 'composer', 'phone', 'sms'],
      author: 'Creatio Development Team',
      license: 'MIT',
      customElement: {
        tagName: 'creatio-message-composer',
        events: [
          'crt-message-submit',
          'crt-message-change', 
          'crt-from-phone-change',
          'crt-to-phone-change'
        ],
        properties: [
          'fromPhoneRequired',
          'toPhoneRequired', 
          'messageRequired',
          'maxMessageLength',
          'placeholder',
          'fromPhoneLabel',
          'toPhoneLabel',
          'messageLabel',
          'submitButtonText',
          'disabled'
        ]
      }
    };

    await fs.writeJSON(path.join(distDir, 'package.json'), packageInfo, { spaces: 2 });
    console.log('✅ Package info created');

    // Create usage instructions
    const readme = `# Creatio Message Composer Component

A Angular-based message composer component designed for Creatio Freedom UI integration.

## Features

- Two phone input fields (From/To) with international formatting
- Message text area with character count
- Full Creatio Freedom UI styling
- Form validation
- Custom events for Creatio integration

## Installation in Creatio

1. Copy \`creatio-message-composer.js\` to your Creatio package \`Files/src/js/\` directory
2. Configure the path in your package's \`bootstrap.js\`:

\`\`\`javascript
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
\`\`\`

3. Create \`descriptor.json\` in your package \`Files/\` directory:

\`\`\`json
{
    "bootstraps": [
        "src/js/bootstrap.js"
    ]
}
\`\`\`

## Usage in Creatio Module

\`\`\`javascript
define("YourModuleName", ["creatio-message-composer"], function() {
    // Your module code
    
    render: function(renderTo) {
        this.callParent(arguments);
        
        const component = document.createElement("creatio-message-composer");
        
        // Set properties
        component.setAttribute("from-phone-required", "true");
        component.setAttribute("to-phone-required", "true");
        component.setAttribute("message-required", "true");
        component.setAttribute("placeholder", "Enter your message...");
        
        // Add event listeners
        component.addEventListener('crt-message-submit', (event) => {
            console.log('Message submitted:', event.detail);
            // Handle message submission in Creatio
        });
        
        renderTo.appendChild(component);
    }
});
\`\`\`

## Properties

${Object.entries(packageInfo.customElement.properties).map(([prop]) => 
  \`- \\\`${prop}\\\`\`
).join('\n')}

## Events

${packageInfo.customElement.events.map(event => 
  \`- \\\`${event}\\\`\`
).join('\n')}

## Styling

The component uses Creatio Freedom UI design tokens and is fully compatible with Creatio's styling system.
`;

    await fs.writeFile(path.join(distDir, 'README.md'), readme);
    console.log('✅ Documentation created');

    console.log('\n🎉 Build completed successfully!');
    console.log('📁 Output directory:', distDir);
    console.log('📄 Main file:', componentPath);

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
})();