import { ErrorHandler } from '@angular/core';

export default class AppGlobalErrorHandler extends ErrorHandler {

    constructor() {
        super(true);
    }

    handleError(error) {
        if (error.status == '500') {
            console.log('Service error');
        } else if (error.status == '401') {
            console.log('unauth usage');
        }

        super.handleError(error);
    }
}