import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {Plugins, StatusBarStyle} from '@capacitor/core';

const {StatusBar, SplashScreen} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        await StatusBar.setBackgroundColor({color: '#038dcd'});
        await StatusBar.setStyle({style: StatusBarStyle.Dark});
      }
      await SplashScreen.hide();
    });
  }
}
