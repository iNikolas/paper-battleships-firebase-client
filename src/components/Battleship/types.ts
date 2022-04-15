import { Battleships } from "../../store/state";

export interface UnitProps {
  left?: boolean;
  right?: boolean;
  selected: boolean;
}

export interface BattleshipProps {
  shipSize: number;
  shipName: Battleships;
}

export interface CounterProps {
  shipName: Battleships;
}
