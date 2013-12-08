package models.listing;

import com.fasterxml.jackson.annotation.JsonIgnore;
import models.helpers.JsonModel;
import play.Logger;
import play.db.ebean.Model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 7:09 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Location extends JsonModel {

    public static Finder<Long, Location> find = new Finder<>(Long.class, Location.class);

    @Id
    long id;

    @JsonIgnore
    private List<String> namedAreas = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.DETACH)
    private Region region;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @ManyToOne(cascade = CascadeType.DETACH)
    private Position position;

    @Override
    public void save() {

        if( Region.find.byId(region.getId()) == null){
            region.save();
        }else {
            region.update();
        }

        if( Position.find.byId(position.getId()) == null){
            position.save();
        }

        address.save();


        super.save();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    public void delete() {
        Address a = address;
        super.delete();
        a.delete();

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public List<String> getNamedAreas() {
        return namedAreas;
    }

    public void setNamedAreas(List<String> namedAreas) {
        this.namedAreas = namedAreas;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}

