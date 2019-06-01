import React, { PureComponent } from 'react';
import { Menu, Icon , Alert , Upload , notification , Button , Tooltip , Badge , Modal} from 'antd';
import axios from 'axios'
import './function.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { confirm } = Modal
const openNotificationWithIcon = (type, mes, content) => {
  notification[type]({
    message: mes,
    description: content
  });
};

const info = {
  "sex": {
    message: '性别识别',
    description: '性别识别的说明'
  },
  "emotion": {
    message: '表情识别',
    description: "表情识别的说明"
  },
  "hat": {
    message: '头部特效合成',
    description: '头部特效合成的说明'
  },
  "repair": {
    message: '图像修复',
    description: '图像修复的说明'
  }
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class Function extends PureComponent {
  state = {
    current: 'sex',
    message: '性别识别',
    description: '性别识别的说明',
    loading: false,
    time: {
      time: ''
    },
    imageUrl: '',
    picUrl: '',
    agree: '',
    disagree: '',
    hasChoose: false
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
      message: info[e.key].message,
      description: info[e.key].description,
      picUrl: '',
      imageUrl: '',
      hasChoose: false
    },()=>this.setLike());
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      openNotificationWithIcon('success', '上传成功', '图片上传成功，请等待后台处理结果。')
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
      this.setState({
        picUrl: '../5-160914192R6-52.gif'
      })
      let getPic = setInterval(() => {
        axios.get(`http://39.106.74.239/${this.state.current}2?time=${this.state.time.time}`).then(res => {
          if (res.data != 'wait' && res.data != 'unknownerror') {
            clearInterval(getPic)
            let url = res.data.slice(1)
            this.setState({
              picUrl: `http://39.106.74.239${url}`
            },()=>{
              setTimeout(()=>{
                this.showConfirm()
              },1000)
            })
          } else if (res.data == 'unknownerror') {
            openNotificationWithIcon('warning', '图片处理失败', '请换图尝试...')
            clearInterval(getPic)
            this.setState({
              picUrl: ''
            })
          }
        })
      },1000)
    }
  }
  beforeUpload = (file) => {
    openNotificationWithIcon('info', '图片上传中', '图片正在上传，请您耐心等待...')
    this.setState({
      time: {
        time: new Date().valueOf()
      }
    })
    const isOk = file.type === 'image/jpeg' || file.type ==='image/png';
    if (!isOk) {
      openNotificationWithIcon('warning', '上传失败', '您只能上传jpg/png格式且大小不超过2M的图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      openNotificationWithIcon('warning', '上传失败', '您只能上传jpg/png格式且大小不超过2M的图片')
    }
    return isOk && isLt2M;
  }
  setLike() {
    axios.get(`http://39.106.74.239/data?choice=${this.state.current}`).then(res => {
      this.setState({
        agree: res.data.agree,
        disagree: res.data.disagree
      })
    })
  }
  handleLike(type){
    axios.put(`http://39.106.74.239/${type}?choice=${this.state.current}`).then(()=>{
      this.setState({
        hasChoose: true,
        [type]: this.state[type] + 1
      },()=>{
        openNotificationWithIcon('success','评价成功！','感谢您对我们产品的评价！期待您的下次使用！谢谢！')
      })
    })
  }
  showConfirm() {
    let that = this
    confirm({
      title: '请问您愿意将处理结果图片展示在我们的照片墙上吗？',
      content: '点击确定即可将照片展现在我们的照片墙上哦~',
      onOk() {
        axios.put(`http://39.106.74.239/upload?time=${that.state.time.time}&answer=YES`)
      },
      onCancel() {
        axios.put(`http://39.106.74.239/upload?time=${that.state.time.time}&answer=NO`)
      },
    });
  }
  componentDidMount() {
    this.setLike()
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="sex">
            <Icon type="thunderbolt" theme="twoTone" />性别识别
          </Menu.Item>
          <Menu.Item key="emotion">
            <Icon type="smile" theme="twoTone" />表情识别
          </Menu.Item>
          <Menu.Item key="hat">
            <Icon type="gold" theme="twoTone" />头部特效合成
          </Menu.Item>
          <Menu.Item key="repair">
            <Icon type="edit" theme="twoTone" />图像修复
          </Menu.Item>
        </Menu>
        <Alert
          className="alert"
          message={this.state.message}
          description={this.state.description}
          type="info"
        />
        <div style={{display:'flex',justifyContent:'space-around'}}>
          <Upload
            name="file"
            data={this.state.time}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`http://39.106.74.239/${this.state.current}`}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img style={{width:'300px',height:'300px',borderRadius: '4px'}} src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
          {
            this.state.picUrl ? 
              <img style={{width:'300px',height:'300px'}} src={this.state.picUrl}></img>
            : <div className="loading">结果图片展示区</div>
          }
        </div>
        <div className="btn-group">
          <Tooltip placement="topLeft" title="点击按钮为功能评价吧~">
            <Badge count={this.state.agree}>
              <Button onClick={()=>this.handleLike('agree')}
                      style={{margin:'5px'}} 
                      disabled={this.state.hasChoose}
                      type="primary" 
                      shape="circle" 
                      icon="like"></Button>
            </Badge>
            <Badge count={this.state.disagree}>
              <Button onClick={()=>this.handleLike('disagree')} 
                      style={{margin:'5px'}} 
                      type="primary" 
                      disabled={this.state.hasChoose}
                      shape="circle" 
                      icon="dislike"></Button>
            </Badge>
          </Tooltip>
        </div>
      </div>
    );
  }
}
