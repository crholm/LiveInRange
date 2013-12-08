package models.listing;

import models.helpers.JsonModel;
import play.Logger;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 7:53 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Region extends JsonModel {

    public static Finder<String,Region> find = new Finder<>(String.class, Region.class);

    //private long id;
    @Id
    private String id;
    private String municipalityName;
    private String countyName;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public void constructId(){
        setId(municipalityName + countyName);
    }

    public String getMunicipalityName() {
        return municipalityName;
    }

    public void setMunicipalityName(String municipalityName) {
        this.municipalityName = municipalityName;
        constructId();
    }

    public String getCountyName() {
        return countyName;
    }

    public void setCountyName(String countyName) {
        this.countyName = countyName;
        constructId();
    }
}
