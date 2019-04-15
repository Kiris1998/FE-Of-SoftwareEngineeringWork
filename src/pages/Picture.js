import React, { PureComponent } from 'react';
import { Card } from 'antd';
import Masonry from 'react-masonry-with-css';
const { Meta } = Card;
let images = ['http://projectcommunityonline.com/wp-content/plugins/RSSPoster_PRO/cache/7b48a_code2.png','https://cdn.poststatus.com/wp-content/uploads/2015/06/code-1116x399.gif','https://cdn-images-1.medium.com/max/332/1*09rG9hwkdCB1yXUlTlrHig@2x.png','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2IFfE-OJ6zJfHhuKspsPvBNk6W2OOsQuo7naPue3rEBFvOHl','https://code.visualstudio.com/assets/docs/python/tutorial/social.png'];
let items = new Array(50).fill('');

export default class GlobalHeader extends PureComponent {
  render() {
    return (
      <div style={{marginTop: '10px',paddingRight: '20px'}}>
        <Masonry width='280px' gap="5px">
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="http://img4q.duitang.com/uploads/item/201303/15/20130315223944_EvRW3.thumb.700_0.jpeg" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="http://b4-q.mafengwo.net/s11/M00/A8/91/wKgBEFsiNPSAEPDPADClLyE6Q4086.jpeg" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="http://img.mp.itc.cn/upload/20170718/25f19cc037674477910366b445b33a1f_th.jpg" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="http://i0.hdslb.com/bfs/article/87caf1f969df02f46c8a3df21645852b6802c34c.jpg" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
            <Card
              hoverable
              style={{ width: 280 ,margin: 10}}
              cover={<img alt="example" src="http://zx.youdao.com/zx/wp-content/uploads/2015/09/15.28.jpg" />}
            >
              <Meta
                title="人脸识别/表情识别/特效处理"
                description="某年某日某天"
              />
            </Card>
        </Masonry>
      </div>
    );
  }
}
