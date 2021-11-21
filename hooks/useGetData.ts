import react, { useEffect, useState } from "react";
import missionPacks from "../data/missions.json";
import configData from "../data/configs.json";
import { Editions } from "../types";

export const useGetMissions = (edition: Editions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      setData(missionPacks[edition]);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [edition]);

  return { isLoading, error, data };
};

export const useGetBattlesize = (edition: Editions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      setData(configData.battleSize[edition]);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [edition]);

  return { isLoading, error, data };
};

export const useGetPlayerModes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      setData(configData.modes);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, data };
};
