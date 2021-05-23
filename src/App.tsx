import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Header,
  Content,
  HeaderName,
  Tile,
  DatePicker,
  DatePickerInput,
  TextInput,
  Select,
  SelectItem,
} from 'carbon-components-react';

function formatDate(dt: Date): string {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth() + 1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '/' + m + '/' + d);
}

type Game = {
  labelText: string,
  role: string,
  channel: string,
}
function App() {
  const [date, setDate] = useState("2021/04/01");
  const [time, setTime] = useState("20:00");
  const [game, setGame] = useState("splatoon2");
  const games: { [key: string]: Game } = {
    among_us: {
      labelText: "Among Us",
      role: "AmongUs",
      channel: "among-us",
    },
    apex: {
      labelText: "Apex Legends",
      role: "ApexLegends",
      channel: "apex",
    },
    splatoon2: {
      labelText: "Splatoon2",
      role: "Splatoon2",
      channel: "splatoon2",
    },
    smash_bros: {
      labelText: "スマッシュブラザーズSPECIAL",
      role: "スマッシュブラザーズSPECIAL",
      channel: "スマッシュブラザーズ",
    },
    boardgame: {
      labelText: "ボードゲーム",
      role: "ボードゲーム",
      channel: "ボードゲーム",
    },
    mario_kart: {
      labelText: "マリオカート8 デラックス",
      role: "マリオカート8デラックス",
      channel: "マリオカート",
    },
    monster_hunter: {
      labelText: "モンスターハンターライズ",
      role: "モンスターハンターライズ",
      channel: "モンスターハンターライズ",
    },
    mahjong: {
      labelText: "麻雀",
      role: "麻雀",
      channel: "麻雀",
    }
  }
  return (
    <div className="App">
      <Header aria-label="ゲーム部日程調整ツール">
        <HeaderName href="#" prefix="">
          ゲーム部日程調整ツール
        </HeaderName>
      </Header>
      <Content>

        <Tile>
          <h1>日程選択</h1>
          <DatePicker
            datePickerType="single"
            dateFormat="Y/m/d"
            locale="ja"
            value={date}
            onChange={newDate => setDate(formatDate(newDate[0]))}
          >
            <DatePickerInput
              placeholder="yyyy/mm/dd"
              labelText="日付を選択"
              id="date-picker-single"
            />
          </DatePicker>
          <TextInput
            labelText="開始時刻"
            id="text-input-time"
            value={time}
            onChange={event => setTime(event.target.value)} />

          <Select
            id="select-game"
            defaultValue={game}
            labelText="ゲームを選択"
            onChange={event => setGame(event.target.value)}
          >
            {
              Object.entries(games).map(([key, game]) => <SelectItem key={key} value={key} text={games[key].labelText} />)
            }
          </Select>
        </Tile>

        <Tile>
          <div>
            {date} {time} {games[game].labelText}
          </div>
          <div>
            <pre>
              $natural
              {date} 12:30
              send
              @{games[game].role}
              本日 {date} {time} {games[game].labelText} をやります。よろしくお願いします
              to #{games[game].channel}
            </pre>
          </div>
        </Tile>
      </Content>
    </div>
  );
}

export default App;
