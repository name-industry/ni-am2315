import rimraf from 'rimraf';
rimraf("./Docs/NI-AM2315/*", (err) => {
    console.log("res", err);
});