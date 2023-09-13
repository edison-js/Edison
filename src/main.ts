import  { SerialPort } from "serialport";

// シリアルポートの設定（ポート名は環境によって変更してください）
const path = "/dev/ttyACM0";
const port = new SerialPort({path, 
  baudRate: 57600, // StandardFirmataでのデフォルト
});

// ポートが開いたら処理を開始
port.on("open", () => {
  console.log("Serial port opened.");

  // ピン13を出力に設定 (Firmataのシリアルコマンド)
  const setPinModeOutput = Buffer.from([0xF4, 13, 1]);
  port.write(setPinModeOutput);

  // 2秒待ってからPIN 13をHIGHに
  setTimeout(() => {
    const setPinHigh = Buffer.from([0x90, 13, 1]);
    port.write(setPinHigh);
  }, 2000);

  // さらに2秒待ってからPIN 13をLOWに
  setTimeout(() => {
    const setPinLow = Buffer.from([0x90, 13, 0]);
    port.write(setPinLow);
  }, 4000);
});

// エラーハンドリング
port.on("error", (err) => {
  console.log(`Error: ${err.message}`);
});
