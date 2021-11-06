package ca.ucalgary.sec;

import java.util.*;

public class Portfolio {
    private int id;
    private HashMap<String, UserCoin> purchasedCoinsList;
    private ArrayList<Transaction> transactionList;
    private ArrayList<UserCoin> watchList;

    public Portfolio(){

    }

    public int purchaseCoin(String name){
        return 1;
    }
    
    public HashMap<String, UserCoin> getPurchasedCoinsList() {
        return purchasedCoinsList;
    }

    public void setPurchasedCoinsList(HashMap<String, UserCoin> purchasedCoinsList) {
        this.purchasedCoinsList = purchasedCoinsList;
    }

    public ArrayList<Transaction> getTransactionList() {
        return transactionList;
    }

    public void setTransactionList(ArrayList<Transaction> transactionList) {
        this.transactionList = transactionList;
    }

    public void calcProfitLossInstantaneous(){
        Map<String, Double> profitlosses = new HashMap<>();
        for(Map.Entry<String, UserCoin> entry : purchasedCoinsList.entrySet()){
            double currentPrice = Coin.getPriceFromName(entry.getKey());
            profitlosses.put( entry.getKey() , ProfitLoss.calculateProfitLoss(entry.getValue(), currentPrice));
        }

        //TODO: SEND BACK
    }
}
