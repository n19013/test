import React from 'react'
import './App.css'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Avatar,
  ListItemIcon
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  ShowChart,
  WbSunny,
  BrightnessHigh,
  Waves,
  Brightness5,
  Whatshot
} from '@material-ui/icons'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: {
        weather: '',
        temperature: '',
        temperature_max: '',
        temperature_min: '',
        icon: '',
        humidity: '',
        speed: ''
      },
      placeName: ''
    }
    this.apiToken = '6f8fd58a3ea6d25ae6f70c3d003d1e66'
  }

  async getData (id) {
    const getJSON = (uri, options) =>
      window
        .fetch(uri, options)
        .then(res => res.json())
        .then(json => ({
          weather: json.weather[0].description,
          icon: json.weather[0].icon,
          temperature: json.main.temp,
          temperature_max: json.main.temp_max,
          temperature_min: json.main.temp_min,
          humidity: json.main.humidity,
          speed: json.wind.speed
        }))

    const options = { method: 'get' }
    const uri =
      'http://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric'
    const params = `&appid=${this.apiToken}&id=${id}`
    const data = await getJSON(uri + params, options)
    this.setState({ item: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const place = this.state.data[index]
    this.getData(place.id)
    this.setState({ placeName: place.name })
  }

  componentDidMount () {
    this.setState({
      data: [
        { name: 'ニューヨーク', id: 5128581 },
        { name: '東京', id: 1850147 },
        { name: '上海', id: 1796236 },
        { name: 'カイロ', id: 360630 },
        { name: 'ナイロビ', id: 184745 },
        { name: 'パリ', id: 2988507 },
        { name: '沖縄', id: 1854345 },
        { name: 'ブラジリア', id: 3469058 },
        { name: 'サンフランシスコ', id: 3837675 },
        { name: 'ブエノスアイレス', id: 3435910 },
        { name: 'パナマ', id: 3703430 },
        { name: 'ロサンゼルス', id: 5368361 },
        { name: 'カリフォルニアシティ', id: 5332748 },
        { name: 'ベルリン', id: 2950159 },
        { name: 'バルセロナ', id: 3128760 },
        { name: 'サルバドール', id: 3450554 },
        { name: 'リオデジャネイロ', id: 3451190 },
        { name: 'サンパウロ', id: 3448439 },
        { name: 'サンティアゴ', id: 3871336 },
        { name: 'プエルトモント', id: 3874960 },
        { name: 'バンクーバー', id: 6173331 },
        { name: 'ハミルトン', id: 4513583 },
        { name: 'イスタンブール', id: 745042 },
        { name: 'キエフ', id: 703446 },
        { name: 'ストックホルム', id: 2673730 },
        { name: 'サマラ', id: 499099 },
        { name: 'ジェッダ', id: 105343 },
        { name: 'モガディシュ', id: 53654 },
        { name: 'ブライア', id: 3374333 },
        { name: 'カラカス', id: 3646738 },
        { name: 'マナウス', id: 3663517 },
        { name: 'リマ', id: 3936456 },
        { name: 'カリ', id: 3687925 },
        { name: 'ヒューストン', id: 4699066 },
        { name: 'トロント', id: 6167865 },
        { name: 'イスタパラパ', id: 3526683 },
        { name: 'カナーク', id: 3831208 },
        { name: 'モールドベイ', id: 6079446 },
        { name: 'イザクセン', id: 5984185 },
        { name: 'バロー', id: 5880054 },
        { name: 'ジュノー', id: 5554072 },
        { name: 'ダッチハーバー', id: 5861117 },
        { name: 'エルドラド', id: 3429790 },
        { name: 'デルタナ', id: 7262847 },
        { name: 'シアトル', id: 5809844 },
        { name: 'アバディーン', id: 5785243 },
        { name: 'ジェドウェイ', id: 5986080 },
        { name: 'サンノゼ', id: 5392171 },
        { name: 'モバイル', id: 4076598 },
        { name: 'ダラス', id: 4684904 },
        { name: 'フェニックス', id: 5308655 },
        { name: 'カンザスシティ', id: 4393217 },
        { name: 'シカゴ', id: 4887398 },
        { name: 'コロンビア', id: 4381982 },
        { name: 'ピエール', id: 5767918 },
        { name: 'リンカーン', id: 5072006 },
        { name: 'アラル', id: 1529641 },
        { name: 'ロンドン', id: 2643741 }
      ]
    })
  }

  render () {
    console.log(this.state)
    return (
      <Card>
        <div class='Card'>
          <CardHeader title='世界の都市の天気情報' />
        </div>
        <CardActions>
          <SelectorView
            data={this.state.data}
            handleUpdate={this.handleUpdate.bind(this)}
          />
        </CardActions>
        <CardContent>
          <ListView item={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const SelectorView = props => (
  <Autocomplete
    options={props.data}
    getOptionLabel={option => option.name}
    renderInput={params => (
      <TextField
        {...params}
        label='都市を選択'
        variant='outlined'
        style={{ width: 300 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

const ListView = props => {
  const {
    weather,
    icon,
    temperature,
    temperature_max,
    temperature_min,
    humidity,
    speed
  } = props.item
  const formatTemperature = temperature ? `${temperature}℃` : ''
  const formatTemperature_max = temperature_max ? `${temperature_max}℃` : ''
  const formatTemperature_min = temperature_min ? `${temperature_min}℃` : ''
  const formatHumidity = humidity ? `${humidity}%` : ''
  const formatSpeed = speed ? `${speed}m/s` : ''
  const path = `http://openweathermap.org/img/wn/${icon}.png`
  const image = icon ? <Avatar src={path} alt={weather} /> : <WbSunny />
  console.log('props', props)
  return (
    <List>
      <div class='data'>
        <ListItem>
          <ListItemIcon>{image}</ListItemIcon>
          <ListItemText primary={weather} />
          天気
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ShowChart />
          </ListItemIcon>
          <ListItemText primary={formatTemperature} />
          気温
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <BrightnessHigh />
          </ListItemIcon>
          <ListItemText primary={formatTemperature_max} />
          最高気温
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Brightness5 />
          </ListItemIcon>
          <ListItemText primary={formatTemperature_min} />
          最低気温
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Whatshot />
          </ListItemIcon>
          <ListItemText primary={formatHumidity} />
          湿度
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Waves />
          </ListItemIcon>
          <ListItemText primary={formatSpeed} />
          風速
        </ListItem>
      </div>
    </List>
  )
}

export default App
