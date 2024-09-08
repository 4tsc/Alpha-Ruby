import { registerRootComponent } from 'expo';
import App from '../../app/app';

// registerRootComponent asegura que la aplicación se configure correctamente,
// ya sea en el entorno de desarrollo o en un entorno de producción.
registerRootComponent(App);