package ca.ucalgary.sec;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main(String[] args) {
        System.out.println("Hello World!");
        int port;
        try {
            port = Integer.parseInt(System.getenv("PORT"));
        } catch (NumberFormatException nfe) {
            port = 3002;
        }
        System.out.println(port);
        WSocket wsocket = new WSocket(port);
        wsocket.start();
        System.out.println("Got here");
        wsocket.broadcastMessage("This is officially working :");
    }
}
