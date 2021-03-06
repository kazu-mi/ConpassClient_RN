import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import EventItem from '../EventItem';

import styles from './style';

export default class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: props.isLoading,
    };

    this.renderIndicator = this.renderIndicator.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.isLoading,
    });
  }

  renderIndicator() {
    return (
      <View style={[styles.itemStyle, styles.backgroundWhite]}>
        <ActivityIndicator
          style={styles.indicator}
          animating
        />
      </View>
    )
  }

  renderEvent(event) {
    return (
      <View style={styles.itemStyle}>
        <EventItem
          event={event.item}
          onPress={() => { this.props.onClickItem(event) }} />
      </View>
    )
  }

  renderItem(event) {
    return this.renderEvent(event);
  }

  render() {
    const {
      dataList,
      onScrollBottom,
    } = this.props;

    const {
      isLoading,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          onViewableItemsChanged={(info) => {
            const tailItemIndex = info.changed[info.changed.length - 1].index;
            if (!isLoading && tailItemIndex === dataList.length - 1) {
              onScrollBottom()
            }
          }} />
        {isLoading ? this.renderIndicator() : null}
      </View>
    );
  }
}