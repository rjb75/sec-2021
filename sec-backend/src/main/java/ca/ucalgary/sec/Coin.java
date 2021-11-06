package ca.ucalgary.sec;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.GetRequest;
import com.mashape.unirest.request.HttpRequest;
import java.io.Serializable;
import java.security.PrivilegedExceptionAction;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Coin {
    
    String id;


    public Coin(String id){
        this.id = id;
    }

    public static double getPriceFromName(String cryptoName){
        String URL = "https://api.coingecko.com/api/v3/coins/" + cryptoName;
        double price = 0.0;
        try {
            HttpRequest request = Unirest.get(URL);
            HttpResponse<com.mashape.unirest.http.JsonNode> jsonResponse = request.asJson();
            Gson gson = new Gson();
            String responseJSONString = jsonResponse.getBody().toString();
            CoinParse myObject = gson.fromJson(responseJSONString, CoinParse.class);
            price = Double.parseDouble(myObject.mp.cp.CAD);
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        System.out.println(price);
        return price;
    }

    class CoinParse{
        @SerializedName("id")
        @Expose
        public String id;

        @SerializedName("market_data")
        @Expose
        public MarketPrice mp;

        public class MarketPrice {

            @SerializedName("current_price")
            @Expose
            public CurrentPrice cp;

            public class CurrentPrice {
                @SerializedName("cad")
                @Expose
                public String CAD;
            }
        }
    }
    
}

