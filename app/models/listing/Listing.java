package models.listing;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import models.helpers.JsonModel;
import play.db.ebean.Model;

import javax.persistence.*;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 7:01 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Listing extends JsonModel {

    public static Finder<Long, Listing> find = new Finder<>(Long.class, Listing.class);

    @Id
    private long booliId;

    private long listPrice;

    private Date published;

    private String objectType;

    private double rooms;

    private double livingArea;

    private double additionalArea;

    private double plotArea;

    private int constructionYear;

    private double floor;

    private double rent;

    @Lob
    private String url;

    @OneToOne
    private Location location;

    @ManyToOne(cascade = CascadeType.ALL)
    private Source source;


    @Override
    public void save() {
        location.save();
        if(Source.find.byId(source.getName()) == null){
            source.save();
        }else{
            source.update();
        }
        super.save();
    }

    public long getBooliId() {
        return booliId;
    }

    public void setBooliId(long booliId) {
        this.booliId = booliId;
    }

    public long getListPrice() {
        return listPrice;
    }

    public void setListPrice(long listPrice) {
        this.listPrice = listPrice;
    }

    public String getPublished() {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        return format.format(published);
    }

    public void setPublished(String published) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        java.util.Date parsed = null;
        try {
            parsed = format.parse(published);
        } catch (ParseException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        Date date = new java.sql.Date(parsed.getTime());
        this.published = date;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public double getRooms() {
        return rooms;
    }

    public void setRooms(double rooms) {
        this.rooms = rooms;
    }

    public double getLivingArea() {
        return livingArea;
    }

    public void setLivingArea(double livingArea) {
        this.livingArea = livingArea;
    }

    public double getAdditionalArea() {
        return additionalArea;
    }

    public void setAdditionalArea(double additionalArea) {
        this.additionalArea = additionalArea;
    }

    public double getPlotArea() {
        return plotArea;
    }

    public void setPlotArea(double plotArea) {
        this.plotArea = plotArea;
    }

    public int getConstructionYear() {
        return constructionYear;
    }

    public void setConstructionYear(int constructionYear) {
        this.constructionYear = constructionYear;
    }

    public double getFloor() {
        return floor;
    }

    public void setFloor(double floor) {
        this.floor = floor;
    }

    public double getRent() {
        return rent;
    }

    public void setRent(double rent) {
        this.rent = rent;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Source getSource() {
        return source;
    }

    public void setSource(Source source) {
        this.source = source;
    }


    @JsonAnySetter
    public void setJsonOverflow(String name, Object value){

    }

}
