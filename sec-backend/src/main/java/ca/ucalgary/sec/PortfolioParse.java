package ca.ucalgary.sec;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

class PortfolioParse{
    @SerializedName("action")
    @Expose
    public String action;

    @SerializedName("payload")
    @Expose
    public Payload p;

    public class Payload {

        @SerializedName("title")
        @Expose
        public String title;

        @SerializedName("id")
        @Expose
        public String id;

        @SerializedName("watchList")
        @Expose
        public String[] watchList;

    }
}