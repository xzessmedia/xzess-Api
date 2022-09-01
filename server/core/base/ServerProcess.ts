/**
 * @ Author: Tim Koepsel
 * @ Description:
 */
import {SubRoutine} from "./SubRoutine";
import {Log} from "../module/logging/logging";

export class ServerProcess {
    protected UpdateTimer: NodeJS.Timer;
    public static ActiveProcesses: Array<ServerProcess> = [];
    public static SubRoutines: Array<SubRoutine> = [];
    _tickrate: number;

    constructor(tickRate: number = 60000) {
        this._tickrate = tickRate;
        this.UpdateTimer = setInterval(()=> this.Update(), tickRate);
        ServerProcess.ActiveProcesses.push(this);
    }

    public GetTickRate() {
        return this._tickrate;
    }

    public ChangeTickRate(newTickrate: number) {
        this._tickrate = newTickrate;
        this.UpdateTimer = setInterval(()=> this.Update(), newTickrate);
    }

    protected OnInit() {

    }

    public Init() {
        ServerProcess.SubRoutines.forEach((routine) => {
            if (routine.IsActive() === true) {
                routine.Init();
            }
        });
        Log('Info',`Server initialised with ${ServerProcess.SubRoutines.length} Subroutines..`)
        this.OnInit();
    }

    public Update() {
        ServerProcess.SubRoutines.forEach((routine) => {
            if (routine.IsActive() === true) {
                routine.Update();
            }
        });
        Log('Info',`Server updated with ${ServerProcess.SubRoutines.length} Subroutines..`)
        this.OnUpdate();
    }

    protected OnUpdate() {

    }
}