const tintColorLight = '#cf4b24'; // Naranjo
const tintColorDark = '#4c4543';  // Gris

export const Colors = {
  light: {
    text: '#4c4543',          // Gris para el texto en modo claro
    background: '#cf4b24',    // Naranjo para el fondo en modo claro
    tint: tintColorLight,     // Naranjo para el color destacado en modo claro
    icon: '#4c4543',          // Gris para los iconos en modo claro
    tabIconDefault: '#4c4543',// Gris para los iconos de pestañas no seleccionados en modo claro
    tabIconSelected: tintColorLight, // Naranjo para los iconos de pestañas seleccionados en modo claro
  },
  dark: {
    text: '#cf4b24',          // Naranjo para el texto en modo oscuro
    background: '#4c4543',    // Gris para el fondo en modo oscuro
    tint: tintColorDark,      // Gris para el color destacado en modo oscuro
    icon: '#cf4b24',          // Naranjo para los iconos en modo oscuro
    tabIconDefault: '#cf4b24',// Naranjo para los iconos de pestañas no seleccionados en modo oscuro
    tabIconSelected: tintColorDark, // Gris para los iconos de pestañas seleccionados en modo oscuro
  },
};
