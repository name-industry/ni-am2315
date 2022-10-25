// V@ts-check <- has problems with 'this' in the init method for some reason
/**
 * @class NI_AM2315
 * 
 * @summary 
 * (v.0.0.1) - 
 * 
 * @description 
 */

import { Constants } from "./Constants/index.js";

// 3rd party import
import I2CBus from "./Bus/I2C/index.js";

class NI_AM2315 {

    /** @type {object | undefined} */
    currentConfiguration;

    /**
     * @method NI_INA219#initialize
     * 
     * @summary
     * Start register/calibrate bus & sensor
     * 
     * @description 
     * Gets a handler to the AM2315 chip via I2c.
     * 
     * @async 
     * 
     * @param {Number} i2cAddress Address in hex of the sensor ie: 0x24
     * @param {Number} busNumber The Bus address as an integer ie: 1 ( for PI )
     * @param {*} useLogging Not implemented
     * @param {*} loggingType Not implemented
     * @returns {Promise<(ResultObject|ErrorResultObject)>}  returns value object 
     */
    initialize = async function (
        i2cAddress = Constants.DEFAULT_I2C_ADDRESS,
        busNumber = Constants.DEFAULT_I2C_BUS,
        useLogging = false,
        loggingType = "VERBOSE"
    ) {

        // get handle to I2c bus and sensor
        let initI2cBus = await I2CBus.initialize(i2cAddress, busNumber);
        if (initI2cBus.success === false) return initI2cBus;

        return {
            success: true,
            msg: "[Sensor] - Ready",
            data: initI2cBus.data
        }

    }

}

export default new NI_AM2315();