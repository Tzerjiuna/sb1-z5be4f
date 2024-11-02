import { Table, Tag, Space, Button, Modal, Form, Input, Select, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRechargeRecords, updateWithdrawal } from '../api/transactions';
import { useState } from 'react';

const { Option } = Select;

function Transactions() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const queryClient = useQueryClient();

  const { data: rechargeData, isLoading } = useQuery(['recharge'], getRechargeRecords);

  const updateMutation = useMutation(updateWithdrawal, {
    onSuccess: () => {
      message.success('Record updated successfully');
      queryClient.invalidateQueries(['recharge']);
      setEditModalVisible(false);
    },
    onError: () => {
      message.error('Failed to update record');
    },
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
    },
    {
      title: 'Amount',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      render: (state: string) => (
        <Tag color={state === '成功' ? 'green' : state === '失败' ? 'red' : 'gold'}>
          {state}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'aid',
      key: 'aid',
    },
    {
      title: 'Time',
      dataIndex: 'add_time',
      key: 'add_time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            onClick={() => {
              setSelectedRecord(record);
              setEditModalVisible(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const handleUpdateSubmit = (values: any) => {
    if (selectedRecord) {
      updateMutation.mutate({
        id: selectedRecord.id,
        ...values,
      });
    }
  };

  return (
    <div>
      <h2>Transaction Management</h2>
      <Table 
        columns={columns} 
        dataSource={rechargeData} 
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title="Edit Transaction"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={selectedRecord}
          onFinish={handleUpdateSubmit}
          layout="vertical"
        >
          <Form.Item
            name="state"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value={1}>Success</Option>
              <Option value={2}>Failed</Option>
              <Option value={0}>Processing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="remarks"
            label="Remarks"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={updateMutation.isLoading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Transactions;