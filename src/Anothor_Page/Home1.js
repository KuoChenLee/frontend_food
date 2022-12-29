import {Container, Navbar, Col, Row,Modal} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import '../App.css';
import apple2 from '../image/apple2.jpg'
import { SearchOutlined,AudioOutlined ,LoadingOutlined, PlusOutlined,InboxOutlined } from '@ant-design/icons';
import {  Button, Tooltip, Space  ,Input,message, Upload} from "antd"
import p1 from '../image/Home1_img.jpg'
import Pngtree from '../image/Pngtree.png'
// import Texty from 'rc-texty';
// import 'rc-texty/assets/index.css';
import MealList from './MealLIst'
const { Search } = Input;

const onSearch = (value) => console.log(value);

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
function Home1(props){
    const [ingredients,setIngredients]=useState()
    // const [mealData,setMealData]=useState(null)
    // const [calories,setCalories]=useState(2000)
    const[number,setNumber]=useState(10)
    const [recipe,setRecipe]=useState([])
    const [id,setId]=useState(null)
    const [cook_method,setCook_method]=useState([])
    const API_KEY=props.API_KEY
    // const [recipedata,setRecipedata]=useState()
    useEffect(()=>{getrecipe()},[])
    useEffect(()=>{recipemessage()},[])
    function handlechange(e){
        setIngredients(e.target.value)
    }
    function handlechange2(e){
        setNumber(e.target.value);
    }
    function handlechange3(e){
        setId(e.target.value);
    }
    // function getMealData(){
    //     fetch(
    //         `https://api.spoonacular.com/mealplanner/generate?apiKey=58655337b64f49d79640921a919bc10c&timeFrame=day&targetCalories=${calories}`
    //     )
    //         .then((response)=>response.json())
    //         .then((data)=>{
    //             setMealData(data);
    //             console.log(data)
    //         })
    //         .catch(()=>{
    //             console.log("error");
    //         })
    // }
    async function recipemessage(recipeid){
        let Message=await fetch(`https://api.spoonacular.com/recipes/${recipeid}/information?apiKey=${API_KEY}&includeNutrition=false`)
        console.log(Message)
        let jsonMessage=await Message.json();
        console.log(jsonMessage)
        let extendedIngredients=await jsonMessage.extendedIngredients
        console.log(extendedIngredients)
        const cook_methods=await Promise.all(extendedIngredients.map(async(j)=>{
            const Cook_method={
                aisle:j.aisle.toString(),
                amount:j.amount.toString(),
                consistency:j.consistency.toString(),
                id:j.id,
                image:j.image,
                name:j.name,
                nameClean:j.nameClean.toString(),
                original:j.original.toString(),
                originalName:j.originalName.toString(),
                unit:j.unit
            }
            return Cook_method
        }))
        setCook_method(cook_methods.filter(Cook_method => Cook_method !== null))
    }
    function RecipeMessage(){

        return(
            <div>
                {
                                        cook_method.map((Cook_method,j)=>(

                                            <ul key={j}>
                                                <li>{Cook_method.name}</li>
                                            </ul>

                                        ))

                                    }
            </div>

        )
    }
    async function getrecipe(){

        let Recipe=await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=${number}&ignorePantry=true`)
        let jsonrecipe=await Recipe.json();
        console.log(jsonrecipe)
        const Recipess=await Promise.all(jsonrecipe.map(async(i)=>{
            const Recipes={
                id:i.id,
                image:i.image,
                title:i.title
            }
            console.log(Recipes)
            return Recipes
        }))
        setRecipe(Recipess.filter(Recipes => Recipes !== null))

    }
    return(
        <div className="background">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Container className="background2">
                <img src={Pngtree} className="Pngtree"/>
                <Row>
                    <h1 className="text1">Welcome To My Kitchen</h1>
                </Row>
                <Row>
                    {/*上傳圖片*/}
                    <Col  >
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">點擊或拖拽文件到此區域上傳</p>
                            <p className="ant-upload-hint">
                                支持單個或批量上傳。嚴禁上傳公司資料或其他樂隊文件
                            </p>
                        </Dragger>
                    </Col>
                    {/*推薦食譜*/}
                    <Col className="background3">
                       <h1>推薦食譜</h1>
                        <h3>義大利麵</h3>
                        <h3>海鮮燉飯</h3>
                        <h3>義大利麵</h3>
                        <h3>海鮮燉飯</h3>
                        <h3>義大利麵</h3>
                        <h3>海鮮燉飯</h3>
                        <h3>義大利麵</h3>
                        <h3>海鮮燉飯</h3>
                    </Col>


                </Row>
                <br/>

                <div>

                <Row>
                    <section className="controls">
                        <input
                            type="string"
                            placeholder="search recipe"
                            onChange={handlechange}/>

                    </section>
                </Row>
               <Row>
                   <section className="controls">
                       <input
                           type="string"
                           placeholder="number"
                           onChange={handlechange2}/>

                   </section>
               </Row>
                    <br/>
                <Row><Button onClick={()=>getrecipe()} className="btn-59">Get Daily meal</Button></Row>
                    <br/>
                </div>
                {
                    recipe.map((Recipes,i)=>(
                        <Container key={i}>
                            <img onClick={()=>recipemessage(Recipes.id)} src={Recipes.image} className="Recipes_photo" />
                            <Row>
                                <h1>{Recipes.title}</h1>
                            </Row>
                            <Row>
                                <h5>{Recipes.id}</h5>

                            </Row>
                            <Row>
                                <Button type="primary" onClick={()=>recipemessage(Recipes.id)}>Show Recipe Message</Button>
                            </Row>

                                {RecipeMessage()}
                        </Container>
                    ))
                }

            </Container>
            <br/>
            <br/>
            <Container>
                <p className="p">Must No Be Bad~</p>
            </Container>
            <br/>

        </div>
    )
}

export default Home1;