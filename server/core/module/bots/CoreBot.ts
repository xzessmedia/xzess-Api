/**
 * @ Author: Tim Koepsel
 * @ Description:
 */

export class CoreBot {
    protected ShortUpdateTimer: NodeJS.Timer;
    protected MediumUpdateTimer: NodeJS.Timer;
    protected LongUpdateTimer: NodeJS.Timer;

    constructor(shortUpdateRate: number = 500, mediumUpdateRate: number = 60000, longUpdateRate: number = 900000) {
        this.ShortUpdateTimer = setInterval(()=> this.OnShortUpdate(), shortUpdateRate);
        this.MediumUpdateTimer = setInterval(()=> this.OnMediumUpdate(), mediumUpdateRate);
        this.LongUpdateTimer = setInterval(()=> this.OnLongUpdate(), longUpdateRate);

        this.OnInit();
    }

    protected OnInit() {

    }

    protected OnShortUpdate() {

    }

    protected OnMediumUpdate() {

    }
    protected OnLongUpdate() {

    }
}