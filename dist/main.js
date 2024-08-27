"use strict";
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
require("../styles.css");
const obsidian_1 = require("obsidian");
const CircuitMakerView_1 = require("./CircuitMakerView");
class CircuitMakerPlugin extends obsidian_1.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Loading Circuit Maker Plugin');
            // Register the custom view
            this.registerView(CircuitMakerView_1.VIEW_TYPE_CIRCUIT_MAKER, (leaf) => new CircuitMakerView_1.CircuitMakerView(leaf));
            // Add a ribbon icon to activate the Circuit Maker view
            this.addRibbonIcon('zap', 'Open Circuit Maker', () => {
                this.activateView();
            });
            // Optionally, you could add a command to open the Circuit Maker view
            this.addCommand({
                id: 'open-circuit-maker',
                name: 'Open Circuit Maker',
                callback: () => this.activateView(),
            });
        });
    }
    activateView() {
        return __awaiter(this, void 0, void 0, function* () {
            // Detach any existing views of this type
            this.app.workspace.detachLeavesOfType(CircuitMakerView_1.VIEW_TYPE_CIRCUIT_MAKER);
            // Create and reveal the new view
            yield this.app.workspace.getLeaf(true).setViewState({
                type: CircuitMakerView_1.VIEW_TYPE_CIRCUIT_MAKER,
                active: true,
            });
            this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(CircuitMakerView_1.VIEW_TYPE_CIRCUIT_MAKER)[0]);
        });
    }
    onunload() {
        // Unregister the view when the plugin is unloaded
        this.app.workspace.detachLeavesOfType(CircuitMakerView_1.VIEW_TYPE_CIRCUIT_MAKER);
        console.log('Unloading Circuit Maker Plugin');
    }
}
exports.default = CircuitMakerPlugin;
//# sourceMappingURL=main.js.map