import { Selector } from "testcafe";

class Utils {
  static async getData(){
    return JSON.parse(await Selector('[test_id=aditor-state]').innerText);
  }
}

export default Utils;
