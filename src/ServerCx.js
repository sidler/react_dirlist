/**
 * Created by sidler on 03.02.17.
 */

import Settings from './Settings';

class ServerCx {

    _strUrl = '';

    _buildQueryString = function(strDeletePath) {
          let arrParams = [];
          if(strDeletePath) {
              arrParams.push("clearcache="+strDeletePath);
          }

          if(Settings.getInstance().getShowSize()) {
              arrParams.push("showSize=true");
          }

          if(arrParams.length > 0) {
              return this._strUrl+"?"+arrParams.join("&");
          }

          return this._strUrl;
    };

    constructor() {
        // this._strUrl = process.env.PUBLIC_URL+'/dirlist/sample.json';
        this._strUrl = process.env.PUBLIC_URL+'/dirlist/backend.php';
    }


    fetchServerData(objCallback) {

         fetch(this._buildQueryString())
             .then(function(response) {
                 return response.json();
             })
             .then(objCallback);

    }


    deleteCacheAction(strRootFolder, objCallback) {
        fetch(this._buildQueryString(strRootFolder), {})
            .then(function(response) {
                return response.json();
            })
            .then(objCallback);
    }




}

export default ServerCx;