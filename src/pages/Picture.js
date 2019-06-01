import React, { PureComponent } from 'react';
import { Card } from 'antd';
import Masonry from 'react-masonry-with-css';
import axios from 'axios'
const { Meta } = Card;

const types = {
  "sex": '性别识别',
  "emotion": '表情识别',
  "hat": '头部特效合成',
  "repair": '图片修复'
}

export default class GlobalHeader extends PureComponent {
  state = {
    info: ''
  }
  componentDidMount(){
    axios.get('http://39.106.74.239/pictures').then(res => {
      let pics = []
      res.data.forEach(item => {
        let url = item.address.slice(1)
        url = `http://39.106.74.239${url}`
        let kind = types[item.name]
        let str = 
        <Card
          hoverable
          style={{ width: 280 ,margin: 10}}
          cover={<img src={url} />}
        >
          <Meta
            title={kind}
            description="某年某日某天"
          />
        </Card>
        
        pics.push(str)
      })
      this.setState({
        pics: pics
      })
    })
  }
  render() {
    return (
      <div style={{marginTop: '10px',paddingRight: '20px'}}>
        <Masonry width='280px' gap="5px">
            {/* <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card> */}
            {this.state.pics}
        </Masonry>
      </div>
    );
  }
}