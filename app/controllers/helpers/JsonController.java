package controllers.helpers;

import models.helpers.JsonModel;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 9/19/13
 * Time: 10:26 PM
 * To change this template use File | Settings | File Templates.
 */
public class JsonController extends Controller{

    public static Status ok(List<? extends JsonModel> models){
        return ok(Json.toJson(models));
    }

    public static Status ok(Map<Object, ? extends JsonModel> models){
        return ok(Json.toJson(models));
    }

}