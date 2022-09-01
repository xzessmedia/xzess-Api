/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Description:
 */
import {ServerProcess} from "./ServerProcess";
import {Log} from "../module/logging/logging";

export class SubRoutine {
    _routinename: string;
    _routinedescription?: string;
    _routineActive: boolean;
    _currenticktime: number;

    constructor(routinename: string, description?: string) {
        this._routinename = routinename;
        this._routinedescription = description;
        this._routineActive = true;
        this._currenticktime = 0;
        ServerProcess.SubRoutines.push(this);
    }

    IsActive() {
        return this._routineActive;
    }

    SetActive(newState: boolean) {
        this._routineActive = newState;
        this.OnStatusChanged(newState);
    }

    protected OnInit() {

    }

    public Init() {
        Log('Info',`Subroutine ${this._routinename} has been initialised`)
        this.OnInit();
    }

    protected  OnStatusChanged(newState: boolean) {

    }

    protected  OnUpdate() {

    }

    public Update() {
        this._currenticktime += 1;
        Log('Info',`Subroutine ${this._routinename} has been updated #${this._currenticktime}`)
        this.OnUpdate();
    }
}