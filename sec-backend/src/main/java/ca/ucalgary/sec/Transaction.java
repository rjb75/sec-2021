package ca.ucalgary.sec;

public class Transaction {
    private String coinId;
    private int quantityPurchased;
    private String timeOfPurchase;

    public String getCoinId() {
        return this.coinId;
    }

    public void setCoinId(String coinId) {
        this.coinId = coinId;
    }

    public int getQuantityPurchased() {
        return this.quantityPurchased;
    }

    public void setQuantityPurchased(int quantityPurchased) {
        this.quantityPurchased = quantityPurchased;
    }

    public String getTimeOfPurchase() {
        return this.timeOfPurchase;
    }

    public void setTimeOfPurchase(String timeOfPurchase) {
        this.timeOfPurchase = timeOfPurchase;
    }

    public Transaction(String id, int quantity, String time) {
        this.coinId = id;
        this.quantityPurchased = quantity;
        this.timeOfPurchase = time;
    }

}
