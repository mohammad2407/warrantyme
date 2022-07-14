import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import styled from "styled-components"
export const Header = () => {

    const url = "https://gnews.io/api/v4/search?&token=e57f9009868e60711c3350e25027a2c9&limit=20&offset=0&lang=en&q="

    const url2 = 'https://gnews.io/api/v4/top-headlines?&token=e57f9009868e60711c3350e25027a2c9&'


    const [news, setNews] = useState('')
    const [results, setResults] = useState([])

    const [topNews , setTopNews] = useState([])

    

    const getData = async () => {
        const response = await axios(url + news)
        console.log(response)


        if (response.status == 200 || response.status == 304) {
            console.log("working")
            console.log(response.data.articles)
            setResults(response.data.articles.map((topic) => {
                return topic
            }))

        }
    }

    const getTopNews = async() =>{
        const latestNews = await axios(url2)
       
        console.log(latestNews)
        // if (latestNews.status == 200 || latestNews.status == 304) {
        //     console.log("working")
        //     console.log(latestNews.data.articles)
        //     setTopNews(latestNews.data.articles.map((topic) => {
        //         return topic
        //     }))

        // }
    }

    useEffect(() => {
        getTopNews()
    },[])

    const searchNews = () => {
        getData()
    }
    return (
        <div>
            <div>
            <HeaderContainer>
                <Heading>
                <h3>News</h3>
                </Heading>

                <SearchDiv>
                    <input type="text" placeholder='Search for the latest news' onChange={(e) => setNews(e.target.value)} />
                    <button onClick={searchNews}>search</button>
                </SearchDiv>
            </HeaderContainer>
            </div>

            <Home>
            <div>
                <h3>
                    The Latest News
                </h3>
            </div>
            {
                !results ? 
                
                topNews.map((topic, index) => {
                    return <>
                        <Card>
                           <Title>{topic.title}</Title> 
                           <div style={{display:"flex"}}>
                           <Image>
                            <img src= {topic.image} alt="title" />
                           </Image>
                            
                            <Desc>
                                {topic.content}
                            </Desc>

                           </div>
                        </Card>
                    </>
                })
                
                :
                    results.map((topic, index) => {
                        return <>
                            <Card>
                               <Title>{topic.title}</Title> 
                               <div style={{display:"flex"}}>
                               <Image>
                                <img src= {topic.image} alt="title" />
                               </Image>
                                
                                <Desc>
                                    {topic.content}
                                </Desc>

                               </div>
                            </Card>
                        </>
                    })
            }
            </Home>
        </div>
    )
}

const Home = styled.div`
    margin-top: 120px;
    margin-left:50px;
`

const Desc = styled.div`
    width:60%;
    font-size:15px;
    text-align:left;
    margin-left:30px;
    margin-top:20px;
`

const HeaderContainer = styled.div`
    width:100%;
    position: fixed;
    background: #c78c0c;
    height:80px;
    margin-top:-120px;
& h3{
    padding:0;
    float:left;
    color:#fff;
    margin-left:40px;
}
`
const SearchDiv = styled.div`
    width:30%;
    margin:auto;
    height:50%;
    margin-top:20px;

    & input{
        width:65%;
        height:90%;
        border:none;
        outline:none;
        border-radius: 6px 0px 0px 6px;
        font-size:18px;
    };
    & button{
        width:30%;
        height:100%;
        border:none;
        outline:none;
        background: #6584e9;
        color:#fff;
        font-size:17px;
        font-weight:600;
        border-radius: 0px 6px 6px 0px;

        :active{
        box-shadow: 0px 1px #34457e;
        transform:translateY(1px)
    }
    }
`

const Heading = styled.div`
     margin-top:0px;
     width:30%;
     background: #615b5b;
     position:fixed;
`

const Card = styled.div`

    width:80%;
    /* border:1px solid black; */
    margin-bottom:50px;
    box-shadow:1px 1px 2px 2px gray;
`

const Title = styled.div`
 
    margin:auto;
    border-bottom: 1px solid gray;
    font-size:20px;
    font-weight:600;
`

const Image = styled.div`
    width:20%;
    height:120px;
    & img{
        width:100%;
        height:100%;
    }
`



