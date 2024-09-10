package com.appbarbearia

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SplashScreenModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "SplashScreen"
    }

    @ReactMethod
    fun hide() {
        SplashActivity.closeSplashActivity()
    }
}
