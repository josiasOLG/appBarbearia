package com.appbarbearia

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.ReactInstanceManager.ReactInstanceEventListener

class SplashActivity : AppCompatActivity() {
    private val TIMEOUT: Long = 10000 // 10 segundos
    private var handler: Handler? = null
    private var runnable: Runnable? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splash_screen)

        // Obter o ReactInstanceManager para verificar o estado do React Native
        val reactInstanceManager = (application as ReactApplication).reactNativeHost.reactInstanceManager

        handler = Handler(Looper.getMainLooper())

        runnable = Runnable {
            // Timeout alcançado, iniciar a MainActivity
            startMainActivity()
        }
        handler?.postDelayed(runnable!!, TIMEOUT)

        // Adicionar um ouvinte para saber quando o React Native está pronto
        reactInstanceManager.addReactInstanceEventListener(object : ReactInstanceEventListener {
            override fun onReactContextInitialized(context: ReactContext) {
                // Remover o listener para evitar chamadas repetidas
                reactInstanceManager.removeReactInstanceEventListener(this)
                // Iniciar a MainActivity
                startMainActivity()
            }
        })

        // Iniciar React Native, se necessário
        if (!reactInstanceManager.hasStartedCreatingInitialContext()) {
            reactInstanceManager.createReactContextInBackground()
        }
    }

    private fun startMainActivity() {
        // Verificar se o Runnable ainda está agendado e removê-lo
        handler?.removeCallbacks(runnable!!)
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    override fun onDestroy() {
        handler?.removeCallbacks(runnable!!)
        super.onDestroy()
    }

    companion object {
        fun closeSplashActivity() {
            SplashActivity().startMainActivity()
        }
    }
}
