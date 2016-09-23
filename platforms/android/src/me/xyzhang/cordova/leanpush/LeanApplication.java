package me.xyzhang.cordova.leanpush;

import android.app.Application;
import android.content.Context;

import com.avos.avoscloud.PushService;
import com.avos.avoscloud.AVInstallation;
import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.AVAnalytics;

import com.ionicframework.starter.MainActivity;

public class LeanApplication extends Application
{
    private static LeanApplication instance = new LeanApplication();

    public LeanApplication() {
        instance = this;
    }

    public static Context getContext() {
        return instance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // register device for leancloud
        AVOSCloud.initialize(this, "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz", "Ronj9oBORrmjCDx2HdlhCwr3");
        AVInstallation.getCurrentInstallation().saveInBackground();
        PushService.setDefaultPushCallback(this, MainActivity.class);
        AVAnalytics.enableCrashReport(this.getApplicationContext(), true);
        AVOSCloud.setLastModifyEnabled(true);
        AVOSCloud.setDebugLogEnabled(true);
    }
}
