import './PeriodWeather.css'

type period = {
  temperatureUnit: string;
}

const PeriodWeather = (period: period) => (
  <button>
    {period.temperatureUnit}
</button>
)

export default PeriodWeather;