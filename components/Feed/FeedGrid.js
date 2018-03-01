import React from 'react'
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native'
import FeedImages from './FeedImages'
import { connect } from 'react-redux'
import { getFeedData } from '../../src/Actions/feedActions'

class FeedGridScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { refreshing: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feedUpdated) {
     this.setState({ refreshing: false })
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.getFeedData()
  }

  render() {
    let imgArray1 = []
    let imgArray2 = []

    this.props.feedState.data.forEach((element, i) => {
      if (i % 2 == 0) {
        imgArray1.push(element)
      } else {
        imgArray2.push(element)
      }
    })

    // refreshControl={
    //   <RefreshControl
    //     refreshing={this.state.refreshing}
    //     onRefresh={() => this._onRefresh()}
    //   />
    // }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}>

        <View style={styles.columnContainer}>
          <FeedImages navigation={this.props.navigation} images={imgArray1} />
        </View>

        <View style={styles.columnContainer}>
          <FeedImages navigation={this.props.navigation} images={imgArray2} />
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 30,
    paddingLeft: 19,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
})

const mapStateToProps = state => ({ 
  feedState: state.feedReducer,
  feedUpdated: state.feedReducer.fetched,
 })

const mapDispatchToProps = { getFeedData }

const FeedGrid = connect(mapStateToProps, mapDispatchToProps)(FeedGridScreen)
export default FeedGrid
