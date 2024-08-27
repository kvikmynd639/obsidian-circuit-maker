// src/CircuitMakerView.ts

import { ItemView, WorkspaceLeaf } from 'obsidian';
import { ComponentsLibrary, CircuitComponent } from './components'; // Import here

export const VIEW_TYPE_CIRCUIT_MAKER = "circuit-maker-view";

export class CircuitMakerView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_CIRCUIT_MAKER;
  }

  getDisplayText() {
    return "Circuit Maker";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();

    // Create the main container for your circuit maker
    const circuitContainer = container.createDiv({ cls: 'circuit-maker-container' });

    // Create the toolbar for components
    const toolbar = circuitContainer.createDiv({ cls: 'circuit-maker-toolbar' });

    // Populate the toolbar with draggable components
    ComponentsLibrary.forEach((component: CircuitComponent) => {
      const componentButton = toolbar.createEl('div', { cls: 'circuit-component' });
      componentButton.innerHTML = component.icon || component.type;
      componentButton.draggable = true;

      // Handle dragging of components
      componentButton.addEventListener('dragstart', (e) => {
        e.dataTransfer?.setData('text/plain', component.id);
      });
    });

    // Create the main canvas area for circuit design
    const canvas = circuitContainer.createDiv({ cls: 'circuit-maker-canvas' });

    // Handle dropping components onto the canvas
    canvas.addEventListener('dragover', (e) => e.preventDefault());

    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      const componentId = e.dataTransfer?.getData('text/plain');
      if (componentId) {
        const droppedComponent = ComponentsLibrary.find(comp => comp.id === componentId);
        if (droppedComponent) {
          this.addComponentToCanvas(droppedComponent, e.clientX, e.clientY);
        }
      }
    });
  }

  addComponentToCanvas(component: CircuitComponent, x: number, y: number) {
    const canvas = this.containerEl.querySelector('.circuit-maker-canvas');
    if (!canvas) return;

    const componentElement = document.createElement('div');
    componentElement.classList.add('circuit-component-canvas');
    componentElement.innerHTML = component.icon || component.type;
    componentElement.style.position = 'absolute';
    componentElement.style.left = `${x}px`;
    componentElement.style.top = `${y}px`;

    canvas.appendChild(componentElement);
  }

  async onClose() {
    // Cleanup if necessary
  }
}
