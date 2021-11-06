package ca.ucalgary.sec;

import java.util.*;

public class Portfolio {
    private int id;
    private String name;
    private HashMap<String, UserCoin> purchasedCoinsList;
    private ArrayList<Transaction> transactionList;
    private List<String> watchList;
    static int totalPortfolios = 0;

    public Portfolio(){

    }

    public Portfolio(String title, String[] watchList){
        System.out.println("came here");
        this.watchList = new ArrayList<>(Arrays.asList(watchList));
        this.name = name;
        this.id = totalPortfolios++;
        this.purchasedCoinsList = new HashMap<>();
        this.transactionList = new ArrayList<>();
    }

    public CoinInstance purchaseCoin(String name, int quantity){ // 
        System.out.println("entered purchase function");
        long unixTime = System.currentTimeMillis() / 1000L;
        
        CoinInstance purchase = new CoinInstance(quantity, Coin.getPriceFromName(name), String.valueOf(unixTime));
        
        if(!purchasedCoinsList.containsKey(name))
        {
            purchasedCoinsList.put(name , new UserCoin(name));
            
        }

        purchasedCoinsList.get(name).addCoin(purchase);
        
        return purchase;
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
