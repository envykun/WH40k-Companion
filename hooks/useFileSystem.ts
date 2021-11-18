import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { useEffect, useState } from "react";

const dirName = "wh40kCompanion";
const fileName = "wh40kHistory.json";
const dirUri = FileSystem.documentDirectory + dirName;
const fileUri = FileSystem.documentDirectory + dirName + "/" + fileName;

export interface GameHistory {
  battleSize: string;
  mission: string;
  timePlayed: number;
  date: string;
  playerOneName: string;
  playerOneNameTwo?: string;
  playerTwoName: string;
  playerTwoNameTwo?: string;
  teamOneCodex: string;
  teamOneCodexTwo?: string;
  teamTwoCodex: string;
  teamTwoCodexTwo?: string;
  teamOnePoints: number;
  teamTwoPoints: number;
  teamOnePrimary: PrimaryHistory;
  teamTwoPrimary: PrimaryHistory;
  teamOneSecondary: SecondaryHistory;
  teamTwoSecondary: SecondaryHistory;
  notes?: string;
  attachment?: Array<string>;
}

interface PrimaryHistory {
  totalPoints: number;
  roundPoints: RoundPoints;
}

interface SecondaryHistory {
  secondaryOne: {
    title: string;
    totalPoints: number;
    roundPoints: RoundPoints;
  };
  secondaryTwo: {
    title: string;
    totalPoints: number;
    roundPoints: RoundPoints;
  };
  secondaryThree: {
    title: string;
    totalPoints: number;
    roundPoints: RoundPoints;
  };
}

interface RoundPoints {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
}

export function createHistoryJSON(data: GameHistory) {
  return JSON.stringify(data);
}

export async function createHistory(payload: string | undefined) {
  const dirInfo = await FileSystem.getInfoAsync(dirUri);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!dirInfo.exists) {
    console.log("Creating directory...");
    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
  }
  if (fileInfo.exists) {
    const oldHistory = await FileSystem.readAsStringAsync(fileUri);
    const newPayload = oldHistory.substring(0, oldHistory.length - 2) + "," + payload + "]}";
    console.log("Updating History file...");
    await FileSystem.writeAsStringAsync(fileUri, newPayload, { encoding: FileSystem.EncodingType.UTF8 });
  } else {
    console.log("Creating new History file...");
    await FileSystem.writeAsStringAsync(fileUri, `{"history":[${payload}]}`, { encoding: FileSystem.EncodingType.UTF8 });
  }
}

export async function getHistoryFromJSON(): Promise<{ history: Array<GameHistory> } | undefined> {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    const history = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(history);
  }
}

export function getHistory() {
  const [data, setData] = useState<Array<GameHistory> | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  function loadHistory() {
    setIsLoading(true);
    try {
      getHistoryFromJSON().then((res) => {
        setData(res?.history.reverse());
        setIsLoading(false);
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  return { isLoading, data, error, loadHistory };
}

export function setHistory(payload: string) {
  createHistory(payload);
}

export async function clearHistory() {
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) {
    console.log(`Deleting file ${fileUri}...`);
    await FileSystem.deleteAsync(fileUri);
  } else {
    console.log("No file with such name...");
  }
}
