async function forecast(woeid) {
    // fetch(`https://www.metaweather.com/api/location/${woeid}/`)
    //     .then(data => {
    //         const result = data.json();
    //         console.log(result);
    //         return result;
    //     })
    //     .then(result => {
    //         const today = result.consolidated_weather[0].applicable_date;
    //         const min_temp = result.consolidated_weather[0].min_temp;
    //         const max_temp = result.consolidated_weather[0].max_temp;
    //         console.log(`weather forecast in ${today} is between ${min_temp} to ${max_temp}`);
    //     })
    //     .catch(error => console.log(error));
    const data = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
    const result = await data.json();
    const min_temp = result.consolidated_weather[0].min_temp;
    const max_temp = result.consolidated_weather[0].max_temp;
    console.log(`weather forecast in ${today} is between ${min_temp} to ${max_temp}`);


}

forecast(2487956);