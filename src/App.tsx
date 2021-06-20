import React, { useState } from 'react';
import moment from "moment";
import copy from 'copy-to-clipboard';
import './App.css';
import {
  Header,
  Content,
  HeaderName,
  Tile,
  DatePicker,
  DatePickerInput,
  TextInput,
  TextArea,
  Select,
  SelectItem,
  CopyButton,
  Accordion,
  AccordionItem,
  Button,
} from 'carbon-components-react';

function formatDate(dt: Date): string {
  return moment(dt).format("YYYY/MM/DD")
}
function formatTime(dt: Date): string {
  return `${moment.utc(dt).format("YYYYMMDDTHHmmss")}Z`
}

type Game = {
  labelText: string,
  role: string,
  channel: string,
}
function App() {
  const [date, setDate] = useState(moment().format("YYYY/MM/DD"));
  const [timeStart, setTimeStart] = useState("20:00");
  const [timeEnd, setTimeEnd] = useState("22:00");
  const [reminder1, setReminder1] = useState("12:30");
  const [reminder2, setReminder2] = useState("19:30");
  const [game, setGame] = useState("among_us");
  const games: { [key: string]: Game } = {
    among_us: {
      labelText: "Among Us",
      role: "AmongUs",
      channel: "among-us",
    },
    among_us_beginner: {
      labelText: "Among Us (かけだしクルーメイト)",
      role: "AmongUs(かけだしクルーメイト)",
      channel: "among-us",
    },
    among_us_advanced: {
      labelText: "Among Us (いちにんまえクルーメイト)",
      role: "AmongUs(いちにんまえクルーメイト)",
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

  const reminderText1 = `$natural
${date} ${reminder1}
 send
@${games[game].role}
本日 ${date} ${timeStart} ${games[game].labelText} をやります。よろしくお願いします
 to #${games[game].channel}`
  const reminderText2 = `$natural
${date} ${reminder2}
 send
@${games[game].role}
まもなく ${games[game].labelText} が始まります！時間になったら Gaming1 チャンネルで待機してください
 to #${games[game].channel}`

  const pollText = `?poll
@${games[game].role}
"${date} ${timeStart} からの ${games[game].labelText} に参加しますか？"
:o: 参加します
:x: 参加しません
:question: まだ調整中です`

  const dtStart = new Date(`${date} ${timeStart}`)
  const dtEnd = new Date(`${date} ${timeEnd}`)
  const calenderUrl = encodeURI(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${formatTime(dtStart)}/${formatTime(dtEnd)}&text=${games[game].labelText}&details=${games[game].labelText} をやります`)

  return (
    <div className="App">
      <Header aria-label="ゲーム部日程調整ツール">
        <HeaderName href="#" prefix="">
          ゲーム部日程調整ツール
        </HeaderName>
      </Header>
      <Content>

        <Tile className="tile-input">
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
          <Accordion>
            <AccordionItem title="詳細設定">
              <TextInput
                labelText="開始時刻"
                id="text-input-time-start"
                value={timeStart}
                type="time"
                onChange={event => setTimeStart(event.target.value)} />
              <TextInput
                labelText="終了時刻"
                id="text-input-time-end"
                value={timeEnd}
                type="time"
                onChange={event => setTimeEnd(event.target.value)} />
              <TextInput
                labelText="リマインダ 昼"
                id="text-input-reminder2"
                value={reminder1}
                type="time"
                onChange={event => setReminder1(event.target.value)} />
              <TextInput
                labelText="リマインダ 夜"
                id="text-input-reminder2"
                value={reminder2}
                type="time"
                onChange={event => setReminder2(event.target.value)} />
            </AccordionItem>
          </Accordion>

        </Tile>

        <Tile>
          <div>
            <TextArea
              labelText="リマインダ 昼"
              rows={6}
              value={reminderText1} />
            <CopyButton onClick={() => copy(reminderText1)}/>
          </div>
          <div>
            <TextArea
              labelText="リマインダ 夜"
              rows={6}
              value={reminderText2} />
            <CopyButton onClick={() => copy(reminderText2)}/>
          </div>
          <div>
            <TextArea
              labelText="参加確認"
              rows={6}
              value={pollText} />
            <CopyButton onClick={() => copy(pollText)}/>
          </div>
          <div>
            <Button href={calenderUrl} target="_blank">Googleカレンダーに追加</Button>
          </div>
        </Tile>
      </Content>
    </div>
  );
}

export default App;
