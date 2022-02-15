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
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.EncodedKeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class SignatureModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;
  SignatureModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @ReactMethod
  public static String sign(String requestBody) throws Exception {
    PrivateKey privKey = readPrivateKey();
    Signature sign = Signature.getInstance("SHA256withRSA");
    sign.initSign(privKey);
    sign.update(requestBody.getBytes(StandardCharsets.UTF_8));
    byte[] s = sign.sign();
    return Base64.getEncoder().encodeToString(s);
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @ReactMethod
  public static void verified(String requestBody, String signature, Promise promise) {
    try{
      PublicKey pubKey = readPublicKey();
      Signature sign2 = Signature.getInstance("SHA256withRSA");
      sign2.initVerify(pubKey);
      sign2.update(requestBody.getBytes(StandardCharsets.UTF_8));
      Boolean dataResult = sign2.verify(Base64.getDecoder().decode(signature));
      String result = "false";
      if(dataResult) result = "true";
      Toast.makeText(reactContext, result, Toast.LENGTH_LONG).show();
      promise.resolve(dataResult);
    } catch (Exception e){
      promise.reject("Error", e);
    }
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @ReactMethod
  public static RSAPrivateKey readPrivateKey() throws Exception {
    String key = "-----BEGIN PRIVATE KEY-----\n" +
            "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4XwMrwtDeSPgv\n" +
            "60gFv0w+z4c36Cke1yX7IulRJ+NUJF3xkiJd1o4mmpFpNgVextvV70B5qfoGf3N9\n" +
            "hf2x60JMX+Ni2o5/94XjY8SFR/X56iQsAoa5o4AMy8NVUVSA/VkrzSPEWCR/c04C\n" +
            "JDs0TA74q2cA6XfEE3xuBDLA791+OpLldUNh3QC3BbJnnzapuO+Pmx43nFKGAg8O\n" +
            "+V1/sMpjVYpox5E4Oiiw7sjxA0+y3o5So6TwjDkBe4VErud7cpBFeAAM+KuWppeK\n" +
            "IPnUxplW+h00F5jKDlIqI2Douqrx2Iyphc3RnqNLEgAIccsAnn3tI0wkuJzio1cn\n" +
            "vogxqnGbAgMBAAECggEBAKX3iZA0H/dpclkYkE30JXuJLyzJhXKotBz9EVCn+oC8\n" +
            "+ABEz0DvqijgDTPLmEv38N8FL2IV++crhdgh7PzjTVwZGUTcf1h8hf7qyXY9EBT3\n" +
            "i7Y+U+76WoOqTV0ZCFvRNBs04BSYT8qXDkrpOI5cRUHecaulftV3wRP8HYAGrLk6\n" +
            "EiS8GmedE8iFxJmhF/WUJUXGmqarhMj6XZx5eH583YdV1co0SRP7ddLSzyGxwQqP\n" +
            "qtv/u2P/9oHAZBgrHnZGrd1Z9aFEYVWBgqGrCrGCnYWcUU7C8pViepdRK4JUDV0c\n" +
            "hbQJNx2+byMImIAPh5U0KoU9J3U9ZyopN928L0uUhUECgYEA7v2KY2jswhin/KcU\n" +
            "RXXaQrCqp0JCYcxPgwTz2udWZ2SiocLRO8opLNBQZ0+7+sswCEMlA22bcrRMi3GV\n" +
            "+C1xL1l3xVZ2y7D2/DjJRZHKuYQdB3QPsCvg6BKiiniu4zZalTFauGVoLt0215z6\n" +
            "Me8peb6gqlWebQqXDyt2HGccx3sCgYEAxX5L7rtVvqB6F9dnXZr465nRfi2KdOZc\n" +
            "modoHiBWjPbY7xitT1T9wc+zfhS4CNAozOf9sJMU1RmUk/62Fx7xy54hy1et8Ccl\n" +
            "T53zbuYp8NMEJNDll3HNjLHWcNaaqLSQByHNc+36hkiVDIy026txw1Upi+gVpE9G\n" +
            "OXQEtJJj1GECgYEAoKrtDXXtrXNcBBvjIetgJ3OT1sxRymPLlJ6QvjrGOM5ME4ng\n" +
            "llyLn+gQFdRh4PIWwYc6a/qVBeE2kIx1MRqDvDxeq9k8FiZLdTdMAKxJ6Lxrs6YQ\n" +
            "IfTtx7c3dPY7RN82uJQslEkAaHkptHyBK27IqGNCqiDTWCVFdtpWFjQwAd8CgYAT\n" +
            "CHTw8QT2dijOG2hO0RykOBLEgkcRtRG/osUaAivVMgT+Jfat6pb6ErZNtFl4H/eO\n" +
            "p9z/I22ii/CRwr5xw/2xje/b1PtiZaNm5OYNDgmEuBFyKt+1lLYmlQ0Bmu0UzTIE\n" +
            "PfG69nhqcJxMtVLIyOER3ic+4IMVbr5p0xCRBnqwgQKBgHzkrou9vSztH8mPueR3\n" +
            "afYLjaKfW1waQE22Z+Zt7BDlWLkUu2yyVdSWwTma1SoTxxgolQnpCVmzbRYqNSwc\n" +
            "pYY6yWNbwN7wn14/YUsJN6Mg4QfCjf2VzFAb0wy+/5RN3DeIB+2f/VKh/LoUBstv\n" +
            "BE1+bjXnf+L8c789aehPqAvy\n" +
            "-----END PRIVATE KEY-----";

    String privateKeyPem = key
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replaceAll(System.lineSeparator(), "")
            .replace("\n", "")
            .replace("-----END PRIVATE KEY-----", "");
    byte[] encoded = Base64.getDecoder().decode(privateKeyPem);
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
    return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @ReactMethod
  public static RSAPublicKey readPublicKey() throws Exception {
    String key = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuF8DK8LQ3kj4L+tIBb9M\n" +
            "Ps+HN+gpHtcl+yLpUSfjVCRd8ZIiXdaOJpqRaTYFXsbb1e9Aean6Bn9zfYX9setC\n" +
            "TF/jYtqOf/eF42PEhUf1+eokLAKGuaOADMvDVVFUgP1ZK80jxFgkf3NOAiQ7NEwO\n" +
            "+KtnAOl3xBN8bgQywO/dfjqS5XVDYd0AtwWyZ582qbjvj5seN5xShgIPDvldf7DK\n" +
            "Y1WKaMeRODoosO7I8QNPst6OUqOk8Iw5AXuFRK7ne3KQRXgADPirlqaXiiD51MaZ\n" +
            "VvodNBeYyg5SKiNg6Lqq8diMqYXN0Z6jSxIACHHLAJ597SNMJLic4qNXJ76IMapx\n" +
            "mwIDAQAB\n" +
            "-----END PUBLIC KEY-----";

    String publicKeyPem = key
            .replace("-----BEGIN PUBLIC KEY-----", "")
            .replaceAll(System.lineSeparator(), "")
            .replace("\n", "")
            .replace("-----END PUBLIC KEY-----", "");
    byte[] encoded = Base64.getDecoder().decode(publicKeyPem);
    KeyFactory keyFactory = KeyFactory.getInstance("RSA");
    EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(encoded);
    return (RSAPublicKey) keyFactory.generatePublic(publicKeySpec);
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @ReactMethod
  public static void show() throws Exception{
    String dataSign = SignatureModule.sign("hello1");
//    Boolean reslt = SignatureModule.verified("hello1", dataSign);
//    String result = "false";
//    if(reslt) result = "true";
    Toast.makeText(reactContext, dataSign, Toast.LENGTH_LONG).show();
//    Toast.makeText(reactContext, result, Toast.LENGTH_LONG).show();
  }

  @NonNull
  @Override
  public String getName() {
    return "SignatureModule";
  }
}