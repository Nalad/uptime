package com.notenoughviolence.pompom;

import com.notenoughviolence.pompom.domain.Availability;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Utilities {

    private Utilities() {
    }

    public static Availability pingURL(String url, int timeout) {
        url = url.replaceFirst("^https", "http"); // Otherwise an exception may be thrown on invalid SSL certificates.

        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setConnectTimeout(timeout);
            connection.setReadTimeout(timeout);
            connection.setRequestMethod("HEAD");
            int responseCode = connection.getResponseCode();
            if (200 <= responseCode && responseCode <= 399) return Availability.UP;
        } catch (IOException exception) {
            return Availability.DOWN;
        }

        return Availability.DOWN;
    }
}
