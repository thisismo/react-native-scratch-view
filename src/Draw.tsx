// @flow
import * as React from 'react';
import {PanResponder, View} from "react-native";
import type {
    PanResponderInstance,
    GestureState,
} from 'react-native/Libraries/Interaction/PanResponder';
import type {PressEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {posToSVG} from "./helper";
import Svg, {Path} from "react-native-svg";

type Props = {
    offsetX: number;
    offsetY: number;
    strokeWidth: number;
};
type State = {
    currentPath: Array<[number, number]>;
    svgPath: string;
    pressed: boolean;
};

export class Draw extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {currentPath: [], pressed: false, svgPath: ""};
    }


    _handleStartShouldSetPanResponder = (
        event: PressEvent,
        gestureState: GestureState,
    ): boolean => {
        // Should we become active when the user presses down on the circle?
        return true;
    };

    _handleMoveShouldSetPanResponder = (
        event: PressEvent,
        gestureState: GestureState,
    ): boolean => {
        // Should we become active when the user moves a touch over the circle?
        return true;
    };

    _handlePanResponderGrant = (
        event: PressEvent,
        gestureState: GestureState,
    ) => {
        this.setState({
            pressed: true,
            currentPath: []
        });
    };

    _handlePanResponderMove = (event: PressEvent, gestureState: GestureState) => {
        const pos = this.toRelative([gestureState.moveX, gestureState.moveY]);
        const path = this.state.currentPath;
        const oldPos = path[path.length - 1];
        if(path.length !== 0 && oldPos[0] == pos[0] && oldPos[1] == pos[1]) {
            return;
        }
        this.addToPath(pos);
    };

    _handlePanResponderEnd = (event: PressEvent, gestureState: GestureState) => {
        this.setState({
            pressed: false,
            currentPath: []
        });
    };

    _panResponder: PanResponderInstance = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handlePanResponderMove,
        onPanResponderRelease: this._handlePanResponderEnd,
        onPanResponderTerminate: this._handlePanResponderEnd,
    });

    toRelative(pos: [x: number, y: number]): [x: number, y: number] {
        return [pos[0] - this.props.offsetX, pos[1] - this.props.offsetY];
    }

    addToPath(pos: [x: number, y: number]) {
        let {currentPath, svgPath} = this.state;
        this.setState({currentPath: [...currentPath, pos], svgPath: svgPath += posToSVG(currentPath.length, pos)});
    }

    render() {
        return (
            <View style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'transparent'}}
                  {...this._panResponder.panHandlers}>
                <Svg stroke={"#000"}>
                    <Path
                        d={this.state.svgPath}
                        strokeWidth="32"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </View>
        );
    };
}
