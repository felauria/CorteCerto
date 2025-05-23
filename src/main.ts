import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutingProviders } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [...appRoutingProviders],
}).catch(err => console.error(err));
