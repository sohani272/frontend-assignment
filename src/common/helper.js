export const convertFahrenheitToCelsius = (fahrenheitTemp) => {
    if (fahrenheitTemp) {
        let fTemp = parseFloat(fahrenheitTemp);
        let fToCel = (fTemp - 32) / 1.8;
        let convertedTemp = Number((fToCel).toFixed(0));
        return convertedTemp + '°C';
    }
}

export const getWeekDay = (dayNum) => {
    switch (dayNum) {
        case 1:
            return 'Mon';
            break;
        case 2:
            return 'Tue';
            break;
        case 3:
            return 'Wed';
            break;
        case 4:
            return 'Thu';
            break;
        case 5:
            return 'Fri';
            break;
        case 6:
            return 'Sat';
            break;
        case 0:
            return 'Sun';
            break;
        default:
            break;
    }
}

export const getWeatherIcon = (icon) => {
    switch (icon) {
        case '02n':
            return 'cloudy-night-2.svg';
            break;
        case '02d':
            return 'cloudy-day-2.svg';
            break;
        case '03d':
            return 'cloudy.svg';
            break;
        case '03n':
            return 'cloudy.svg';
            break;
        case '04d':
            return 'cloudy-night-1.svg';
            break;
        case '04n':
            return 'cloudy-night-1.svg';
            break;
        case '01d':
            return 'day.svg';
            break;
        case '01n':
            return 'night.svg';
            break;
        case '11d':
            return 'thunderstorm.svg';
            break;
        case '11n':
            return 'thunderstorm.svg';
            break;
        case '13d':
            return 'snowy-1.svg';
            break;
        case '13n':
            return 'snowy-3.svg';
            break;
        case '09d':
            return 'rainy-6.svg';
            break;
        case '09n':
            return 'rainy-6.svg';
            break;
        case '10d':
            return 'rainy1.svg';
            break;
        case '10n':
            return 'rainy-6.svg';
            break;
        default:
            return 'day.svg';
            break;
    }
}