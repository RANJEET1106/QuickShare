package com.quickshare.quickshare.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.UserCredentials;


@Configuration
@PropertySource("classpath:application.properties")
public class DriveConfig {

    @Value("${google.oauth.client-id}")
    private String clientId;

    @Value("${google.oauth.client-secret}")
    private String clientSecret;

    @Value("${google.oauth.refresh-token}")
    private String refreshToken;

    @Bean
    public Drive drive() throws Exception {

        GoogleCredentials credentials =
            UserCredentials.newBuilder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .setRefreshToken(refreshToken)
            .build();

        credentials.refreshIfExpired();

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials)
        ).setApplicationName("QuickShare")
         .build();
    }
    
}
