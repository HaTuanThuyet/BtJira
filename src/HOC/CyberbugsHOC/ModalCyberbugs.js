import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector ,useDispatch} from 'react-redux';

export default function ModalCyberbugs(props) {

  const {visible,ComponentContentDrawer,callBackSubmit} = useSelector(state => state.drawerReducer);
  console.log('visible',visible);
  const dispatch = useDispatch()

    const showDrawer = () => {
      dispatch({
          type:'OPEN_DRAWER',
         
      })
    };

    const onClose = () => {
        dispatch({
            type:'CLOSE_DRAWER',
           
        })
    };
    return (



        <>
        
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space>
                        <Button onClick={onClose} style={{marginRight:8}}>Cancel</Button>
                        <Button onClick={onClose} type="primary" onClick={() => {
                            callBackSubmit();
                        }}>
                            Submit
                        </Button>
                    </Space>
                }
            >
               {ComponentContentDrawer}
            </Drawer>
        </>
    )
}
