package models.helpers;

/**
 * Created with IntelliJ IDEA.
 * User: raz
 * Date: 12/8/13
 * Time: 7:13 PM
 * To change this template use File | Settings | File Templates.
 */
public class ModelWrapper extends JsonModel{

    private int offset;
    private int len;
    private int totalLenght;
    private Object payload;

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLen() {
        return len;
    }

    public void setLen(int len) {
        this.len = len;
    }

    public int getTotalLenght() {
        return totalLenght;
    }

    public void setTotalLenght(int totalLenght) {
        this.totalLenght = totalLenght;
    }

    public Object getPayload() {
        return payload;
    }

    public void setPayload(Object payload) {
        this.payload = payload;
    }
}
