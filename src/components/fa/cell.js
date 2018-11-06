import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from "prop-types";

const warn = (msg, getValue) => {
    console.warn(msg);

};

export default class FaCell extends Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        label: PropTypes.string,
        extra: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        onlyTapFooter: PropTypes.bool,
        arrow: PropTypes.string,
        linkType: PropTypes.bool,
        icon: PropTypes.bool,
        url: PropTypes.bool
    };
    static defaultProps = {
        type: null,// 左侧标题
        title: null,// 左侧标题
        label: null,// 标题下方的描述信息
        extra: null,// 右侧内容
        onlyTapFooter: false,// 只有点击 footer 区域才触发 tab 事件
        arrow: 'empty',// horizontal,up,down,empty，如果是empty则存在对应的dom,但是不显示
        linkType: null, // 链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch
        icon: null,
        url: null
    };

    footerTap() {
        // 如果并没有设置只点击 footer 生效，那就不需要额外处理。cell 上有事件会自动处理
        if (!this.props.onlyTapFooter) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick();
        }
        this.doNavigate.call(this);
    }

    cellTap() {
        // 如果只点击 footer 生效，那就不需要在 cell 根节点上处理
        if (this.props.onlyTapFooter) {
            return;
        }

        if (this.props.onClick) {
            this.props.onClick();
        }
        this.doNavigate.call(this);
    }

    // 用于被 cell-group 更新，标志是否是最后一个 cell
    updateIsLastCell(isLastCell) {
        this.setState({ isLastCell });
    }

    doNavigate() {

        if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.props.linkType) === -1) {
            warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.props.linkType);
        }
        // wx[this.props.linkType].call(wx, { url });
    }

    render() {
        const {
            type,
            title,
            label,
            extra,
            onlyTapFooter,
            arrow,
            linkType,
            icon,
            url,
        } = this.props
        /*缺少个upload*/

        return <Item
            onClick={() => this.cellTap()}
            arrow={arrow}
            thumb={icon}
            extra={extra}
        >
            {title}
            <Brief>{label}</Brief>
        </Item>
    }

}

