// @flow
import * as React from 'react';
import {PanResponder, View} from "react-native";
import {posToSVG} from "./helper";
import Svg, {Path} from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";
import {
    State,
    HandlerStateChangeEvent,
    PanGestureHandler,
    PanGestureHandlerEventPayload,
    PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";

type Props = {
    offsetX: number;
    offsetY: number;
    strokeWidth: number;
    startDelay?: number;

    allowed?: () => void;
};
type IState = {
    currentPath: Array<[number, number]>;
    svgPath: string;
    pressed: boolean;
    allowed: boolean;
    startTime: number;
};

export class Draw extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.onHandlerStateChange = this.onHandlerStateChange.bind(this);
        this.state = {
            currentPath: [],
            pressed: false,
            svgPath: "",
            allowed: this.props.startDelay === undefined,
            startTime: 0
        };
    }


    handleStart() {
        if(!this.state.allowed) {
            this.setState({startTime: Date.now()});
        }
    };

    handleMove = ({nativeEvent: { x, y }, }: PanGestureHandlerGestureEvent) => {

        let allowed = false;
        if(this.state.allowed ||
            this.state.startTime + (this.props.startDelay! * 1000) < Date.now()) {
            allowed = true;
            this.setState({allowed: true});
            if(this.props.allowed !== undefined) this.props.allowed();
        }

        if(!allowed || !this.state.allowed) return;

        const pos: [x: number, y: number] = [x, y];
        const path = this.state.currentPath;
        const oldPos = path[path.length - 1];
        if(path.length !== 0 && oldPos[0] == pos[0] && oldPos[1] == pos[1]) {
            return;
        }
        this.addToPath(pos);
    };

    handleEnd() {
        this.setState({
            pressed: false,
            currentPath: []
        });
    };

    addToPath(pos: [x: number, y: number]) {
        let {currentPath, svgPath} = this.state;
        this.setState({currentPath: [...currentPath, pos], svgPath: svgPath += posToSVG(currentPath.length, pos)});
    }

    onHandlerStateChange(nativeEvent: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) {
        switch (nativeEvent.nativeEvent.state) {
            case State.BEGAN:
                this.handleStart();
                break;
            case State.ACTIVE:
                break;
            case State.END:
                this.handleEnd();
                break;
        }
    }

    render() {
        return (
            <View style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'transparent'}}>
                <PanGestureHandler
                    maxPointers={1}
                    minDist={0}
                    avgTouches={false}
                    onHandlerStateChange={this.onHandlerStateChange}
                    onGestureEvent={this.handleMove}
                >
                    <MaskedView style={{flex: 1}} maskElement={
                        <View style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'transparent'}}>
                            <Svg stroke={"#000"}>
                                <Path
                                    d={this.state.svgPath}
                                    strokeWidth={this.props.strokeWidth}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </View>
                    }>
                        {this.props.children}
                    </MaskedView>
                </PanGestureHandler>
            </View>
        );
    };
}
