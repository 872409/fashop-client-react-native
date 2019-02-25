import React from "react";
import { Toast } from 'antd-mobile-rn'

export default class Alert {
    durationTime: 1

    show(options = { title: '', time: 1, type: 'fail' }) {
        if (typeof options['time'] === "undefined") {
            options['time'] = 1
        }
        if (typeof options['type'] === "undefined") {
            options['type'] = 'fail'
        }
        this.setDurationTime(options.time)
        switch (options.type) {
            case 'info':
                this.info(options.title)
                break
            case 'success':
                this.success(options.title)
                break
            case 'fail':
                this.fail(options.title)
                break
            default:
                this.info(options.title)
        }
    }

    info(e) {
        Toast.info(e, this.durationTime)
    }

    success(e) {
        Toast.success(e, this.durationTime)
    }

    fail(e) {
        Toast.fail(e, this.durationTime)
    }

    setDurationTime(time) {
        this.durationTime = time
    }
}
