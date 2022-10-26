// Programs
import nodeCleanup from "node-cleanup";
import NI_AM2315 from "../index.js";
import {
    setTimeout,
  } from 'timers/promises';

const formattedOutput = function (valueObject) {
    if (valueObject.success === true)
        return valueObject.data.valueString + " " + valueObject.data.valueType.short;
    else {
        return "Error getting result";
    }
}


const initSensor = async function () {

    let started = await NI_AM2315.initialize();
    console.log("Initialize", started);
    console.log("Start Polling");
    let startPolling = NI_AM2315.startMeasurementPolling();
    const res = await setTimeout(1000, 'end');
    console.log("Stop Polling");
    NI_AM2315.clear();
    console.log("Cleared");
    
}

const Main = async function _main() {

    console.log('----------------------------------------------------');
    console.log("[NICB:Main] - Started");

    nodeCleanup(
        async function (exitCode, signal) {
            console.log("[NICB:Main] - Node cleanup starting", exitCode, signal);
        },
        {
            ctrl_C: "[NICB:Main] - Node cleanup end - User Exit",
            uncaughtException: "[NICB:Main] - Exit by Exception",
        }
    );

    // run sequence
    await initSensor();

    // end and exit
    return {
        result: "End run"
    };

};

// Run
Main()
    .then(async (d) => {
        console.log("[NICB:Main] - Program", d);
    })
    .catch((e) => {
        console.log("[NICB:Main] - Error on start", e);
    });
