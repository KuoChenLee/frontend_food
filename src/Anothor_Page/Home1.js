import {Container, Navbar, Col, Row,Modal} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import '../App.css';
import apple2 from '../image/apple2.jpg'
import { SearchOutlined,AudioOutlined ,LoadingOutlined, PlusOutlined,InboxOutlined ,ArrowRightOutlined} from '@ant-design/icons';
import {  Button, Tooltip, Space  ,Input,message, Upload,Card} from "antd"
import p1 from '../image/Home1_img.jpg'
import Pngtree from '../image/Pngtree.png'
// import Texty from 'rc-texty';
// import 'rc-texty/assets/index.css';
import MealList from './MealLIst'
// const { Search } = Input;
//
// const onSearch = (value) => console.log(value);

const { Dragger } = Upload;
// const props = {
//     name: 'file',
//     multiple: true,
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     onChange(info) {
//         const { status } = info.file;
//         if (status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully.`);
//         } else if (status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
//     onDrop(e) {
//         console.log('Dropped files', e.dataTransfer.files);
//     },
// };
function Home1(props){
    const [ingredients,setIngredients]=useState()
    const[number,setNumber]=useState(2)
    const [recipe,setRecipe]=useState([])
    const [id,setId]=useState(null)
    const [cook_method,setCook_method]=useState([])
    const [show, setShow] = useState(false);
    const [url,setUrl]=useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{recipemessage()},[])
    useEffect(()=>{getrecipe()},[])

    const API_KEY=props.API_KEY
    const { Meta } = Card;

    function handlechange(e){
        setIngredients(e.target.value)
    }
    function handlechange2(e){
        setNumber(e.target.value);
    }
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

                        <Row key={j}>
                            <Col>{Cook_method.name}</Col>
                            <Col>{Cook_method.original}</Col>
                            <Col><img src={`https://spoonacular.com/cdn/ingredients_100x100/${Cook_method.image}`} /></Col>

                            {/*<Button onClick={()=>getmsg(Cook_method.sourceUrl)}>Click</Button>*/}
                        </Row>

                    ))

                }

            </div>


        )
    }
   async function fetchUrl(recipeid){
       let Message=await fetch(`https://api.spoonacular.com/recipes/${recipeid}/information?apiKey=${API_KEY}&includeNutrition=false`)
       console.log(Message)
       let jsonMessage=await Message.json();
       console.log(jsonMessage)
       const Url=jsonMessage.sourceUrl
       setUrl(Url)
       console.log(Url)
   }
    function display_recipemessage(recipeid){
        return(
            <div>
                <button  className={"btn-76"}  onClick={handleShow}>
                    <span onClick={()=>{recipemessage(recipeid);fetchUrl(recipeid);}}>Show Recipe Message</span>
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Recipe Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {RecipeMessage()}
                        <a href={url} >前往製作方法<ArrowRightOutlined /></a>
                    </Modal.Body>
                    <Modal.Footer>


                        {/*<a href={`${sourceUrl}`}>Product Method<ArrowRightOutlined /></a>*/}
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    // https://spoonacular.com/productImages/{ID}-{SIZE}.{TYPE}




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
                <Row className={"justify-content-md-center"}>
                {
                    recipe.map((Recipes,i)=>(
                    <Card
                        key={i}
                    hoverable
                    style={{
                    width: 240,

                }}
                    cover={<img alt="example" src={Recipes.image} />}
                    >
                    <Meta title={Recipes.title} />
                        <br/>
                        {/*<Button onClick={()=>fetchUrl(Recipes.id)}>{display_recipemessage(Recipes.id)}</Button>*/}
                        {display_recipemessage(Recipes.id)}
                    </Card>
                    ))
                }

            </Row>
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