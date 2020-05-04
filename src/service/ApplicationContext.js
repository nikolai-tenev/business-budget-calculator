import {UiService} from "./UiService";
import {ApplicationService} from "./ApplicationService";
import {IncomeService} from "./IncomeService";
import {CostService} from "./CostService";

class ApplicationContext {

    constructor() {
        this.applicationService = new ApplicationService(this);
        this.applicationService.init();

        this.uiService = new UiService(this);
        this.uiService.init();

        this.incomeService = new IncomeService(this);
        this.incomeService.init();

        this.costService = new CostService(this);
        this.costService.init();
    }
}

const applicationContext = new ApplicationContext();

export {applicationContext};
