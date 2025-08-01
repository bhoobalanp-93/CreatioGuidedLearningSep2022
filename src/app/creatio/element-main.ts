import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatioElementComponent } from './creatio-element.component';

// Bootstrap function for Creatio integration
async function bootstrapCreatioElement() {
  try {
    // Create Angular application with required providers
    const app = await createApplication({
      providers: [
        importProvidersFrom(
          FormsModule,
          ReactiveFormsModule,
          BrowserAnimationsModule
        )
      ]
    });

    // Create custom element
    const CreatioMessageComposerElement = createCustomElement(CreatioElementComponent, {
      injector: app.injector
    });

    // Register custom element with Creatio-compatible name
    if (!customElements.get('creatio-message-composer')) {
      customElements.define('creatio-message-composer', CreatioMessageComposerElement);
    }

    console.log('Creatio Message Composer element registered successfully');

    return {
      element: CreatioMessageComposerElement,
      tagName: 'creatio-message-composer'
    };
  } catch (error) {
    console.error('Failed to bootstrap Creatio element:', error);
    throw error;
  }
}

// Auto-bootstrap if running in browser environment
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapCreatioElement);
  } else {
    bootstrapCreatioElement();
  }
}

// Export for manual bootstrapping
export { bootstrapCreatioElement, CreatioElementComponent };