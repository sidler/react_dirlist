/**
 * Created by sidler on 03.02.17.
 */

class ServerCx {

    strUrl = '';

    constructor() {
        // this.strUrl = process.env.PUBLIC_URL+'/dirlist/sample.json';
        this.strUrl = process.env.PUBLIC_URL+'/dirlist/backend.php';
    }


    fetchServerData(objCallback) {

         fetch(this.strUrl)
             .then(function(response) {
                 return response.json();
             })
             .then(objCallback);

    }


    deleteCacheAction(strRootFolder, objCallback) {
        fetch(this.strUrl+"?clearcache="+strRootFolder, {})
            .then(function(response) {
                return response.json();
            })
            .then(objCallback);
    }


}

export default ServerCx;