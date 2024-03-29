// angular
import { Injectable, Inject, NgZone } from '@angular/core';

// nativescript
import * as tnsApp from 'tns-core-modules/application';
import * as tnsUtils from 'tns-core-modules/utils/utils';
import { device, isIOS, isAndroid } from 'tns-core-modules/platform';
import { DeviceOrientation } from 'tns-core-modules/ui/enums';
import * as tnsFacebook from 'nativescript-facebook';

// libs
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { LogService, PlatformLanguageToken } from '@sonder/core';

/**
 * This service can be used for low level app wiring
 * for best practice purposes, this service sets up:
 * - app version
 * - orientation handling including a Subject the app can observe
 * - deviceType to help component bindings
 * - example of global app event wiring for resume/suspend
 */
@Injectable()
export class AppService {
  // fundamentals
  private _appVersion: string;

  // orientation helper
  private _orientation: string;
  private _orientation$: Subject<any> = new Subject();
  private _deviceType: 'Phone' | 'Tablet';

  constructor(
    private _ngZone: NgZone,
    private _log: LogService,
    private _translate: TranslateService,
    @Inject(PlatformLanguageToken) private _lang: string
  ) {
    // initialize core services
    this._initAppVersion();
    this._initLocale();
    this._initOrientation();
    this._initAppEvents();
    this._initFacebookPlugin();
  }

  public get orientation() {
    return this._orientation;
  }

  public set orientation(value) {
    this._log.debug('setting orientation:', value);
    this._orientation = value;
    this._orientation$.next(value);
  }

  public get orientation$() {
    return this._orientation$;
  }

  public get deviceType() {
    return this._deviceType;
  }

  public get appVersion() {
    return this._appVersion;
  }

  private _initAppVersion() {
    let versionName: string;
    let buildNumber: string;

    if (tnsApp.android) {
      const pi = tnsApp.android.context
        .getPackageManager()
        .getPackageInfo(tnsApp.android.context.getPackageName(), 0);
      versionName = pi.versionName;
      buildNumber = pi.versionCode.toString();
    } else if (tnsApp.ios) {
      versionName = NSBundle.mainBundle.objectForInfoDictionaryKey(
        'CFBundleShortVersionString'
      );
      buildNumber = NSBundle.mainBundle.objectForInfoDictionaryKey(
        'CFBundleVersion'
      );
    }
    this._appVersion = `v${versionName} (${buildNumber})`;
    this._log.debug('App version:', this._appVersion);
  }

  private _initLocale() {
    this._translate.use(this._lang);
  }

  private _initAppEvents() {
    // For the future - may want to use these
    tnsApp.on(tnsApp.resumeEvent, () => {
      this._log.debug('tnsApp.resumeEvent');
    });
    tnsApp.on(tnsApp.suspendEvent, () => {
      this._log.debug('tnsApp.suspendEvent');
    });
  }

  private _initOrientation() {
    this._deviceType = device.deviceType;
    this._log.debug('deviceType:', this._deviceType);
    this._log.debug('initializing orientation handling.');

    // set initial orientation
    let orientation = getOrientation();
    this.orientation = orientation ? orientation : DeviceOrientation.portrait;
    this._log.debug('current orientation:', this.orientation);

    // handle orientation changes
    tnsApp.on(tnsApp.orientationChangedEvent, e => {
      // sometimes e.newValue will be undefined, ignore those
      if (e.newValue && this.orientation !== e.newValue) {
        orientation = getOrientation();
        if (orientation) {
          this._log.debug(`Old: ${this.orientation}; New: ${orientation}`);
          this._ngZone.run(() => {
            this.orientation = orientation;
          });
        }
      }
    });
  }

  private _initFacebookPlugin() {
    tnsFacebook.init('897988177030305');
  }
}

const getOrientation = function() {
  if (isIOS) {
    const deviceOrientation = tnsUtils.ios.getter(
      UIDevice,
      UIDevice.currentDevice
    ).orientation;
    if (
      deviceOrientation === UIDeviceOrientation.LandscapeLeft ||
      deviceOrientation === UIDeviceOrientation.LandscapeRight
    ) {
      return DeviceOrientation.landscape;
    } else if (
      deviceOrientation === UIDeviceOrientation.Portrait ||
      deviceOrientation == UIDeviceOrientation.PortraitUpsideDown
    ) {
      return DeviceOrientation.portrait;
    } else {
      return '';
    }
  } else {
    const orientation = getContext()
      .getResources()
      .getConfiguration().orientation;
    switch (orientation) {
      case 1 /* ORIENTATION_PORTRAIT (0x00000001) */:
        return DeviceOrientation.portrait;
      case 2 /* ORIENTATION_LANDSCAPE (0x00000002) */:
        return DeviceOrientation.landscape;
      default:
        /* ORIENTATION_UNDEFINED (0x00000000) */
        return DeviceOrientation.portrait;
    }
  }
};

const getContext = function() {
  const ctx = java.lang.Class.forName('android.app.AppGlobals')
    .getMethod('getInitialApplication', null)
    .invoke(null, null);
  if (ctx) {
    return ctx;
  }

  return java.lang.Class.forName('android.app.ActivityThread')
    .getMethod('currentApplication', null)
    .invoke(null, null);
};
