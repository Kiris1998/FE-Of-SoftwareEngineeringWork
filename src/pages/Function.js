import React, { PureComponent } from 'react';
import { Menu, Icon , Alert , Upload , Button } from 'antd';
import './function.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const info = {
  "sex": {
    message: '性别识别',
    description: '性别识别的说明'
  },
  "emoji": {
    message: '表情识别',
    description: "表情识别的说明"
  },
  "synthetic": {
    message: '头部特效合成',
    description: '头部特效合成的说明'
  }
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export default class Function extends PureComponent {
  state = {
    current: 'sex',
    message: '性别识别',
    description: '性别识别的说明',
    loading: false,
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
      message: info[e.key].message,
      description: info[e.key].description
    });
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
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
          <Menu.Item key="emoji">
            <Icon type="smile" theme="twoTone" />表情识别
          </Menu.Item>
          <Menu.Item key="synthetic">
            <Icon type="gold" theme="twoTone" />头部特效合成
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
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img style={{width:'300px',borderRadius: '4px'}} src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
          <div className="loading">结果图片展示区</div>
        </div>
      </div>
    );
  }
}
