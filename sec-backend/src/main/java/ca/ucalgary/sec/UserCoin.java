package ca.ucalgary.sec;

import java.util.*;

public class UserCoin extends Coin{
    public ArrayList<CoinInstance> totalCoins;
    private double profitLoss;

    //constructors
    public UserCoin(String id) {
        super(id);
        totalCoins = new ArrayList<>();
        profitLoss = 0;
    }
    
    //setters and getters
    public ArrayList<CoinInstance> getTotalCoins() {
        return this.totalCoins;
    }

    public void setTotalCoins(ArrayList<CoinInstance> totalCoins) {
        this.totalCoins = totalCoins;
    }

    public double getProfitLoss() {
        return this.profitLoss;
    }

    public void setProfitLoss(double profitLoss) {
        this.profitLoss = profitLoss;
    }

    //
    
    public void addCoin(CoinInstance coinInstance){
        totalCoins.add(coinInstance);
    }

}
