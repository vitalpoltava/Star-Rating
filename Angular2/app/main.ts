import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Stars } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(Stars);