// OpenWeatherMap OneCall API 응답 타입
export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Precipitation1h = {
  '1h': number;
};

export type CurrentWeather = {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: Precipitation1h;
  snow?: Precipitation1h;
  weather: WeatherCondition[];
};

export type MinutelyWeather = {
  dt: number;
  precipitation: number;
};

export type HourlyWeather = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  pop: number;
  rain?: Precipitation1h;
  snow?: Precipitation1h;
  weather: WeatherCondition[];
};

export type DailyTemp = {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
};

export type DailyFeelsLike = {
  morn: number;
  day: number;
  eve: number;
  night: number;
};

export type DailyWeather = {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary?: string;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number;
  rain?: number;
  snow?: number;
  weather: WeatherCondition[];
};

export type WeatherAlert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};

export type WeatherOneCallApiResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  // minutely?: MinutelyWeather[];
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  // alerts?: WeatherAlert[];
};

export type WeatherSummary = {
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  icon?: string;
  description?: string;
};

export type WeatherApiResponse =
  | { ok: true; result: WeatherOneCallApiResponse }
  | { ok: false; message: string };

export type WeatherSummaryApiResponse =
  | { ok: true; result: WeatherSummary }
  | { ok: false; message: string };

// lat위치의 위도(소수점) (−90; 90)
// lon위치의 경도(소수점) (-180; 180)
// timezone요청된 위치의 시간대 이름
// timezone_offsetUTC 기준 시간 차이(초)
// current 현재 날씨 데이터 API 응답
// current.dt현재 시간, 유닉스, UTC
// current.sunrise일출 시간(유닉스, UTC). 백야 및 극야 기간이 있는 극지방의 경우 이 매개변수는 응답에 포함되지 않습니다.
// current.sunset일몰 시간(유닉스, UTC). 백야 및 극야 기간이 있는 극지방의 경우 이 매개변수는 응답에 포함되지 않습니다.
// current.temp온도. 단위 - 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨. 사용 단위를 변경하는 방법
// current.feels_like온도. 이 온도 매개변수는 인간이 날씨를 인지하는 데 영향을 미칩니다. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.
// current.pressure해수면의 대기압, hPa
// current.humidity습도(%)
// current.dew_point대기 온도(기압과 습도에 따라 달라짐) 중 수증기가 응결되어 이슬이 맺히기 시작하는 온도. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨
// current.clouds흐린 정도(%)
// current.uvi현재 자외선 지수.
// current.visibility평균 시정(미터). 최대 시정은 10km입니다.
// current.wind_speed풍속. 풍속. 단위 – 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 사용 단위 변경 방법
// current.wind_gust (가능한 경우) 돌풍. 단위 - 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 사용 단위 변경 방법
// current.wind_deg풍향, 도 (기상학적)
// current.rain
// current.rain.1h (가능한 경우) 강수량, mm/h. 이 매개변수의 측정 단위는 mm/h만 사용 가능합니다.
// current.snow
// current.snow.1h (가능한 경우) 강수량, mm/h. 이 매개변수의 측정 단위는 mm/h만 사용 가능합니다.
// current.weather
// current.weather.id 날씨 조건 ID
// current.weather.main기상 매개변수 그룹 (비, 눈 등)
// current.weather.description그룹 내 날씨 조건 ( 전체 날씨 조건 목록 ). 원하는 언어 로 결과를 받아보세요.
// current.weather.icon날씨 아이콘 ID. 아이콘을 얻는 방법
// minutely 분 단위 날씨 예보 데이터 API 응답
// minutely.dt예측 데이터의 시간(유닉스, UTC)
// minutely.precipitation강수량(mm/h). 이 매개변수에는 mm/h 단위만 사용 가능합니다.
// hourly 시간별 날씨 예보 데이터 API 응답
// hourly.dt예측 데이터 시간(유닉스, UTC)
// hourly.temp온도. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨. 사용 단위를 변경하는 방법
// hourly.feels_like온도. 이는 인간이 날씨를 인지하는 데 중요한 요소입니다. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.
// hourly.pressure해수면의 대기압, hPa
// hourly.humidity습도(%)
// hourly.dew_point대기 온도(기압과 습도에 따라 달라짐) 중 수증기가 응결되어 이슬이 맺히기 시작하는 온도. 단위 - 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.
// hourly.uvi자외선 지수
// hourly.clouds흐린 정도(%)
// hourly.visibility평균 시정(미터). 최대 시정은 10km입니다.
// hourly.wind_speed풍속. 단위 - 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 사용 단위 변경 방법
// hourly.wind_gust (가능한 경우) 돌풍. 단위 - 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 사용 단위 변경 방법
// hourly.wind_deg풍향, 도 (기상학적)
// hourly.pop강수 확률. 이 매개변수의 값은 0에서 1 사이이며, 0은 0%, 1은 100%를 나타냅니다.
// hourly.rain
// hourly.rain.1h (가능한 경우) 강수량, mm/h. 이 매개변수의 측정 단위는 mm/h만 사용 가능합니다.
// hourly.snow
// hourly.snow.1h (가능한 경우) 강수량, mm/h. 이 매개변수의 측정 단위는 mm/h만 사용 가능합니다.
// hourly.weather
// hourly.weather.id 날씨 조건 ID
// hourly.weather.main기상 매개변수 그룹 (비, 눈 등)
// hourly.weather.description그룹 내 날씨 조건 ( 전체 날씨 조건 목록 ). 원하는 언어 로 결과를 받아보세요.
// hourly.weather.icon날씨 아이콘 ID. 아이콘을 얻는 방법
// daily 일일 날씨 예보 데이터 API 응답
// daily.dt예측 데이터 시간(유닉스, UTC)
// daily.sunrise일출 시간(유닉스, UTC). 백야 및 극야 기간이 있는 극지방의 경우 이 매개변수는 응답에 포함되지 않습니다.
// daily.sunset일몰 시간(유닉스, UTC). 백야 및 극야 기간이 있는 극지방의 경우 이 매개변수는 응답에 포함되지 않습니다.
// daily.moonrise오늘 달이 뜨는 시간 (유닉스, UTC)
// daily.moonset오늘 달이 지는 시간 (유닉스, UTC)
// daily.moon_phase달의 위상은 0각각 1'삭', 0.25'상현달', 0.5'보름달', '하현달'을 나타 0.75냅니다. 그 사이의 기간은 각각 '상현달', '상현반달', '하현반달', '하현달'이라고 합니다. 달의 위상 계산 알고리즘은 다음과 같습니다. 하루의 시작과 끝 사이의 달의 위상 값이 모두 정수(0, 0.25, 0.5, 0.75, 1.0)이면 해당 정수 값을 사용하고, 그렇지 않으면 시작과 끝의 달 위상 값의 평균을 사용합니다.
// summary오늘의 날씨 상황을 사람이 읽기 쉬운 형식으로 설명
// daily.temp단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨. 사용 단위를 변경하는 방법
// daily.temp.morn아침 기온.
// daily.temp.day낮 기온.
// daily.temp.eve저녁 기온.
// daily.temp.night야간 기온.
// daily.temp.min일일 최저 기온.
// daily.temp.max일일 최고 기온.
// daily.feels_like이는 인간이 날씨를 인지하는 방식을 설명합니다. 단위 – 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨. 사용 단위를 변경하는 방법
// daily.feels_like.morn아침 기온.
// daily.feels_like.day낮 기온.
// daily.feels_like.eve저녁 기온.
// daily.feels_like.night야간 기온.
// daily.pressure해수면의 대기압, hPa
// daily.humidity습도(%)
// daily.dew_point대기 온도(기압과 습도에 따라 달라짐) 중 수증기가 응결되어 이슬이 맺히기 시작하는 온도. 단위 - 기본값: 켈빈, 미터법: 섭씨, 영국식: 화씨.
// daily.wind_speed풍속. 단위 - 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 사용 단위 변경 방법
// daily.wind_gust (가능한 경우) 돌풍. 단위 - 기본값: 미터/초, 미터법: 미터/초, 영국식: 마일/시간. 사용 단위 변경 방법
// daily.wind_deg풍향, 도 (기상학적)
// daily.clouds흐린 정도(%)
// daily.uvi하루 중 자외선 지수의 최대값
// daily.pop강수 확률. 이 매개변수의 값은 0에서 1 사이이며, 0은 0%, 1은 100%를 나타냅니다.
// daily.rain (가능한 경우) 강수량(mm). 이 매개변수에는 mm 단위만 사용 가능합니다.
// daily.snow (가능한 경우) 적설량(mm). 이 매개변수에는 mm 단위만 사용 가능합니다.
// daily.weather
// daily.weather.id 날씨 조건 ID
// daily.weather.main기상 매개변수 그룹 (비, 눈 등)
// daily.weather.description그룹 내 날씨 조건 ( 전체 날씨 조건 목록 ). 원하는 언어 로 결과를 받아보세요.
// daily.weather.icon날씨 아이콘 ID. 아이콘을 얻는 방법
// alerts 주요 국가 기상 경보 시스템의 국가 기상 경보 데이터
// alerts.sender_name경보 발신처 이름입니다. 전체 경보 발신처 목록은 여기를 참조하십시오.
// alerts.event알림 이벤트 이름
// alerts.start경고 시작 날짜 및 시간(유닉스, UTC)
// alerts.end경고 종료 날짜 및 시간(유닉스, UTC)
// alerts.description경고 설명
// alerts.tags악천후 유형
