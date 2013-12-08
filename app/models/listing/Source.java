package models.listing;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import models.helpers.JsonModel;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 7:16 PM
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Source extends JsonModel {

    public static Finder<String,Source> find = new Finder<>(String.class, Source.class);

    @Id
    private String name;

    private String url;
    private String type;





    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


}
