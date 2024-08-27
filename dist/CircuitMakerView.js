"use strict";
// src/CircuitMakerView.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitMakerView = exports.VIEW_TYPE_CIRCUIT_MAKER = void 0;
const obsidian_1 = require("obsidian");
const components_1 = require("./components"); // Import here
exports.VIEW_TYPE_CIRCUIT_MAKER = "circuit-maker-view";
class CircuitMakerView extends obsidian_1.ItemView {
    constructor(leaf) {
        super(leaf);
    }
    getViewType() {
        return exports.VIEW_TYPE_CIRCUIT_MAKER;
    }
    getDisplayText() {
        return "Circuit Maker";
    }
    onOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            const container = this.containerEl.children[1];
            container.empty();
            // Create the main container for your circuit maker
            const circuitContainer = container.createDiv({ cls: 'circuit-maker-container' });
            // Create the toolbar for components
            const toolbar = circuitContainer.createDiv({ cls: 'circuit-maker-toolbar' });
            // Populate the toolbar with draggable components
            components_1.ComponentsLibrary.forEach((component) => {
                const componentButton = toolbar.createEl('div', { cls: 'circuit-component' });
                componentButton.innerHTML = component.icon || component.type;
                componentButton.draggable = true;
                // Handle dragging of components
                componentButton.addEventListener('dragstart', (e) => {
                    var _a;
                    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', component.id);
                });
            });
            // Create the main canvas area for circuit design
            const canvas = circuitContainer.createDiv({ cls: 'circuit-maker-canvas' });
            // Handle dropping components onto the canvas
            canvas.addEventListener('dragover', (e) => e.preventDefault());
            canvas.addEventListener('drop', (e) => {
                var _a;
                e.preventDefault();
                const componentId = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
                if (componentId) {
                    const droppedComponent = components_1.ComponentsLibrary.find(comp => comp.id === componentId);
                    if (droppedComponent) {
                        this.addComponentToCanvas(droppedComponent, e.clientX, e.clientY);
                    }
                }
            });
        });
    }
    addComponentToCanvas(component, x, y) {
        const canvas = this.containerEl.querySelector('.circuit-maker-canvas');
        if (!canvas)
            return;
        const componentElement = document.createElement('div');
        componentElement.classList.add('circuit-component-canvas');
        componentElement.innerHTML = component.icon || component.type;
        componentElement.style.position = 'absolute';
        componentElement.style.left = `${x}px`;
        componentElement.style.top = `${y}px`;
        canvas.appendChild(componentElement);
    }
    onClose() {
        return __awaiter(this, void 0, void 0, function* () {
            // Cleanup if necessary
        });
    }
}
exports.CircuitMakerView = CircuitMakerView;
//# sourceMappingURL=CircuitMakerView.js.map