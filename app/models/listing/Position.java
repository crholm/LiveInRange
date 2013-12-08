package models.listing;

import models.helpers.JsonModel;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 7:54 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Position extends JsonModel implements Comparable<Position> {

    public static Finder<Long, Position> find = new Finder<>(Long.class, Position.class);

    @Id
    public long id;

    private double latitude;
    private double longitude;
    private int transitTimeToCenter;

    public int getTransitTimeToCenter() {
        return transitTimeToCenter;
    }

    public void setTransitTimeToCenter(int transitTimeToCenter) {
        this.transitTimeToCenter = transitTimeToCenter;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }


    @Override
    public int compareTo(Position position) {
        return (int)(id-position.getId());
    }
}
