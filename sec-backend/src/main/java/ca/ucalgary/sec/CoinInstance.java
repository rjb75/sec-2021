package ca.ucalgary.sec;

public class CoinInstance {
    private int quantity;
    private double price;
    private String timeOfPurchase;

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getTimeOfPurchase() {
        return this.timeOfPurchase;
    }

    public void setTimeOfPurchase(String timeOfPurchase) {
        this.timeOfPurchase = timeOfPurchase;
    }

    public CoinInstance(int quantity, double price, String timeOfPurchase){
        this.quantity = quantity;
        this.price = price;
        this.timeOfPurchase = timeOfPurchase;
    }
}
