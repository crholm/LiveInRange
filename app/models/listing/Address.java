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
public class Address extends JsonModel {

    public static Finder<Long, Address> find = new Finder<>(Long.class, Address.class);

    @Id
    private long id;

    private String city;
    private String streetAddress;



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

}
