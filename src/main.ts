
import '../styles.css'
import { Plugin } from 'obsidian';
import { CircuitMakerView, VIEW_TYPE_CIRCUIT_MAKER } from './CircuitMakerView';

export default class CircuitMakerPlugin extends Plugin {
  async onload() {
    console.log('Loading Circuit Maker Plugin');

    // Register the custom view
    this.registerView(
      VIEW_TYPE_CIRCUIT_MAKER,
      (leaf) => new CircuitMakerView(leaf)
    );

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
  }

  async activateView() {
    // Detach any existing views of this type
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_CIRCUIT_MAKER);

    // Create and reveal the new view
    await this.app.workspace.getLeaf(true).setViewState({
      type: VIEW_TYPE_CIRCUIT_MAKER,
      active: true,
    });

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(VIEW_TYPE_CIRCUIT_MAKER)[0]
    );
  }

  onunload() {
    // Unregister the view when the plugin is unloaded
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_CIRCUIT_MAKER);
    console.log('Unloading Circuit Maker Plugin');
  }
}
