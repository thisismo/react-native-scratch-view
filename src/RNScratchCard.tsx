// @flow
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Draw} from "./Draw";

type Props = {
    coverColor: string;
    strokeWidth?: number;
    startTimeout?: number;
    onIsAllowed?: () => void;
};
type State = {
    offsetX: number;
    offsetY: number;
};

export class RNScratchCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {offsetX: 0, offsetY: 0};
        this.isAllowed = this.isAllowed.bind(this);
    }

    isAllowed() {
        if(this.props.onIsAllowed !== undefined) this.props.onIsAllowed();
    }

    render() {
        return (
            <View style={styles.container}
                  onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.setState({offsetX: layout.x, offsetY: layout.y});
                  }}>
                <View style={styles.inner}>
                    <View style={[styles.cover, {backgroundColor: this.props.coverColor}]}>
                        <Draw allowed={this.isAllowed} startDelay={this.props.startTimeout} strokeWidth={this.props.strokeWidth || 20} offsetX={this.state.offsetX} offsetY={this.state.offsetY}>
                            {this.props.children}
                        </Draw>
                    </View>
                    <View>
                        {this.props.children}
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: "relative",
        flex: 1
    },
    inner: {
        backgroundColor: 'red',
        position: "relative",
        width: '100%'
    },
    cover: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }
});
