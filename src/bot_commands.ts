import * as JSONRPC from "./jsonrpc";
import { HardwareState } from "./interfaces";

  /** All possible RPC parameters and their types. */
  export namespace Params {
    export interface X { x: number; }
    export interface Y { y: number; }
    export interface Z { z: number; }
    export interface PinNumber { pin_number: number; }
    export interface PinValue { pin_value: number; }
    export interface PinMode { pin_mode: number; }
    export interface Speed { speed: number; }
    export interface CalibrationUpdate extends HardwareState {}
  }

  /** Acceptable "method" names for JSON RPC messages to the bot. */
  export type Method = "emergency_stop"
    | "exec_sequence"
    | "home_all"
    | "home_x"
    | "home_y"
    | "home_z"
    | "move_absolute"
    | "move_relative"
    | "write_pin"
    | "read_status"
    | "sync"
    | "update_calibration"
    | "status_update" // notification only.;
    | "check_updates"
    | "check_arduino_updates"
    | "power_off"
    | "reboot"

  /** A JSON RPC method invocation for one of the allowed FarmBot methods. */
  export interface Request<T extends any[]> extends JSONRPC.Request<T> { method: Method; }

  /** Sent from bot when message is received and properly formed. */
  export interface Acknowledgement extends JSONRPC.Response<["OK"]> { }

  export interface EmergencyStopRequest extends Request<any> {  method: "emergency_stop"; }

  // TODO: Change this to accept an array of steps as its only argument.
  // For now, leaving it as {steps: any[]} for legacy reasons.
  export interface ExecSequenceRequest extends Request<[{steps: any[]}]> {
    method: "exec_sequence";
  }

  export interface HomeAllRequest extends Request<[Params.Speed]> { method: "home_all"; }

  export interface HomeXRequest extends Request<[Params.Speed]> {
    method: "home_x";
  }

  export interface HomeYRequest extends Request<[Params.Speed]> {
    method: "home_y";
  }

  export interface HomeZRequest extends Request<[Params.Speed]> {
    method: "home_z";
  }

  export interface WritePinParams extends Params.PinMode, Params.PinValue, Params.PinNumber {}

  export interface WritePinRequest extends Request<[WritePinParams]> {
    method: "write_pin";
  }

  export interface ReadStatusRequest extends Request<any> {
    method: "read_status";
  }

  export interface SyncRequest extends Request<any> {
    method: "sync";
  }

  export interface UpdateCalibrationRequest extends Request<[Params.CalibrationUpdate]> {
    method: "update_calibration";
  }

  export interface MovementRequest extends Params.Speed, Params.X, Params.Y, Params.Z { }

  export interface MoveAbsoluteRequest extends Request<[MovementRequest]> {
    method: "move_absolute";
  }

  export interface MoveRelativeRequest extends Request<[MovementRequest]> {
    method: "move_relative";
  }

  export interface PoweroffRequest extends Request<any> {
    method: "power_off";
  }
  export interface RebootRequest extends Request<any> {
    method: "reboot";
  }

  export interface CheckUpdatesRequest extends Request<any> {
    method: "check_updates";
  }

  export interface CheckArduinoUpdatesRequest extends Request<any> {
    method: "check_arduino_updates";
  }
