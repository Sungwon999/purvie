import React, { Component } from "react";
import Slider from "react-slick";
import MovieDataLoader from './loader/MovieDataLoader'
import "./App.css"

class StillcutUnit extends Component {

    render() {
        let strStillcutURL = this.props.stillcut_url;
        let strClassName = "imgStill";
        return (
            <div>
                <img className={strClassName} src={strStillcutURL} alt=""/>
            </div>
        ) 
    }
}

class MainStillcutSlider extends Component {
    constructor(props)
    {
        super(props);
        this.ldrMovieData = new MovieDataLoader();
        this.state = {
           slider_data : []
        };
    }

    /**
     * 슬라이더에 노출될 이미지 추가
     * @param {} strImageURL 
     */
    addSliderData(arrSliderData)
    {
        this.setState({
            slider_data:arrSliderData
          });
    }
    
    /**
   * 박스오피스 목록을 가져온다.
   */
    getStillcutList()
    {
        const THIS = this;
        THIS.ldrMovieData.search_condition.item_per_page = 5;
        THIS.ldrMovieData.search_condition.is_daily = true;
        THIS.ldrMovieData.search_condition.nation_section = THIS.ldrMovieData.ALL;

        THIS.ldrMovieData.getBoxOfficeListWithPoster().then(
            function(arrBOData)
            {
                if(arrBOData != null)
                {
                    THIS.addSliderData(arrBOData);
                }
            }
        ).catch(function(e)
            {
            console.log("Error Massage : " + e);
            }
        );
    }

    componentDidMount() {
        this.getStillcutList();
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:5000      // 자동스크롤 속도( 1000 : 1초 단위)
        };

        return (
        <>
        <div className = "stillcut">
            <link rel="stylesheet" type="text/css" charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
            <link rel="stylesheet" type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
            <Slider {...settings} id="bo_stillcut_slider">
                {this.state.slider_data.map(function(objSliderData, i)
                    {
                        return <StillcutUnit stillcut_url={objSliderData.stillcut_url} key="{i}"/>;
                    })
                }
            </Slider>
        </div>
        </>
        );
    }
}

export default MainStillcutSlider;