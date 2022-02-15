package com.transitticketapp;

import android.os.Build;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import org.bouncycastle.crypto.CryptoException;
import org.bouncycastle.crypto.Signer;
import org.bouncycastle.crypto.params.Ed25519PrivateKeyParameters;
import org.bouncycastle.crypto.params.Ed25519PublicKeyParameters;
import org.bouncycastle.crypto.signers.Ed25519Signer;
import org.bouncycastle.jcajce.provider.digest.Blake2b;

public class CrypticModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    CrypticModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public String sign(
            String b64PrivateKey,
            String requestBody
    ) throws CryptoException {
        Signer signer = getEd25519SignerForSigning(b64PrivateKey);
        String formattedRequest = formatBodyForSigning(requestBody);
        signer.update(formattedRequest.getBytes(StandardCharsets.UTF_8), 0, formattedRequest.length());
        return Base64.getEncoder().encodeToString(signer.generateSignature());
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public static void verify(
            String b64PublicKey,
            String requestBody,
            String signature,
            Promise promise
    ){
        try{
            Signer signer = getEd25519SignerForVerification(b64PublicKey);
            String formattedRequest = formatBodyForSigning(requestBody);
            signer.update(formattedRequest.getBytes(StandardCharsets.UTF_8), 0, formattedRequest.length());
            Boolean dataResult = signer.verifySignature(Base64.getDecoder().decode(signature));
            String result = "false";
            if(dataResult) result = "true";
            promise.resolve(dataResult);
        }catch (Exception e){
            promise.reject("Error", e);
        }

//         return signer.verifySignature(Base64.getDecoder().decode(signature));
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    private static Signer  getEd25519SignerForVerification(String b64PublicKey){
        byte[] publicKey = Base64.getDecoder().decode(b64PublicKey);
        Ed25519PublicKeyParameters cipherParams = new Ed25519PublicKeyParameters(publicKey, 0);
        Signer sv = new Ed25519Signer();
        sv.init(false, cipherParams);
        return sv;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    private Signer getEd25519SignerForSigning(String b64PrivateKey){
        byte[] privateKey = Base64.getDecoder().decode(b64PrivateKey);
        Ed25519PrivateKeyParameters cipherParams = new Ed25519PrivateKeyParameters(privateKey, 0);
        Signer sv = new Ed25519Signer();
        sv.init(true, cipherParams);
        return sv;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    private static String formatBodyForSigning(
            String requestBody
    ){return  "digest: BLAKE-512="+ blakeHash(requestBody);};


    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    private static String blakeHash(String requestBody){
        MessageDigest digest = new Blake2b.Blake2b512();
        digest.reset();
        digest.update(requestBody.getBytes(StandardCharsets.UTF_8));
        byte[] hash = digest.digest();
        //val hex: String = Hex.toHexString(hash)
        return Base64.getEncoder().encodeToString(hash);
    }

    @NonNull
    @Override
    public String getName() {
        return "CrypticModule";
    }
}
