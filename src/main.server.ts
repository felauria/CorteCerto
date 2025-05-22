import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

const serverConfig = {
  providers: [],
};

const bootstrap = () => bootstrapApplication(AppComponent, serverConfig);

export default bootstrap;
