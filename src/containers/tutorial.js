import Swiper from 'react-native-swiper';
import React, { Component} from 'react';
import {
  Animated,
  Easing,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import phone from '../img/phone.png';
import comment_0 from '../img/commentOne.jpg';
import comment_1 from '../img/commentTwo.jpg';
import comment_2 from '../img/commentThree.jpg';

import chart_0 from '../img/chartOne.jpg';
import chart_1 from '../img/chartTwo.jpg';
import chart_2 from '../img/chartThree.jpg';

const COMMENT_IMAGES = [comment_0, comment_1, comment_2];
const CHART_IMAGES = [chart_1, chart_0,chart_2];

const B = (props) => <Text style={styles.bold}>{props.children}</Text>;

const CommentHeader = (props) =>{
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {props.title}
      </Text>
    </View>
  )
}

const Slide = (props) =>{
  return (
    <View style={styles.slide}>
      <CommentHeader title={props.title} />
      <View style={[styles.mainContent, styles.center]}>
        {props.children}
      </View>
    </View>
  )
}
export default class tutorial extends Component {
  constructor(props) {
    super(props);
    this.animOneValue = new Animated.Value(0);
    this.animChartsValue = [];
    this.animCommentsValue = [];
  }
  componentWillMount(){
   for (var i = 0; i < 3; i++) {
     this.animCommentsValue.push(new Animated.Value(0));
     this.animChartsValue.push(new Animated.Value(0));
   }
  }
  componentDidMount() {
   this.animateSlideOne();
  }

  /**
  * Animate first slide which contents phone image..
  */
  animateSlideOne(){
    Animated.spring(this.animOneValue,
      { toValue: 1,  friction: 4,  tension: 8 }
   ).start();
  }

  /**
  * Animate Slide two which contents comments boxes
  */
  animateSlideTwo(){
   let delay = 0;
   for (var i = 0; i < this.animCommentsValue.length; i++) {
     Animated.timing(
       this.animCommentsValue[i], {
         toValue: 1,
         duration: 500,
         delay: (delay += 200)})
       .start();
   }
  }

  /**
  * Animate Slide two which contents comments boxes
  */
  animateSlideThree(){
   let delay = 0;
   for (var i = 0; i < this.animChartsValue.length; i++) {
     Animated.timing(
       this.animChartsValue[i], {
         toValue: 1,
         duration: 200,
         delay: (delay += 200)})
       .start();
   }
  }

  /**
   * Render list of comments
   * @return {Animated.Image} [comment image]
   */
  renderComments(){
   let toLeft = true;
   return this.animCommentsValue.map((animeValue, i) => {
     toLeft = !toLeft;
     return <Animated.Image
       key={i}
       source={COMMENT_IMAGES[i]}
       style={
         [ styles.commentImage, {
           marginLeft: toLeft ? 30 : 0 ,
           marginRight: toLeft ? 0 : 30 ,
           opacity: animeValue,
           transform: [
             { scale:  animeValue.interpolate({
                   inputRange: [0, 1],
                   outputRange: [0.1, 1],
                 })
             },
           ]},
         ]}
       />
     });
  }

  /**
   * Render list of charts
   * @return {Animated.Image} [chart image]
   */
  renderCharts(){
   const bigImg = {height: 140};
   return this.animChartsValue.map((animeValue, i) => {
     return <Animated.Image
     key={i}
     source={CHART_IMAGES[i]}
     style={
       [ styles.chartStyle, {
         opacity: animeValue,
         transform: [
           { scale:  animeValue.interpolate({
             inputRange: [0, .3, 1],
                               outputRange: [0.01, .3 , 1],
               })
           },
         ]}, (i==1) ?  bigImg : {}
       ]}
     />
   });
  }

  /**
   * Reset to 0
   */
  reset(){
    this.animOneValue.setValue(0);
    for (var i = 0; i < 3; i++) {
      this.animCommentsValue[i].setValue(0);
      this.animChartsValue[i].setValue(0);
    }
  }

  /**
   * Re animate animation -  onSwipe
   */
  onSwiped =(e, state, context) =>{
    let self = this;
    this.reset();
    switch (state.index) {
     case 0:
        self.animateSlideOne();
        break;
     case 1:
        self.animateSlideTwo();
        break;
     case 2:
        self.animateSlideThree();
        break;
    }
  }
render() {
  return (
    <View style={[this.props.style]}>
      <Swiper paginationStyle={styles.paginationStyle} onMomentumScrollEnd ={this.onSwiped}>
        <Slide title={<Text> Talk with coworkers in <B>channels</B> based on projects or share interests. </Text>}>
          <Animated.Image
            source={phone}
            style={[ styles.slide1AnimateImage, {
              opacity: this.animOneValue,
              transform: [ { scale: this.animOneValue.interpolate({
                    inputRange: [0, 1],outputRange: [0.8, 1],})},
              ]}]} />
        </Slide>
        <Slide title={<Text><B>All your team communcation</B> in one place, instantly searchable</Text>}>
          {this.renderComments()}
        </Slide>
        <Slide title={<Text><B>All your team communcation</B> in one place, instantly searchable</Text>}>
          {this.renderCharts()}
        </Slide>
      </Swiper>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
   flex: 1
 },
 center: {
   justifyContent: 'center',
   alignItems: 'center',
 },
 bold:{
   fontWeight: '700'
 },
 slide: {
   flex: 1,
 },
 text: {
   color: '#fff',
   fontSize: 30,
   fontWeight: 'bold',
 },
 header: {
   padding: 20,
   height: 130
 },
 headerText:{
   textAlign: 'center',
   fontSize: 20,
   margin: 20,
   marginBottom: 20,
 },
 mainContent:{
   flex: 1,
   paddingBottom: 150,
 },
 paginationStyle:{
   bottom : 150,
 },
 commentImage:{
   width: 280,
   height: 110,
   bottom: 20,
   resizeMode: 'stretch',
 },
 chartStyle:{
   width: 280,
   height: 90,
   bottom: 20,
   resizeMode: 'stretch',
 },
 slide1AnimateImage:{
   resizeMode: 'contain',
   width: 170,
   justifyContent: 'center',
   bottom: 20,
 },
});
