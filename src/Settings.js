/**
 * Created by sidler on 03.02.17.
 */

class Settings {

    static _instance = new Settings();

    _showSize = true;

    constructor() {
        if(Settings._instance){
            throw new Error("Error: Instantiation failed: Use Settings.getInstance() instead of new.");
        }
        Settings._instance = this;
    }

    /**
     *
     * @returns {Settings}
     */
    static getInstance()
    {
        return this._instance;
    }

    getShowSize() {
        return this._showSize;
    }

    setShowSize(value) {
        this._showSize = value;
    }
}

export default Settings;