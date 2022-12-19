import {Container, Navbar, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import '../App.css';
import p1 from '../image/Home1_img.jpg'
import apple2 from "../image/apple2.jpg";
import {Button} from "antd";
function Home1(){
    const [ingredients,setIngredients]=useState(null)
    const[number,setNumber]=useState()
    const [recipe,setRecipe]=useState()
    function handlechange(e){
        setIngredients(e.target.value);
    }
    function handlechange2(e){
        setNumber(e.target.value);
    }
    function getrecipe(){

        fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=58655337b64f49d79640921a919bc10c&ingredients=${ingredients},+flour,+sugar&number=${number}`
        ).then((response)=>response.json()
        ).then((data)=>{
            setRecipe(data);
            console.log(data)
            }
        ).catch((e)=>{
            console.log(e)
        })
    }
    // useEffect(() => {
    //     fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2`
    //     ).then((response)=>response.json()
    //     ).then((data)=>{
    //             setRecipe(data);
    //             console.log(data)
    //         }
    //     ).catch(()=>{
    //         console.log("error")
    //     })
    // }, []);
    return(
        <div className="background7">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container className="background2">
                <br/>
                <Row>
                    <Col >
                        <img src={apple2} className="apple"/>
                    </Col>
                    <br/>
                    <Col className="background6">
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                    </Col>


                </Row>
                <br/>
                <Row>
                    <Col >
                        <img src={apple2} className="apple"/>
                    </Col>
                    <br/>
                    <Col className="background6">
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                        <h1>我是小黑</h1>
                    </Col>
                </Row>
                <br/>
                <section className="controls">
                    <input
                        type="string"
                        placeholder="search recipe"
                        onChange={handlechange}/>

                </section>
                <section className="controls">
                    <input
                        type="string"
                        placeholder="number"
                        onChange={handlechange2}/>

                </section>
                <Button onClick={()=>getrecipe()} className="btn-59">Get Daily meal</Button>

            </Container>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Home1;