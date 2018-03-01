package com.tremoryapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.vydia.RNUploader.UploaderReactPackage;
//import com.robinpowered.react.battery.DeviceBatteryPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import io.codebakery.imagerotate.ImageRotatePackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;//START



import com.facebook.react.ReactNativeHost;//END
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
			new MainReactPackage(),
            new KCKeepAwakePackage(),
            new RNFetchBlobPackage(),
            new UploaderReactPackage(),
            //new DeviceBatteryPackage(),
            new CookieManagerPackage(),
            new ImageRotatePackage(),
			      new VectorIconsPackage(),
            new PhotoViewPackage(),
            new MapsPackage(),
            new ImagePickerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
