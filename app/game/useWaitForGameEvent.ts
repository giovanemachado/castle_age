import { useGameStore } from "@/app/store/gameStoreProvider";
import { useEffect } from "react";
import { socket } from "@/app/socket/socket";
import { EVENT_TYPES } from "../socket/events";
import { useShallow } from "zustand/react/shallow";

export function useWaitForGameEvent() {
  const {
    setWaitingOtherPlayers,
    match,
    setEvents,
    events,
    setMatchState,
    turns,
  } = useGameStore(
    useShallow((state) => ({
      setWaitingOtherPlayers: state.setWaitingOtherPlayers,
      match: state.match,
      setEvents: state.setEvents,
      events: state.events,
      setMatchState: state.setMatchState,
      turns: state.turns,
    })),
  );

  useEffect(() => {
    const onEvent = (value: any) => {
      setEvents({ type: EVENT_TYPES.BOTH_PLAYERS_ENDED_TURN, value });
    };

    if (!match?.code) {
      return;
    }

    const eventName = `${EVENT_TYPES.BOTH_PLAYERS_ENDED_TURN}_${match.code}`;

    socket.on(eventName, onEvent);

    return () => {
      socket.off(eventName, onEvent);
    };
  }, [match?.code, setEvents]);

  useEffect(() => {
    const event = events.findLast((event) => {
      return event.type === EVENT_TYPES.BOTH_PLAYERS_ENDED_TURN;
    });

    if (!event) {
      return;
    }

    if (event.value.matchState.turns != turns) {
      setMatchState(event.value.matchState);
      setWaitingOtherPlayers(false);
    }
  }, [events, match?.code, setMatchState, setWaitingOtherPlayers, turns]);
}
