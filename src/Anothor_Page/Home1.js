import {Container, Navbar, Col, Row} from "react-bootstrap";
import React,{useState} from 'react';
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
function Home1(){
    const [mealData,setMealData]=useState(null)
    const [calories,setCalories]=useState(2000)
    function handlechange(e){
        setCalories(e.target.value)
    }
    function getMealData(){
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=58655337b64f49d79640921a919bc10c&timeFrame=day&targetCalories=${calories}`
        )
            .then((response)=>response.json())
            .then((data)=>{
                setMealData(data);
                console.log(data)
            })
            .catch(()=>{
                console.log("error");
            })
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
                {/*搜尋食譜*/}
                {/*<div>*/}
                {/*    <Search placeholder="input search text" onSearch={onSearch} enterButton onChange={handlechange} onClick={()=>getMealData()}/>*/}
                {/*</div>*/}
                <section className="controls">
                    <input
                        type="number"
                        placeholder="Calories (e.g. 2000)"
                        onChange={handlechange}/>
                </section>
                <button onClick={()=>getMealData()}>Get Daily meal</button>
                {mealData && <MealList mealData={mealData}/>}
                <br/>
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