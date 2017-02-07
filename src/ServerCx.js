/**
 * Created by sidler on 03.02.17.
 */

class ServerCx {

    strUrl = '';

    constructor() {
        this.strUrl = process.env.PUBLIC_URL+'/dirlist/sample.json';
        //this.strUrl = process.env.PUBLIC_URL+'/dirlist/backend.php';
    }


    fetchServerData(objCallback) {

        console.log('loading data from '+this.strUrl);

         fetch(this.strUrl)
             .then(function(response) {
                 // console.log(response.json())
                 return response.json();
             })
             .then(objCallback);

    }
}

export default ServerCx;