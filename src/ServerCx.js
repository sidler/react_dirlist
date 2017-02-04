/**
 * Created by sidler on 03.02.17.
 */

class ServerCx {

    strUrl = '';


    constructor() {
        this.strUrl = '/public/sample.json';
        this.strUrl = 'https://www.kajona.de/xml.php?module=packageserver&action=list';
        this.strUrl = process.env.PUBLIC_URL+'/sample.json';
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