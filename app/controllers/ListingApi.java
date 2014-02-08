package controllers;

import controllers.helpers.JsonController;
import models.helpers.ModelWrapper;
import models.listing.Listing;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/8/13
 * Time: 6:09 PM
 * To change this template use File | Settings | File Templates.
 */
public class ListingApi extends JsonController {

//    public static Result get(int transitTimeToCenter, double roomMin, double roomMax, double priceMin, double priceMax, double areaMin, double areaMax, int offset, int len) {
    public static Result get(int transitTimeToCenter, double roomMin, double roomMax, double priceMin, double priceMax,  double areaMin, double areaMax, int offset, int len){

        List<Listing> listings = Listing.find
                .where()
                    .le("location.position.transitTimeToCenter", transitTimeToCenter)
                    .ge("rooms", roomMin)
                    .le("rooms", roomMax)
                    .ge("listPrice", priceMin)
                    .le("listPrice", priceMax)
                    .ge("livingArea", areaMin)
                    .le("livingArea", areaMax)
                .orderBy("location.position.transitTimeToCenter, location.position.transitTimeToCenter asc")
                    .setFirstRow(offset)
                    .setMaxRows(len)
                .findList();

        int totalLenght = Listing.find
                .where()
                    .le("location.position.transitTimeToCenter", transitTimeToCenter)
                    .ge("rooms", roomMin)
                    .le("rooms", roomMax)
                    .ge("listPrice", priceMin)
                    .le("listPrice", priceMax)
                    .ge("livingArea", areaMin)
                    .le("livingArea", areaMax)
                .findRowCount();





        Logger.debug(getTimeStanmp() + "- Result size: " + listings.size() + " of " + totalLenght);

        ModelWrapper wrapper = new ModelWrapper();

        wrapper.setLen(listings.size());
        wrapper.setOffset(offset);
        wrapper.setTotalLenght(totalLenght);
        wrapper.setPayload(listings);




        return ok(wrapper);
    }




}
