// @flow
import * as React from 'react';
import {StyleSheet, View} from "react-native";
import {Draw} from "./Draw";

type Props = {

};
type State = {
    offsetX: number;
    offsetY: number;
};

export class RNScratchCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {offsetX: 0, offsetY: 0};
    }

    render() {
        return (
            <View style={styles.container}
                  onLayout={event => {
                      const layout = event.nativeEvent.layout;
                      this.setState({offsetX: layout.x, offsetY: layout.y});
                  }}>
                <View style={styles.inner}>
                    <View style={styles.cover}>
                        <Draw strokeWidth={30} offsetX={this.state.offsetX} offsetY={this.state.offsetY}>
                            <View>
                                {this.props.children}
                            </View>
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
        backgroundColor: 'gray',
        width: '100%',
        height: '100%'
    }
});
