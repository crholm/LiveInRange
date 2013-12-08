import play.GlobalSettings;
import utils.BooliDownloader;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/7/13
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
public class Global extends GlobalSettings{

    @Override
    public void onStart(play.Application app) {
        super.onStart(app);

        new Thread(new BooliDownloader()).start();




    }






}
