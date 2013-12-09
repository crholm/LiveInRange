package utils;

import com.fasterxml.jackson.databind.JsonNode;
import models.listing.Address;
import models.listing.Listing;
import models.listing.Position;
import play.Logger;
import play.libs.Json;

import javax.persistence.PersistenceException;
import java.io.IOException;
import java.io.InputStream;
import java.net.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentSkipListSet;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 5:36 PM
 * To change this template use File | Settings | File Templates.
 */
public class BooliDownloader implements Runnable{

        // NO 59.418186,18.309299
        // SW  59.262020,17.800495

    static int tmp;
    public static int threadsWorking = 0;

    @Override
    public void run() {
        while(true){

            downloadBooliData();

            downloadGoogleTimeData();

            try {
                Thread.sleep(1000*60*60*24);
            } catch (InterruptedException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }
    }


    public static String proxys[] = {
            "78.130.201.110:8080",
            "109.207.61.175:8090",
            "85.214.200.215:80",
            "80.112.143.42:80",
            "95.211.129.17:3128",
            "94.228.201.113:8080",
            "46.29.78.20:3128",
            "176.31.172.120:54321",
            "62.253.249.150:8080",
            "80.241.82.10:3128",
            "176.31.172.120:54321",
            "109.207.61.194:8090",
            "109.207.61.165:8090",
            "95.154.199.100:443",
            "78.25.32.130:8086",
            "109.196.127.35:8888",
            "77.175.4.248:80",
            "89.32.230.98:8080",
            "84.22.2.101:8080",
            "193.254.236.189:3128",
            "193.43.93.170:9999",
            "168.63.24.174:8118",
            "194.141.102.126:8080",
            "109.207.61.173:8090",
            "77.175.36.38:80",
            "80.193.214.233:3128",
            "197.160.56.108:80",
            "91.232.102.134:8080",
            "85.33.52.218:8080",
            "79.142.126.3:8080",
            "95.211.129.17:3128",
            "194.141.96.21:8080",
            "94.154.31.24:8090",
            "78.130.136.215:8080",
            "109.207.61.149:8090",
            "94.154.27.13:8090",
            "109.207.61.152:8090",
            "212.3.190.77:8080",
            "94.154.31.38:8090"
    };

    public void downloadGoogleTimeData(){

        final long departure_time = 1386579600;
        final double sthlmCentrumLat = 59.3309466;
        final double sthlmCentrumLng = 18.0592629;

        String apiKey = "AIzaSyCzZxV7nuN-aJDJj7TSFm3y0qYoSQ59Hd4";
        List<Position> positions = Position.find.all();

        Logger.debug("Starting querying");
        long time = System.currentTimeMillis();
        int failed = 0;
//
//
//        final ConcurrentSkipListSet<Position> set = new ConcurrentSkipListSet<>();
//        set.addAll(positions);
//
//        for(int i = 0; i < proxys.length; i++){
//            tmp=i;
//            new Thread(new Runnable() {
//                int num = tmp;
//
//                @Override
//                public void run() {
//                    threadsWorking++;
//                    Logger.info("Thread " + num + " is staring");
//                    int failed = 0;
//
//                    String proxyAddress = proxys[num].split(":")[0];
//                    int port = Integer.parseInt(proxys[num].split(":")[1]);
//
//                    while(!set.isEmpty()){
//
//                        Position position = set.pollFirst();
//
//                        if(position.getTransitTimeToCenter() != 0){
//                            continue;
//                        }
//
//
//                        if(failed == 3){
//                            set.add(position);
//                            threadsWorking--;
//                            Logger.error("Thread " + num + " is Exiting <-------------------------------------");
//                            break;
//                        }
//
//                        String path = "http://maps.googleapis.com/maps/api/directions/json?" +
//                                "origin=" + position.getLatitude() + "," + position.getLongitude() + "&" +
//                                "destination=" + sthlmCentrumLat + "," + sthlmCentrumLng + "&" +
//                                "sensor=false" +
//                                "&departure_time=" + departure_time + "&" +
//                                "mode=transit";
//
//                        URL url = null;
//                        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(proxyAddress, port));
//                        try {
//
//                            url = new URL(path);
//
//
//                            URLConnection con = url.openConnection(proxy);
//                            InputStream in = con.getInputStream();
//
//                            JsonNode node = Json.parse(in);
//
//                            try{
//                                JsonNode duration = node.findPath("routes").get(0).findValue("legs").get(0).findValue("duration").findValue("value");
//                                position.setTransitTimeToCenter(duration.asInt());
//                                position.update();
//                                failed = 0;
//                                Logger.debug("Thread " + num + " wrote to db");
//
//                            }catch (NullPointerException e){
//                                Logger.warn("Thread: " + num + " could not parse response");//from: " + path);
//
//                                failed++;
//
//                                set.add(position);
//
//                            }
//
//                            in.close();
//
//
//
//
//                        } catch (MalformedURLException e) {
//                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//                            set.add(position);
//                            failed++;
//                        } catch (IOException e) {
//                            Logger.error("Thread " + num + " could not open connection");
//                            set.add(position);
//                            failed++;
//                        }
//
//
//                        try {
//                            Thread.sleep(2500);
//                        } catch (InterruptedException e) {
//                            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
//                        }
//
//
//
//                    }
//
//
//
//                }
//
//            }).start();
//
//
//        }


        while(!positions.isEmpty()){

            Position position = positions.remove(0);

            if(position.getTransitTimeToCenter() != 0){
                continue;
            }
            if(failed == 20){
                break;
            }


            String path = "https://maps.googleapis.com/maps/api/directions/json?" +
                    //"key=" + apiKey  + "&" +
                    "origin=" + position.getLatitude() + "," + position.getLongitude() + "&" +
                    "destination=" + sthlmCentrumLat + "," + sthlmCentrumLng + "&" +
                    "sensor=false" +
                    "&departure_time=" + departure_time + "&" +
                    "mode=transit";


            Logger.debug("Creating URL: " + path);
            URL url = null;
            try {

//            Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("my.proxy.example.com", 3128));
//            URLConnection yc = url.openConnection(proxy);

                url = new URL(path);

         //       Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("195.138.65.222", 3128));
         //       URLConnection con = url.openConnection(proxy);
         //       InputStream in = con.getInputStream(); //url.openStream();
                InputStream in = url.openStream();

                JsonNode node = Json.parse(in);

                try{
                    JsonNode duration = node.findPath("routes").get(0).findValue("legs").get(0).findValue("duration").findValue("value");

                    Logger.debug("Is Missing: " + duration.isMissingNode());
                    Logger.debug("Duration: " + duration.asInt());
                    position.setTransitTimeToCenter(duration.asInt());
                    position.update();
                    failed = 0;

                }catch (NullPointerException e){
                    Logger.warn("Could not parse response from: " + path);
                    Logger.warn(node.toString());
                    failed++;
                    positions.add(position);

                }

                in.close();


                Thread.sleep(2500);

            } catch (MalformedURLException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                positions.add(position);
            } catch (IOException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                positions.add(position);
            } catch (InterruptedException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                positions.add(position);
            }


        }

        Logger.debug("Done querying: " + (double)(System.currentTimeMillis()-time)/(double)1000 + "s");

    }



    public void downloadBooliData(){

        HashSet<Long> booliIds = new HashSet<>();
        try {
            String path = new BooliRequest(0, 500).toString();
            Logger.debug("Creating URL: " + path);

            URL url = new URL(path);

            InputStream in = url.openStream();


            JsonNode node = Json.parse(in);

            int lenght = node.findValue("totalCount").asInt();
            int consumed = 0;

            while(consumed < lenght){

                if(consumed != 0){
                    path = new BooliRequest(consumed, 500).toString();
                    Logger.debug("Creating URL: " + path);
                    url = new URL(path);
                    in = url.openStream();

                    node = Json.parse(in);
                }

                //int offset = node.findValue("offset").asInt();
                int count =  node.findValue("count").asInt();


                Logger.debug("Total count: " + node.findValue("totalCount").asInt());

                JsonNode listings = node.findValue("listings");
                Logger.debug("lisings size: " + listings.size());

                for(JsonNode json : listings){


                    Listing listing = Json.fromJson(json, Listing.class);

                    booliIds.add(listing.getBooliId());


                    if(Listing.find.byId(listing.getBooliId()) == null){
                        listing.save();
                        Logger.debug("Saved booliId: " + listing.getBooliId());
                    }else{
                        Logger.debug("Listing booliId: " + listing.getBooliId() + " already existed");
                    }

                }

                consumed += count;
                in.close();

            }


            List<Listing> listings = Listing.find.all();

            int i = 0;
            for(Listing listing : listings){
                if(!booliIds.contains(listing.getBooliId())){
                    Logger.debug("removing " + listing.getBooliId());
                    Address a = listing.getLocation().getAddress();
                    listing.delete();
                    //a.delete();
                    i++;
                }
            }
            Logger.debug("----------> Listings to be removed " + i);




        } catch (MalformedURLException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }





    private class BooliRequest {
        private String url = "http://api.booli.se/listings?";
        private String callerId = "KrPerMinut";
        private String privateKey = "em4j37Je45NeibkvsBLh4nZGE9f9q53k1Opt3oxx";
        private String bbox = "59.262020,17.800495,59.418186,18.309299";
        private String query;
        private String unique;
        private long time;
        private int limit;
        private int offset;
        private String hash;


        public BooliRequest(String query, int offset, int limit){
            this.offset = offset;
            this.limit = limit;
            this.query = query;
            this.unique =  UUID.randomUUID().toString().substring(0, 16);
            this.time = System.currentTimeMillis();

            try {
                MessageDigest md = MessageDigest.getInstance("SHA-1");
                hash = byteArray2Hex(md.digest((callerId + time + privateKey + unique).getBytes()));

            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }

        public BooliRequest(){
            this("", 0, 100);
        }

        public BooliRequest(String query){
            this(query, 0, 100);
        }

        public BooliRequest(int offset, int limit){
            this("", offset, limit);
        }

        private String byteArray2Hex(final byte[] hash) {
            Formatter formatter = new Formatter();
            for (byte b : hash) {
                formatter.format("%02x", b);
            }
            return formatter.toString();
        }




        @Override
        public String toString(){

            String r = url +
                    "bbox=" + bbox + "&" +
                    "q=" + query + "&" +
                    "limit=" + limit + "&" +
                    "offset=" + offset + "&" +
                    "callerId=" + callerId + "&" +
                    "time=" + time + "&" +
                    "unique=" + unique + "&" +
                    "hash=" + hash;

            return r;


        }


    }

}
