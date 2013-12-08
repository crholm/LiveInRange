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


    long getId() {
        return id;
    }

    void setId(long id) {
        this.id = id;
    }

    String getCity() {
        return city;
    }

    void setCity(String city) {
        this.city = city;
    }

    String getStreetAddress() {
        return streetAddress;
    }

    void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }
}
