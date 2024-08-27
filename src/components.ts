// src/components.ts

export interface CircuitComponent {
    id: string;
    type: string;
    value?: number;
    unit?: string;
    icon?: string; // Add icon path or SVG content
  }
  
  export const ComponentsLibrary: CircuitComponent[] = [
    { id: 'resistor', type: 'Resistor', value: 1000, unit: 'Ω', icon: 'https://static.thenounproject.com/png/1547032-200.png' },
    { id: 'capacitor', type: 'Capacitor', value: 1, unit: 'μF', icon: 'https://cdn-icons-png.flaticon.com/512/3512/3512171.png' },
    { id: 'inductor', type: 'Inductor', value: 10, unit: 'mH', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Inductor.svg/1200px-Inductor.svg.png' },
    { id: 'potentiometer', type: 'Potentiometer', value: 5000, unit: 'Ω', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Potentiometer_symbol.svg/600px-Potentiometer_symbol.svg.png' },
    { id: 'electromotor', type: 'Electromotor', icon: 'https://static.thenounproject.com/png/411958-200.png' },
    // More components...
  ];
  