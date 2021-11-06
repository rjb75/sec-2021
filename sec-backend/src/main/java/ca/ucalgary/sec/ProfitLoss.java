package ca.ucalgary.sec;

public class ProfitLoss {
    public static double calculateProfitLoss(UserCoin userCoin, double target){
        
        double profloss = 0;
        for(CoinInstance instance : userCoin.getTotalCoins()){
            profloss += instance.getPrice() - target;
        }

        return profloss;
    }
}
