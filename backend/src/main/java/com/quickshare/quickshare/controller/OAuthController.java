package com.quickshare.quickshare.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

    @Value("${google.oauth.client-id}")
    private String clientId;

    @Value("${google.oauth.client-secret}")
    private String clientSecret;

    @Value("${google.oauth.redirect-uri}")
    private String redirectUri;

    @GetMapping("/callback")
    public String callback(@RequestParam("code") String code) throws Exception {

        GoogleTokenResponse tokenResponse =
                new GoogleAuthorizationCodeTokenRequest(
                        new NetHttpTransport(),
                        GsonFactory.getDefaultInstance(),
                        "https://oauth2.googleapis.com/token",
                        clientId,
                        clientSecret,
                        code,
                        redirectUri
                ).execute();

        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();

        // TEMP: print once, later store securely
        System.out.println("ACCESS TOKEN  = " + accessToken);
        System.out.println("REFRESH TOKEN = " + refreshToken);

        return "OAuth success. You can close this tab.";
    }
}

