package ca.ucalgary.sec;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.*;

public class WSocket extends WebSocketServer {

    private final static Logger logger = LogManager.getLogger(WSocket.class);
    ArrayList<Portfolio> portfolios;

    private Set<WebSocket> conns;

    public WSocket(int port) {
        super(new InetSocketAddress(port));
        conns = new HashSet<>();
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake clientHandshake) {
        conns.add(webSocket);

        logger.info("Connection established from: " + webSocket.getRemoteSocketAddress().getHostString());
        System.out.println("New connection from " + webSocket.getRemoteSocketAddress().getAddress().getHostAddress());

    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        conns.remove(conn);
        logger.info("Connection closed to: " + conn.getRemoteSocketAddress().getHostString());
        System.out.println("Closed connection to " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            PortfolioParse msg = mapper.readValue(message, PortfolioParse.class);
            menu(msg, msg.action, conn);
            System.out.println(msg.action);
            System.out.println(msg.payload.title);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    private void menu(PortfolioParse msg, String action, WebSocket conn){
        if(action == "create-portfolio"){
            portfolios.add(new Portfolio(msg.payload.title, msg.payload.watchList));


            ObjectMapper mapper = new ObjectMapper();
            msg.action = "portfolio-created";
           
            try{
                String messageJson = mapper.writeValueAsString(msg);
                conn.send(messageJson);
            } catch(Exception e){

            }
        } else if(action == "purchase-coin"){
            portfolios.get(Integer.parseInt(msg.payload.id)).purchaseCoin(msg.payload.id, Integer.parseInt(msg.payload.amount));
         
        }
    }

    private void sendMessage(Portfolio msg){
        
    }
    @Override
    public void onError(WebSocket conn, Exception ex) {

        if (conn != null) {
            conns.remove(conn);
        }
        assert conn != null;
        System.out.println("ERROR from " + conn.getRemoteSocketAddress().getAddress().getHostAddress());
    }

    public void broadcastMessage(String msg) {
        //ObjectMapper mapper = new ObjectMapper();
        try {
            //String messageJson = mapper.writeValueAsString(msg);
            for (WebSocket sock : conns) {
                sock.send(msg);
            } 
        }catch (Exception e){
                System.out.println("Error broadcasting Message");
            }
    }

    @Override
    public void onStart() {
        System.out.println("WebSocket Running On Port");
        setConnectionLostTimeout(100);
    }

}