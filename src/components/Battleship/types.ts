import { Battleships } from "../../store/state";

export interface UnitProps {
  left?: boolean;
  right?: boolean;
  selected: boolean;
  isRival?: boolean;
}

export interface BattleshipProps {
  shipSize: number;
  shipName: Battleships;
  isRival?: boolean;
}

export interface CounterProps {
  shipName: Battleships;
  isRival?: boolean;
}
