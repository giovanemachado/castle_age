import {
  MatchData,
  MatchState,
  MatchStateUnitsMovement,
  SquareData,
  UnitData,
} from "@/schema/types";
import { createStore } from "zustand/vanilla";
import { setUnitNewLocalization } from "./gameStoreActions";
import { devtools } from "zustand/middleware";
export type Player = {
  name: string;
  playerId: string;
};

export type ClientState = {
  user?: any;
  token?: string;
  canBeReached: string[];
  unitInDrag?: MatchStateUnitsMovement;
  player?: Player;
  gameMap?: { rows: SquareData[][]; units: UnitData[] };
  match?: MatchData;
  events: {
    type: string;
    value: any;
  }[];
  waitingOtherPlayers: boolean;
};

export type GameActions = {
  setUser: (user?: any) => void;
  setToken: (token?: string) => void;
  setMatchState: (updatedState: MatchState) => void;
  setUnitNewLocalization: (unitId: string, localization: string) => void;
  setUnitInDrag: (unitId?: string) => void;
  setMatch: (matchData?: MatchData) => void;
  setGameMap: (rows: SquareData[][], units: UnitData[]) => void;
  setEvents: (eventValue: { type: string; value: any }) => void;
  setUnitsMovement: (unitsData: UnitData[]) => void;
  setWaitingOtherPlayers: (isWaiting: boolean) => void;
  setPlayer: (player?: Player) => void;
};

export type GameStore = MatchState & GameActions & ClientState;

export const createGameStore = (initState: MatchState) => {
  return createStore<GameStore>()(
    devtools((set) => ({
      ...initState,
      canBeReached: [],
      events: [],
      waitingOtherPlayers: false,
      setUser: (newUser) => set(() => ({ user: newUser }), false, "setUser"),
      setToken: (newToken) =>
        set(() => ({ token: newToken }), false, "setToken"),
      setMatchState: (updatedState) =>
        set(
          () => {
            return updatedState;
          },
          false,
          "setMatchState"
        ),
      setUnitNewLocalization: (unitId, localization) =>
        set(
          (state) => setUnitNewLocalization(state, unitId, localization),
          false,
          "setUnitNewLocalization"
        ),
      setUnitInDrag: (unitId) =>
        set(
          (state) => {
            let unitInDrag: MatchStateUnitsMovement | undefined = undefined;

            if (unitId) {
              unitInDrag = state.unitsMovement.find((u) => u.id == unitId);
            }

            return { unitInDrag: unitInDrag };
          },
          false,
          "setUnitInDrag"
        ),
      setMatch: (match?: MatchData) =>
        set(
          () => ({
            match,
          }),
          false,
          "setMatch"
        ),
      setGameMap: (rows: SquareData[][], units: UnitData[]) =>
        set(
          () => ({
            gameMap: {
              rows,
              units,
            },
          }),
          false,
          "setGameMap"
        ),
      setEvents: (eventValue: { type: string; value: any }) =>
        set(
          (state) => ({ events: [...state.events, eventValue] }),
          false,
          "setEvents"
        ),
      setUnitsMovement: (unitsData) =>
        set(
          () => ({
            unitsMovement: unitsData.map((unitData) => ({
              id: unitData.id,
              localization: unitData.movement.initialLocalization,
              playerId: unitData.playerId,
              movedInTurn: false,
              previousLocalization: unitData.movement.initialLocalization,
              reachableLocalizations:
                unitData.movement.initialReachableLocalizations,
            })),
          }),
          false,
          "setUnitsMovement"
        ),
      setWaitingOtherPlayers: (isWaiting) =>
        set(
          () => ({ waitingOtherPlayers: isWaiting }),
          false,
          "setWaitingOtherPlayers"
        ),
      setPlayer: (playerData) =>
        set(() => ({ player: playerData }), false, "setPlayer"),
    }))
  );
};
