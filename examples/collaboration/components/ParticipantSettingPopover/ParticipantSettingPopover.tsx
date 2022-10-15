import React, { PureComponent } from 'react';
import './ParticipantSettingPopover.less'
import copyLink from 'assets/icon/copy-link.svg'
import Participants from '../Participants/Participants';
import { Button, Modal, Popover } from 'antd';
interface IState {
  settingPopoverVisible: boolean
  isShowRemovePopup: boolean
}

class ParticipantSettingPopover extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isShowRemovePopup: false,
      settingPopoverVisible: false
    }
  }
  async handleVisibleChange(visible: boolean) {
    this.setState({ settingPopoverVisible: visible });
  }
  hideModal() {
    this.setState({ isShowRemovePopup: false });
  }
  openRemovePopup() {
    this.setState({
      isShowRemovePopup: true,
      settingPopoverVisible: false
    })
  }
  render() {
    const { children } = this.props;
    const content = (
      <div>
        <div className="sets-wrap">
          <div className="participants-box">
            <Participants/>
          </div>
          <div className="footor-wrap">
            <div className="stop-collab" onClick={this.openRemovePopup.bind(this)}>Remove Me</div>
            <div className="copy-link" onClick={() => this.props.copyLink()}>Copy link<img src={copyLink} /></div>
          </div>
        </div>
      </div>
    );
    return (
      <>
        <Popover placement={"bottomRight"} content={content} trigger="click" visible={this.state.settingPopoverVisible} onVisibleChange={(visible) => this.handleVisibleChange(visible)} title={null}>
          {children}
        </Popover>
        <Modal
          title={"Share"}
          visible={this.state.isShowRemovePopup}
          onCancel={this.hideModal.bind(this)}
          footer={[
            <Button type="primary" className="create-collab-btn" key={"continue remove"} onClick={() => this.props.removeMe()}>Continue</Button>
          ]}
          centered>
          <div className="create-collab-wrap">
            <div className="createDes">You will not be able to access the document, do you want to <br />continue remove?</div>
          </div>
        </Modal>
      </>
    );
  }
}
export default ParticipantSettingPopover;